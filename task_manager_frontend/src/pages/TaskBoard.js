import React, { useState, useEffect } from "react";
import TaskCard from "../components/TaskCard";
import TaskModal from "../components/TaskModal";
import { useAuth } from "../auth/AuthContext";

/**
 * PUBLIC_INTERFACE
 * Main page showing list of user's tasks, filterable, and CRUD modals.
 */
function TaskBoard() {
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const { api, user } = useAuth();

  // Fetch tasks for this user
  useEffect(() => {
    async function fetchTasks() {
      setLoading(true);
      try {
        const q = [];
        if (filters.status) {
          q.push("completed=" + (filters.status === "complete"));
        }
        if (filters.priority) {
          q.push("priority=" + filters.priority);
        }
        const resp = await api.get("/tasks" + (q.length ? "?" + q.join("&") : ""));
        setTasks(resp.tasks || []);
      } catch (e) {
        setTasks([]);
      }
      setLoading(false);
    }
    fetchTasks();
    // eslint-disable-next-line
  }, [filters, modalOpen]);

  function openNewTask() {
    setEditingTask(null);
    setModalOpen(true);
  }

  async function handleDelete(task) {
    if (window.confirm("Delete task: " + task.title + "?")) {
      await api.delete(`/tasks/${task.id}`);
      setTasks(tks => tks.filter(t => t.id !== task.id));
    }
  }

  async function handleEdit(task) {
    setEditingTask(task);
    setModalOpen(true);
  }

  async function handleToggleComplete(task) {
    await api.put(`/tasks/${task.id}`, { ...task, completed: !task.completed });
    setTasks(tks => tks.map(t => t.id === task.id ? { ...t, completed: !t.completed } : t));
  }

  async function handleSave(form) {
    if (editingTask) {
      const updated = await api.put(`/tasks/${editingTask.id}`, form);
      setTasks(tks => tks.map(t => t.id === editingTask.id ? updated.task : t));
    } else {
      const created = await api.post("/tasks", form);
      setTasks(tks => [...tks, created.task]);
    }
    setModalOpen(false);
    setEditingTask(null);
  }

  return (
    <div className="task-board">
      <div className="task-board-header">
        <h2>
          {user ? `Your tasks, ${user.username}` : "Your tasks"}
        </h2>
        <button className="task-create-btn" onClick={openNewTask}>
          + New Task
        </button>
      </div>
      <div className="task-board-body">
        {loading ? (
          <div>Loading...</div>
        ) : (tasks.length === 0 ? (
          <div>No tasks found.</div>
        ) : (
          tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggleComplete={handleToggleComplete}
            />
          ))
        ))}
      </div>
      <TaskModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        initialData={editingTask}
      />
    </div>
  );
}

export default TaskBoard;
