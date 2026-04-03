const express = require("express");
const app = express();

app.use(express.json());

// serve static files (your frontend)
app.use(express.static(".")); // current folder

let tasks = [];

app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/api/tasks", (req, res) => {
  const task = req.body;

  tasks.push(task);

  res.json(task);
});

app.delete("/api/tasks", (req, res) => {
  tasks = tasks.filter(t => !t.completed);
  res.json({ success: true });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});