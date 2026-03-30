import { els } from "./dom.js";
import { state } from "./state.js";
import { saveTasks } from "./storage.js";

/**
 * Create a new task (or open the details modal for duplicates without a date).
 *
 * @param {string} title
 * @param {string} [category]
 * @param {string|null} [date]
 * @returns {void}
 */
export function createTask(title, category = "personal", date = null) {
  const exists = state.tasks.some(
    (t) =>
      t.title.toLowerCase() === title.toLowerCase() &&
      (!t.date || t.date === date)
  );

  // If duplicate WITHOUT date -> open modal instead.
  if (exists && !date) {
    els.modalHint.textContent =
      "Esta tarea ya existe. Selecciona una fecha diferente.";
    els.modal.classList.remove("hidden");
    els.modal.classList.add("highlight");

    els.modalTitle.value = title;
    els.modalCategory.value = category;
    return;
  }

  const task = {
    id: Date.now(),
    title,
    category,
    date,
    completed: false,
  };

  state.tasks.push(task);
  saveTasks();
  renderTasks();
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
      const confirmDelete = confirm("¿Quieres eliminar esta tarea?");
      if (!confirmDelete) return;

      state.tasks = state.tasks.filter((t) => t.id !== task.id);
      saveTasks();
      renderTasks();
    });

    fragment.appendChild(clone);
  }

  els.taskList.appendChild(fragment);
  updateStats();
}

