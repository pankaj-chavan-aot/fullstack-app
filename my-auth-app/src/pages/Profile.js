import { useEffect, useState } from 'react';
import { getProfile } from '../api/auth';
import './Profile.css';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await getProfile();
        setUser(data);
      } catch (err) {
        console.error('Profile fetch error:', err);
        setError('Unable to load profile. Please login.');
      }
    }

    fetchProfile();
  }, []);

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2 className="profile-title">User Profile</h2>

        {error && <div className="profile-error">{error}</div>}

        {user ? (
          <>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Role:</strong> {user.role}</p>
            <p><strong>ID:</strong> {user.id}</p>
          </>
        ) : (
          !error && <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
