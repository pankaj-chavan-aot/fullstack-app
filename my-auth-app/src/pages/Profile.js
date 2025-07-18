import React, { useEffect, useState } from 'react';
import API from '../api/api'; // तुमचं axios instance

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.post('/auth/profile'); // ✅ cookie-auth protected API call
        setUser(res.data);
      } catch (err) {
        console.error('❌ Profile fetch failed:', err);
        // Optional: redirect to login
        // navigate('/login');
      }
    };

    fetchProfile();
  }, []);

  return (
    <div>
      <h2>👤 User Profile</h2>
      {user ? (
        <div>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Role:</strong> {user.role}</p>
          {/* Add more fields as needed */}
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
