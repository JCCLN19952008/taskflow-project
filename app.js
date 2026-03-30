// TaskFlow Planner - classic script bundle for file:// compatibility.
// This avoids ES module loading issues (CORS/origin 'null') when opening index.html locally.

const els = {
  taskForm: document.getElementById("taskform"),
  taskInput: document.getElementById("task-input"),
  taskList: document.getElementById("tasks"),

  totalTasks: document.getElementById("total-tasks"),
  completedTasks: document.getElementById("completed-tasks"),
  pendingTasks: document.getElementById("pending-tasks"),
  taskCount: document.getElementById("task-count"),

  modal: document.getElementById("taskModal"),
  openModalBtn: document.getElementById("openModal"),
  closeModalBtn: document.getElementById("closeModal"),
  saveTaskBtn: document.getElementById("saveTask"),
  modalHint: document.getElementById("modalHint"),
  modalTitle: document.getElementById("modalTaskTitle"),
  modalCategory: document.getElementById("modalTaskCategory"),
  modalDate: document.getElementById("modalTaskDate"),

  confirmDeleteModal: document.getElementById("confirmDeleteModal"),
  confirmDeleteText: document.getElementById("confirmDeleteText"),
  confirmDeleteCancelBtn: document.getElementById("confirmDeleteCancel"),
  confirmDeleteOkBtn: document.getElementById("confirmDeleteOk"),

  taskTemplate: document.getElementById("task-template"),
  darkToggle: document.getElementById("darkModeToggle"),
};

const state = {
  tasks: [],
  currentFilter: "all",
};

const ONE_DAY_MS = 24 * 60 * 60 * 1000; // reserved for future auto-purge logic

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(state.tasks));
}

function loadTasks() {
  try {
    const data = localStorage.getItem("tasks");
    if (data) state.tasks = JSON.parse(data);
  } catch (e) {
    console.error("Error loading tasks:", e);
    state.tasks = [];
  }
}

function showUserError(message) {
  if (els.modal && !els.modal.classList.contains("hidden")) {
    els.modalHint.textContent = message;
    els.modal.classList.add("highlight");
    return;
  }
  alert(message);
}



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

function updateStats() {
  if (!els.taskCount) return;

  els.taskCount.textContent = `${state.tasks.length} tareas`;
  const total = state.tasks.length;
  const completed = state.tasks.filter((t) => t.completed).length;
  const pending = total - completed;

  if (els.totalTasks) els.totalTasks.textContent = total;
  if (els.completedTasks) els.completedTasks.textContent = completed;
  if (els.pendingTasks) els.pendingTasks.textContent = pending;
}

function renderTasks() {
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

      if (
        els.confirmDeleteModal &&
        els.confirmDeleteText &&
        els.confirmDeleteCancelBtn &&
        els.confirmDeleteOkBtn
      ) {
        pendingDeleteId = task.id;
        els.confirmDeleteText.textContent =
          `¿Eliminar la tarea "${task.title}"${
            task.date ? ` (fecha: ${task.date})` : ""
          }?`;
        els.confirmDeleteModal.classList.remove("hidden");
        return;
      }

      const ok = window.confirm(
        `¿Eliminar la tarea "${task.title}"${
          task.date ? ` (fecha: ${task.date})` : ""
        }?`
      );
      if (!ok) return;

      state.tasks = state.tasks.filter((t) => t.id !== task.id);
      saveTasks();
      renderTasks();
    });

    fragment.appendChild(clone);
  }

  els.taskList.appendChild(fragment);
  updateStats();
}

let pendingDeleteId = null;

if (
  els.confirmDeleteCancelBtn &&
  els.confirmDeleteOkBtn &&
  els.confirmDeleteModal
) {
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

function setIcon(isDark) {
  if (!els.darkToggle) return;

  els.darkToggle.innerHTML = isDark
    ? '<i data-lucide="sun"></i>'
    : '<i data-lucide="moon"></i>';

  // Lucide may be blocked on some networks (mobile).
  if (
    window.lucide &&
    typeof window.lucide.createIcons === "function"
  ) {
    window.lucide.createIcons();
  }
}

// --- Event wiring (classic mode) ---
if (els.modal) {
  els.modal.addEventListener("animationend", () => {
    els.modal.classList.remove("highlight");
  });
}

document.querySelectorAll("[data-filter]").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll("[data-filter]")
      .forEach((b) => b.classList.remove("active-filter"));
    btn.classList.add("active-filter");

    state.currentFilter = btn.dataset.filter;
    renderTasks();
  });
});

if (els.openModalBtn && els.modal) {
  els.openModalBtn.addEventListener("click", (e) => {
    e.preventDefault();
    els.modal.classList.remove("hidden");
  });
}

if (els.closeModalBtn && els.modal && els.modalHint) {
  els.closeModalBtn.addEventListener("click", () => {
    els.modal.classList.add("hidden");
    els.modalHint.textContent = "";
  });
}

if (
  els.saveTaskBtn &&
  els.modal &&
  els.modalTitle &&
  els.modalCategory &&
  els.modalDate
) {
  els.saveTaskBtn.addEventListener("click", () => {
    const title = els.modalTitle.value.trim();
    if (!title) return;

    const created = createTask(title, els.modalCategory.value, els.modalDate.value);
    if (!created) return;

    els.modal.classList.add("hidden");
    els.modalTitle.value = "";
    els.modalDate.value = "";
    els.modalHint.textContent = "";
  });
}

if (els.taskForm && els.taskInput) {
  els.taskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = els.taskInput.value.trim();
    if (!title) return;

    const created = createTask(title);
    if (created) els.taskInput.value = "";
  });
}

if (els.darkToggle) {
  const savedMode = localStorage.getItem("darkMode");
  if (savedMode === "true") document.body.classList.add("dark-mode");

  setIcon(document.body.classList.contains("dark-mode"));

  els.darkToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    localStorage.setItem("darkMode", isDark);
    setIcon(isDark);
  });
}

// Initial load
loadTasks();
renderTasks();

