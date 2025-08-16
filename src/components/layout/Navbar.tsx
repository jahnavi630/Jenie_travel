
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/navbar.css';

const Navbar: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-text">Jenie</span>
          <span className="logo-icon">✈️</span>
        </Link>

        <div className="menu-icon" onClick={toggleMenu}>
          <div className={`menu-icon-bar ${menuOpen ? 'open' : ''}`}></div>
          <div className={`menu-icon-bar ${menuOpen ? 'open' : ''}`}></div>
          <div className={`menu-icon-bar ${menuOpen ? 'open' : ''}`}></div>
        </div>

        <ul className={`navbar-menu ${menuOpen ? 'open' : ''}`}>
          <li className={`navbar-item ${isActive('/')}`}>
            <Link to="/" className="navbar-link" onClick={() => setMenuOpen(false)}>Home</Link>
          </li>
          <li className={`navbar-item ${isActive('/bookings')}`}>
            <Link to="/bookings" className="navbar-link" onClick={() => setMenuOpen(false)}>Bookings</Link>
          </li>
          <li className={`navbar-item ${isActive('/budget')}`}>
            <Link to="/budget" className="navbar-link" onClick={() => setMenuOpen(false)}>Budget</Link>
          </li>
          <li className={`navbar-item ${isActive('/story')}`}>
            <Link to="/story" className="navbar-link" onClick={() => setMenuOpen(false)}>Travel Story</Link>
          </li>
          <li className={`navbar-item ${isActive('/emergency')}`}>
            <Link to="/emergency" className="navbar-link" onClick={() => setMenuOpen(false)}>Emergency</Link>
          </li>
          <li className={`navbar-item ${isActive('/surprise')}`}>
            <Link to="/surprise" className="navbar-link" onClick={() => setMenuOpen(false)}>Surprise Me</Link>
          </li>
          <li className={`navbar-item ${isActive('/jenie-tools')}`}>
            <Link to="/jenie-tools" className="navbar-link" onClick={() => setMenuOpen(false)}>Jenie AI Tools</Link>
          </li>
          <li className={`navbar-item ${isActive('/contact')}`}>
            <Link to="/contact" className="navbar-link" onClick={() => setMenuOpen(false)}>Contact</Link>
          </li>
          
          {currentUser ? (
            <li className="navbar-item">
              <button className="btn btn-outline navbar-btn" onClick={handleLogout}>Logout</button>
            </li>
          ) : (
            <>
              <li className="navbar-item">
                <Link to="/login" className="btn btn-outline navbar-btn" onClick={() => setMenuOpen(false)}>Login</Link>
              </li>
              <li className="navbar-item">
                <Link to="/register" className="btn btn-primary navbar-btn" onClick={() => setMenuOpen(false)}>Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
