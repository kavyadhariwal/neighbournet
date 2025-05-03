import React from "react";
import "./Members.css";

const Members = () => {
  const member = {
    name: "Aman Shah",
    role: "Authority",
    password:"Aman123",
  };

  return (
    <div className="members-container">
      <h3>Authority Member</h3>
      <div className="member-card">
        
        <div className="member-info">
          <span className="member-name">{member.name}</span>
          <span className="member-role">{member.role}</span>
          <span className="member-password">Password:{member.password}</span>
        </div>
      </div>
    </div>
  );
};

export default Members;
