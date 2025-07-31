// // import React, { useEffect, useState } from 'react';
// // import API from '../api/api'; // तुमचं axios instance

// // const Profile = () => {
// //   const [user, setUser] = useState(null);

// //   useEffect(() => {
// //     const fetchProfile = async () => {
// //       try {
// //       //  const res = await API.post('/auth/profile'); // ✅ cookie-auth protected API call
// //       const res = await API.post('/auth/profile', {}, { withCredentials: true });

// //         setUser(res.data);
// //       } catch (err) {
// //         console.error('❌ Profile fetch failed:', err);
// //         // Optional: redirect to login
// //         // navigate('/login');
// //       }
// //     };

// //     fetchProfile();
// //   }, []);

// //   return (
// //     <div>
// //       <h2>👤 User Profile</h2>
// //       {user ? (
// //         <div>
// //           <p><strong>Username:</strong> {user.username}</p>
// //           <p><strong>Role:</strong> {user.role}</p>
// //           {/* Add more fields as needed */}
// //         </div>
// //       ) : (
// //         <p>Loading profile...</p>
// //       )}
// //     </div>
// //   );
// // };

// // export default Profile;

// import React, { useEffect, useState } from 'react';
// import API from '../api/api';
// import './Profile.css';

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
//       <h2 className="profile-title">👤 User Profile</h2>
//       {user ? (
//         <div className="profile-details">
//           <p><span className="profile-label">Username:</span> {user.username}</p>
//           <p><span className="profile-label">Role:</span> {user.role}</p>
//         </div>
//       ) : (
//         <p className="profile-loading">Loading profile...</p>
//       )}
//     </div>
//   );
// };

// export default Profile;


import React, { useEffect, useState } from 'react';
import API from '../api/api';
import './Profile.css'; // ✅ CSS जोडली आहे

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.post('/auth/profile', {}, { withCredentials: true });
        setUser(res.data);
      } catch (err) {
        console.error('❌ Profile fetch failed:', err);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="profile-container">
      <h2 className="profile-heading">👤 User Profile</h2>
      {user ? (
        <div className="profile-card">
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
