const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  id: Number,
  title: { type: String, required: true },
  category: { type: String, default: "personal" },
  date: { type: String, default: null },
  completed: { type: Boolean, default: false }
});

module.exports = mongoose.model("Task", taskSchema);