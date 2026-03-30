/**
 * Task operations: create, render, delete, and stats updates.
 *
 * Classic script (no ESM `export/import`) so it can run with `file://`.
 */

window.TaskFlow = window.TaskFlow || {};

const els = window.TaskFlow.els;
const state = window.TaskFlow.state;
const saveTasks = window.TaskFlow.saveTasks;

let pendingDeleteId = null;

const confirmDeleteAvailable = Boolean(
  els &&
    els.confirmDeleteModal &&
    els.confirmDeleteText &&
    els.confirmDeleteCancelBtn &&
    els.confirmDeleteOkBtn
);

/**
 * Show validation feedback.
 * If the details modal is open, write into it; otherwise fall back to alert().
 * @param {string} message
 */
function showUserError(message) {
  if (els && els.modal && !els.modal.classList.contains("hidden")) {
    els.modalHint.textContent = message;
    els.modal.classList.add("highlight");
    return;
  }
  alert(message);
}

/**
 * Create a new task.
 * @param {string} title
 * @param {string} [category]
 * @param {string|null} [date]
 * @returns {boolean}
 */
function createTask(title, category = "personal", date = null) {
  const normalizedTitle = String(title || "").trim();
  const normalizedDate = date ? date : null; // "" -> null

  if (normalizedTitle.length < 3) {
    showUserError("El título debe tener al menos 3 caracteres.");
    return false;
  }
  if (normalizedTitle.length > 60) {
    showUserError("El título no puede superar los 60 caracteres.");
    return false;
  }

  // Require date for "trabajo".
  if (category === "trabajo" && !normalizedDate) {
    els.modalHint.textContent =
      "Las tareas de Trabajo requieren una fecha.";
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

  // Duplicate without date -> open modal instead.
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

  state.tasks.push({
    id: Date.now(),
    title: normalizedTitle,
    category,
    date: normalizedDate,
    completed: false,
  });

  saveTasks();
  renderTasks();
  return true;
}

/**
 * Update stats counters.
 * @returns {void}
 */
function updateStats() {
  if (!els || !els.taskCount) return;

  els.taskCount.textContent = `${state.tasks.length} tareas`;
  const total = state.tasks.length;
  const completed = state.tasks.filter((t) => t.completed).length;
  const pending = total - completed;

  if (els.totalTasks) els.totalTasks.textContent = total;
  if (els.completedTasks) els.completedTasks.textContent = completed;
  if (els.pendingTasks) els.pendingTasks.textContent = pending;
}

/**
 * Render task list.
 * @returns {void}
 */
function renderTasks() {
  els.taskList.innerHTML = "";

  const filtered = state.tasks.filter((task) => {
    if (state.currentFilter === "completed") return task.completed;
    if (state.currentFilter === "pending") return !task.completed;
    return true; // all
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

      if (!confirmDeleteAvailable) {
        const ok = window.confirm(
          `¿Eliminar la tarea "${task.title}"${
            task.date ? ` (fecha: ${task.date})` : ""
          }?`
        );
        if (!ok) return;

        state.tasks = state.tasks.filter((t) => t.id !== task.id);
        saveTasks();
        renderTasks();
        return;
      }

      pendingDeleteId = task.id;
      els.confirmDeleteText.textContent =
        `¿Eliminar la tarea "${task.title}"${
          task.date ? ` (fecha: ${task.date})` : ""
        }?`;
      els.confirmDeleteModal.classList.remove("hidden");
    });

    fragment.appendChild(clone);
  }

  els.taskList.appendChild(fragment);
  updateStats();
}

// Confirm-delete modal wiring.
if (confirmDeleteAvailable) {
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
}

// Expose functions to the rest of the app.
window.TaskFlow.createTask = createTask;
window.TaskFlow.updateStats = updateStats;
window.TaskFlow.renderTasks = renderTasks;

