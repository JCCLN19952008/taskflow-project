const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const { PORT } = require("./config/env");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../../client")));

const TASKS_FILE = path.join(__dirname, "../tasks.json");

function loadTasks() {
  if (fs.existsSync(TASKS_FILE)) {
    const data = fs.readFileSync(TASKS_FILE, "utf-8");
    return JSON.parse(data);
  }
  return [];
}

function saveTasks() {
  fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
}

let tasks = loadTasks();

app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/api/tasks", (req, res) => {
  const task = req.body;
  tasks.push(task);
  saveTasks();
  res.json(task);
});

app.patch("/api/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);
  if (!task) return res.status(404).json({ error: "Task not found" });
  task.completed = req.body.completed;
  saveTasks();
  res.json(task);
});

app.delete("/api/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  res.json({ success: true });
});

app.delete("/api/tasks", (req, res) => {
  tasks = tasks.filter(t => !t.completed);
  saveTasks();
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});