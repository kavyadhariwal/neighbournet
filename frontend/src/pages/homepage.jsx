import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './homepage.css';



const HomePage = () => {
  const navigate = useNavigate();

  // const handleSellerClick = () => {
  //   navigate('/dashboard');
  // };

  // const handleComplaintClick = () => {
  //   navigate('/complaint-form');
  // };

  const handleAuthorityClick = () => {
    const username = localStorage.getItem('username'); 
  
    if (username === 'naman') {
      navigate('/authority-dashboard');
    } else {
      alert('Not eligible to access the Authority Dashboard.');
    }
  };  

  return (
    <div className="main-container">
      <div className="announcement">NeighbourNet is now public!</div>

      <h1 className="main-heading">
        Everything about your <span className="highlight">neighbourhood</span> in seconds.
      </h1>

      <p className="description">
        NeighbourNet allows you to share resources. Simply upload your product and
        start selling right away.
      </p>


      <section className="steps-section">
        <h2>Start selling in minutes</h2>
        <p>Sharing resources with your neighbours has never been easier than with NeighbourNet.</p>

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
        <p>Raising concerns with SMC authorities has never been easier with NeighbourNet.</p>

        <div className="steps">
          <div className="step">
            <strong>Step 1</strong>
            <h4>Sign up for an account</h4>
            <p>
  Ensure you are logged in as an{' '}
  <button className="link-btn" onClick={handleAuthorityClick}>authority</button>
{' '}
  or{' '}
  <Link to="/complaint_form" className="link-btn">raise a complaint</Link>
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
