// import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import Tasks from './pages/Tasks';

// function App() {
//   return (
//     <BrowserRouter>
//       <nav>
//         <Link to="/signup">Signup</Link> | <Link to="/login">Login</Link> | <Link to="/tasks">Tasks</Link>
//       </nav>
//       <Routes>
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/tasks" element={<Tasks />} />
//       </Routes> 
//     </BrowserRouter>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Tasks from './pages/Tasks';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/signup">Signup</Link> | 
        <Link to="/login">Login</Link> | 
        <Link to="/tasks">Tasks</Link>
      </nav>

      <Routes>
        {/* ✅ Root route fix */}
        <Route path="/" element={<Login />} />
        
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tasks" element={<Tasks />} />

        {/* ✅ Optional: 404 fallback */}
        <Route path="*" element={<h2>404 - Page Not Found</h2>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
