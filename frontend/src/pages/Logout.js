// src/pages/Logout.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from '../components/Layout';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    
    alert("You have been logged out!");
    navigate("/"); 
  }, [navigate]);

  return (
    <Layout>
      <div className="logout-container">
        <h2>Logging you out...</h2>
      </div>
    </Layout>
  );
};

export default Logout;
