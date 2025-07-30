
// // import { useEffect, useState } from "react";
// // import {
// //   getProfile,
// //   getTasks,
// //   updateTask,
// //   assignTask,
// // } from "../api/auth";

// // export default function Tasks() {
// //   const [tasks, setTasks] = useState([]);
// //   const [user, setUser] = useState(null);

// //   // ✅ प्रोफाइल आणि टास्क्स एकत्र फेच करा
// //   const fetchUserAndTasks = async () => {
// //     try {
// //       const profile = await getProfile();
// //       const taskList = await getTasks(profile);
// //       console.log("✅ PROFILE:", profile);
// //       console.log("✅ TASK LIST:", taskList);

// //       setUser(profile);
// //       setTasks(taskList);
// //     } catch (err) {
// //       console.error("❌ Error fetching user or tasks:", err);
// //     }
// //   };

// //   // ✅ स्टेटस अपडेट हँडलर
// //   const handleStatusChange = async (taskId, newStatus) => {
// //     try {
// //       await updateTask(taskId, { status: newStatus });
// //       await fetchUserAndTasks(); // रीफ्रेश टास्क्स
// //     } catch (err) {
// //       console.error("❌ Failed to update task:", err);
// //     }
// //   };

// //   // ✅ टास्क assign हँडलर (Admin साठी)
// //   const handleAssign = async (taskId, userId) => {
// //     try {
// //       await assignTask(taskId, userId);
// //       await fetchUserAndTasks(); // रीफ्रेश टास्क्स
// //     } catch (err) {
// //       console.error("❌ Failed to assign task:", err);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchUserAndTasks();
// //   }, []);

// //   if (!user) return <p>🔄 Loading user...</p>;

// //   return (
// //     <div className="p-6">
// //       <h1 className="text-2xl font-bold mb-4">Tasks</h1>

// //       {tasks.length === 0 ? (
// //         <p>🚫 No tasks found.</p>
// //       ) : (
// //         <ul className="space-y-4">
// //           {tasks.map((task) => {
// //             const isOwner = task.user?.id === user.id;
// //             const isAdmin = user.role === "admin";

// //             return (
// //               <li key={task.id} className="border rounded p-4 shadow">
// //                 <h2 className="font-semibold text-lg">{task.title}</h2>
// //                 <p>{task.description}</p>
// //                 <p className="text-sm">Status: {task.status}</p>
// //                 <p className="text-sm">Priority: {task.priority}</p>

// //                 {isAdmin && task.user?.username && (
// //                   <p className="text-sm italic text-gray-600">
// //                     Owner: {task.user.username}
// //                   </p>
// //                 )}

// //                 {(isAdmin || isOwner) && (
// //                   <select
// //                     value={task.status}
// //                     onChange={(e) =>
// //                       handleStatusChange(task.id, e.target.value)
// //                     }
// //                     className="mt-2 border p-1 rounded"
// //                   >
// //                     <option value="To Do">To Do</option>
// //                     <option value="In Progress">In Progress</option>
// //                     <option value="Done">Done</option>
// //                   </select>
// //                 )}

// //                 {/* ✅ Admin: Assign Task */}
// //                 {isAdmin && (
// //                   <div className="mt-3">
// //                     <label className="block text-sm font-medium mb-1">
// //                       Assign to User ID:
// //                     </label>
// //                     <input
// //                       type="number"
// //                       placeholder="Enter User ID"
// //                       onKeyDown={async (e) => {
// //                         if (e.key === "Enter") {
// //                           const userId = Number(e.target.value);
// //                           if (userId) {
// //                             await handleAssign(task.id, userId);
// //                           }
// //                         }
// //                       }}
// //                       className="border p-1 rounded w-full"
// //                     />
// //                     <p className="text-xs text-gray-500">
// //                       Press Enter to assign
// //                     </p>
// //                   </div>
// //                 )}
// //               </li>
// //             );
// //           })}
// //         </ul>
// //       )}
// //     </div>
// //   );
// // }
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
//   const [loading, setLoading] = useState(true);

//   // ✅ प्रोफाइल आणि टास्क्स फेच करणे
//   const fetchUserAndTasks = async () => {
//     try {
//       const profile = await getProfile();
//             console.log("✅ PROFILE:", profile);

//       const taskList = await getTasks(profile);
//       console.log("✅ TASK LIST:", taskList);

//       setUser(profile);
//       setTasks(taskList);
//     } catch (err) {
//       console.error("❌ Error fetching user or tasks:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Task Status Update
//   const handleStatusChange = async (taskId, newStatus) => {
//     try {
//       await updateTask(taskId, { status: newStatus });
//       await fetchUserAndTasks();
//     } catch (err) {
//       console.error("❌ Failed to update task:", err);
//     }
//   };

//   // ✅ Admin assigns task to user
//   const handleAssign = async (taskId, userId) => {
//     try {
//       await assignTask(taskId, userId);
//       await fetchUserAndTasks();
//     } catch (err) {
//       console.error("❌ Failed to assign task:", err);
//     }
//   };

//   useEffect(() => {
//     fetchUserAndTasks();
//   }, []);

//   if (loading) return <p>🔄 Loading user...</p>;

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">📋 Tasks</h1>

//       {tasks.length === 0 ? (
//         <p>🚫 No tasks found.</p>
//       ) : (
//         <ul className="space-y-4">
//           {tasks.map((task) => {
//             const isOwner = task.user?.id === user.id;
//             const isAdmin = user.role === "admin";

//             return (
//               <li key={task.id} className="border rounded p-4 shadow">
//                 <h2 className="font-semibold text-lg">{task.title}</h2>
//                 <p>{task.description}</p>
//                 <p className="text-sm">Status: {task.status}</p>
//                 <p className="text-sm">Priority: {task.priority}</p>

//                 {isAdmin && task.user?.username && (
//                   <p className="text-sm italic text-gray-600">
//                     👤 Owner: {task.user.username}
//                   </p>
//                 )}

//                 {(isAdmin || isOwner) && (
//                   <select
//                     value={task.status}
//                     onChange={(e) =>
//                       handleStatusChange(task.id, e.target.value)
//                     }
//                     className="mt-2 border p-1 rounded"
//                   >
//                     <option value="To Do">To Do</option>
//                     <option value="In Progress">In Progress</option>
//                     <option value="Done">Done</option>
//                   </select>
//                 )}

//                 {/* ✅ Admin: Assign Task */}
//                 {isAdmin && (
//                   <div className="mt-3">
//                     <label className="block text-sm font-medium mb-1">
//                       Assign to User ID:
//                     </label>
//                     <input
//                       type="number"
//                       placeholder="Enter User ID"
//                       onKeyDown={async (e) => {
//                         if (e.key === "Enter") {
//                           const userId = Number(e.target.value);
//                           if (userId) {
//                             await handleAssign(task.id, userId);
//                           }
//                         }
//                       }}
//                       className="border p-1 rounded w-full"
//                     />
//                     <p className="text-xs text-gray-500">
//                       Press Enter to assign
//                     </p>
//                   </div>
//                 )}
//               </li>
//             );
//           })}
//         </ul>
//       )}
//     </div>
//   );
// }

// import { useEffect, useState } from "react";
// import {
//   getProfile,
//   getTasks,
//   updateTask,
//   assignTask,
// } from "../api/auth";

// import API from "../api/api";

// export default function Tasks() {
//   const [tasks, setTasks] = useState([]);
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // ✅ प्रोफाइल आणि टास्क्स फेच करणे
//   const fetchUserAndTasks = async () => {
//     try {
//       const profile = await getProfile();
//       console.log("✅ PROFILE:", profile);

//       const taskList = await getTasks(profile); // ✅ fix – profile पाठवलं
//       console.log("✅ TASK LIST:", taskList);

//       setUser(profile);
//       setTasks(taskList);
//     } catch (err) {
//       console.error("❌ Error fetching user or tasks:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Task Status Update
//   const handleStatusChange = async (taskId, newStatus) => {
//     try {
//       await updateTask(taskId, { status: newStatus });
//       await fetchUserAndTasks();
//     } catch (err) {
//       console.error("❌ Failed to update task:", err);
//     }
//   };

//   // ✅ Admin assigns task to user
//   const handleAssign = async (taskId, userId) => {
//     try {
//       await assignTask(taskId, userId);
//       await fetchUserAndTasks();
//     } catch (err) {
//       console.error("❌ Failed to assign task:", err);
//     }
//   };

//   useEffect(() => {
//     fetchUserAndTasks();
//   }, []);

//   if (loading) return <p>🔄 Loading user...</p>;

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">📋 Tasks</h1>

//       {tasks.length === 0 ? (
//         <p>🚫 No tasks found.</p>
//       ) : (
//         <ul className="space-y-4">
//           {tasks.map((task) => {
//             const isOwner = task.user?.id === user.id;
//             const isAdmin = user.role === "admin";

//             return (
//               <li key={task.id} className="border rounded p-4 shadow">
//                 <h2 className="font-semibold text-lg">{task.title}</h2>
//                 <p>{task.description}</p>
//                 <p className="text-sm">Status: {task.status}</p>
//                 <p className="text-sm">Priority: {task.priority}</p>

//                 {isAdmin && task.user?.username && (
//                   <p className="text-sm italic text-gray-600">
//                     👤 Owner: {task.user.username}
//                   </p>
//                 )}

//                 {(isAdmin || isOwner) && (
//                   <select
//                     value={task.status}
//                     onChange={(e) =>
//                       handleStatusChange(task.id, e.target.value)
//                     }
//                     className="mt-2 border p-1 rounded"
//                   >
//                     <option value="To Do">To Do</option>
//                     <option value="In Progress">In Progress</option>
//                     <option value="Done">Done</option>
//                   </select>
//                 )}

//                 {/* ✅ Admin: Assign Task */}
//                 {isAdmin && (
//                   <div className="mt-3">
//                     <label className="block text-sm font-medium mb-1">
//                       Assign to User ID:
//                     </label>
//                     <input
//                       type="number"
//                       placeholder="Enter User ID"
//                       onKeyDown={async (e) => {
//                         if (e.key === "Enter") {
//                           const userId = Number(e.target.value);
//                           if (userId) {
//                             await handleAssign(task.id, userId);
//                           }
//                         }
//                       }}
//                       className="border p-1 rounded w-full"
//                     />
//                     <p className="text-xs text-gray-500">
//                       Press Enter to assign
//                     </p>
//                   </div>
//                 )}
//               </li>
//             );
//           })}
//         </ul>
//       )}
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import {
  getProfile,
  getTasks,
  updateTask,
  assignTask,
  createTask,
} from "../api/auth";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "Medium",
  });

  const fetchUserAndTasks = async () => {
    try {
      const profile = await getProfile();
      console.log("✅ PROFILE:", profile);
      setUser(profile);

      const tasks = await getTasks();
      console.log("✅ TASK LIST:", tasks);
      setTasks(tasks);
    } catch (err) {
      console.error("❌ Error fetching profile or tasks:", err);
    }
  };

  useEffect(() => {
    fetchUserAndTasks();
  }, []);

  const handleStatusUpdate = async (taskId, newStatus) => {
    try {
      await updateTask(taskId, { status: newStatus });
      await fetchUserAndTasks();
    } catch (err) {
      console.error("❌ Failed to update status:", err);
    }
  };

  const handleAssign = async (taskId, userId) => {
    try {
      await assignTask(taskId, userId);
      await fetchUserAndTasks();
    } catch (err) {
      console.error("❌ Failed to assign task:", err);
    }
  };

  const handleCreateTask = async () => {
    try {
      await createTask(newTask);
      setNewTask({ title: "", description: "", priority: "Medium" });
      await fetchUserAndTasks();
    } catch (err) {
      console.error("❌ Failed to create task:", err);
      alert("Task create करता आला नाही");
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4">📋 Task List</h1>

      {/* Admin Create Task UI */}
      {user.role === "admin" && (
        <div className="border rounded p-4 mb-6 shadow">
          <h2 className="font-semibold text-lg mb-2">➕ Create New Task</h2>
          <input
            type="text"
            placeholder="Task Title"
            value={newTask.title}
            onChange={(e) =>
              setNewTask({ ...newTask, title: e.target.value })
            }
            className="border p-1 rounded w-full mb-2"
          />
          <input
            type="text"
            placeholder="Description"
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
            className="border p-1 rounded w-full mb-2"
          />
          <input
            type="text"
            placeholder="Priority (Low, Medium, High)"
            value={newTask.priority}
            onChange={(e) =>
              setNewTask({ ...newTask, priority: e.target.value })
            }
            className="border p-1 rounded w-full mb-2"
          />
          <button
            onClick={handleCreateTask}
            className="bg-blue-600 text-white px-4 py-1 rounded"
          >
            Create Task
          </button>
        </div>
      )}

      {tasks.length === 0 ? (
        <div>No tasks found.</div>
      ) : (
        tasks.map((task) => (
          <div key={task.id} className="border rounded p-4 mb-4 shadow">
            <h2 className="font-semibold text-lg">{task.title}</h2>
            <p className="text-sm text-gray-700">{task.description}</p>
            <p className="text-sm mt-1">
              Priority: <strong>{task.priority}</strong>
            </p>
            <p className="text-sm mt-1">
              Status:{" "}
              <select
                value={task.status}
                onChange={(e) => handleStatusUpdate(task.id, e.target.value)}
                className="border rounded p-1"
              >
                <option value="TODO">To Do</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="DONE">Done</option>
              </select>
            </p>

            {/* Admin Assign Task */}
            {user.role === "admin" && (
              <div className="mt-2">
                <input
                  type="number"
                  placeholder="Assign to user ID"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleAssign(task.id, parseInt(e.target.value));
                      e.target.value = "";
                    }
                  }}
                  className="border p-1 rounded w-full"
                />
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
