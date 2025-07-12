import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,  // 🍪 Cookie साठी गरजेचं आहे
});

// Signup API
export const signup = (username, password) =>
  API.post('/auth/signup', { username, password });

// Login API
export const login = (username, password) =>
  API.post('/auth/login', { username, password });

// Profile fetch API (POST /auth/profile)
export const getProfile = () =>
  API.post('/auth/profile');


// Get tasks for current logged-in user
export const getTasks = () =>
  API.get('/tasks/me');
