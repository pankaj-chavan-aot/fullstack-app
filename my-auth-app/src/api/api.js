import axios from 'axios';

// 🔧 Axios instance तयार करा
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,  // 👉 .env मधून API base URL घेणं
  withCredentials: true,                   // ✅ cookies frontend वरून backend ला पाठवण्यासाठी
});

export default API;

