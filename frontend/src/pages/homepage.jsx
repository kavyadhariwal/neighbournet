// src/pages/homepage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleSellerClick = () => {
    navigate('/dashboard');
  };

  return (
    <div className="main-container">
      <div className="announcement">NeighborNet is now public!</div>

      <h1 className="main-heading">
        Everything about your <span className="highlight">neighborhood</span> in seconds.
      </h1>

      <p className="description">
        NeighborNet allows you to share resources. Simply upload your product and
        start selling right away.
      </p>

      <button className="get-started" onClick={() => navigate('/register')}>
        Get started →
      </button>

      <div className="steps-section">
        <h2>Start selling in minutes</h2>
        <p>Sharing resources with your neighbors has never been easier than with NeighborNet.</p>

        <div className="steps">
          <div className="step">
            <strong>Step 1</strong>
            <p>Sign up for an account</p>
            <p>
              Either start as a{' '}
              <button type="button" onClick={handleSellerClick} className="link-btn">
                seller
              </button>{' '}
              <button className="buyer-btn" onClick={() => navigate('/products')}>
        Buyer
      </button>
     
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
