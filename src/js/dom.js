/**
 * Centralized DOM references so the rest of the code doesn't repeat selectors.
 * Keys are kept stable to avoid breaking the logic modules.
 */
window.TaskFlow = window.TaskFlow || {};
window.TaskFlow.els = {
  taskForm: document.getElementById("taskform"),
  taskInput: document.getElementById("task-input"),
  taskList: document.getElementById("tasks"),

  totalTasks: document.getElementById("total-tasks"),
  completedTasks: document.getElementById("completed-tasks"),
  pendingTasks: document.getElementById("pending-tasks"),
  taskCount: document.getElementById("task-count"),

  modal: document.getElementById("taskModal"),
  openModalBtn: document.getElementById("openModal"),
  closeModalBtn: document.getElementById("closeModal"),
  saveTaskBtn: document.getElementById("saveTask"),
  modalHint: document.getElementById("modalHint"),
  modalTitle: document.getElementById("modalTaskTitle"),
  modalCategory: document.getElementById("modalTaskCategory"),
  modalDate: document.getElementById("modalTaskDate"),

  confirmDeleteModal: document.getElementById("confirmDeleteModal"),
  confirmDeleteText: document.getElementById("confirmDeleteText"),
  confirmDeleteCancelBtn: document.getElementById("confirmDeleteCancel"),
  confirmDeleteOkBtn: document.getElementById("confirmDeleteOk"),

  taskTemplate: document.getElementById("task-template"),
  darkToggle: document.getElementById("darkModeToggle"),
};

