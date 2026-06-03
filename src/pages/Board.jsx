import Sidebar from "../components/Sidebar";
import KanbanBoard from "../components/KanbanBoard";
import TaskInput from "../components/TaskInput";
import { useState } from "react";
import "../styles/Board.css";
import useLocalStorage
from "../hooks/useLocalStorage";
import AIAssistantPanel from "../components/AIAssistantPanel";

function Board() {

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

  const addRecurringTask = (text) => {
    const newTask = {
      id: Date.now(),
      text: text,
      status: "todo"
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

    const newTask ={
      id: Date.now(),
      text: taskText,
      status: "todo"
    };

    setTasks([
      ...tasks,
      newTask
    ]);

    setTaskText("");


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
  }

  const editTask = (taskId) =>{
    const newText = prompt("請輸入新的任務");

    if(newText === null || newText.trim() === ""){
      return;
    }

    const updateTasks = tasks.map(task => {
      if(task.id !== taskId){
        return task;
      }

      return{
        ...task,
        text :newText
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
            addTask={addTask}
          />

          <AIAssistantPanel
            tasks={tasks}
          />
        </div>
        <KanbanBoard
          tasks = {tasks}
          moveTask={moveTask}
          deleteTask={deleteTask}
          editTask={editTask} />
      </div>
    </div>
  );
}

export default Board;