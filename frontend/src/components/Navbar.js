import React from 'react';

export default function Navbar() {
  const navStyle = {
    width: '100vw',
    backgroundColor: '#007BFF',
    color: 'white',
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
    color: 'white',
    textDecoration: 'none',
    fontSize: '16px',
  };

  return (
    <nav style={navStyle}>
      <div style={titleStyle}>NeighbourNet</div>
      <a href="/login" style={loginStyle}>Login</a>
    </nav>
  );
}
