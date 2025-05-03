"use client";
import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import { MDBIcon } from 'mdb-react-ui-kit';

export default function Footer() {
  return (
    <footer className="custom-footer">
      {/* Top Bar */}
      <div className="footer-top-bar">
        <span>Get connected with us</span>
      </div>

      {/* Main Content */}
      <div className="footer-content">
        <div className="footer-column">
          <h6 className="footer-title">
            <MDBIcon icon="gem" className="me-2" />
            NeighborNet
          </h6>
          <p>
            "NeighborNet – Connecting your community with local updates, services, and a thriving marketplace. Stay engaged, stay informed!"
          </p>
        </div>

        <div className="footer-column">
          <h6 className="footer-title">Useful Links</h6>
          <p><Link to="/about" className="footer-link">About Us</Link></p>
        </div>

        <div className="footer-column">
          <h6 className="footer-title">Contact</h6>
          <p><MDBIcon icon="home" className="me-2" />Gandhinagar, Gujarat</p>
          <p><MDBIcon icon="envelope" className="me-2" />neighbournet@gmail.com</p>
          <p><MDBIcon icon="phone" className="me-2" />+91 93456 72188</p>
          <p><MDBIcon icon="print" className="me-2" />+91 99356 78919</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        © 2025 NeighborNet
      </div>
    </footer>
  );
}
