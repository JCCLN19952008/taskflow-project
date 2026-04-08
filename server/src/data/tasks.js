const fs = require("fs");
const path = require("path");

const TASKS_FILE = path.join(__dirname, "../../tasks.json");

const tasks = {
  list: []
};

if (fs.existsSync(TASKS_FILE)) {
  const data = fs.readFileSync(TASKS_FILE, "utf-8");
  tasks.list = JSON.parse(data);
}

function saveTasks() {
  fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks.list, null, 2));
}

module.exports = { tasks, saveTasks };