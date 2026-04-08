const express = require("express");
const router = express.Router();
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  deleteCompleted
} = require("../controllers/task.controller");

router.get("/", getTasks);
router.post("/", createTask);
router.patch("/:id", updateTask);
router.delete("/", deleteCompleted);   // ← bulk delete FIRST
router.delete("/:id", deleteTask);

module.exports = router;