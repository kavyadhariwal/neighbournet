import React from 'react';
import { Link, useNavigate } from "react-router-dom";
export default function Navbar() {
  const navStyle = {
    width: '100vw',
    backgroundColor: '#e6f0ff', 
    color: '#333',
    padding: '15px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0',
    marginBottom: '20px',
    boxSizing: 'border-box',
    position: 'relative',
    top: '0',
  };  

  const titleStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
  };

  const loginStyle = {
    color: '#003366', 
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: '500',
  };
  

  const logoStyle = {
    height: '50px',
    width: '70px',
  };
  

  return (
    <nav style={navStyle}>
       <Link to="/" className="logo">
     <img src="/logo.png" alt="Neighbournet logo" style={logoStyle} />
     </Link>

      <a href="/login" style={loginStyle}>Login</a>
    </nav>
  );
}
