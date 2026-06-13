const API_BASE_URL = "http://127.0.0.1:8000";


export async function getRecurringTasks() {
  const response = await fetch(`${API_BASE_URL}/recurring-tasks`);

  if (!response.ok) {
    throw new Error("Failed to fetch recurring tasks");
  }

  return response.json();
}


export async function createRecurringTask(recurringTask) {
  const response = await fetch(`${API_BASE_URL}/recurring-tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
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
      method: "PUT"
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
      method: "DELETE"
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
    `${API_BASE_URL}/recurring-tasks/completions/all`
  );

  if(!response.ok){
    const errorText = await response.text();
    console.error("Fetch recurring completions failed:", errorText);
    throw new Error("Failed to fetch recurring task completions");
  }

  return response.json()
}