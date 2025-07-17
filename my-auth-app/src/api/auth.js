import axios from 'axios';

console.log("\u2705 BASE URL =", process.env.REACT_APP_API_URL);

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,  // कुक्टी cookie-auth साठी जाओन्यासाठी पाठवाण्यासाठी
});

// Signup API
export const signup = async (username, password) => {
  try {
    const res = await API.post('/auth/signup', { username, password });
    return res.data;
  } catch (err) {
    console.error("❌ Signup error:", err?.response?.status, err?.response?.data);
    throw err;
  }
};

// Login API
export const login = async (username, password) => {
  try {
    const res = await API.post('/auth/login', { username, password });
    return res.data;
  } catch (err) {
    console.error("❌ Login error:", err?.response?.status, err?.response?.data);
    throw err;
  }
};

// Profile fetch API (POST /auth/profile)
export const getProfile = async () => {
  try {
    const res = await API.post('/auth/profile', {}); // जाकी POST हे म्हणे body खाली नाही जाओ मगे headers ञाणीकी cookie जाओन्यासाठी
    return res.data;
  } catch (err) {
    console.error("❌ Profile fetch error:", err?.response?.status, err?.response?.data);
    throw err;
  }
};

// Get tasks for current logged-in user
export const getTasks = async () => {
  try {
    const res = await API.get('/tasks/me');
    return res.data;
  } catch (err) {
    console.error("❌ Get tasks error:", err?.response?.status, err?.response?.data);
    throw err;
  }
};
