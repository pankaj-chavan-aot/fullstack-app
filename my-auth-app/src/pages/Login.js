import { useState } from 'react';
import { login, getProfile } from '../api/auth';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      const res = await getProfile();
      alert(`Welcome, ${res.data.username}`);
    } catch (err) {
      if (err.response?.status === 401) {
        alert('Unauthorized: Please login correctly');
      } else {
        alert('Login failed');
      }
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
}
