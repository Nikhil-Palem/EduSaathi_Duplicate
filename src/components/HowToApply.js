import React from 'react';
import './HowToApply.css';
import Navbar from './Navbar.js';
import Footer from './Footer.js';
import TrackingLine from './TrackingLine.js';
const HowToApply = () => {
  return (
    <>
      <Navbar />
      <div className="how-to-apply-container">
        <TrackingLine />
        <div className="how-to-apply-content">
          <h1>How to Apply ?</h1>
          <p className="subtitle">
            Follow these simple steps to apply to multiple universities using our portal.
          </p>

          <div className="steps-container">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Go to the Dashboard</h3>
                <p>Navigate to the dashboard and choose the "Application" tab to begin.</p>
              </div>
            </div>

            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Fill Out Personal Information</h3>
                <p>Start by entering your personal details such as name, address, and contact information.</p>
              </div>
            </div>

            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Add Education Information</h3>
                <p>Provide details about your school, including grades and graduation date.</p>
              </div>
            </div>

            <div className="step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Upload Test Scores</h3>
                <p>Add your standardized test scores and upload the official scorecard or report.</p>
              </div>
            </div>

            <div className="step">
              <div className="step-number">5</div>
              <div className="step-content">
                <h3>Extracurriculars Section</h3>
                <p>Highlight your extracurricular activities and save your progress.</p>
              </div>
            </div>

            <div className="step">
              <div className="step-number">6</div>
              <div className="step-content">
                <h3>Search and Add Colleges</h3>
                <p>Use the college search feature to find and add universities to your application list.</p>
              </div>
            </div>

            <div className="step">
              <div className="step-number">7</div>
              <div className="step-content">
                <h3>Answer College-Specific Questions</h3>
                <p>Fill out any additional questions required by each college.</p>
              </div>
            </div>

            <div className="step">
              <div className="step-number">8</div>
              <div className="step-content">
                <h3>Pay Application Fees</h3>
                <p>Complete the payment process for your application fees and submit your application.</p>
              </div>
            </div>

            <div className="step">
              <div className="step-number">9</div>
              <div className="step-content">
                <h3>Track Application Status</h3>
                <p>Return to the dashboard to view updates on your application status (Under Review, Rejected, Accepted).</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HowToApply;