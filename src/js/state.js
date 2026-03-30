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

/**
 * Mutable state used by the UI + task logic modules.
 * @type {{tasks: Task[], currentFilter: "all"|"completed"|"pending"}}
 */
export const state = {
  tasks: [],
  currentFilter: "all",
};

