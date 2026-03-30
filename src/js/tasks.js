import { els } from "./dom.js";
import { state } from "./state.js";
import { saveTasks } from "./storage.js";

/**
 * Create a new task (or open the details modal for duplicates without a date).
 *
 * @param {string} title
 * @param {string} [category]
 * @param {string|null} [date]
 * @returns {boolean} `true` if the task was created, otherwise `false`.
 */
export function createTask(title, category = "personal", date = null) {
  const normalizedTitle = String(title || "").trim();
  const normalizedDate = date ? date : null; // "" -> null

  // Basic title validation for better UX.
  if (normalizedTitle.length < 3) {
    showUserError("El título debe tener al menos 3 caracteres.");
    return false;
  }
  if (normalizedTitle.length > 60) {
    showUserError("El título no puede superar los 60 caracteres.");
    return false;
  }

  // Require date for "Trabajo" category.
  if (category === "trabajo" && !normalizedDate) {
    els.modalHint.textContent = "Las tareas de Trabajo requieren una fecha.";
    els.modal.classList.remove("hidden");
    els.modal.classList.add("highlight");
    els.modalTitle.value = normalizedTitle;
    els.modalCategory.value = category;
    els.modalDate.value = "";
    return false;
  }

  const exists = state.tasks.some(
    (t) =>
      t.title.toLowerCase() === normalizedTitle.toLowerCase() &&
      (!t.date || t.date === normalizedDate)
  );

  // If duplicate WITHOUT date -> open modal instead.
  if (exists && !normalizedDate) {
    els.modalHint.textContent =
      "Esta tarea ya existe. Selecciona una fecha diferente.";
    els.modal.classList.remove("hidden");
    els.modal.classList.add("highlight");

    els.modalTitle.value = normalizedTitle;
    els.modalCategory.value = category;
    els.modalDate.value = "";
    return false;
  }

  const task = {
    id: Date.now(),
    title: normalizedTitle,
    category,
    date: normalizedDate,
    completed: false,
  };

  state.tasks.push(task);
  saveTasks();
  renderTasks();
  return true;
}

/**
 * Update counters in the stats section based on current `state.tasks`.
 * @returns {void}
 */
export function updateStats() {
  els.taskCount.textContent = `${state.tasks.length} tareas`;

  const total = state.tasks.length;
  const completed = state.tasks.filter((t) => t.completed).length;
  const pending = total - completed;

  els.totalTasks.textContent = total;
  els.completedTasks.textContent = completed;
  els.pendingTasks.textContent = pending;
}

/**
 * Re-render the task list based on the current filter (`state.currentFilter`).
 * @returns {void}
 */
export function renderTasks() {
  els.taskList.innerHTML = "";

  const filtered = state.tasks.filter((task) => {
    if (state.currentFilter === "completed") return task.completed;
    if (state.currentFilter === "pending") return !task.completed;
    return true; // "all"
  });

  if (filtered.length === 0) {
    els.taskList.innerHTML = `
      <div class="empty-state">
        <p>No tienes tareas aún</p>
        <small>Añade una nueva tarea para comenzar</small>
      </div>
    `;
    updateStats();
    return;
  }

  const fragment = document.createDocumentFragment();

  for (const task of filtered) {
    const clone = els.taskTemplate.content.cloneNode(true);

    const checkbox = clone.querySelector(".task-checkbox");
    const title = clone.querySelector(".task-title");
    const meta = clone.querySelector(".task-meta");
    const deleteBtn = clone.querySelector(".delete-task");

    title.textContent = task.title;
    meta.textContent = `${task.category}${task.date ? ` - ${task.date}` : ""}`;

    checkbox.checked = task.completed;

    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      saveTasks();
      renderTasks();
    });

    deleteBtn.addEventListener("click", () => {
      const needsConfirmation = Boolean(task.date) || Boolean(task.completed);

      if (!needsConfirmation) {
        state.tasks = state.tasks.filter((t) => t.id !== task.id);
        saveTasks();
        renderTasks();
        return;
      }

      pendingDeleteId = task.id;
      els.confirmDeleteText.textContent =
        `¿Eliminar la tarea "${task.title}"${task.date ? ` (fecha: ${task.date})` : ""}?`;
      els.confirmDeleteModal.classList.remove("hidden");
    });

    fragment.appendChild(clone);
  }

  els.taskList.appendChild(fragment);
  updateStats();
}

let pendingDeleteId = null;

function showUserError(message) {
  // If the details modal is visible, show feedback in the modal.
  if (els.modal && !els.modal.classList.contains("hidden")) {
    els.modalHint.textContent = message;
    els.modal.classList.add("highlight");
    return;
  }
  alert(message);
}

// Wire confirm-delete modal once for the whole module.
els.confirmDeleteCancelBtn.addEventListener("click", () => {
  pendingDeleteId = null;
  els.confirmDeleteModal.classList.add("hidden");
});

els.confirmDeleteOkBtn.addEventListener("click", () => {
  if (pendingDeleteId == null) return;

  state.tasks = state.tasks.filter((t) => t.id !== pendingDeleteId);
  pendingDeleteId = null;
  els.confirmDeleteModal.classList.add("hidden");

  saveTasks();
  renderTasks();
});

