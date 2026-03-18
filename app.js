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
  const data = localStorage.getItem("tasks");
  if (data) {
    tasks = JSON.parse(data);
  }
}

// Crear tarea
function createTask(title, category = "personal", date = null) {
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
  
  let filtered = tasks;

  if (currentFilter === "completed") {
    filtered = tasks.filter(t => t.completed);
  } else if (currentFilter === "pending") {
    filtered = tasks.filter(t => !t.completed);
  }

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
      updateStats();
    });

    deleteBtn.addEventListener("click", () => {
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
});

saveTaskBtn.addEventListener("click", () => {
  const title = modalTitle.value.trim();
  if (!title) return;

  createTask(title, modalCategory.value, modalDate.value);

  modal.classList.add("hidden");
  modalTitle.value = "";
  modalDate.value = "";
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

loadTasks();
renderTasks();   