import { useEffect, useState } from "react";

import { getTasks } from "../api/taskApi";
import getWeekDays from "../utils/getWeekDays";
import getTaskGanttPosition from "../utils/getTaskGanttPosition";
import getTaskSummary from "../utils/getTaskSummary";

import TaskSummaryCards from "../components/analytics/TaskSummaryCards";
import WeeklyGanttChart from "../components/analytics/WeeklyGanttChart";
import RecurringProgressCards from "../components/analytics/RecurringProgressCards";

import LoadingState from "../components/common/LoadingState";
import ErrorMessage from "../components/common/ErrorMessage";

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

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const weekDays = getWeekDays(currentWeekBaseDate);
  
  const weekStart = weekDays[0];
  const weekEnd = weekDays[6];

  const loadAnalyticsData = async() => {
    try{
      setIsLoading(true);
      setErrorMessage("");

      const[
        taskData,
        recurringTaskData,
        completionsData
      ] = await Promise.all([
        getTasks(),
        getRecurringTasks(),
        getRecurringTaskCompletions()
      ]);

      setTasks(taskData);
      setRecurringTasks(recurringTaskData);
      setRecurringCompletions(completionsData);
    } catch (error) {
      console.error("Load analytics data error:", error);
      
      setErrorMessage(
        "Analytics 資料載入失敗，請確認後端伺服器是否正常啟動。"
      );
    }finally{
      setIsLoading(false);
    }
  }

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
    loadAnalyticsData();
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

    {isLoading ? (
      <LoadingState message="正在載入 Analytics 資料..." />
    ) : errorMessage ? (
      <ErrorMessage
        message={errorMessage}
        onRetry={loadAnalyticsData}
      />
    ) : (
      <>
        <TaskSummaryCards taskSummary={taskSummary} />

        <WeeklyGanttChart
          weekDays={weekDays}
          weekStart={weekStart}
          weekEnd={weekEnd}
          visibleGanttTasks={visibleGanttTasks}
          formatDate={formatDate}
          getWeekDayLabel={getWeekDayLabel}
        />

        <RecurringProgressCards
          recurringTasks={recurringTasks}
          recurringProgress={recurringProgress}
        />
      </>
    )}
  </div>
);
}


export default Analytics;