import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import KanbanBoard from "../components/KanbanBoard";
import TaskInput from "../components/TaskInput";
import FilterBar from "../components/FilterBar";
import AIAssistantPanel from "../components/AIAssistantPanel";

import LoadingState from "../components/common/LoadingState";
import ErrorMessage from "../components/common/ErrorMessage";

import getFilteredTasks from "../utils/getFilteredTasks";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTaskApi
} from "../api/taskApi";

import {
  getRecurringTasks,
  createRecurringTask,
  toggleRecurringTaskApi,
  deleteRecurringTaskApi
} from "../api/recurringTaskApi";

function Board() {
  const [priority, setPriority] = useState("medium");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [priorityFilter, setPriorityFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [sortType, setSortType] = useState("default");

  const [taskText, setTaskText] = useState("");
  const [tasks, setTasks] = useState([]);
  const [recurringTasks, setRecurringTasks] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [actionLoading, setActionLoading] = useState(false);

  const runBoardAction = async ({
    action,
    errorLog,
    errorAlert
  }) => {
    if (actionLoading) {
      return;
    }

    try {
      setActionLoading(true);

      await action();
    } catch (error) {
      console.error(errorLog, error);
      alert(errorAlert);
    } finally {
      setActionLoading(false);
    }
  };

  const loadBoardData = async () => {
    try {
      setIsLoading(true);
      setErrorMessage("");

      const [
        tasksData,
        recurringTasksData
      ] = await Promise.all([
        getTasks(),
        getRecurringTasks()
      ]);

      setTasks(tasksData);
      setRecurringTasks(recurringTasksData);
    } catch (error) {
      console.error("Load board data error:", error);

      setErrorMessage(
        "Board 資料載入失敗，請確認後端伺服器是否正常啟動。"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTasks = async () => {
    try {
      const data = await getTasks();

      setTasks(data);
    } catch (error) {
      console.error("Fetch tasks error:", error);
    }
  };

  const fetchRecurringTasks = async () => {
    try {
      const data = await getRecurringTasks();

      setRecurringTasks(data);
    } catch (error) {
      console.error("Fetch recurring tasks error:", error);
    }
  };

  useEffect(() => {
    loadBoardData();
  }, []);

  const filteredTasks = getFilteredTasks(
    tasks,
    priorityFilter,
    dateFilter,
    sortType
  );

  const addRecurringTask = async (text, repeatType) => {
    if (text.trim() === "") {
      alert("請輸入重複任務內容");
      return;
    }

    const newRecurringTask = {
      text,
      repeatType,
      isDoneToday: 0
    };

    await runBoardAction({
      action: async () => {
        await createRecurringTask(newRecurringTask);
        await fetchRecurringTasks();
      },
      errorLog: "Create recurring task error:",
      errorAlert: "新增重複任務失敗"
    });
  };

  const toggleRecurringTask = async (taskId) => {
    await runBoardAction({
      action: async () => {
        await toggleRecurringTaskApi(taskId);
        await fetchRecurringTasks();
      },
      errorLog: "Toggle recurring task error:",
      errorAlert: "更新重複任務狀態失敗"
    });
  };

  const deleteRecurringTask = async (taskId) => {
    const isConfirmed = window.confirm(
      "確定要刪除這個重複任務嗎？刪除後相關完成紀錄也會被移除。"
    );

    if (!isConfirmed) {
      return;
    }

    await runBoardAction({
      action: async () => {
        await deleteRecurringTaskApi(taskId);
        await fetchRecurringTasks();
      },
      errorLog: "Delete recurring task error:",
      errorAlert: "刪除重複任務失敗"
    });
  };

  const addTask = async () => {
    if (taskText.trim() === "") {
      alert("請輸入內容");
      return;
    }

    const newTask = {
      text: taskText,
      status: "todo",
      priority,
      startDate,
      endDate
    };

    await runBoardAction({
      action: async () => {
        await createTask(newTask);
        await fetchTasks();

        setTaskText("");
        setPriority("medium");
        setStartDate("");
        setEndDate("");
      },
      errorLog: "Create task error:",
      errorAlert: "新增任務失敗"
    });
  };

  const moveTask = async (taskId) => {
    const oldTask = tasks.find(task => {
      return task.id === taskId;
    });

    if (!oldTask) {
      return;
    }

    let newStatus = oldTask.status;

    if (oldTask.status === "todo") {
      newStatus = "doing";
    }

    if (oldTask.status === "doing") {
      newStatus = "done";
    }

    if (oldTask.status === "done") {
      return;
    }

    const updatedTask = {
      ...oldTask,
      status: newStatus
    };

    await runBoardAction({
      action: async () => {
        await updateTask(taskId, updatedTask);
        await fetchTasks();
      },
      errorLog: "Move task error:",
      errorAlert: "移動任務失敗"
    });
  };

  const deleteTask = async (taskId) => {
    const isConfirmed = window.confirm(
      "確定要刪除這個任務嗎？"
    );

    if (!isConfirmed) {
      return;
    }

    await runBoardAction({
      action: async () => {
        await deleteTaskApi(taskId);
        await fetchTasks();
      },
      errorLog: "Delete task error:",
      errorAlert: "刪除任務失敗"
    });
  };

  const editTask = async (taskId, updateData) => {
    const oldTask = tasks.find(task => {
      return task.id === taskId;
    });

    if (!oldTask) {
      return;
    }

    const updatedTask = {
      ...oldTask,
      ...updateData
    };

    await runBoardAction({
      action: async () => {
        await updateTask(taskId, updatedTask);
        await fetchTasks();
      },
      errorLog: "Edit task error:",
      errorAlert: "編輯任務失敗"
    });
  };

  const updateTaskStatus = async (taskId, newStatus) => {
    const oldTask = tasks.find(task => {
      return task.id === taskId;
    });

    if (!oldTask) {
      return;
    }

    const updatedTask = {
      ...oldTask,
      status: newStatus
    };

    await runBoardAction({
      action: async () => {
        await updateTask(taskId, updatedTask);
        await fetchTasks();
      },
      errorLog: "Update task status error:",
      errorAlert: "更新任務狀態失敗"
    });
  };

  return (
    <div className="board-page">
      {isLoading ? (
        <LoadingState message="正在載入 Board 資料..." />
      ) : errorMessage ? (
        <ErrorMessage
          message={errorMessage}
          onRetry={loadBoardData}
        />
      ) : (
        <div className="board-layout">
          <Sidebar
            recurringTasks={recurringTasks}
            addRecurringTask={addRecurringTask}
            toggleRecurringTask={toggleRecurringTask}
            deleteRecurringTask={deleteRecurringTask}
            actionLoading={actionLoading}
          />

          <div className="main-content">
            <div className="top-section">
              <TaskInput
                taskText={taskText}
                setTaskText={setTaskText}
                priority={priority}
                setPriority={setPriority}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                addTask={addTask}
                actionLoading={actionLoading}
              />

              <AIAssistantPanel
                tasks={tasks}
              />
            </div>

            <FilterBar
              priorityFilter={priorityFilter}
              setPriorityFilter={setPriorityFilter}
              dateFilter={dateFilter}
              setDateFilter={setDateFilter}
              sortType={sortType}
              setSortType={setSortType}
            />

            <KanbanBoard
              tasks={filteredTasks}
              moveTask={moveTask}
              updateTaskStatus={updateTaskStatus}
              deleteTask={deleteTask}
              editTask={editTask}
              actionLoading={actionLoading}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Board;