import KanbanColumn from "./KanbanColumn";

function KanbanBoard({
  tasks,
  moveTask,
  deleteTask,
  editTask }) {
  const todoTasks =
    tasks.filter(
      task => task.status === "todo"
    );

  const doingTasks =
    tasks.filter(
     task => task.status === "doing"
    );

  const doneTasks =
    tasks.filter(
      task => task.status === "done"
    );
  return (
    <div>
      <h2 className="kanban-title">Kanban Board</h2>

      <div className="kanban-container">
        <KanbanColumn
          title={`待辦 (${todoTasks.length})`}
          tasks={todoTasks}
          moveTask={moveTask}
          deleteTask={deleteTask}
          editTask={editTask}
        />

        <KanbanColumn
          title={`進行中 (${doingTasks.length})`}
          tasks={doingTasks}
          moveTask={moveTask}
          deleteTask={deleteTask}
          editTask={editTask}
        />

        <KanbanColumn
          title={`已完成 (${doneTasks.length})`}
          tasks={doneTasks}
          moveTask={moveTask}
          deleteTask={deleteTask}
          editTask={editTask}
        />
      </div>
    </div>
  );
}

export default KanbanBoard;