import React, { useEffect, useState } from 'react';
import './Transactions.css';
import axios from 'axios';

export default function Transactions() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/latest-complaints/')
      .then(response => setComplaints(response.data))
      .catch(error => console.error('Error fetching complaints:', error));
  }, []);

  return (
    <div className="transactions-section">
      <h3>Latest Complaints</h3>
      <table className="transactions-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Complaint</th>
            <th>Status</th>
            
          </tr>
        </thead>
        <tbody>
          {complaints.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.name}</td>
              <td>{c.category}</td>
              <td>{c.complaint}</td>
              <td>
                <span className={`status ${c.status.toLowerCase()}`}>{c.status}</span>
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
