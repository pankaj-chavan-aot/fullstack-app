import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Tasks from './pages/Tasks';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/signup">Signup</Link> | <Link to="/login">Login</Link> | <Link to="/tasks">Tasks</Link>
      </nav>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tasks" element={<Tasks />} />
      </Routes> 
    </BrowserRouter>
  );
}

export default App;
