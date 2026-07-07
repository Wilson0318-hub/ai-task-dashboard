import { getToken } from "../utils/authStorage";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


function getAuthHeaders() {
  const token = getToken();

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  };
}


function getAuthorizationHeader() {
  const token = getToken();

  return {
    Authorization: `Bearer ${token}`
  };
}


export async function getRecurringTasks() {
  const response = await fetch(`${API_BASE_URL}/recurring-tasks`, {
    headers: getAuthorizationHeader()
  });

  if (!response.ok) {
    throw new Error("Failed to fetch recurring tasks");
  }

  return response.json();
}


export async function createRecurringTask(recurringTask) {
  const response = await fetch(`${API_BASE_URL}/recurring-tasks`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(recurringTask)
  });

  if (!response.ok) {
    const errorText = await response.text();

    console.error("Create recurring task failed:", errorText);

    throw new Error("Failed to create recurring task");
  }

  return response.json();
}


export async function toggleRecurringTaskApi(recurringTaskId) {
  const response = await fetch(
    `${API_BASE_URL}/recurring-tasks/${recurringTaskId}/toggle`,
    {
      method: "PUT",
      headers: getAuthorizationHeader()
    }
  );

  if (!response.ok) {
    const errorText = await response.text();

    console.error("Toggle recurring task failed:", errorText);

    throw new Error("Failed to toggle recurring task");
  }

  return response.json();
}


export async function deleteRecurringTaskApi(recurringTaskId) {
  const response = await fetch(
    `${API_BASE_URL}/recurring-tasks/${recurringTaskId}`,
    {
      method: "DELETE",
      headers: getAuthorizationHeader()
    }
  );

  if (!response.ok) {
    const errorText = await response.text();

    console.error("Delete recurring task failed:", errorText);

    throw new Error("Failed to delete recurring task");
  }

  return response.json();
}


export async function getRecurringTaskCompletions() {
  const response = await fetch(
    `${API_BASE_URL}/recurring-tasks/completions/all`,
    {
      headers: getAuthorizationHeader()
    }
  );

  if (!response.ok) {
    const errorText = await response.text();

    console.error("Fetch recurring completions failed:", errorText);

    throw new Error("Failed to fetch recurring task completions");
  }

  return response.json();
}