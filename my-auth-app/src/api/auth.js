// src/api/auth.js
import API from './api'; // इथे import करा, पुन्हा define करू नकोस

// Signup
export const signup = async (username, password) => {
  try {
    const res = await API.post('/auth/signup', { username, password });
    return res.data;
  } catch (err) {
    console.error("❌ Signup error:", err?.response?.status, err?.response?.data);
    throw err;
  }
};

// Login
export const login = async (username, password) => {
  try {
    const res = await API.post('/auth/login', { username, password });
    return res.data;
  } catch (err) {
    console.error("❌ Login error:", err?.response?.status, err?.response?.data);
    throw err;
  }
};

// Profile (cookie वापरून protected route)
export const getProfile = async () => {
  try {
    const res = await API.post('/auth/profile');
    return res.data;
  } catch (err) {
    console.error("❌ Profile fetch error:", err?.response?.status, err?.response?.data);
    throw err;
  }
};

// Tasks
export const getTasks = async () => {
  try {
    const res = await API.get('/tasks/me');
    return res.data;
  } catch (err) {
    console.error("❌ Get tasks error:", err?.response?.status, err?.response?.data);
    throw err;
  }
};
