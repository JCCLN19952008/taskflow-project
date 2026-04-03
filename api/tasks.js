const express = require("express");
const serverless = require("serverless-http");

const app = express();
app.use(express.json());

let tasks = [];

// GET all tasks
app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

// POST new task
app.post("/api/tasks", (req, res) => {
  const task = req.body;
  tasks.push(task);
  res.json({ success: true });
});

// DELETE completed tasks
app.delete("/api/tasks", (req, res) => {
  tasks = tasks.filter(t => !t.completed);
  res.json({ success: true });
});

module.exports = serverless(app);