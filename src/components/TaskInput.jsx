function TaskInput({
  taskText,
  setTaskText,
  priority,
  setPriority,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  addTask,
  actionLoading
}) {
  return (
    <div className="task-input-card">
      <h3>新增任務</h3>

      <input
        className="task-input"
        type="text"
        placeholder="請輸入任務名稱"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        disabled={actionLoading}
      />

      <div className="task-setting-row">
        <label>
          優先級
          <select
            className="task-select"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            disabled={actionLoading}
          >
            <option value="high">高</option>
            <option value="medium">中</option>
            <option value="low">低</option>
          </select>
        </label>

        <label>
          開始日期
          <input
            className="task-time"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            disabled={actionLoading}
          />
        </label>

        <label>
          結束日期
          <input
            className="task-time"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            disabled={actionLoading}
          />
        </label>
      </div>

      <button
        className="btn-primary"
        onClick={addTask}
        disabled={actionLoading}
      >
        {actionLoading ? "新增中..." : "新增任務"}
      </button>
    </div>
  );
}

export default TaskInput;