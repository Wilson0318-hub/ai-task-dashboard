import getTaskGanttPosition from "../../utils/getTaskGanttPosition";

function WeeklyGanttChart({
  weekDays,
  weekStart,
  weekEnd,
  visibleGanttTasks,
  formatDate,
  getWeekDayLabel
}) {
  return (
    <section className="schedule-section">
      <h2 className="section-title">
        本週任務甘特圖
      </h2>

      <p className="week-range">
        {formatDate(weekStart)} - {formatDate(weekEnd)}
      </p>

      <div className="gantt-chart">
        <div className="gantt-header">
          <div className="gantt-task-label">
            任務
          </div>

          {weekDays.map(date => (
            <div
              key={date.toISOString()}
              className="gantt-date-cell"
            >
              <span className="gantt-weekday">
                {getWeekDayLabel(date)}
              </span>

              <span className="gantt-date">
                {formatDate(date)}
              </span>
            </div>
          ))}
        </div>

        <div className="gantt-body">
          {visibleGanttTasks.length === 0 ? (
            <div className="gantt-empty-state">
              <p className="gantt-empty-title">
                本週目前沒有任務
              </p>

              <p className="gantt-empty-description">
                可以回到 Board 新增任務，並設定開始日期與截止日期。
              </p>
            </div>
          ) : (
            visibleGanttTasks.map(task => {
              const position = getTaskGanttPosition(task, weekDays);

              if (!position) {
                return null;
              }

              return (
                <div
                  key={task.id}
                  className="gantt-row"
                >
                  <div className="gantt-task-name">
                    <p>{task.text}</p>

                    <div className="gantt-task-meta">
                      <span>{task.priority}</span>
                      <span>{task.status}</span>
                    </div>
                  </div>

                  <div className="gantt-timeline">
                    <div
                      className={`gantt-bar gantt-bar-${task.priority}`}
                      style={{
                        gridColumn: `${position.startColumn} / ${position.endColumn}`
                      }}
                    >
                      {task.text}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}

export default WeeklyGanttChart;