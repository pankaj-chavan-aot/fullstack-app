// import { useState } from 'react';
// import { login, getProfile } from '../api/auth';

// export default function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try { 
//       await login(username, password);
//       const res = await getProfile();
//       alert(`Welcome, ${res.data.username}`);
//     } catch (err) {
//       if (err.response?.status === 401) {
//         alert('Unauthorized: Please login correctly');
//       } else {
//         alert('Login failed');
//       }
//     }
//   };

//   return (
//     <form onSubmit={handleLogin}>
//       <h2>Login</h2>
//       <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
//       <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
//       <button type="submit">Login</button>
//     </form>
//   );
// }

import { useState } from 'react';
import { login, getProfile } from '../api/auth';
import './Login.css';  // CSS import

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await login(username, password);
      const res = await getProfile();
      alert(`Welcome, ${res.username}`);
    } catch (err) {
      if (err.response?.status === 401) {
        setError('Unauthorized: Please login correctly');
      } else {
        setError('Login failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="login-form">
      <h2 className="login-title">Login</h2>
      <input
        className="login-input"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        className="login-input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      {error && <div className="login-error">{error}</div>}
      <button className="login-button" type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
