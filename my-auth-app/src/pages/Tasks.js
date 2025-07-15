// import { useEffect, useState } from 'react';
// import { getTasks } from '../api/auth';

// export default function Tasks() {
//   const [tasks, setTasks] = useState([]);

//   useEffect(() => {
//     getTasks()
//       .then(res => setTasks(res.data))
//       .catch(err => {
//         if (err.response?.status === 401) {
//           alert('Not authorized – login required');
//         }
//       });
//   }, []);

//   return (
//     <div>
//       <h2>Your Tasks</h2>
//       <ul>
//         {tasks.map(t => (
//           <li key={t.id}>
//             <h3>{t.title}</h3>
//             <p><strong>Description:</strong> {t.description}</p>
//             <p><strong>Status:</strong> {t.status}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import axios from "axios";
import "./tasks.css";

export default function Tasks({ user, onLogout }) {
  // user = { id, username, role: 'admin' | 'user' }
  // onLogout = callback to logout user if 401 happens

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    const fetchTasks = async () => {
      try {
        let res;
        if (user?.role === "admin") {
          // Admin fetch all tasks
          res = await axios.get("/api/tasks");
        } else if (user?.role === "user") {
          // User fetch own tasks
          res = await axios.get(`/api/tasks/user/${user.id}`);
        } else {
          throw new Error("Unauthorized");
        }
        setTasks(res.data);
      } catch (err) {
        if (err.response?.status === 401) {
          alert("Session expired or Unauthorized. Please login again.");
          onLogout();
        } else {
          setError("Failed to load tasks");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [user, onLogout]);

  const handleUpdateStatus = async (taskId, newStatus) => {
    try {
      await axios.patch(`/api/tasks/${taskId}`, { status: newStatus });
      setTasks(tasks.map(t => (t.id === taskId ? { ...t, status: newStatus } : t)));
    } catch (err) {
      if (err.response?.status === 401) {
        alert("Unauthorized. Please login again.");
        onLogout();
      } else {
        alert("Failed to update task");
      }
    }
  };

  if (loading) return <div className="loading">Loading tasks...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!user) return <div className="error">Please login to view tasks.</div>;

  return (
    <div className="tasks-container">
      <h2>Tasks List</h2>
      {tasks.length === 0 && <p>No tasks found.</p>}
      <ul className="tasks-list">
        {tasks.map(task => (
          <li key={task.id} className="task-item">
            <div>
              <h3>{task.title}</h3>
              <p><strong>Description:</strong> {task.description}</p>
              <p><strong>Status:</strong> {task.status}</p>
              <p><strong>Priority:</strong> {task.priority}</p>
              <p><strong>Owner:</strong> {task.user.username}</p>
            </div>
            {(user.role === "admin" || task.user.id === user.id) && (
              <div className="task-actions">
                <button
                  onClick={() => handleUpdateStatus(task.id, "IN_PROGRESS")}
                  disabled={task.status === "IN_PROGRESS"}
                >
                  Mark In Progress
                </button>
                <button
                  onClick={() => handleUpdateStatus(task.id, "DONE")}
                  disabled={task.status === "DONE"}
                >
                  Mark Done
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

