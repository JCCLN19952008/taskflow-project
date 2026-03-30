import { state } from "./state.js";

/**
 * Persist tasks to `localStorage`.
 * @returns {void}
 */
export function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(state.tasks));
}

/**
 * Load tasks from `localStorage`.
 * If parsing fails, it falls back to an empty array.
 * @returns {void}
 */
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

