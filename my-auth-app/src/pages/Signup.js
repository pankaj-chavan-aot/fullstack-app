

// import { useState } from 'react';
// import { signup } from '../api/auth';
// import './Signup.css';

// export default function Signup() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('USER');
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     setSuccess('');

//     try {
//       await signup(username, password, role);
//       setSuccess('Signup successful! You can now login.');
//       setUsername('');
//       setPassword('');
//       setRole('USER');
//     } catch (err) {
//       console.log('Signup error:', err?.response);
//       if (
//         err.response?.data?.code === '409' ||
//         err.response?.data?.message === 'Username already exists'
//       ) {
//         setError('Username already exists. Please choose another.');
//       } else {
//         setError('Signup failed. Please try again.');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="signup-container">
//       <form onSubmit={handleSignup} className="signup-form">
//         <h2 className="signup-title">Create an Account</h2>

//         <input
//           className="signup-input"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//         />

//         <input
//           className="signup-input"
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />

//         <select
//           className="signup-input"
//           value={role}
//           onChange={(e) => setRole(e.target.value)}
//         >
//           <option value="USER">User</option>
//           <option value="ADMIN">Admin</option>
//         </select>

//         {error && <div className="signup-error">{error}</div>}
//         {success && <div className="signup-success">{success}</div>}

//         <button className="signup-button" type="submit" disabled={loading}>
//           {loading ? 'Signing up...' : 'Signup'}
//         </button>
//       </form>
//     </div>
//   );
// }
import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({ username: "", password: "", role: "user" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await API.post("/auth/signup", form);
      navigate("/login");
    } catch (err) {
      console.error("Signup error:", err?.response?.data || err.message);
      setError(err?.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <select name="role" onChange={handleChange}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}
