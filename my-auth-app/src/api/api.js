// // // src/api/api.js
// // import axios from "axios";

// // const API = axios.create({
// //   //baseURL: process.env.REACT_APP_API_URL || "http://localhost:3000",
// //     //baseURL: 'https://task-management-api-f496.onrender.com',
// //     baseURL: import.meta.env.VITE_API_URL,


// //   withCredentials: true,
// // });

// // export default API;
// import axios from "axios";
// // src/api/api.js किंवा auth.js मध्ये
// console.log("🧪 Axios baseURL:", axios.defaults.baseURL);

// const API = axios.create({
//   baseURL: process.env.REACT_APP_API_URL,
//   withCredentials: true, // ⬅️ Important for cookies (auth)
// });
 
// export default API;
import axios from "axios";

console.log("🌍 API URL:", process.env.REACT_APP_API_URL); // ✅ verify
const API = axios.create({
  baseURL: "https://task-management-api-f496.onrender.com", // TEMP for debug
  withCredentials: true,
});

// const API = axios.create({
//   baseURL: process.env.REACT_APP_API_URL,
//   withCredentials: true,
// });

export default API;


