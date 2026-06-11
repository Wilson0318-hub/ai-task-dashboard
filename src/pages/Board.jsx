import Sidebar from "../components/Sidebar";
import KanbanBoard from "../components/KanbanBoard";
import TaskInput from "../components/TaskInput";
import FilterBar from "../components/FilterBar";
import getFilteredTasks from "../utils/getFilteredTasks";
import { useEffect, useState } from "react";
import { 
  getTasks,
  createTask,
  updateTask,
  deleteTaskApi
} from "../api/taskApi";
import useLocalStorage from "../hooks/useLocalStorage";
import AIAssistantPanel from "../components/AIAssistantPanel";

function Board() {

  const [priority, setPriority] = useState("medium");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [priorityFilter, setPriorityFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [sortType, setSortType] = useState("default");

  const [taskText, setTaskText] = useState ("");
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async() => {
    try{
      const data = await getTasks();
      setTasks(data);
    }catch(error){
      console.error("Fetch tasks error:", error);
    }
  }

  useEffect(() =>{
    fetchTasks();
  },[]);

  const filteredTasks = getFilteredTasks(
    tasks,
    priorityFilter,
    dateFilter,
    sortType
    );
  
  const [recurringTasks, setRecurringTasks] =
    useLocalStorage(
      "recurringTasks",
      []
    );

  const getTodayDate = () =>{
      const today = new Date();

      const year = today.getFullYear();
      
      const month = String(today.getMonth() + 1).padStart(2, "0");

      const day = String(today.getDate()).padStart(2, "0");

      return `${year}-${month}-${day}`;
  };

  const addRecurringTask = (text, repeatType) => {
    if(text.trim()===""){
      alert("請輸入重複任務內容");
      return;
    }

    const newRecurringTask = {
      id:Date.now(),
      text,
      repeatType,
      isDoneToday:false,
      completedDates: []
    };

    setRecurringTasks([
      ...recurringTasks,
      newRecurringTask
    ]);
  };

  const toggleRecurringTask = (taskId) =>{
    const today =getTodayDate();

    const updatedTasks = recurringTasks.map(task =>{
      if(task.id !== taskId){
        return task;
      }

      const alreadyDone = task.completedDates.includes(today);

      return {
        ... task,
        isDoneToday: !alreadyDone,
        completedDates :alreadyDone
        ? task.completedDates.filter(date => date !== today)
        : [...task.completedDates, today]
      };
    });

    setRecurringTasks(updatedTasks);
  }

  const deleteRecurringTask = (taskId) => {
    const updatedTasks =recurringTasks.filter(
      task => task.id !== taskId
    );

    setRecurringTasks(updatedTasks);
  }

  const addTask = async () =>{

    if(taskText.trim() === ""){
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

    try{

      console.log("newTask:", newTask);
      await createTask(newTask);
      await fetchTasks();

      setTaskText("");
      setPriority("medium");
      setStartDate("");
      setEndDate("");
    }catch(error){
      console.error("Create task error:", error);
      alert("新增任務失敗");
    }
  };

  const moveTask = async (taskId) =>{
    
    const oldTask = tasks.find(task=> task.id === taskId);

    if (!oldTask){
      return;
    }

    let newStatus = oldTask.status;

    if (oldTask.status === "todo"){
      newStatus ="doing";
    }

    if(oldTask.status ==="doing"){
      newStatus ="done";
    }

    if(oldTask.status ==="done"){
      return;
    }

    const updatedTask = {
      ...oldTask,
      status: newStatus
    };

    try{
      await updateTask(taskId, updatedTask);
      await fetchTasks();
    } catch(error){
      console.error("Move task error:", error);
      alert("移動任務失敗");
    }
  };

  const deleteTask = async (taskId) =>{
    try{
      await deleteTaskApi(taskId);
      await fetchTasks();
    }catch(error){
      console.error("Delete task error:" , error);
      alert("刪除任務失敗");
    }
  };

  const editTask = async (taskId, updateData) =>{
    const oldTask = tasks.find(task => task.id ===taskId);

    if(!oldTask){
      return;
    }

    const updatedTask ={
      ...oldTask,
      ...updateData
    };

    try{
      await updateTask(taskId,updatedTask);
      await fetchTasks();
    } catch(error){
      console.error("Edit task error:", error);
      alert("編輯任務失敗");
    }
  };

  const updateTaskStatus = async (taskId, newStatus) => {
    const oldTask = tasks.find(task => task.id ===taskId);

    if(!oldTask){
      return;
    }

    const updatedTask = {
      ...oldTask,
      status: newStatus
    };

    try{
      await updateTask(taskId, updatedTask);
      await fetchTasks();
    }catch(error){
      console.error("update task status error:", error);
      alert("更新任務狀態失敗");
    }
  };
  return (
    <div className="board-layout">
      <Sidebar 
        recurringTasks={recurringTasks}
        addRecurringTask={addRecurringTask}
        toggleRecurringTask={toggleRecurringTask}
        deleteRecurringTask={deleteRecurringTask}
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
          updateTaskStatus ={updateTaskStatus}
          deleteTask={deleteTask}
          editTask={editTask} 
        />
      </div>
    </div>
  );
}

export default Board;