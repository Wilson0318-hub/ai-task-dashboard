import { useState } from "react";

function Sidebar({
  recurringTasks,
  addRecurringTask,
  toggleRecurringTask,
  deleteRecurringTask
}) {

  const [recurringText, setRecurringText] = useState("");
  const [repeatType, setRepeatType] = useState("daily");

  const handleAddRecurringTask = () => {
    addRecurringTask(recurringText,repeatType);
    setRecurringText("");
    setRepeatType("daily");
  };

  const repeatLabel = {
    daily: "每天",
    weekly: "每週",
    monthly: "每月"
  };

return (
  <div className="sidebar">
    <h3 className="sidebar-title">重複任務</h3>

    <input
      className="recurring-input"
      type="text"
      placeholder="新增重複任務"
      value={recurringText}
      onChange={(e) => setRecurringText(e.target.value)}
    />

    <select
      className="recurring-select"
      value={repeatType}
      onChange={(e) => setRepeatType(e.target.value)}
    >
      <option value="daily">每天</option>
      <option value="weekly">每週</option>
      <option value="monthly">每月</option>
    </select>

    <button
      className="recurring-add-button"
      onClick={handleAddRecurringTask}
    >
      新增
    </button>

    <div className="recurring-list">
      {recurringTasks.map(task => (
        <div
          key={task.id}
          className={
            task.isDoneToday
              ? "recurring-item recurring-item-done"
              : "recurring-item"
          }
        >
          <div className="recurring-item-content">
            <label className="recurring-checkbox-label">
              <input
                type="checkbox"
                checked={task.isDoneToday}
                onChange={() => toggleRecurringTask(task.id)}
              />

              <span className="recurring-task-text">
                {task.text}
              </span>
            </label>

            <span className="recurring-type-badge">
              {repeatLabel[task.repeatType]}
            </span>
          </div>

          <button
            className="recurring-delete-button"
            onClick={() => deleteRecurringTask(task.id)}
          >
            刪除
          </button>
        </div>
      ))}
    </div>
  </div>
);
}
export default Sidebar;