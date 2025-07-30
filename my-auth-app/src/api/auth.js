
// // src/api/auth.js
// import API from './api';

// // ✅ Signup
// export const signup = async (username, password, role) => {
//   try {
//     const res = await API.post('/auth/signup', { username, password, role });
//     return res.data;
//   } catch (err) {
//     console.error("❌ Signup error:", err?.response?.status, err?.response?.data);
//     throw err;
//   }
// };

// // ✅ Login
// export const login = async (username, password) => {
//   try {
//     const res = await API.post('/auth/login', { username, password });
//     return res.data;
//   } catch (err) {
//     console.error("❌ Login error:", err?.response?.status, err?.response?.data);
//     throw err;
//   }
// };

// // ✅ Get Profile
// export const getProfile = async () => {
//   try {
//     const res = await API.post('/auth/profile');
//     return res.data;
//   } catch (err) {
//     console.error("❌ Profile fetch error:", err?.response?.status, err?.response?.data);
//     throw err;
//   }
// };

// // ✅ FIXED: Get Tasks (now accepts profile argument)
// export const getTasks = async (profile) => {
//   try {
//     const res = profile.role === 'admin'
//       ? await API.get('/tasks')                // admin → all tasks
//       : await API.get(`/tasks/user/${profile.id}`);  // user → own tasks

//     console.log("✅ TASK LIST", res.data);
//     return res.data;
//   } catch (err) {
//     console.error("❌ Get tasks error:", err?.response?.status, err?.response?.data);
//     throw err;
//   }
// };

// // ✅ Create Task
// export const createTask = async (taskData) => {
//   try {
//     const res = await API.post('/tasks', taskData);
//     return res.data;
//   } catch (err) {
//     console.error("❌ Create task error:", err?.response?.status, err?.response?.data);
//     throw err;
//   }
// };

// // ✅ Update Task
// export const updateTask = async (taskId, updates) => {
//   try {
//     const res = await API.patch(`/tasks/${taskId}`, updates);
//     return res.data;
//   } catch (err) {
//     console.error("❌ Update task error:", err?.response?.status, err?.response?.data);
//     throw err;
//   }
// };

// // ✅ Assign Task
// export const assignTask = async (taskId, userId) => {
//   try {
//     const res = await API.patch(`/tasks/${taskId}/assign`, { userId });
//     return res.data;
//   } catch (err) {
//     console.error("❌ Assign task error:", err?.response?.status, err?.response?.data);
//     throw err;
//   }
// };

// src/api/auth.js
import API from "./api";

// ✅ Signup
export const signup = async (username, password, role) => {
  try {
    const res = await API.post("/auth/signup", { username, password, role });
    return res.data;
  } catch (err) {
    console.error("❌ Signup error:", err?.response?.status, err?.response?.data);
    throw err;
  }
};

// ✅ Login
export const login = async (username, password) => {
  try {
    const res = await API.post("/auth/login", { username, password });
    return res.data;
  } catch (err) {
    console.error("❌ Login error:", err?.response?.status, err?.response?.data);
    throw err;
  }
};

// // ✅ Logout
// export const logout = async () => {
//   try {
//     const res = await API.post("/auth/logout");
//     return res.data;
//   } catch (err) {
//     console.error("❌ Logout error:", err?.response?.status, err?.response?.data);
//     throw err;
//   }
// };

// ✅ Get Profile
export const getProfile = async () => {
  try {
    const res = await API.get("/auth/profile");
    //return res.data;
    return res;

  } catch (err) {
    console.error("❌ Profile fetch error:", err?.response?.status, err?.response?.data);
    throw err;
  }
};

// ✅ Get Tasks (accept profile as argument)
export const getTasks = async (profile) => {
  try {
    const res = profile.role === "ADMIN"
      ? await API.get("/tasks")
      : await API.get(`/tasks/user/${profile.id}`);
    return res.data;
  } catch (err) {
    console.error("❌ Get tasks error:", err?.response?.status, err?.response?.data);
    throw err;
  }
};

// ✅ Create Task
export const createTask = async (taskData) => {
  try {
    const res = await API.post("/tasks", taskData);
    return res.data;
  } catch (err) {
    console.error("❌ Create task error:", err?.response?.status, err?.response?.data);
    throw err;
  }
};

// ✅ Update Task
export const updateTask = async (taskId, updates) => {
  try {
    const res = await API.patch(`/tasks/${taskId}`, updates);
    return res.data;
  } catch (err) {
    console.error("❌ Update task error:", err?.response?.status, err?.response?.data);
    throw err;
  }
};

// ✅ Assign Task (admin only)
export const assignTask = async (taskId, userId) => {
  try {
    const res = await API.patch(`/tasks/${taskId}/assign`, { userId });
    return res.data;
  } catch (err) {
    console.error("❌ Assign task error:", err?.response?.status, err?.response?.data);
    throw err;
  }
};
 