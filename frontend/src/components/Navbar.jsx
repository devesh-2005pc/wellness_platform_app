import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-inner">
        {/* Left: Logo */}
        <div className="navbar-logo">
          <Link to="/dashboard">🧘 Wellness Hub</Link>
        </div>

        {/* Center: Links */}
        <div className="navbar-center">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/my-sessions">My Sessions</Link>
          <Link to="/editor">Create Session</Link>
        </div>

        {/* Right: Logout */}
        <div className="logout-btn">
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
