import axios from "axios";

// 🌐 API बेस URL सेट करा
axios.defaults.baseURL = "https://task-management-api-f496.onrender.com";

// 🍪 Cookie (jwt) प्रत्येक request सोबत पाठवण्यासाठी
axios.defaults.withCredentials = true;

export default axios;
