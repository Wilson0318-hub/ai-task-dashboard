function TaskCard({
  task,
  moveTask,
  deleteTask,
  editTask
}) {
  const priorityLabel = {
    high: "高",
    medium: "中",
    low: "低"
  };

  const priorityClass = {
    high: "priority-high",
    medium: "priority-medium",
    low: "priority-low"
  };

  const taskPriority = task.priority || "medium";

  return (
    <div className="task-card">
      <p className="task-card-title">{task.text}</p>

      <div className="task-card-meta">
        <span className={`priority-badge ${priorityClass[taskPriority]}`}>
          <span className="priority-dot"></span>
          {priorityLabel[taskPriority]}
        </span>
      </div>

      {(task.startDate || task.endDate) && (
        <p className="task-date">
          日期：{task.startDate || "未設定"} ~ {task.endDate || "未設定"}
        </p>
      )}

      <div className="task-card-actions">
        {task.status !== "done" && (
          <button
            className="btn-primary"
            onClick={() => moveTask(task.id)}
          >
            →
          </button>
        )}

        <button
          className="btn-secondary"
          onClick={() => editTask(task.id)}
        >
          編輯
        </button>

        <button
          className="btn-danger"
          onClick={() => deleteTask(task.id)}
        >
          刪除
        </button>
      </div>
    </div>
  );
}

export default TaskCard;