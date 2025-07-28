// src/api/api.js
import axios from "axios";

const API = axios.create({
  //baseURL: process.env.REACT_APP_API_URL || "http://localhost:3000",
    //baseURL: 'https://task-management-api-f496.onrender.com',
    baseURL: import.meta.env.VITE_API_URL,


  withCredentials: true,
});

export default API;
