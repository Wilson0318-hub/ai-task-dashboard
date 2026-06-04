import getAssistantSuggestion from "../utils/getAssistantSuggestion";

function AIAssistantPanel({ tasks }) {
  const suggestion = getAssistantSuggestion(tasks);

  const todoTasks = tasks.filter(
    task => task.status === "todo"
  );

  const doingTasks = tasks.filter(
    task => task.status === "doing"
  );

  const doneTasks = tasks.filter(
    task => task.status === "done"
  );

  return (
    <div className="ai-panel">
      <h3>AI Assistant</h3>

      <div className="ai-stats">
        <p>待辦：{todoTasks.length}</p>
        <p>進行中：{doingTasks.length}</p>
        <p>已完成：{doneTasks.length}</p>
      </div>

      <div className="ai-section">
        <h4>建議先完成</h4>

        <p>
            {suggestion.task
            ? suggestion.task.text
            : "目前沒有待辦事項"}
        </p>

        <p>{suggestion.reason}</p>
        </div>

        <div className="ai-section">
        <h4>今日提醒</h4>
        <p>{suggestion.reminder}</p>
      </div>
    </div>
  );
}

export default AIAssistantPanel;