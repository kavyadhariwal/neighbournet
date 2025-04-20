// src/pages/About.js
import React from "react";
import Layout from '../components/Layout';
import './About.css';

const About = () => {
  return (
    <Layout>
      <div className="about-container">
        <h1>About NeighbourNet</h1>
        <p>
          Neighbournet is a community platform that empowers residents to easily
          report neighborhood issues such as electricity faults, garbage collection,
          potholes, and more.
        </p>
        <p>
          Our goal is to streamline communication between citizens and local
          authorities to create cleaner, safer, and more responsive communities.
        </p>
      </div>
    </Layout>
  );
};

export default About;
