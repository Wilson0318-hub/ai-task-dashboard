const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


export async function getTasks() {
  const response = await fetch(`${API_BASE_URL}/tasks`);

  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }

  return response.json();
}


export async function createTask(task) {
  const response = await fetch(`${API_BASE_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(task)
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Create task failed status:", response.status);
    console.error("Create task failed body:", errorText);
    throw new Error("Failed to create task");
  }

  return response.json();
}


export async function updateTask(taskId, task) {
  const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(task)
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Update task failed status:", response.status);
    console.error("Update task failed body:", errorText);
    throw new Error("Failed to update task");
  }

  return response.json();
}


export async function deleteTaskApi(taskId) {
  const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Delete task failed status:", response.status);
    console.error("Delete task failed body:", errorText);
    throw new Error("Failed to delete task");
  }

  return response.json();
}