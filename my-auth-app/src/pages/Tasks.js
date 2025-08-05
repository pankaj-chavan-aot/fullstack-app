

// import { useEffect, useState } from "react";
// import { getProfile, getTasks, updateTask, assignTask } from "../api/auth";
// import "./Tasks.css";

// export default function Tasks() {
//   const [tasks, setTasks] = useState([]);
//   const [user, setUser] = useState(null);
//   const [assignedUserId, setAssignedUserId] = useState("");

//   // ✅ Task पुन्हा मिळवण्यासाठी function
//   const fetchTasks = async (profile) => {
//     try {
//       const data = await getTasks(profile);
//       setTasks(data);
//     } catch (err) {
//       console.error("Failed to fetch tasks", err);
//     }
//   };

//   // ✅ Profile आणि Tasks मिळवा
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const profile = await getProfile();
//         setUser(profile);
//         await fetchTasks(profile);
//       } catch (err) {
//         console.error("Error fetching user or tasks", err);
//       }
//     };

//     fetchData();
//   }, []);

//   // ✅ Status update handler
//   const handleStatusChange = async (taskId, newStatus) => {
//     try {
//       await updateTask(taskId, { status: newStatus });
//       if (user) await fetchTasks(user);
//     } catch (err) {
//       console.error("Failed to update task", err);
//     }
//   };

//   // ✅ Admin-only: Assign task to user
//   const handleAssign = async (taskId) => {
//     try {
//       await assignTask(taskId, assignedUserId);
//       setAssignedUserId("");
//       if (user) await fetchTasks(user);
//     } catch (err) {
//       console.error("Failed to assign task", err);
//     }
//   };

//   if (!user) return <div>Loading user...</div>;

//   return (
//     <div className="task-container">
//       <h2>Welcome, {user.username} ({user.role})</h2>
//       <h3>Your Tasks</h3>

//       {tasks.length === 0 && <p>No tasks found.</p>}

//       {tasks.map((task) => (
//         <div className="task-card" key={task.id}>
//           <div className="task-title">{task.title}</div>
//           <div className="task-meta">
//             <p>Status: {task.status}</p>
//             <p>Priority: {task.priority}</p>
//             <p>Assigned to: {task.user?.username || "Unassigned"}</p>
//           </div>

//           {/* ✅ Status change dropdown */}
//           <select
//             value={task.status}
//             onChange={(e) => handleStatusChange(task.id, e.target.value)}
//           >
//             <option value="TO_DO">To Do</option>
//             <option value="IN_PROGRESS">In Progress</option>
//             <option value="DONE">Done</option>
//           </select>

//           {/* ✅ Only show assign field for ADMIN */}
//           {user.role === "ADMIN" && (
//             <div className="assign-section">
//               <input
//                 type="text"
//                 placeholder="Assign to user ID"
//                 value={assignedUserId}
//                 onChange={(e) => setAssignedUserId(e.target.value)}
//               />
//               <button onClick={() => handleAssign(task.id)}>Assign</button>
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import { getProfile, getTasks, updateTask, assignTask } from "../api/auth";
import "./Tasks.css";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const [assignedUserId, setAssignedUserId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const profile = await getProfile();
      const taskList = await getTasks();
      setUser(profile);
      setTasks(taskList);
    } catch (err) {
      setError("Failed to load data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await updateTask(taskId, { status: newStatus });
      fetchData();
    } catch (err) {
      console.error("Status update failed", err);
    }
  };

  const handleAssign = async (taskId) => {
    try {
      await assignTask(taskId, assignedUserId);
      setAssignedUserId("");
      fetchData();
    } catch (err) {
      console.error("Assignment failed", err);
    }
  };

  return (
    <div className="tasks-container">
      <h2 className="tasks-title">📋 Task Dashboard</h2>

      {loading ? (
        <p className="tasks-loading">Loading...</p>
      ) : error ? (
        <p className="tasks-error">{error}</p>
      ) : (
        <div className="tasks-list">
          {tasks.length === 0 ? (
            <p>No tasks available</p>
          ) : (
            tasks.map((task) => (
              <div className="task-card" key={task.id}>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <p>Status: {task.status}</p>
                <p>Priority: {task.priority}</p>
                <p>Assigned to: {task.user?.username || "Unassigned"}</p>

                {user?.role === "admin" ? (
                  <>
                    <select
                      value={task.status}
                      onChange={(e) =>
                        handleStatusChange(task.id, e.target.value)
                      }
                    >
                      <option value="To Do">To Do</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Done">Done</option>
                    </select>

                    <div className="assign-section">
                      <input
                        type="text"
                        placeholder="User ID"
                        value={assignedUserId}
                        onChange={(e) => setAssignedUserId(e.target.value)}
                      />
                      <button onClick={() => handleAssign(task.id)}>
                        Assign
                      </button>
                    </div>
                  </>
                ) : (
                  <select
                    value={task.status}
                    onChange={(e) =>
                      handleStatusChange(task.id, e.target.value)
                    }
                  >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                  </select>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
