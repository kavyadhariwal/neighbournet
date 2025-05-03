import React from 'react';
import './Sidebar.css';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <img src="/logo.png" alt="emilus logo" className="logo" />
      <nav>
        <ul>
          <li className="active">Connecting Communities, Empowering Authorities</li>
        </ul>
      </nav>
    </aside>
  );
}
