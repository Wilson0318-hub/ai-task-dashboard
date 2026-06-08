import { useDroppable } from "@dnd-kit/core";

import TaskCard from "./TaskCard";

function KanbanColumn({
  id,
  title,
  tasks,
  moveTask,
  deleteTask,
  editTask 
}) {
  const { setNodeRef, isOver} = useDroppable({
    id
  });
  return (
    <div
     ref ={ setNodeRef}
     className={
      isOver
      ? "column column-over"
      : "column"
     }
    >
      
      <h3 className="column-title">{title}</h3>

      {tasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            moveTask={moveTask}
            deleteTask={deleteTask}
            editTask={editTask}
            />
        ))}
    </div>

  );
}

export default KanbanColumn;