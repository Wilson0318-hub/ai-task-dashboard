import Sidebar from "../components/Sidebar";
import KanbanBoard from "../components/KanbanBoard";
import TaskInput from "../components/TaskInput";
import { useState } from "react";
import "../styles/Board.css";
import useLocalStorage from "../hooks/useLocalStorage";
import AIAssistantPanel from "../components/AIAssistantPanel";

function Board() {

  const [priority, setPriority] = useState("medium");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [recurringTasks] = useState([
  {
    id: 1,
    text: "每天健身"
  },
  {
    id: 2,
    text: "每週專題會議"
  },
  {
    id: 3,
    text: "每月繳房租"
  }
  ]);

  const getTodayDate = () =>{
      const today = new Date();

      const year = today.getFullYear();
      
      const month = String(today.getMonth() + 1).padStart(2, "0");

      const day = String(today.getDate()).padStart(2, "0");

      return `${year}-${month}-${day}`;
  };

  const addRecurringTask = (text) => {

    const today = getTodayDate();
    
    const newTask = {
      id: Date.now(),
      text: text,
      status: "todo",
      priority: "medium",
      startDate: today,
      endDate: ""
    };

    setTasks([
      ...tasks,
      newTask
    ]);
  };

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