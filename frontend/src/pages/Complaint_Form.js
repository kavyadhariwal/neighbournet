import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../complaint_form.css"; 


export default function ComplaintForm() {
  const [complaint, setComplaint] = useState({
    subject: "",
    category: "Electricity",
    description: "",
    address: "",
    date: new Date().toISOString().slice(0, 10),
    location: { lat: 23.2230, lng: 72.6500 },
  });

  const handleChange = (e) => {
    setComplaint({ ...complaint, [e.target.name]: e.target.value });
  };

  function LocationMarker() {
    useMapEvents({
      click(e) {
        setComplaint((prev) => ({
          ...prev,
          location: {
            lat: e.latlng.lat,
            lng: e.latlng.lng,
          },
        }));
      },
    });

    return <Marker position={[complaint.location.lat, complaint.location.lng]} />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: complaint.subject,
      email: "test@example.com", // Replace with actual email field if needed
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

          <label>Date:</label>
          <input type="date" name="date" value={complaint.date} disabled />

          <label>Select Location:</label>
          <MapContainer
            center={[complaint.location.lat, complaint.location.lng]}
            zoom={13}
            className="map-container"
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <LocationMarker />
          </MapContainer>

          <p className="map-note">Click on the map to select a location</p>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
   
  );
}
