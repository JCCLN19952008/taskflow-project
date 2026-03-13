// Manipular elementos del DOM

const taskForm = document.getElementById("taskform")
const taskInput = document.getElementById("task-input")
const taskList = document.getElementById("tasklist")

const totalTasks = document.getElementById("total-tasks")
const completedTasks = document.getElementById("completed-tasks")
const pendingTasks = document.getElementById("pending-tasks")

const taskTemplate = document.getElementById("task-template")

// Array para ir almacenando las  tareas

let tasks = []


// Crear tarea

function createTask(title) {

  const task = {
    id: Date.now(),
    title: title,
    completed: false,
    createdAt: new Date()
  }

  tasks.push(task)

  renderTasks()
}


// Renderizar las  tareas creadas

function renderTasks() {

  taskList.innerHTML = ""

  tasks.forEach(task => {

    const clone = taskTemplate.content.cloneNode(true)

    const checkbox = clone.querySelector(".task-checkbox")
    const title = clone.querySelector(".task-title")
    const deleteBtn = clone.querySelector(".delete-task")

    title.textContent = task.title
    checkbox.checked = task.completed

    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked
      updateStats()
    })

    deleteBtn.addEventListener("click", () => {
      tasks = tasks.filter(t => t.id !== task.id)
      renderTasks()
    })

    taskList.appendChild(clone)

  })

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