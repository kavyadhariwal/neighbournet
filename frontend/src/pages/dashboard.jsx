import React from 'react';
import { useNavigate } from 'react-router-dom';
import AddProductForm from '../components/AddProductForm';
import '../dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <div className="dashboard-header">
          <h2 className="dashboard-heading">Welcome, {username}!</h2>
        </div>
        <p className="dashboard-subtext">Add your products below.</p>
        <AddProductForm />
      </div>
    </div>
  );
};

export default Dashboard;
