/**
 * Persist tasks to `localStorage`.
 * @returns {void}
 */
window.TaskFlow = window.TaskFlow || {};
window.TaskFlow.saveTasks = function saveTasks() {
  try {
    localStorage.setItem(
      "tasks",
      JSON.stringify(window.TaskFlow.state.tasks)
    );
  } catch (e) {
    // localStorage may be blocked on file:// or by tracking prevention.
    console.warn("TaskFlow: saveTasks failed (storage blocked).", e);
  }
};

/**
 * Load tasks from `localStorage`.
 * If parsing fails, it falls back to an empty array.
 * @returns {void}
 */
window.TaskFlow.loadTasks = function loadTasks() {
  try {
    const data = localStorage.getItem("tasks");
    if (data) {
      window.TaskFlow.state.tasks = JSON.parse(data);
    }
  } catch (e) {
    console.error("Error loading tasks:", e);
    window.TaskFlow.state.tasks = [];
  }
};

