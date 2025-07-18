// src/api/api.js
import axios from "axios";

const API = axios.create({
  //baseURL: process.env.REACT_APP_API_URL || "http://localhost:3000",
    baseURL: 'https://task-management-api-f496.onrender.com',

  withCredentials: true,
});

export default API;
