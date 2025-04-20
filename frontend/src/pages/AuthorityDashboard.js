'use client'
import { useState, useEffect } from "react";
import './AuthorityDashboard.css';  // Import the CSS file

const AuthorityDashboard = () => {
  const [complaints, setComplaints] = useState([]); // No typing here

  useEffect(() => {
    fetch("/api/complaints")
      .then((res) => res.json())
      .then((data) => setComplaints(data)) // No type definition
      .catch((error) => console.error("Error fetching complaints:", error));
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`/api/complaints/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setComplaints((prevComplaints) =>
          prevComplaints.map((complaint) =>
            complaint.id === id ? { ...complaint, status: newStatus } : complaint
          )
        );
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="authority-dashboard">
      <h2 className="heading">Authority Dashboard</h2>
      <table className="complaints-table">
        <thead>
          <tr>
            <th>CID</th>
            <th>Issue Type</th>
            <th>Location</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((complaint) => (
            <tr key={complaint.id}>
              <td>{complaint.id}</td>
              <td>{complaint.issue_type}</td>
              <td>{complaint.location}</td>
              <td>{complaint.date}</td>
              <td>{complaint.status}</td>
              <td>
                <select
                  value={complaint.status}
                  onChange={(e) => updateStatus(complaint.id, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Work in Progress">Work in Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AuthorityDashboard;
