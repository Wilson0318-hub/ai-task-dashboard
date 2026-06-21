import { useEffect, useState } from "react";

import { getTasks } from "../api/taskApi";
import getWeekDays from "../utils/getWeekDays";
import getTaskGanttPosition from "../utils/getTaskGanttPosition";
import getTaskSummary from "../utils/getTaskSummary";

import {
  getRecurringTasks,
  getRecurringTaskCompletions
} from "../api/recurringTaskApi";

import getRecurringProgress from "../utils/getRecurringProgress";
function Analytics() {
  const [tasks, setTasks] = useState([]);
  const [recurringTasks, setRecurringTasks] = useState([]);
  const [recurringCompletions, setRecurringCompletions] = useState([]);
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

  const fetchRecurringData = async () => {
    try{
      const recurringTasksData = await getRecurringTasks();
      const completionsData = await getRecurringTaskCompletions();

      setRecurringTasks(recurringTasksData);
      setRecurringCompletions(completionsData);
    }catch (error){
      console.error("Fetch recurring analytics data error:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchRecurringData();
  }, []);

  const recurringProgress = getRecurringProgress(
    recurringTasks,
    recurringCompletions
  );

  const taskSummary = getTaskSummary(tasks);

  const visibleGanttTasks = tasks.filter(task => {
    return getTaskGanttPosition(task, weekDays) !== null;
  })


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
                <p className="empty-schedule-title">
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
                

        <section className="recurring-progress-section">
          <div className="section-header-row">
            <div>
              <h2 className="section-title">
                重複任務進度
              </h2>

              <p className="section-description">
                根據 daily、weekly、monthly 任務類型計算完成率。
              </p>
            </div>

            <div className="repeat-type-summary">
              <span>Daily：{recurringProgress.dailyCount}</span>
              <span>Weekly：{recurringProgress.weeklyCount}</span>
              <span>Monthly：{recurringProgress.monthlyCount}</span>
            </div>
          </div>

          {recurringTasks.length === 0 ? (
            <div className="recurring-empty-state">
              <p className="gantt-empty-title">
                尚未建立重複任務
              </p>

              <p className="gantt-empty-description">
                可以到 Board 左側新增每日、每週或每月重複任務。
              </p>
            </div>
          ) : (
            <div className="progress-card-grid">
              <div className="progress-card">
                <p className="progress-label">
                  今日完成率
                </p>

                <h3 className="progress-value">
                  {recurringProgress.todayRate}%
                </h3>

                <p className="progress-detail">
                  {recurringProgress.todayCompletedCount} / {recurringProgress.todayTargetCount}
                </p>

                <div className="progress-bar">
                  <div
                    className="progress-bar-fill"
                    style={{
                      width: `${recurringProgress.todayRate}%`
                    }}
                  />
                </div>
              </div>

              <div className="progress-card">
                <p className="progress-label">
                  本週完成率
                </p>

                <h3 className="progress-value">
                  {recurringProgress.weekRate}%
                </h3>

                <p className="progress-detail">
                  {recurringProgress.weekCompletedCount} / {recurringProgress.weekTargetCount}
                </p>

                <div className="progress-bar">
                  <div
                    className="progress-bar-fill"
                    style={{
                      width: `${recurringProgress.weekRate}%`
                    }}
                  />
                </div>
              </div>

              <div className="progress-card">
                <p className="progress-label">
                  本月完成率
                </p>

                <h3 className="progress-value">
                  {recurringProgress.monthRate}%
                </h3>

                <p className="progress-detail">
                  {recurringProgress.monthCompletedCount} / {recurringProgress.monthTargetCount}
                </p>

                <div className="progress-bar">
                  <div
                    className="progress-bar-fill"
                    style={{
                      width: `${recurringProgress.monthRate}%`
                    }}
                  />
                </div>
              </div>
    </div>
  )}
</section>
    </div>
  );
}


export default Analytics;