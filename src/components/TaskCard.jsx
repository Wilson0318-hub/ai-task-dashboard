import { useDraggable } from "@dnd-kit/core";
import { useState } from "react";

import getTaskDateStatus from "../utils/getTaskDateStatus";

function TaskCard({
  task,
  moveTask,
  deleteTask,
  editTask,
  actionLoading
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform
  } = useDraggable({
    id: task.id,
    disabled: actionLoading
  });

  const dragStyle = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`
      }
    : undefined;

  const [isEditing, setIsEditing] = useState(false);

  const [editText, setEditText] = useState(task.text);
  const [editPriority, setEditPriority] = useState(
    task.priority || "medium"
  );
  const [editStartDate, setEditStartDate] = useState(
    task.startDate || ""
  );
  const [editEndDate, setEditEndDate] = useState(
    task.endDate || ""
  );

  const priorityLabel = {
    high: "高",
    medium: "中",
    low: "低"
  };

  const priorityClass = {
    high: "priority-high",
    medium: "priority-medium",
    low: "priority-low"
  };

  const taskPriority = task.priority || "medium";
  const dateStatus = getTaskDateStatus(task);

  const saveEdit = async () => {
    if (editText.trim() === "") {
      alert("任務名稱不能為空");
      return;
    }

    await editTask(task.id, {
      text: editText,
      priority: editPriority,
      startDate: editStartDate,
      endDate: editEndDate
    });

    setIsEditing(false);
  };

  const cancelEdit = () => {
    setEditText(task.text);
    setEditPriority(task.priority || "medium");
    setEditStartDate(task.startDate || "");
    setEditEndDate(task.endDate || "");
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="task-card">
        <input
          className="edit-input"
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          disabled={actionLoading}
        />

        <select
          className="edit-select"
          value={editPriority}
          onChange={(e) => setEditPriority(e.target.value)}
          disabled={actionLoading}
        >
          <option value="high">高</option>
          <option value="medium">中</option>
          <option value="low">低</option>
        </select>

        <input
          className="edit-date"
          type="date"
          value={editStartDate}
          onChange={(e) => setEditStartDate(e.target.value)}
          disabled={actionLoading}
        />

        <input
          className="edit-date"
          type="date"
          value={editEndDate}
          onChange={(e) => setEditEndDate(e.target.value)}
          disabled={actionLoading}
        />

        <div className="task-card-actions">
          <button
            className="btn-primary"
            onClick={saveEdit}
            disabled={actionLoading}
          >
            {actionLoading ? "儲存中..." : "儲存"}
          </button>

          <button
            className="btn-secondary"
            onClick={cancelEdit}
            disabled={actionLoading}
          >
            取消
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={dragStyle}
      className="task-card"
    >
      <div className="task-card-header">
        <p className="task-card-title">
          {task.text}
        </p>

        <div
          className={
            actionLoading
              ? "task-drag-handle task-drag-handle-disabled"
              : "task-drag-handle"
          }
          {...listeners}
          {...attributes}
        >
          ⠿
        </div>
      </div>

      <div className="task-card-meta">
        <span className={`priority-badge ${priorityClass[taskPriority]}`}>
          <span className="priority-dot"></span>
          {priorityLabel[taskPriority]}
        </span>
      </div>

      {(task.startDate || task.endDate) && (
        <p className="task-date">
          日期：{task.startDate || "未設定"} ~ {task.endDate || "未設定"}
        </p>
      )}

      {dateStatus && (
        <span className={`date-status ${dateStatus.className}`}>
          {dateStatus.label}
        </span>
      )}

      <div className="task-card-actions">
        {task.status !== "done" && (
          <button
            className="btn-primary"
            onClick={() => moveTask(task.id)}
            disabled={actionLoading}
          >
            →
          </button>
        )}

        <button
          className="btn-secondary"
          onClick={() => setIsEditing(true)}
          disabled={actionLoading}
        >
          編輯
        </button>

        <button
          className="btn-danger"
          onClick={() => deleteTask(task.id)}
          disabled={actionLoading}
        >
          刪除
        </button>
      </div>
    </div>
  );
}

export default TaskCard;