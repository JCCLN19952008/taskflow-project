import { els } from "./dom.js";
import { state } from "./state.js";
import { loadTasks } from "./storage.js";
import { createTask, renderTasks } from "./tasks.js";

// Keep modal highlight animation cleanup.
els.modal.addEventListener("animationend", () => {
  els.modal.classList.remove("highlight");
});

// Filtro de tareas
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

// Aplicacion de la clase Modal
els.openModalBtn.addEventListener("click", (e) => {
  e.preventDefault();
  els.modal.classList.remove("hidden");
});

els.closeModalBtn.addEventListener("click", () => {
  els.modal.classList.add("hidden");
  els.modalHint.textContent = "";
});

els.saveTaskBtn.addEventListener("click", () => {
  const title = els.modalTitle.value.trim();
  if (!title) return;

  createTask(title, els.modalCategory.value, els.modalDate.value);

  els.modal.classList.add("hidden");
  els.modalTitle.value = "";
  els.modalDate.value = "";
  els.modalHint.textContent = "";
});

// Formulario: quick add
els.taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = els.taskInput.value.trim();
  if (!title) return;

  createTask(title);
  els.taskInput.value = "";
});

function setIcon(isDark) {
  els.darkToggle.innerHTML = isDark
    ? '<i data-lucide="sun"></i>'
    : '<i data-lucide="moon"></i>';

  lucide.createIcons();
}

els.darkToggle.addEventListener("click", () => {
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

// Initial load
loadTasks();
renderTasks();

