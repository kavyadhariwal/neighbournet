import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import Card from './components/Card';
import Users from './components/Users';
import Complaints from './components/Complaints';
import NewMembers from './components/Members';
import './App.css';

export default function App() {
  const [stats, setStats] = useState({
    total_users: 0,
    total_products: 0,
    total_complaints: 0,
  });

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/admin-stats/')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error('Failed to fetch admin stats:', err));
  }, []);

  return (
    <div className="dashboard">
      <Sidebar />
      <main className="dashboard-main">
        <h1 className="dashboard-title">NeighbourNet</h1>
        <div className="dashboard-cards">
          <Card title="Users" value={stats.total_users} color="text-red-500" />
          <Card title="Products" value={stats.total_products} color="text-green-500" />
          <Card title="Complaints" value={stats.total_complaints} color="text-green-500" />
        </div>
        <div className="dashboard-content">
          <Users />
          <NewMembers />
        </div>
        <Complaints />
      </main>
    </div>
  );
}
