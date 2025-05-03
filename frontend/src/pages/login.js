import React, { useState } from 'react';
import './Login.css'; // Create this file to keep styles separate

const Login = () => {
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
          localStorage.setItem('token', data.token);
          localStorage.setItem('username', username); // ✅ Save username here
          console.log("Login successful");
          window.location.href = '/profile';
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
  );
};

export default Login;
