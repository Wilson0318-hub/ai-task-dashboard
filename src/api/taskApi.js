import { getToken } from "../utils/authStorage";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


function getAuthHeaders() {
  const token = getToken();

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  };
}


export async function getTasks() {
  const token = getToken();

  const response = await fetch(`${API_BASE_URL}/tasks`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }

  return response.json();
}


export async function createTask(task) {
  const response = await fetch(`${API_BASE_URL}/tasks`, {
    method: "POST",
    headers: getAuthHeaders(),
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
    headers: getAuthHeaders(),
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
  const token = getToken();

  const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const errorText = await response.text();

    console.error("Delete task failed status:", response.status);
    console.error("Delete task failed body:", errorText);

    throw new Error("Failed to delete task");
  }

  return response.json();
}