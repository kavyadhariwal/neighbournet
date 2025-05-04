
import React, { useState, useEffect } from 'react';
import './Complaints.css';

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    // Fetch complaints data from the backend
    fetch('http://localhost:8000/api/complaints/')
      .then((res) => res.json())
      .then((data) => setComplaints(data))
      .catch((error) => console.error('Error fetching complaints:', error));
  }, []);

  return (
    <div className="complaints-container">
      <h2>Complaints List</h2>
      <table className="complaints-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            
            <th>Category</th>
            <th>Complaint</th>
            <th>Status</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((complaint) => (
            <tr key={complaint.id}>
              <td>{complaint.id}</td>
              <td>{complaint.name}</td>
              
              <td>{complaint.category}</td>
              <td>{complaint.complaint}</td>
              <td
                className={`status-cell ${complaint.status === 'Pending' ? 'pending' : 'solved'}`}
              >
                {complaint.status}
              </td>
              <td>{new Date(complaint.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Complaints;
