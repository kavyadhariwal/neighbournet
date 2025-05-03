import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Login.css'; 
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer';

const Login = () => { 
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    fetch('http://localhost:8000/api/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.token) {
          localStorage.setItem('token', data.token); // ✅ Store token
          localStorage.setItem('username', username);
          console.log("Login successful");
          navigate('/profile'); 
        } else {
          alert("Login failed: " + (data.error || "Unknown error"));
        }
      })
      .catch(error => {
        console.error("Error logging in:", error);
        alert("Something went wrong. Try again.");
      });
  };

  return (
    <>
      <Navbar /> 
      <div className="login-container">
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          /><br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          /><br />
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Login;
