import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true, // ✅ cookie allow करण्यासाठी
});

export default API;
