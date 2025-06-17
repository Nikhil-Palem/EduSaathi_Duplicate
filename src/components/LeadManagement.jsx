import React from 'react'

import { Link } from 'react-router-dom';
import './UniversityRegistration.css';

function LeadManagement() {
  return (
    <div className="university-register-section">
      <h2>University Management? Register Now!</h2>
      <p>
        Simplify admissions, connect with students, and manage applications effortlessly.
      </p>
      <Link to="/crm/signup" className="register-btn">
        Get Started
      </Link>
    </div>
  )
}

export default LeadManagement