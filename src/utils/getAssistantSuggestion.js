import getTaskDateStatus from "./getTaskDateStatus";

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

  const overdueTask = todoTasks.find(task => {
    const status = getTaskDateStatus(task);
    return status && status.label === "已逾期";
  });

  const todayTask = todoTasks.find(task => {
    const status = getTaskDateStatus(task);
    return status && status.label === "今天截止";
  });

  const soonTask = todoTasks.find(task => {
    const status = getTaskDateStatus(task);
    return status && status.className === "date-warning";
  });

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
    overdueTask ||
    todayTask ||
    soonTask ||
    highTask ||
    mediumTask ||
    lowTask ||
    null;

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

  const dateStatus = getTaskDateStatus(suggestedTask);

  let reason = `此任務為「${priorityText[suggestedTask.priority] || "中"}」優先級，建議優先處理。`;

  if (dateStatus) {
    if (dateStatus.label === "已逾期") {
      reason = "此任務已逾期，建議立即處理。";
    } else if (dateStatus.label === "今天截止") {
      reason = "此任務今天截止，建議優先完成。";
    } else if (dateStatus.className === "date-warning") {
      reason = `此任務${dateStatus.label}，建議提前處理。`;
    }
  }

  let reminder = "目前任務狀況穩定。";

  const overdueCount = todoTasks.filter(task => {
    const status = getTaskDateStatus(task);
    return status && status.label === "已逾期";
  }).length;

  const todayCount = todoTasks.filter(task => {
    const status = getTaskDateStatus(task);
    return status && status.label === "今天截止";
  }).length;

  const soonCount = todoTasks.filter(task => {
    const status = getTaskDateStatus(task);
    return status && status.className === "date-warning";
  }).length;

  if (overdueCount > 0) {
    reminder = `你有 ${overdueCount} 個任務已逾期，建議立即檢查。`;
  } else if (todayCount > 0) {
    reminder = `你有 ${todayCount} 個任務今天截止，建議今天完成。`;
  } else if (soonCount > 0) {
    reminder = `你有 ${soonCount} 個任務即將截止，建議提前安排時間。`;
  } else if (todoTasks.length >= 5) {
    reminder = "待辦事項偏多，建議先整理優先順序。";
  } else if (doingTasks.length >= 3) {
    reminder = "進行中的任務較多，建議先完成手上的工作。";
  } else if (doneTasks.length >= 5) {
    reminder = "今天完成很多任務，做得不錯！";
  }

  return {
    task: suggestedTask,
    reason,
    reminder
  };
}

export default getAssistantSuggestion;