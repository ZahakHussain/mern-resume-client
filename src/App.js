import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import ResumeBuilder from "./ResumeBuilder"; // rename old App to ResumeBuilder.js
import ResumeList from "./ResumeList";

const App = () => {
  return (
    <Router>
      <nav className="p-4 space-x-4 bg-gray-100">
        <Link to="/">Resume</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
      </nav>
      <Routes>
        <Route path="/" element={<ResumeBuilder />} />
        <Route path="/resumes" element={<ResumeList />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;