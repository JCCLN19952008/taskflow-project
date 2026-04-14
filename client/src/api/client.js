const BASE_URL = "/api/v1/tasks";

export async function fetchTasks() {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("No se pudieron cargar las tareas");
  return res.json();
}

export async function postTask(task) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task)
  });
  if (!res.ok) throw new Error("No se pudo crear la tarea");
  return res.json();
}

export async function patchTask(id, data) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("No se pudo actualizar la tarea");
  return res.json();
}

export async function deleteTask(id) {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("No se pudo eliminar la tarea");
}

export async function deleteCompletedTasks() {
  const res = await fetch(BASE_URL, { method: "DELETE" });
  if (!res.ok) throw new Error("No se pudieron eliminar las tareas");
}