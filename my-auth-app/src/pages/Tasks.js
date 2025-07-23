

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

//   const fetchUserAndTasks = async () => {
//     try {
//       const profile = await getProfile();
//       console.log("✅ PROFILE", profile); // <-- DEBUG

//       setUser(profile);

//       const data = await getTasks(profile); // ✅ profile पास केला
//           console.log("✅ TASKS", data); // <-- DEBUG

//       setTasks(data);
//     } catch (err) {
//       console.error("❌ Failed to fetch user or tasks", err);
//     }
//   };

//   const handleStatusChange = async (taskId, newStatus) => {
//     try {
//       await updateTask(taskId, { status: newStatus });
//       fetchUserAndTasks(); // ✅ Refresh after update
//     } catch (err) {
//       console.error("❌ Failed to update task", err);
//     }
//   };

//   useEffect(() => {
//     fetchUserAndTasks(); // ✅ Single call on mount
//   }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Tasks</h1>

//       {!user ? (
//         <p>🔄 Loading user...</p>
//       ) : tasks.length === 0 ? (
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
//                     Owner: {task.user.username}
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

//                 {/* ✅ Admin - Assign to user */}
//                 {isAdmin && (
//                   <div className="mt-2">
//                     <label className="block text-sm mb-1">
//                       Assign to User ID:
//                     </label>
//                     <input
//                       type="number"
//                       placeholder="User ID"
//                       onKeyDown={async (e) => {
//                         if (e.key === "Enter") {
//                           const userId = Number(e.target.value);
//                           if (userId) {
//                             try {
//                               await assignTask(task.id, userId);
//                               fetchUserAndTasks(); // ✅ Refresh after assign
//                             } catch (err) {
//                               console.error("❌ Assign task failed", err);
//                             }
//                           }
//                         }
//                       }}
//                       className="border p-1 rounded w-full"
//                     />
//                     <p className="text-xs text-gray-500 mt-1">
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
} from "../api/auth";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);

  // ✅ User आणि Tasks एकाच वेळी fetch करा
  const fetchUserAndTasks = async () => {
    try {
      const profile = await getProfile();
      const taskList = await getTasks(profile);

      setUser(profile);
      setTasks(taskList);
    } catch (err) {
      console.error("❌ Error fetching user or tasks:", err);
    }
  };

  // ✅ Status अपडेट handler
  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await updateTask(taskId, { status: newStatus });
      await fetchUserAndTasks();
    } catch (err) {
      console.error("❌ Failed to update task:", err);
    }
  };

  // ✅ Admin असला तर task assign करण्याची सोय
  const handleAssign = async (taskId, userId) => {
    try {
      await assignTask(taskId, userId);
      await fetchUserAndTasks();
    } catch (err) {
      console.error("❌ Failed to assign task:", err);
    }
  };

  useEffect(() => {
    fetchUserAndTasks();
  }, []);

  if (!user) return <p>🔄 Loading user...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>

      {tasks.length === 0 ? (
        <p>🚫 No tasks found.</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task) => {
            const isOwner = task.user?.id === user.id;
            const isAdmin = user.role === "admin";

            return (
              <li key={task.id} className="border rounded p-4 shadow">
                <h2 className="font-semibold text-lg">{task.title}</h2>
                <p>{task.description}</p>
                <p className="text-sm">Status: {task.status}</p>
                <p className="text-sm">Priority: {task.priority}</p>

                {isAdmin && task.user?.username && (
                  <p className="text-sm italic text-gray-600">
                    Owner: {task.user.username}
                  </p>
                )}

                {(isAdmin || isOwner) && (
                  <select
                    value={task.status}
                    onChange={(e) =>
                      handleStatusChange(task.id, e.target.value)
                    }
                    className="mt-2 border p-1 rounded"
                  >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                  </select>
                )}

                {isAdmin && (
                  <div className="mt-3">
                    <label className="block text-sm font-medium mb-1">
                      Assign to User ID:
                    </label>
                    <input
                      type="number"
                      placeholder="Enter User ID"
                      onKeyDown={async (e) => {
                        if (e.key === "Enter") {
                          const userId = Number(e.target.value);
                          if (userId) {
                            await handleAssign(task.id, userId);
                          }
                        }
                      }}
                      className="border p-1 rounded w-full"
                    />
                    <p className="text-xs text-gray-500">Press Enter to assign</p>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
