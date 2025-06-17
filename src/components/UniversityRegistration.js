import React from 'react';
import { Link } from 'react-router-dom';
import './UniversityRegistration.css';

const UniversityRegisterSection = () => {
  return (
    <div className="university-register-section">
      <h2>Are you a university? Register today!</h2>
      <p>
        Join our platform to manage your applications, connect with students, and streamline your admissions process.
      </p>
      <Link to="/admin-dashboard" className="register-btn">
        Register Your University
      </Link>
    </div>
  );
};

export default UniversityRegisterSection;
