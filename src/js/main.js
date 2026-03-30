import { els } from "./dom.js";
import { state } from "./state.js";
import { loadTasks } from "./storage.js";
import { createTask, renderTasks } from "./tasks.js";

/**
 * Application entry point.
 * Wires DOM events to task logic and initializes state from localStorage.
 */

// Keep modal highlight animation cleanup.
if (els.modal) {
  els.modal.addEventListener("animationend", () => {
    els.modal.classList.remove("highlight");
  });
}

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

if (els.saveTaskBtn && els.modal && els.modalTitle && els.modalCategory && els.modalDate && els.modalHint) {
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

// Formulario: quick add
if (els.taskForm && els.taskInput) {
  els.taskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = els.taskInput.value.trim();
    if (!title) return;

    const created = createTask(title);
    if (created) {
      els.taskInput.value = "";
    }
  });
}

function setIcon(isDark) {
  els.darkToggle.innerHTML = isDark
    ? '<i data-lucide="sun"></i>'
    : '<i data-lucide="moon"></i>';

  // Lucide is loaded from CDN and may be blocked on some mobile networks.
  // Guard to prevent breaking the whole app.
  if (window.lucide && typeof window.lucide.createIcons === "function") {
    window.lucide.createIcons();
  }
}

if (els.darkToggle) {
  els.darkToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    const isDark = document.body.classList.contains("dark-mode");
    localStorage.setItem("darkMode", isDark);
    setIcon(isDark);
  });
}

// Load saved mode
const savedMode = localStorage.getItem("darkMode");
if (savedMode === "true") {
  document.body.classList.add("dark-mode");
}

// Set correct icon on load
if (els.darkToggle) {
  setIcon(document.body.classList.contains("dark-mode"));
}

// Initial load
loadTasks();
if (els.taskList && els.taskTemplate) {
  renderTasks();
} else {
  console.warn("TaskFlow: missing task list/template elements.");
}

