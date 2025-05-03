import React from 'react';
import './Complaints.css';

const transactions = [
  { customer: 'John Doe', date: '2025-04-01', amount: '$120.00', status: 'Approved' },
  { customer: 'Jane Smith', date: '2025-04-03', amount: '$75.50', status: 'Pending' },
  { customer: 'Alice Johnson', date: '2025-04-05', amount: '$200.00', status: 'Declined' },
  { customer: 'Bob Brown', date: '2025-04-07', amount: '$50.00', status: 'Approved' },
];

export default function Complaints() {
  return (
    <div className="transactions-section">
      <h3>Latest Complaints</h3>
      <table className="transactions-table">
        <thead>
          <tr>
            <th>Complaint ID</th>
            <th>Date</th>
            <th>Type</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn, index) => (
            <tr key={index}>
              <td>{txn.customer}</td>
              <td>{txn.date}</td>
              <td>{txn.amount}</td>
              <td>
                <span className={`status ${txn.status.toLowerCase()}`}>{txn.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
