// src/components/Layout.js
import React, { useState } from "react";
import { FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate } from "react-router-dom";
import "./layout.css";
import Footer from './Footer';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  return (
    <div className="layout">
      <nav className="navbar">
        <div className="nav-left">
          <Link to="/homepage" className="logo">
            <img src="/logo.png" alt="NeighbourNet Logo" className="logo-img" />
          </Link>
        </div>

        <div className="nav-right">
          <div className="nav-item profile-wrapper" onClick={toggleDropdown}>
            <FaUserCircle size={28} />
            {showDropdown && (
              <div className="dropdown-menu">
                <button onClick={() => navigate('/profile')}>My Profile</button>
              </div>
            )}
          </div>
          <Link to="/complaints" className="nav-item">Complaints</Link>
          <Link to="/logout" className="nav-item">Logout</Link>
        </div>
      </nav>

      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
