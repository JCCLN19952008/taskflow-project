const express = require("express");
const path = require("path");
const cors = require("cors");
const { PORT } = require("./config/env");
const taskRoutes = require("./routes/task.routes");
const connectDB = require("./config/database");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../../client")));
connectDB();


app.use("/api/v1/tasks", taskRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  
  if (err.message === "NOT_FOUND") {
    return res.status(404).json({ error: "Recurso no encontrado" });
  }

  res.status(500).json({ error: "Error interno del servidor" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});