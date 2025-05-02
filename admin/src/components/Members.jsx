import React from 'react';
import './Members.css';

const members = [
  { name: 'John Doe', role: 'Software Engineer' },
  { name: 'Jane Smith', role: 'Product Manager' },
  { name: 'Alice Johnson', role: 'UX Designer' },
  { name: 'Bob Brown', role: 'Data Analyst' },
];

export default function Members() {
  return (
    <div className="members-section">
      <h3>New Join Members</h3>
      {members.map((member, index) => (
        <div className="member-item" key={index}>
          <div className="member-avatar"></div>
          <div className="member-info">
            <span className="member-name">{member.name}</span>
            <span className="member-role">{member.role}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
