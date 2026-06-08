import {
  DndContext,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";

import KanbanColumn from "./KanbanColumn";

function KanbanBoard({
  tasks,
  moveTask,
  updateTaskStatus,
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

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8
      }
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 5
      }
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if(!over){
      return;
    }

    const taskId = active.id;
    const newStatus = over.id

    if(
      newStatus !== "todo" &&
      newStatus !== "doing" &&
      newStatus !== "done"
    ){
      return;
    }

    updateTaskStatus(taskId, newStatus);
  }
  return (
    <div>
      <h2 className="kanban-title">Kanban Board</h2>

      <DndContext 
        sensors={sensors}
        onDragEnd={handleDragEnd}>
        <div className="kanban-container">
          <KanbanColumn
            id="todo"
            title={`待辦 (${todoTasks.length})`}
            tasks={todoTasks}
            moveTask={moveTask}
            deleteTask={deleteTask}
            editTask={editTask}
          />

          <KanbanColumn
            id="doing"
            title={`進行中 (${doingTasks.length})`}
            tasks={doingTasks}
            moveTask={moveTask}
            deleteTask={deleteTask}
            editTask={editTask}
          />

          <KanbanColumn
            id="done"
            title={`已完成 (${doneTasks.length})`}
            tasks={doneTasks}
            moveTask={moveTask}
            deleteTask={deleteTask}
            editTask={editTask}
          />
        </div>
      </DndContext>
    </div>
  );
}

export default KanbanBoard;