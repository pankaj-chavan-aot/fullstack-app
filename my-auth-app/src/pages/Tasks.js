

// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function Tasks() {
//   const [tasks, setTasks] = useState([]);
//   const [user, setUser] = useState(null);

//   // ✅ लॉगिन झालेल्या युजरची माहिती घ्या
//   const fetchUser = async () => {
//     try {
//       const res = await axios.post("/auth/profile", {}, { withCredentials: true });
//       setUser(res.data);
//     } catch (err) {
//       console.error("User profile fetch error:", err);
//     }
//   };

//   // ✅ युजरची टास्क लिस्ट मिळवा
//   const fetchTasks = async () => {
//     try {
//       let res;

//       if (user?.role === "admin") {
//         res = await axios.get("/api/tasks", { withCredentials: true });
//       } else {
//         res = await axios.get(`/api/tasks/user/${user?.id}`, { withCredentials: true });
//       }

//       setTasks(res.data);
//     } catch (err) {
//       console.error("Tasks fetch error:", err);
//     }
//   };

//   // ✅ टास्क स्टेटस अपडेट करा
//   const handleStatusChange = async (taskId, newStatus) => {
//     try {
//       await axios.patch(
//         `/api/tasks/${taskId}`,
//         { status: newStatus },
//         { withCredentials: true }
//       );
//       fetchTasks(); // पुन्हा रिफ्रेश
//     } catch (err) {
//       console.error("Status update error:", err);
//     }
//   };

//   // 🔁 Component लोड झाल्यावर युजर व टास्क fetch करा
//   useEffect(() => {
//     fetchUser();
//   }, []);

//   // ⏳ युजर मिळाल्यावर टास्क्स लोड करा
//   useEffect(() => {
//     if (user) {
//       fetchTasks();
//     }
//   }, [user]);

//   // 🔁 UI रेंडर
//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Tasks</h1>

//       {tasks.length === 0 ? (
//         <p>No tasks found.</p>
//       ) : (
//         <ul className="space-y-4">
//           {tasks.map((task) => (
//             <li key={task.id} className="border rounded p-4 shadow">
//               <h2 className="font-semibold text-lg">{task.title}</h2>
//               <p>{task.description}</p>
//               <p className="text-sm">Status: {task.status}</p>

//               {/* ✅ स्टेटस अपडेट ड्रोपडाउन */}
//               <select
//                 value={task.status}
//                 onChange={(e) => handleStatusChange(task.id, e.target.value)}
//                 className="mt-2 border p-1 rounded"
//               >
//                 <option value="To Do">To Do</option>
//                 <option value="In Progress">In Progress</option>
//                 <option value="Done">Done</option>
//               </select>
//             </li>
//           ))}
//         </ul>
//       )}
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

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  // 🔁 UI रेंडर
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>

      {!user ? (
        <p>Loading user...</p>
      ) : tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li key={task.id} className="border rounded p-4 shadow">
              <h2 className="font-semibold text-lg">{task.title}</h2>
              <p>{task.description}</p>
              <p className="text-sm">Status: {task.status}</p>
              <p className="text-sm">Priority: {task.priority}</p>

              {/* ✅ Admin ला Task Owner दाखवा */}
              {user.role === "admin" && task.user?.username && (
                <p className="text-sm italic text-gray-600">Owner: {task.user.username}</p>
              )}

              {/* ✅ स्टेटस अपडेट फक्त admin किंवा स्वतःचा task असला की */}
              {(user.role === "admin" || user.id === task.user?.id) && (
                <select
                  value={task.status}
                  onChange={(e) => handleStatusChange(task.id, e.target.value)}
                  className="mt-2 border p-1 rounded"
                >
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
