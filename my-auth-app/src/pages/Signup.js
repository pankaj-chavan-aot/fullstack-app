// import { useState } from 'react';
// import { signup } from '../api/auth';

// export default function Signup() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     try {
//       await signup(username, password);
//       alert('Signup done, you can now login!');
//     } catch (err) {
      
//        console.log('Signup error:', err.response); // 
//       if (err.response?.data?.code === '409'  || err.response?.data?.message === 'Username already exists') {
//         alert('Username already exists, please choose another.');
//       } else {
//         alert('Signup failed');
//               console.error(err);

//       }
//     }
//   };

//   return (
//     <form onSubmit={handleSignup}>
//       <h2>Signup</h2>
//       <input
//         placeholder="Username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button type="submit">Signup</button>
//     </form>
//   );
// }

import { useState } from 'react';
import { signup } from '../api/auth';
import './Signup.css';  // CSS import

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await signup(username, password);
      alert('Signup done, you can now login!');
      setUsername('');
      setPassword('');
    } catch (err) {
      console.log('Signup error:', err.response);
      if (
        err.response?.data?.code === '409' ||
        err.response?.data?.message === 'Username already exists'
      ) {
        setError('Username already exists, please choose another.');
      } else {
        setError('Signup failed. Please try again.');
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignup} className="signup-form">
      <h2 className="signup-title">Signup</h2>
      <input
        className="signup-input"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="signup-input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <div className="signup-error">{error}</div>}
      <button className="signup-button" type="submit" disabled={loading}>
        {loading ? 'Signing up...' : 'Signup'}
      </button>
    </form>
  );
}
