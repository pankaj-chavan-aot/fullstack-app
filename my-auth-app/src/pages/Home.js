// src/pages/Home.jsx
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-wrapper">
      <nav className="navbar">
        <div className="logo">📝 TaskApp</div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/signup">Signup</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/tasks">Tasks</Link></li>
          <li><Link to="/profile">Profile</Link></li>
        </ul>
      </nav>

      <main className="home-container">
        <h1 className="home-title">Welcome to the Task Management App</h1>
        <p className="home-subtitle">Manage your tasks efficiently with role-based access.</p>
      </main>
    </div>
  );
}
