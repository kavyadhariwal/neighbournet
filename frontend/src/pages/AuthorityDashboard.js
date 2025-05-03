import React, { useState, useEffect } from 'react';
import './AuthorityDashboard.css';

const AuthorityDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/complaints/'); // Ensure correct URL
        if (!response.ok) {
          throw new Error('Failed to fetch complaints');
        }
        const data = await response.json();
        setComplaints(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:8000/api/complaints/${id}/`, {  // Use correct endpoint
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update status');
      }
  
      setComplaints((prev) =>
        prev.map((complaint) =>
          complaint.id === id ? { ...complaint, status: newStatus } : complaint
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Error updating status. Please try again.');
    }
  };
  

  if (loading) {
    return <div>Loading complaints...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="authority-dashboard">
      <h2>Authority Dashboard</h2>
      <table className="complaints-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            
            <th>Category</th>
            <th>Complaint</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Update Status</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.name}</td>
              
              <td>{c.category}</td>
              <td>{c.complaint}</td>
              <td>{c.status}</td>
              <td>{new Date(c.created_at).toLocaleString()}</td>
              <td>
                <select
                  value={c.status}
                  onChange={(e) => updateStatus(c.id, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Solved">Solved</option>
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
