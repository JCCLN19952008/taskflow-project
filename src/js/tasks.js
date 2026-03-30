import { els } from "./dom.js";
import { state } from "./state.js";
import { saveTasks } from "./storage.js";

// Crear tarea (mantiene la misma lógica que tu `app.js` actual).
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

// Funcionalidad de estadisticas
export function updateStats() {
  els.taskCount.textContent = `${state.tasks.length} tareas`;

  const total = state.tasks.length;
  const completed = state.tasks.filter((t) => t.completed).length;
  const pending = total - completed;

  els.totalTasks.textContent = total;
  els.completedTasks.textContent = completed;
  els.pendingTasks.textContent = pending;
}

// Renderizar las tareas creadas
export function renderTasks() {
  els.taskList.innerHTML = "";

  // 1. START from real state
  let filtered = [...state.tasks];

  // 2. APPLY filter FIRST
  if (state.currentFilter === "completed") {
    filtered = filtered.filter((t) => t.completed);
  } else if (state.currentFilter === "pending") {
    filtered = filtered.filter((t) => !t.completed);
  }

  // 3. HANDLE EMPTY STATE AFTER filtering
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

  // 4. RENDER CLEANLY
  filtered.forEach((task) => {
    const clone = els.taskTemplate.content.cloneNode(true);

    const checkbox = clone.querySelector(".task-checkbox");
    const title = clone.querySelector(".task-title");
    const meta = clone.querySelector(".task-meta");
    const deleteBtn = clone.querySelector(".delete-task");

    title.textContent = task.title;

    let metaText = task.category;
    if (task.date) {
      metaText += ` - ${task.date}`;
    }
    meta.textContent = metaText;

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

    els.taskList.appendChild(clone);
  });

  updateStats();
}

