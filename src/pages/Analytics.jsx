import { useEffect, useState } from "react";

import { getTasks } from "../api/taskApi";
import getWeekDays from "../utils/getWeekDays";
import getTaskGanttPosition from "../utils/getTaskGanttPosition";

function Analytics() {
  const [tasks, setTasks] = useState([]);
  const [currentWeekBaseDate, setCurrentWeekBaseDate] = useState(new Date());

  const weekDays = getWeekDays(currentWeekBaseDate);
  
  const weekStart = weekDays[0];
  const weekEnd = weekDays[6];

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error("Fetch analytics tasks error:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const formatDate = (date) => {
    return date.toLocaleDateString("zh-TW", {
      month: "2-digit",
      day: "2-digit"
    });
  };

  const getWeekDayLabel = (date) => {
    return date.toLocaleDateString("zh-TW", {
      weekday: "short"
    });
  };

  const goToPreviousWeek = () => {
    const previousWeek = new Date(currentWeekBaseDate);
    previousWeek.setDate(previousWeek.getDate() - 7);
    setCurrentWeekBaseDate(previousWeek);
  };

  const goToNextWeek = () => {
    const nextWeek = new Date(currentWeekBaseDate);
    nextWeek.setDate(nextWeek.getDate() + 7);
    setCurrentWeekBaseDate(nextWeek);
  };

  const goToCurrentWeek = () => {
    setCurrentWeekBaseDate(new Date());
  };

  return (
    <div className="analytics-page">
      <div className="analytics-header">
        <div>
          <h1 className="analytics-title">
            Analytics Dashboard
          </h1>

          <p className="analytics-subtitle">
            根據任務開始日期與截止日期，整理本週任務日程。
          </p>
        </div>

        <div className="week-controls">
          <button
            className="week-button"
            onClick={goToPreviousWeek}
          >
            上一週
          </button>

          <button
            className="week-button"
            onClick={goToCurrentWeek}
          >
            本週
          </button>

          <button
            className="week-button"
            onClick={goToNextWeek}
          >
            下一週
          </button>
        </div>
      </div>

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
            {tasks.length === 0 ? (
                <p className="empty-schedule-text">
                目前沒有任務
                </p>
            ) : (
                tasks.map(task => {
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
    </div>
  );
}

export default Analytics;