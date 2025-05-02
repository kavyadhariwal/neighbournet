import React from 'react';
import './Card.css';

export default function Card({ title, value, change, color }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <div className="value">{value}</div>
      <div className={`change ${color}`}>{change}</div>
    </div>
  );
}
