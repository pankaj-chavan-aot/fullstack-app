

import axios from "axios";

console.log("✅ API Base URL:", process.env.REACT_APP_API_URL);

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL ||  "https://task-management-api-f496.onrender.com", // fallback
  withCredentials: true,
});

export default API;
