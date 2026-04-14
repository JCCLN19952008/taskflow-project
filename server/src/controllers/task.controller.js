const Task = require("../models/task.model");

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "No se pudieron cargar las tareas" });
  }
};

const createTask = async (req, res) => {
  try {
    const task = req.body;
    if (!task || !task.title) {
      return res.status(400).json({ error: "La tarea no tiene título" });
    }
    const newTask = await Task.create(task);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: "No se pudo crear la tarea" });
  }
};

const updateTask = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const task = await Task.findOneAndUpdate(
      { id },
      { completed: req.body.completed },
      { new: true }
    );
    if (!task) return res.status(404).json({ error: "Tarea no encontrada" });
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "No se pudo actualizar la tarea" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const task = await Task.findOneAndDelete({ id });
    if (!task) return res.status(404).json({ error: "Tarea no encontrada" });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "No se pudo eliminar la tarea" });
  }
};

const deleteCompleted = async (req, res) => {
  try {
    await Task.deleteMany({ completed: true });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "No se pudieron eliminar las tareas" });
  }
};

module.exports = { getTasks, createTask, updateTask, deleteTask, deleteCompleted };