import Sidebar from "../components/Sidebar";
import KanbanBoard from "../components/KanbanBoard";
import TaskInput from "../components/TaskInput";
import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import AIAssistantPanel from "../components/AIAssistantPanel";

function Board() {

  const [priority, setPriority] = useState("medium");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

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

    setRecurringTasks(updatedTasks)
  }

  const [taskText, setTaskText] = useState ("");
  const [tasks, setTasks] = 
    useLocalStorage(
      "tasks",
      []
    );

  const addTask = () =>{

    if(taskText.trim() === ""){
      alert("請輸入內容");
      return;
    }

    const newTask = {
      id: Date.now(),
      text: taskText,
      status: "todo",
      priority,
      startDate,
      endDate
    };

    setTasks([
      ...tasks,
      newTask
    ]);

    setTaskText("");
    setPriority("medium");
    setStartDate("");
    setEndDate("");


  };

  const moveTask = (taskId) =>{
    
    const updateTasks = tasks.map(task =>{

      if(task.id !==taskId){
        return task;
      }

      if(task.status === "todo"){
        return{
          ...task,
          status: "doing"
        };
      }

      if(task.status === "doing"){
        return{
          ...task,
          status: "done"
        };
      }

      return task;

    });

    setTasks(updateTasks);
  };

  const deleteTask = (taskId) =>{
    const updateTasks = tasks.filter(
      task => task.id !== taskId
    );

    setTasks(updateTasks);
  };

  const editTask = (taskId, updateData) =>{
    const updateTasks = tasks.map(task => {
      if( task.id !== taskId){
        return task;
      }

      return{
        ...task,
        ...updateData
      };
    });

    setTasks(updateTasks);
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
        <KanbanBoard
          tasks={tasks}
          moveTask={moveTask}
          deleteTask={deleteTask}
          editTask={editTask} 
        />
      </div>
    </div>
  );
}

export default Board;