// Manipular elementos del DOM

const taskForm = document.getElementById("taskform");
const taskInput = document.getElementById("task-input");
const taskCategorySelect = document.getElementById("task-category");
const taskList = document.getElementById("tasks");
const searchInput = document.getElementById("searchInput");
let searchQuery = "";

const totalTasks = document.getElementById("total-tasks");
const completedTasks = document.getElementById("completed-tasks");
const pendingTasks = document.getElementById("pending-tasks");
const selectAllCheckbox = document.getElementById("selectAll");
const deleteSelectedBtn = document.getElementById("deleteSelectedBtn")

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
let currentFilter = "all";
let currentCategory = "all";



async function loadTasks() {
  try {
    const res = await fetch("/api/tasks");
    tasks = await res.json();

    tasks = tasks.filter(t => t && t.title);
    
    renderTasks();
    updateStats();
  } catch (error) {
    console.error("Error loading tasks:", error);
    tasks = [];
  }
}

// Crear tarea
async function createTask(title, category = "personal", date = null) {

  const exists = tasks.some(t =>
  t && t.title && 
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

  await saveTaskToBackend(task);
}

async function saveTaskToBackend(task) {
  try {
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(task)
    });

    const newTask = await res.json();

    tasks.push(newTask);
    renderTasks();
    updateStats();

  } catch (error) {
    console.error("Error saving task:", error);
  }
}

// Renderizar las  tareas creadas

function renderTasks() {
  taskList.innerHTML = "";

  // 1. START from real state
  let filtered = [...tasks];

  if (searchQuery) {
  filtered = filtered.filter(t =>
    t.title.toLowerCase().includes(searchQuery)
  );
}

  // 2. APPLY filter FIRST
  if (currentFilter === "completed") {
    filtered = filtered.filter(t => t.completed);
  } else if (currentFilter === "pending") {
    filtered = filtered.filter(t => !t.completed);
  }

  if (currentCategory !== "all") {
  filtered = filtered.filter(t => t.category === currentCategory);
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
    checkbox.checked = task.completed;

    let metaText = task.category;
    if (task.date) {
      metaText += ` - ${task.date}`;
    }
    meta.innerHTML = `
  <span class="category ${task.category}">
    ${task.category}
  </span>
  ${task.date ? ` - ${task.date}` : ""}
`;

checkbox.addEventListener("change", async () => {
  task.completed = checkbox.checked;

  renderTasks();

  await fetch(`/api/tasks/${task.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed: task.completed })
  });
    });


  deleteBtn.addEventListener("click", async () => {
  const confirmDelete = confirm("¿Quieres eliminar esta tarea?");
  if (!confirmDelete) return;

  await fetch(`/api/tasks/${task.id}`, { method: "DELETE" });

  tasks = tasks.filter(t => t.id !== task.id);
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
document.querySelectorAll("[data-category]").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll("[data-category]").forEach(b =>
      b.classList.remove("active-filter")
    );

    btn.classList.add("active-filter");

    currentCategory = btn.dataset.category;
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

taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = taskInput.value.trim();
  const category = taskCategorySelect.value;

  if (!title) return;

  await createTask(title, category);

  taskInput.value = "";
});

searchInput.addEventListener("input", (e) => {
  searchQuery = e.target.value.toLowerCase();
  renderTasks();
});

selectAllCheckbox.addEventListener("change", async () => {
  const isChecked = selectAllCheckbox.checked;

  let visibleTasks = [...tasks];

  if (searchQuery) {
    visibleTasks = visibleTasks.filter(t =>
      t.title.toLowerCase().includes(searchQuery)
    );
  }
  if (currentFilter === "completed") {
    visibleTasks = visibleTasks.filter(t => t.completed);
  } else if (currentFilter === "pending") {
    visibleTasks = visibleTasks.filter(t => !t.completed);
  }
  if (currentCategory !== "all") {
    visibleTasks = visibleTasks.filter(t => t.category === currentCategory);
  }

  // Update locally
  visibleTasks.forEach(task => {
    task.completed = isChecked;
  });

  // Sync each change to backend
  await Promise.all(visibleTasks.map(task =>
    fetch(`/api/tasks/${task.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: task.completed })
    })
  ));

  renderTasks();
});

deleteSelectedBtn.addEventListener("click", async () => {
  const selectedTasks = tasks.filter(t => t.completed);

  if (selectedTasks.length === 0) {
    alert("No hay tareas seleccionadas.");
    return;
  }

  const confirmDelete = confirm("¿Eliminar tareas seleccionadas?");
  if (!confirmDelete) return;

  await fetch("/api/tasks", { method: "DELETE" });

  tasks = tasks.filter(t => !t.completed);
  renderTasks();
});


const darkToggle = document.getElementById("darkModeToggle");

function setIcon(isDark) {
  darkToggle.innerHTML = isDark
    ? '<i data-lucide="sun"></i>'
    : '<i data-lucide="moon"></i>';

  lucide.createIcons();
}

darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  const isDark = document.body.classList.contains("dark-mode");
  localStorage.setItem("darkMode", isDark);

  setIcon(isDark);
});

// Load saved mode
const savedMode = localStorage.getItem("darkMode");

if (savedMode === "true") {
  document.body.classList.add("dark-mode");
}

// Set correct icon on load
setIcon(document.body.classList.contains("dark-mode"));

(async () => {
  await loadTasks();
})();   