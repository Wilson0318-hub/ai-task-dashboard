function getAssistantSuggestion(tasks) {
  const todoTasks = tasks.filter(
    task => task.status === "todo"
  );

  const doingTasks = tasks.filter(
    task => task.status === "doing"
  );

  const doneTasks = tasks.filter(
    task => task.status === "done"
  );

  const highTask = todoTasks.find(
    task => task.priority === "high"
  );

  const mediumTask = todoTasks.find(
    task => task.priority === "medium"
  );

  const lowTask = todoTasks.find(
    task => task.priority === "low"
  );

  const suggestedTask =
    highTask || mediumTask || lowTask || null;

  if (!suggestedTask) {
    return {
      task: null,
      reason: "目前沒有待辦事項。",
      reminder: "可以休息一下，或整理你的看板。"
    };
  }

  const priorityText = {
    high: "高",
    medium: "中",
    low: "低"
  };

  let reminder = "目前任務狀況穩定。";

  if (todoTasks.length >= 5) {
    reminder = "待辦事項偏多，建議先整理優先順序。";
  } else if (doingTasks.length >= 3) {
    reminder = "進行中的任務較多，建議先完成手上的工作。";
  } else if (doneTasks.length >= 5) {
    reminder = "今天完成很多任務，做得不錯！";
  }

  return {
    task: suggestedTask,
    reason: `此任務為「${priorityText[suggestedTask.priority] || "中"}」優先級，建議優先處理。`,
    reminder: reminder
  };
}

export default getAssistantSuggestion;