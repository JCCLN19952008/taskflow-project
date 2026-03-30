/**
 * UI wiring and initialization (classic script, no ESM).
 * Loaded after `src/js/tasks_classic.js` via `index.html`.
 */

window.TaskFlow = window.TaskFlow || {};

window.TaskFlow.init = function init() {
  const els = window.TaskFlow.els;
  const state = window.TaskFlow.state;
  const loadTasks = window.TaskFlow.loadTasks;
  const createTask = window.TaskFlow.createTask;
  const renderTasks = window.TaskFlow.renderTasks;

  if (
    !els ||
    !state ||
    typeof loadTasks !== "function" ||
    typeof createTask !== "function" ||
    typeof renderTasks !== "function"
  ) {
    console.warn("TaskFlow: init() missing required pieces.");
    return;
  }

  // Keep modal highlight animation cleanup.
  if (els.modal) {
    els.modal.addEventListener("animationend", () => {
      els.modal.classList.remove("highlight");
    });
  }

  // Filter buttons
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

  // Modal open/close
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

  // Save task in modal
  if (
    els.saveTaskBtn &&
    els.modal &&
    els.modalTitle &&
    els.modalCategory &&
    els.modalDate &&
    els.modalHint
  ) {
    els.saveTaskBtn.addEventListener("click", () => {
      const title = els.modalTitle.value.trim();
      if (!title) return;

      const created = createTask(
        title,
        els.modalCategory.value,
        els.modalDate.value
      );
      if (!created) return;

      els.modal.classList.add("hidden");
      els.modalTitle.value = "";
      els.modalDate.value = "";
      els.modalHint.textContent = "";
    });
  }

  // Quick add form submit
  if (els.taskForm && els.taskInput) {
    els.taskForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const title = els.taskInput.value.trim();
      if (!title) return;

      const created = createTask(title);
      if (created) els.taskInput.value = "";
    });
  }

  // Dark mode toggle
  function setIcon(isDark) {
    if (!els.darkToggle) return;

    els.darkToggle.innerHTML = isDark
      ? '<i data-lucide="sun"></i>'
      : '<i data-lucide="moon"></i>';

    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  }

  if (els.darkToggle) {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === "true") document.body.classList.add("dark-mode");

    setIcon(document.body.classList.contains("dark-mode"));

    els.darkToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const isDark = document.body.classList.contains("dark-mode");
      localStorage.setItem("darkMode", isDark);
      setIcon(isDark);
    });
  }

  // Initial load
  loadTasks();
  renderTasks();
};

/**
 * UI wiring and initialization (classic script, no ESM).
 * Loaded after `src/js/tasks_classic.js` via `index.html`.
 */

window.TaskFlow = window.TaskFlow || {};

window.TaskFlow.init = function init() {
  const els = window.TaskFlow.els;
  const state = window.TaskFlow.state;
  const loadTasks = window.TaskFlow.loadTasks;
  const createTask = window.TaskFlow.createTask;
  const renderTasks = window.TaskFlow.renderTasks;

  if (!els || !state || typeof loadTasks !== "function" || typeof createTask !== "function" || typeof renderTasks !== "function") {
    console.warn("TaskFlow: init() missing required pieces.");
    return;
  }

  // Keep modal highlight animation cleanup.
  if (els.modal) {
    els.modal.addEventListener("animationend", () => {
      els.modal.classList.remove("highlight");
    });
  }

  // Filter buttons
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

  // Modal open/close
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

  // Save task in modal
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

  // Quick add form submit
  if (els.taskForm && els.taskInput) {
    els.taskForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const title = els.taskInput.value.trim();
      if (!title) return;

      const created = createTask(title);
      if (created) els.taskInput.value = "";
    });
  }

  function setIcon(isDark) {
    if (!els.darkToggle) return;

    els.darkToggle.innerHTML = isDark
      ? '<i data-lucide="sun"></i>'
      : '<i data-lucide="moon"></i>';

    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  }

  // Dark mode toggle
  if (els.darkToggle) {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === "true") document.body.classList.add("dark-mode");

    setIcon(document.body.classList.contains("dark-mode"));

    els.darkToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const isDark = document.body.classList.contains("dark-mode");
      localStorage.setItem("darkMode", isDark);
      setIcon(isDark);
    });
  }

  // Initial load
  loadTasks();
  renderTasks();
};

/**
 * UI wiring and initialization (classic script, no ESM).
 *
 * This file should only define `window.TaskFlow.init`.
 * `index.html` loads `src/js/*` then loads `app.js` which calls `TaskFlow.init()`.
 */

window.TaskFlow = window.TaskFlow || {};

window.TaskFlow.init = function init() {
  const els = window.TaskFlow.els;
  const state = window.TaskFlow.state;

  const loadTasks = window.TaskFlow.loadTasks;
  const createTask = window.TaskFlow.createTask;
  const renderTasks = window.TaskFlow.renderTasks;

  // Defensive: if something is missing, avoid throwing and freezing the UI.
  if (!els || !state || typeof loadTasks !== "function" || typeof createTask !== "function" || typeof renderTasks !== "function") {
    console.warn("TaskFlow: init() missing required pieces.");
    return;
  }

  // Keep modal highlight animation cleanup.
  if (els.modal) {
    els.modal.addEventListener("animationend", () => {
      els.modal.classList.remove("highlight");
    });
  }

  // Filter buttons
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

  // Modal open/close
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

  // Save task in modal
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

  // Quick add form submit
  if (els.taskForm && els.taskInput) {
    els.taskForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const title = els.taskInput.value.trim();
      if (!title) return;

      const created = createTask(title);
      if (created) els.taskInput.value = "";
    });
  }

  function setIcon(isDark) {
    if (!els.darkToggle) return;

    els.darkToggle.innerHTML = isDark
      ? '<i data-lucide="sun"></i>'
      : '<i data-lucide="moon"></i>';

    // Lucide can be blocked on some mobile networks.
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  }

  if (els.darkToggle) {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === "true") document.body.classList.add("dark-mode");

    setIcon(document.body.classList.contains("dark-mode"));

    els.darkToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const isDark = document.body.classList.contains("dark-mode");
      localStorage.setItem("darkMode", isDark);
      setIcon(isDark);
    });
  }

  // Initial load
  loadTasks();
  renderTasks();
};

/**
 * UI wiring and initialization.
 *
 * This is a classic script (no ESM) so it works with `file://`.
 */

window.TaskFlow = window.TaskFlow || {};

window.TaskFlow.init = function init() {
  const els = window.TaskFlow.els;
  const state = window.TaskFlow.state;
  const loadTasks = window.TaskFlow.loadTasks;
  const createTask = window.TaskFlow.createTask;
  const renderTasks = window.TaskFlow.renderTasks;

  // Defensive: if something is missing, avoid throwing and freezing the UI.
  if (!els || !state || !loadTasks || !createTask || !renderTasks) {
    console.warn("TaskFlow: init() missing required pieces.");
    return;
  }

  // Keep modal highlight animation cleanup.
  if (els.modal) {
    els.modal.addEventListener("animationend", () => {
      els.modal.classList.remove("highlight");
    });
  }

  // Filter buttons
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

  // Modal open/close
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

  // Save task in modal
  if (
    els.saveTaskBtn &&
    els.modal &&
    els.modalTitle &&
    els.modalCategory &&
    els.modalDate &&
    els.modalHint
  ) {
    els.saveTaskBtn.addEventListener("click", () => {
      const title = els.modalTitle.value.trim();
      if (!title) return;

      const created = createTask(
        title,
        els.modalCategory.value,
        els.modalDate.value
      );
      if (!created) return;

      els.modal.classList.add("hidden");
      els.modalTitle.value = "";
      els.modalDate.value = "";
      els.modalHint.textContent = "";
    });
  }

  // Quick add form submit
  if (els.taskForm && els.taskInput) {
    els.taskForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const title = els.taskInput.value.trim();
      if (!title) return;

      const created = createTask(title);
      if (created) els.taskInput.value = "";
    });
  }

  function setIcon(isDark) {
    if (!els.darkToggle) return;

    els.darkToggle.innerHTML = isDark
      ? '<i data-lucide="sun"></i>'
      : '<i data-lucide="moon"></i>';

    // Lucide can be blocked on some networks (mobile).
    if (
      window.lucide &&
      typeof window.lucide.createIcons === "function"
    ) {
      window.lucide.createIcons();
    }
  }

  if (els.darkToggle) {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === "true") document.body.classList.add("dark-mode");

    setIcon(document.body.classList.contains("dark-mode"));

    els.darkToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const isDark = document.body.classList.contains("dark-mode");
      localStorage.setItem("darkMode", isDark);
      setIcon(isDark);
    });
  }

  // Initial load
  loadTasks();
  renderTasks();
};

