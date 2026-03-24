// Manipular elementos del DOM

const taskForm = document.getElementById("taskform");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("tasks");

const totalTasks = document.getElementById("total-tasks");
const completedTasks = document.getElementById("completed-tasks");
const pendingTasks = document.getElementById("pending-tasks");

const modal = document.getElementById("taskModal");
const openModalBtn = document.getElementById("openModal");
const closeModalBtn = document.getElementById("closeModal");
const saveTaskBtn = document.getElementById("saveTask");
modal.addEventListener("animationend", () => {
  modal.classList.remove("highlight");
});

const modalTitle = document.getElementById("modalTaskTitle");
const modalCategory = document.getElementById("modalTaskCategory");
const modalDate = document.getElementById("modalTaskDate");

const taskTemplate = document.getElementById("task-template");

let tasks = [];
let currentFilter = "all"

//Almacenar la tarea
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  try {
    const data = localStorage.getItem("tasks");
    if (data) {
      tasks = JSON.parse(data);
    }
  } catch (e) {
    console.error("Error loading tasks:", e);
    tasks = [];
  }
}

// Crear tarea
function createTask(title, category = "personal", date = null) {

  const exists = tasks.some(t =>
    t.title.toLowerCase() === title.toLowerCase() &&
    (!t.date || t.date === date)
  );

  // 🔴 If duplicate WITHOUT date → open modal instead
  if (exists && !date) {
     document.getElementById("modalHint").textContent =
    "Esta tarea ya existe. Selecciona una fecha diferente.";
    modal.classList.remove("hidden");

  modal.classList.add("highlight");

    // Pre-fill modal
    modalTitle.value = title;
    modalCategory.value = category;

    return;
  }

  const task = {
    id: Date.now(),
    title,
    category,
    date,
    completed: false
  };

  tasks.push(task);
  saveTasks();
  renderTasks();
}

// Renderizar las  tareas creadas

function renderTasks() {
  taskList.innerHTML = "";

  // 1. START from real state
  let filtered = [...tasks];

  // 2. APPLY filter FIRST
  if (currentFilter === "completed") {
    filtered = filtered.filter(t => t.completed);
  } else if (currentFilter === "pending") {
    filtered = filtered.filter(t => !t.completed);
  }

  // 3. HANDLE EMPTY STATE AFTER filtering
  if (filtered.length === 0) {
    taskList.innerHTML = `
      <div class="empty-state">
        <p>No tienes tareas aún</p>
        <small>Añade una nueva tarea para comenzar</small>
      </div>
    `;
    updateStats();
    return;
  }

  // 4. RENDER CLEANLY
  filtered.forEach(task => {
    const clone = taskTemplate.content.cloneNode(true);

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

  tasks = tasks.filter(t => t.id !== task.id);
  saveTasks();
  renderTasks();
});

    taskList.appendChild(clone);
  });

  updateStats();
}

//-Filtro de tareas
document.querySelectorAll("[data-filter]").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll("[data-filter]").forEach(b => b.classList.remove("active-filter"));
    btn.classList.add("active-filter");

    currentFilter = btn.dataset.filter;
    renderTasks();
  });
});

//Aplicacion de la clase Modal

openModalBtn.addEventListener("click", (e) => {
  e.preventDefault();
  modal.classList.remove("hidden");
});

closeModalBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
  document.getElementById("modalHint").textContent = "";
});

saveTaskBtn.addEventListener("click", () => {
  const title = modalTitle.value.trim();
  if (!title) return;

  createTask(title, modalCategory.value, modalDate.value);

  modal.classList.add("hidden");

  modalTitle.value = "";
  modalDate.value = "";
  document.getElementById("modalHint").textContent = ""; 
});


//Funcionalidad de estadisticas
function updateStats() {
  document.getElementById("task-count").textContent = `${tasks.length} tareas`;
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;

  totalTasks.textContent = total;
  completedTasks.textContent = completed;
  pendingTasks.textContent = pending;
}


//Formulario

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = taskInput.value.trim();
  if (!title) return;

  createTask(title);
  taskInput.value = "";
});


const darkToggle = document.getElementById("darkModeToggle");

darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  const isDark = document.body.classList.contains("dark-mode");
  localStorage.setItem("darkMode", isDark);

  darkToggle.textContent = isDark ? "☀️" : "🌙";
});

// Load saved mode
const savedMode = localStorage.getItem("darkMode");

if (savedMode === "true") {
  document.body.classList.add("dark-mode");
}

// Set correct icon on load
darkToggle.textContent =
  document.body.classList.contains("dark-mode") ? "☀️" : "🌙";

loadTasks();
renderTasks();   