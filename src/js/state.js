/**
 * Shared application state for TaskFlow Planner.
 *
 * @typedef {Object} Task
 * @property {number} id
 * @property {string} title
 * @property {string} category
 * @property {string|null} date
 * @property {boolean} completed
 */

// Ensure the namespace exists, even if scripts are loaded in different orders.
window.TaskFlow = window.TaskFlow || {};

/**
 * Mutable state used by the UI + task logic modules.
 * @type {{tasks: Task[], currentFilter: "all"|"completed"|"pending"}}
 */
window.TaskFlow.state = window.TaskFlow.state || {
  tasks: [],
  currentFilter: "all",
};

