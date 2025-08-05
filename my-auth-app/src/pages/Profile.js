
// // export default Profile;


// import React, { useEffect, useState } from 'react';
// import API from '../api/api';
// import './Profile.css'; // ✅ CSS जोडली आहे

// const Profile = () => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await API.post('/auth/profile', {}, { withCredentials: true });
//         setUser(res.data);
//       } catch (err) {
//         console.error('❌ Profile fetch failed:', err);
//       }
//     };

//     fetchProfile();
//   }, []);

//   return (
//     <div className="profile-container">
//       <h2 className="profile-heading">👤 User Profile</h2>
//       {user ? (
//         <div className="profile-card">
//           <p><strong>Username:</strong> {user.username}</p>
//           <p><strong>Role:</strong> {user.role}</p>
//         </div>
//       ) : (
//         <p>Loading profile...</p>
//       )}
//     </div>
//   );
// };

// export default Profile;

import { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/auth/profile")
      .then((res) => setUser(res.data))
      .catch(() => navigate("/login")); // not logged in
  }, [navigate]);

  const handleLogout = async () => {
    await API.post("/auth/logout");
    navigate("/login");
  };

  return (
    <div>
      <h2>Profile</h2>
      {user ? (
        <>
          <p>Username: {user.username}</p>
          <p>Role: {user.role}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
