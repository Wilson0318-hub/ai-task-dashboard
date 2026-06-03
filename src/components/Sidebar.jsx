function Sidebar({
  recurringTasks,
  addRecurringTask
}) {
  return (
    <div className="sidebar">
      <h3 className="sidebar-title">重複任務</h3>

      {recurringTasks.map(task =>(
        <button className="recurring-button"
          key={task.id}
          onClick={() => addRecurringTask(task.text)} 
          >
            {task.text}
          </button>
      ))}
    </div>
  );
}

export default Sidebar;