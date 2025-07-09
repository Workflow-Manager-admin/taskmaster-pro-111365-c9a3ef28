import React from "react";

/**
 * PUBLIC_INTERFACE
 * Card showing task information with actions.
 */
function TaskCard({ task, onEdit, onDelete, onToggleComplete }) {
  return (
    <div className={`task-card ${task.completed ? "task-card-complete" : ""}`}>
      <div className="task-card-header">
        <span className={`priority-label pri-${task.priority}`}>{task.priority}</span>
        <span className="task-title">{task.title}</span>
      </div>
      <div className="task-card-body">
        <div className="task-desc">{task.description}</div>
        <div className="task-meta">
          {task.dueDate && <span className="due-date">Due: {task.dueDate}</span>}
          <span className="status">{task.completed ? "✓ Complete" : "Incomplete"}</span>
        </div>
      </div>
      <div className="task-card-actions">
        <button className="task-btn task-edit" onClick={() => onEdit(task)}>
          Edit
        </button>
        <button className="task-btn task-delete" onClick={() => onDelete(task)}>
          Delete
        </button>
        <button
          className="task-btn task-toggle"
          onClick={() => onToggleComplete(task)}
        >
          {task.completed ? "Mark Incomplete" : "Mark Complete"}
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
