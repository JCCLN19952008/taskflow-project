import { state } from "./state.js";

// Persist tasks to localStorage.
export function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(state.tasks));
}

// Load tasks from localStorage (or start fresh if parsing fails).
export function loadTasks() {
  try {
    const data = localStorage.getItem("tasks");
    if (data) {
      state.tasks = JSON.parse(data);
    }
  } catch (e) {
    console.error("Error loading tasks:", e);
    state.tasks = [];
  }
}

