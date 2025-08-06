import { useEffect, useState } from 'react';
import {
  getProfile,
  getTasks,
  updateTask,
  assignTask,
  createTask,
} from '../api/auth';
//import './Tasks.css';
import './tasks.css'; // Ensure you have this CSS file for styling

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const [newTask, setNewTask] = useState('');
  const [assigneeId, setAssigneeId] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const profile = await getProfile();
        setUser(profile);
        const fetchedTasks = await getTasks();
        setTasks(fetchedTasks);
      } catch (err) {
        console.error('Error loading data:', err);
      }
    }

    fetchData();
  }, []);

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await updateTask(taskId, newStatus);
      const updated = await getTasks();
      setTasks(updated);
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  const handleAssign = async (taskId) => {
    try {
      if (!assigneeId) return;
      await assignTask(taskId, assigneeId);
      const updated = await getTasks();
      setTasks(updated);
      setAssigneeId('');
    } catch (err) {
      console.error('Error assigning task:', err);
    }
  };

  const handleCreateTask = async () => {
    try {
      if (!newTask.trim()) return;
      await createTask({ title: newTask });
      const updated = await getTasks();
      setTasks(updated);
      setNewTask('');
    } catch (err) {
      console.error('Error creating task:', err);
    }
  };

  return (
    <div className="tasks-container">
      <h2 className="tasks-title">Task Dashboard</h2>

      {user?.role === 'admin' && (
        <div className="task-create">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter new task title"
          />
          <button onClick={handleCreateTask}>Create Task</button>
        </div>
      )}

      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className="task-card">
            <div className="task-info">
              <h3>{task.title}</h3>
              <p><strong>Status:</strong> {task.status}</p>
              <p><strong>Assigned To:</strong> {task.userId || 'Unassigned'}</p>
            </div>

            <div className="task-actions">
              <select
                value={task.status}
                onChange={(e) => handleStatusChange(task.id, e.target.value)}
              >
                <option value="todo">To Do</option>
                <option value="in_progress">In Progress</option>
                <option value="done">Done</option>
              </select>

              {user?.role === 'admin' && (
                <div className="assign-section">
                  <input
                    type="text"
                    value={assigneeId}
                    onChange={(e) => setAssigneeId(e.target.value)}
                    placeholder="User ID"
                  />
                  <button onClick={() => handleAssign(task.id)}>Assign</button>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
