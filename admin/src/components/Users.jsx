import React from "react";
import "./Users.css";

const Users = () => {
  const users = [
    { id: "John Doe", date: "2025-04-01", email: "$120.00" },
    { id: "Jane Smith", date: "2025-04-03", email: "$75.50" },
    { id: "Alice Johnson", date: "2025-04-05", email: "$200.00" },
    { id: "Bob Brown", date: "2025-04-07", email: "$50.00" },
  ];

  return (
    <div className="users-container">
      <h3>Users</h3>
      <table className="users-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Username</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr key={idx}>
              <td>{user.id}</td>
              <td>{user.date}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
