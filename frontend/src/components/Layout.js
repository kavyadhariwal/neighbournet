// src/components/Layout.js
import React from "react";
import { Link } from "react-router-dom";
import "./layout.css";
import Footer from './Footer.js';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <div className="layout">
  {/* Navbar */}
  <nav className="navbar">
    <div className="nav-left">
      <Link to="/homepage" className="logo">
        <img src="/logo.png" alt="NeighbourNet Logo" className="logo-img" />
      </Link>
    </div>
    <div className="nav-right">
      <Link to="/complaint-form">Complaints</Link>
      <Link to="/logout">Logout</Link>
    </div>
  </nav>
</div>


      {/* Page content */}
      <main>{children}</main>

      {/* Footer */}
     <Footer/>
    </div>
  );
};

export default Layout;
