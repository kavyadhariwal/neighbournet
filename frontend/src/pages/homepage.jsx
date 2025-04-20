import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './homepage.css';



const HomePage = () => {
  const navigate = useNavigate();

  const handleSellerClick = () => {
    navigate('/dashboard');
  };

  const handleComplaintClick = () => {
    navigate('/complaint-form');
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

      <div className="buttons">
        <button className="get-started" onClick={() => navigate('/register')}>
          Get started →
        </button>
       
      </div>

      <section className="steps-section">
        <h2>Start selling in minutes</h2>
        <p>Sharing resources with your neighbors has never been easier than with NeighborNet.</p>

        <div className="steps">
          <div className="step">
            <strong>Step 1</strong>
            <p>Sign up for an account</p>
            <p>
  Either start as a{' '}
  <Link to="/dashboard" className="link-btn">seller</Link>{' '}
  or{' '}
  <Link to="/products" className="link-btn">buyer</Link>
</p>

          </div>

          <div className="step">
            <strong>Step 2</strong>
            <p>Upload your product.</p>
            <p>We’ll make your product ready for service.</p>
          </div>

          <div className="step">
            <strong>Step 3</strong>
            <p>Start selling / buying / donating.</p>
            <p>It’s that simple.</p>
          </div>
        </div>

        <div className="steps-image">
          <img src="/homepic.jpg" alt="Banner" />
        </div>
      </section>

      {/* Complaint Section */}
      <section className="steps-section">
        <h2>Log a Complaint in Minutes</h2>
        <p>Raising concerns with SMC authorities has never been easier with NeighborNet.</p>

        <div className="steps">
          <div className="step">
            <strong>Step 1</strong>
            <h4>Sign up for an account</h4>
            <p>
  Ensure you are logged in as an{' '}
  <Link to="/authority-dashboard" className="link-btn">authority</Link>{' '}
  or{' '}
  <Link to="/complaint-form" className="link-btn">raise a complaint</Link>
  to submit or view complaints.
</p>

          </div>

          <div className="step">
            <strong>Step 2</strong>
            <h4>Fill out the complaint form.</h4>
            <p>Provide details about the issue, including location and description.</p>
          </div>

          <div className="step">
            <strong>Step 3</strong>
            <h4>Submit and track your complaint</h4>
            <p>Your complaint will be forwarded to SMC authorities for resolution.</p>
          </div>
        </div>

        <div className="steps-image">
          <img src="/homepic1.jpg" alt="Complaint Steps Illustration" />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
