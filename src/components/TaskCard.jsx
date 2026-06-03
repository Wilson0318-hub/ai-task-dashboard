function TaskCard({
  task,
  moveTask,
  deleteTask,
  editTask
}) {
  return (
    <div className="task-card">
      <p className="task-card-title">{task.text}</p>

      {
        task.status !== "done" && (
          <button className="btn-primary" onClick={() =>moveTask(task.id)}>
            →
          </button>
      )}

      <button
        className="btn-secondary"
        onClick={() => editTask(task.id)}
      >
        編輯
      </button>

      <button className="btn-danger" onClick={()=> deleteTask(task.id)}>
        刪除
      </button>

    </div>
  );
}

export default TaskCard;