import React, { useState } from "react";
import "../complaint_form.css"; 

export default function ComplaintForm() {
  const [complaint, setComplaint] = useState({
    subject: "",
    category: "Electricity",
    description: "",
    address: "",
    email: "", 
    date: new Date().toISOString().slice(0, 10),
    location: { lat: 23.2230, lng: 72.6500 },
  });

  const handleChange = (e) => {
    setComplaint({ ...complaint, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: complaint.subject,
      email: complaint.email,  
      category: complaint.category,
      complaint: complaint.description,
    };

    try {
      const response = await fetch("http://localhost:8000/api/complaints/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Complaint submitted successfully");
      } else {
        alert("Error submitting complaint");
      }
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <div className="complaint-form-container">
      <div className="form-box">
        <h2>Report an Issue</h2>
        <form onSubmit={handleSubmit}>
          <label>Subject:</label>
          <input
            type="text"
            name="subject"
            value={complaint.subject}
            onChange={handleChange}
            required
          />

          <label>Category:</label>
          <select
            name="category"
            value={complaint.category}
            onChange={handleChange}
          >
            <option value="Electricity">Electricity</option>
            <option value="Water">Water</option>
            <option value="Potholes">Potholes</option>
            <option value="Garbage">Garbage Collection</option>
            <option value="Streetlights">Street Lights</option>
            <option value="Sewage">Sewage</option>
            <option value="Other">Other</option>
          </select>

          <label>Description:</label>
          <textarea
            name="description"
            value={complaint.description}
            onChange={handleChange}
            required
          />

          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={complaint.address}
            onChange={handleChange}
            required
          />

          <label>Email:</label> 
          <input
            type="email"
            name="email"
            value={complaint.email}
            onChange={handleChange}
            required
          />

          <label>Date:</label>
          <input type="date" name="date" value={complaint.date} disabled />

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
