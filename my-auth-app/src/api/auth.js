
import API from './api';

// ✅ Signup
export const signup = async (username, password, role) => {
  try {
    const res = await API.post('/auth/signup', { username, password, role });
    return res.data;
  } catch (err) {
    console.error("❌ Signup error:", err?.response?.status, err?.response?.data);
    throw err;
  }
};

// ✅ Login
export const login = async (username, password) => {
  try {
    const res = await API.post('/auth/login', { username, password });
    return res.data;
  } catch (err) {
    console.error("❌ Login error:", err?.response?.status, err?.response?.data);
    throw err;
  }
};

// ✅ Get Profile
export const getProfile = async () => {
  try {
    const res = await API.post('/auth/profile');
    return res.data;
  } catch (err) {
    console.error("❌ Profile fetch error:", err?.response?.status, err?.response?.data);
    throw err;
  }
};

// ✅ Get Tasks (admin → all, user → own)
// export const getTasks = async () => {
//   try {
//     const profile = await getProfile(); // ✅ Fix: define profile
//     const res = profile.role === 'admin'
//       ? await API.get('/tasks') // admin → all tasks
//       : await API.get(`/tasks/user/${profile.id}`); // user → own tasks
//     return res.data;
//   } catch (err) {
//     console.error("❌ Get tasks error:", err?.response?.status, err?.response?.data);
//     throw err;
//   }
// };

// ✅ Get Tasks (admin → all, user → own)
export const getTasks = async (profile) => {
  try {
    const res = profile.role === 'admin'
      ? await API.get('/tasks') // admin → all tasks
      : await API.get(`/tasks/user/${profile.id}`); // user → own tasks
    return res.data;
  } catch (err) {
    console.error("❌ Get tasks error:", err?.response?.status, err?.response?.data);
    throw err;
  }
};

// ✅ Create Task
export const createTask = async (taskData) => {
  try {
    const res = await API.post('/tasks', taskData);
    return res.data;
  } catch (err) {
    console.error("❌ Create task error:", err?.response?.status, err?.response?.data);
    throw err;
  }
};

// ✅ Update Task (user can update own, admin can update any)
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
