import React from 'react';
import './Sidebar.css';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="logo">emilus</h2>
      <nav>
        <ul>
          <li className="active">Dashboard</li>
          <li>Analytics</li>
          <li>Sales</li>
          <li>Mail</li>
          <li>Chat</li>
          <li>Calendar</li>
          <li>Project</li>
          <li>E-Commerce</li>
        </ul>
      </nav>
    </aside>
  );
}
