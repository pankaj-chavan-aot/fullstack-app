

// import { useEffect, useState } from "react";
// import {
//   getProfile,
//   getTasks,
//   updateTask,
//   assignTask,
// } from "../api/auth";

// export default function Tasks() {
//   const [tasks, setTasks] = useState([]);
//   const [user, setUser] = useState(null);
//   const [assignedUserId, setAssignedUserId] = useState("");

//   // ✅ Fetch user and tasks
//   const fetchUserAndTasks = async () => {
//     try {
//       const userData = await getProfile();
//       setUser(userData);
//       console.log("👤 USER:", userData);

//       const tasksData = await getTasks(userData);
//       setTasks(tasksData);
//       console.log("✅ TASK LIST:", tasksData);
//     } catch (err) {
//       console.error("❌ Error fetching profile or tasks:", err);
//     }
//   };

//   // ✅ useEffect to load data
//   useEffect(() => {
//     console.log("🔥 useEffect started");
//     fetchUserAndTasks();
//   }, []);

//   const handleStatusChange = async (taskId, status) => {
//     await updateTask(taskId, { status });
//     fetchUserAndTasks();
//   };

//   const handleAssign = async (taskId) => {
//     await assignTask(taskId, { userId: assignedUserId });
//     setAssignedUserId("");
//     fetchUserAndTasks();
//   };

//   if (!user) return <div>Loading profile...</div>;

//   return (
//     <div>
//       <h2>Welcome, {user.username}</h2>
//       <h3>Your Role: {user.role}</h3>
//       <h3>Tasks</h3>

//       {tasks.length === 0 ? (
//         <p>No tasks found.</p>
//       ) : (
//         <ul>
//           {tasks.map((task) => (
//             <li key={task.id}>
//               <strong>{task.title}</strong> - {task.status} (Priority: {task.priority})
//               <br />
//               Assigned to: {task.user?.username || "Unassigned"}

//               {/* ✅ Status change for all users */}
//               <div>
//                 <button onClick={() => handleStatusChange(task.id, "todo")}>To Do</button>
//                 <button onClick={() => handleStatusChange(task.id, "inprogress")}>In Progress</button>
//                 <button onClick={() => handleStatusChange(task.id, "done")}>Done</button>
//               </div>

//               {/* ✅ Only admin can assign */}
//               {user.role === "admin" && (
//                 <div>
//                   <input
//                     type="text"
//                     placeholder="Assign to user ID"
//                     value={assignedUserId}
//                     onChange={(e) => setAssignedUserId(e.target.value)}
//                   />
//                   <button onClick={() => handleAssign(task.id)}>Assign</button>
//                 </div>
//               )}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { getProfile, getTasks, updateTask, assignTask } from "../api/auth";
import "./Tasks.css";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const [assignedUserId, setAssignedUserId] = useState("");

  // ✅ Task पुन्हा मिळवण्यासाठी function
  const fetchTasks = async (profile) => {
    try {
      const data = await getTasks(profile);
      setTasks(data);
    } catch (err) {
      console.error("Failed to fetch tasks", err);
    }
  };

  // ✅ Profile आणि Tasks मिळवा
  useEffect(() => {
    const fetchData = async () => {
      try {
        const profile = await getProfile();
        setUser(profile);
        await fetchTasks(profile);
      } catch (err) {
        console.error("Error fetching user or tasks", err);
      }
    };

    fetchData();
  }, []);

  // ✅ Status update handler
  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await updateTask(taskId, { status: newStatus });
      if (user) await fetchTasks(user);
    } catch (err) {
      console.error("Failed to update task", err);
    }
  };

  // ✅ Admin-only: Assign task to user
  const handleAssign = async (taskId) => {
    try {
      await assignTask(taskId, assignedUserId);
      setAssignedUserId("");
      if (user) await fetchTasks(user);
    } catch (err) {
      console.error("Failed to assign task", err);
    }
  };

  if (!user) return <div>Loading user...</div>;

  return (
    <div className="task-container">
      <h2>Welcome, {user.username} ({user.role})</h2>
      <h3>Your Tasks</h3>

      {tasks.length === 0 && <p>No tasks found.</p>}

      {tasks.map((task) => (
        <div className="task-card" key={task.id}>
          <div className="task-title">{task.title}</div>
          <div className="task-meta">
            <p>Status: {task.status}</p>
            <p>Priority: {task.priority}</p>
            <p>Assigned to: {task.user?.username || "Unassigned"}</p>
          </div>

          {/* ✅ Status change dropdown */}
          <select
            value={task.status}
            onChange={(e) => handleStatusChange(task.id, e.target.value)}
          >
            <option value="TO_DO">To Do</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="DONE">Done</option>
          </select>

          {/* ✅ Only show assign field for ADMIN */}
          {user.role === "ADMIN" && (
            <div className="assign-section">
              <input
                type="text"
                placeholder="Assign to user ID"
                value={assignedUserId}
                onChange={(e) => setAssignedUserId(e.target.value)}
              />
              <button onClick={() => handleAssign(task.id)}>Assign</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
