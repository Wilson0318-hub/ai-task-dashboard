import TaskCard from "./TaskCard";

function KanbanColumn({
  title,
  tasks,
  moveTask,
  deleteTask,
  editTask }) {
  return (
    <div className="column">
      <h3 className="column-title">{title}</h3>
      {
        tasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            moveTask={moveTask}
            deleteTask={deleteTask}
            editTask={editTask}
            />
        ))
      }
    </div>
  );
}

export default KanbanColumn;