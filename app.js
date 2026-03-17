// Manipular elementos del DOM

const taskForm = document.getElementById("taskform")
const taskInput = document.getElementById("task-input")
const taskList = document.getElementById("tasks")

const totalTasks = document.getElementById("total-tasks")
const completedTasks = document.getElementById("completed-tasks")
const pendingTasks = document.getElementById("pending-tasks")

const modal = document.getElementById("taskModal");
const openModalBtn = document.getElementById("openModal");
const closeModalBtn = document.getElementById("closeModal");
const saveTaskBtn = document.getElementById("saveTask");

const modalTitle = document.getElementById("modalTaskTitle");
const modalCategory = document.getElementById("modalTaskCategory");
const modalDate = document.getElementById("modalTaskDate");

const taskTemplate = document.getElementById("task-template")

// Array para ir almacenando las  tareas

let tasks = []


// Crear tarea

function createTask(title, category = "personal", date = null) {

  const task = {
    id: Date.now(),
    title,
    category,
    date,
    completed: false,
    createdAt: new Date()
  }

  tasks.push(task);
  saveTasks();
  renderTasks();
}
//Con el fin de evitar que al refescar se pierdan las tareas loggeadas añadimos la funcion guardar
function saveTasks(){
localStorage.setItem("tasks", JSON.stringify(tasks));
}

//Con el fin de evitar que al rrefrescar se loadeen añadimos la funcion guardar
function saveTasks(){
const data=localStorage.getItem(tasks);
if(data){
tasks=JSON.parse(data);
}
}

loadTaks();
renderTasks();


// Renderizar las  tareas creadas
function renderTasks() {
  taskList.innerHTML = "";

  let filteredTasks = tasks;

  if (currentFilter === "completed") {
    filteredTasks = tasks.filter(t => t.completed);
  } else if (currentFilter === "pending") {
    filteredTasks = tasks.filter(t => !t.completed);
  }

  filteredTasks.forEach(task => {
    const clone = taskTemplate.content.cloneNode(true);

    const checkbox = clone.querySelector(".task-checkbox");
    const title = clone.querySelector(".task-title");
    const deleteBtn = clone.querySelector(".delete-task");

    title.textContent = task.title;
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

    deleteBtn.addEventListener("click", () => {
      tasks = tasks.filter(t => t.id !== task.id)
      renderTasks()
    })
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

    taskList.appendChild(clone)

  

let currentFilter = "all";
document.querySelectorAll("[data-filter]").forEach(btn => {
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter;
    renderTasks();
  });
});

  updateStats()
}


// Actualizar estadísticas

function updateStats() {

  const total = tasks.length
  const completed = tasks.filter(task => task.completed).length
  const pending = total - completed

  totalTasks.textContent = total
  completedTasks.textContent = completed
  pendingTasks.textContent = pending
}


// Formulario

taskForm.addEventListener("submit", function(e) {

  e.preventDefault()

  const title = taskInput.value.trim()

  if (title === "") return

  createTask(title)

  taskInput.value = ""

})