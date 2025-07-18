
// import { useEffect, useState } from "react";
// import "./tasks.css";

// export default function Tasks({ user, onLogout }) {
//   // user = { id, username, role: 'admin' | 'user' }
//   // onLogout = callback to logout user if 401 happens

//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     setLoading(true);
//     setError("");
//     const fetchTasks = async () => {
//       try {
//         let res;
//         if (user?.role === "admin") {
//           // Admin fetch all tasks
//           res = await axios.get("/api/tasks");
//         } else if (user?.role === "user") {
//           // User fetch own tasks
//           res = await axios.get(`/api/tasks/user/${user.id}`);
//         } else {
//           throw new Error("Unauthorized");
//         }
//         setTasks(res.data);
//       } catch (err) {
//         if (err.response?.status === 401) {
//           alert("Session expired or Unauthorized. Please login again.");
//           onLogout();
//         } else {
//           setError("Failed to load tasks");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchTasks();
//   }, [user, onLogout]);

//   const handleUpdateStatus = async (taskId, newStatus) => {
//     try {
//       await axios.patch(`/api/tasks/${taskId}`, { status: newStatus });
//       setTasks(tasks.map(t => (t.id === taskId ? { ...t, status: newStatus } : t)));
//     } catch (err) {
//       if (err.response?.status === 401) {
//         alert("Unauthorized. Please login again.");
//         onLogout();
//       } else {
//         alert("Failed to update task");
//       }
//     }
//   };

//   if (loading) return <div className="loading">Loading tasks...</div>;
//   if (error) return <div className="error">{error}</div>;
//   if (!user) return <div className="error">Please login to view tasks.</div>;

//   return (
//     <div className="tasks-container">
//       <h2>Tasks List</h2>
//       {tasks.length === 0 && <p>No tasks found.</p>}
//       <ul className="tasks-list">
//         {tasks.map(task => (
//           <li key={task.id} className="task-item">
//             <div>
//               <h3>{task.title}</h3>
//               <p><strong>Description:</strong> {task.description}</p>
//               <p><strong>Status:</strong> {task.status}</p>
//               <p><strong>Priority:</strong> {task.priority}</p>
//               <p><strong>Owner:</strong> {task.user.username}</p>
//             </div>
//             {(user.role === "admin" || task.user.id === user.id) && (
//               <div className="task-actions">
//                 <button
//                   onClick={() => handleUpdateStatus(task.id, "IN_PROGRESS")}
//                   disabled={task.status === "IN_PROGRESS"}
//                 >
//                   Mark In Progress
//                 </button>
//                 <button
//                   onClick={() => handleUpdateStatus(task.id, "DONE")}
//                   disabled={task.status === "DONE"}
//                 >
//                   Mark Done
//                 </button>
//               </div>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import axios from "axios";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);

  // ✅ लॉगिन झालेल्या युजरची माहिती घ्या
  const fetchUser = async () => {
    try {
      const res = await axios.post("/auth/profile", {}, { withCredentials: true });
      setUser(res.data);
    } catch (err) {
      console.error("User profile fetch error:", err);
    }
  };

  // ✅ युजरची टास्क लिस्ट मिळवा
  const fetchTasks = async () => {
    try {
      let res;

      if (user?.role === "admin") {
        res = await axios.get("/api/tasks", { withCredentials: true });
      } else {
        res = await axios.get(`/api/tasks/user/${user?.id}`, { withCredentials: true });
      }

      setTasks(res.data);
    } catch (err) {
      console.error("Tasks fetch error:", err);
    }
  };

  // ✅ टास्क स्टेटस अपडेट करा
  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await axios.patch(
        `/api/tasks/${taskId}`,
        { status: newStatus },
        { withCredentials: true }
      );
      fetchTasks(); // पुन्हा रिफ्रेश
    } catch (err) {
      console.error("Status update error:", err);
    }
  };

  // 🔁 Component लोड झाल्यावर युजर व टास्क fetch करा
  useEffect(() => {
    fetchUser();
  }, []);

  // ⏳ युजर मिळाल्यावर टास्क्स लोड करा
  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  // 🔁 UI रेंडर
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>

      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li key={task.id} className="border rounded p-4 shadow">
              <h2 className="font-semibold text-lg">{task.title}</h2>
              <p>{task.description}</p>
              <p className="text-sm">Status: {task.status}</p>

              {/* ✅ स्टेटस अपडेट ड्रोपडाउन */}
              <select
                value={task.status}
                onChange={(e) => handleStatusChange(task.id, e.target.value)}
                className="mt-2 border p-1 rounded"
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
