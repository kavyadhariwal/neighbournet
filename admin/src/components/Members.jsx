import React from "react";
import "./Members.css";

const Members = () => {
  const member = {
    name: "John Doe",
    role: "Software Engineer",
  };

  return (
    <div className="members-container">
      <h3>Authority Member</h3>
      <div className="member-card">
        <div className="member-avatar"></div>
        <div className="member-info">
          <span className="member-name">{member.name}</span>
          <span className="member-role">{member.role}</span>
        </div>
      </div>
    </div>
  );
};

export default Members;
