function TaskSummaryCards({ taskSummary }) {
  return (
    <section className="summary-section">
      <div className="summary-card-grid">
        <div className="summary-card">
          <p className="summary-label">
            總任務
          </p>

          <h3 className="summary-value">
            {taskSummary.totalTasks}
          </h3>
        </div>

        <div className="summary-card">
          <p className="summary-label">
            待辦
          </p>

          <h3 className="summary-value">
            {taskSummary.todoCount}
          </h3>
        </div>

        <div className="summary-card">
          <p className="summary-label">
            進行中
          </p>

          <h3 className="summary-value">
            {taskSummary.doingCount}
          </h3>
        </div>

        <div className="summary-card">
          <p className="summary-label">
            已完成
          </p>

          <h3 className="summary-value">
            {taskSummary.doneCount}
          </h3>
        </div>

        <div className="summary-card summary-card-warning">
          <p className="summary-label">
            逾期
          </p>

          <h3 className="summary-value">
            {taskSummary.overdueCount}
          </h3>
        </div>

        <div className="summary-card summary-card-danger">
          <p className="summary-label">
            高優先級
          </p>

          <h3 className="summary-value">
            {taskSummary.highPriorityCount}
          </h3>
        </div>
      </div>
    </section>
  );
}

export default TaskSummaryCards;