const { tasks, saveTasks } = require("../data/tasks")

const getTasks = (req, res) => {
  try {
    res.json(tasks.list);
  } catch (error) {
    res.status(500).json({ error: "No se pudieron cargar las tareas" });
  }
};

const createTask = (req, res) => {
  try {
    const task = req.body;
    if (!task || !task.title) {
      return res.status(400).json({ error: "La tarea no tiene título" });
    }
    tasks.list.push(task);
    saveTasks();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: "No se pudo crear la tarea" });
  }
};

const updateTask = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const task = tasks.list.find(t => t.id === id);
    if (!task) return res.status(404).json({ error: "Tarea no encontrada" });
    task.completed = req.body.completed;
    saveTasks();
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "No se pudo actualizar la tarea" });
  }
};

const deleteTask = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const exists = tasks.list.find(t => t.id === id);
    if (!exists) return res.status(404).json({ error: "Tarea no encontrada" });
    tasks.list = tasks.list.filter(t => t.id !== id);
    saveTasks();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "No se pudo eliminar la tarea" });
  }
};

const deleteCompleted = (req, res) => {
  try {
    tasks.list = tasks.list.filter(t => !t.completed);
    saveTasks();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "No se pudieron eliminar las tareas" });
  }
};

module.exports = { getTasks, createTask, updateTask, deleteTask, deleteCompleted }