import React from 'react';
import './footer-dashboard.css';
import edulogo from '../../../src/components/Assets/eduSaathiLogo.png';

const Footer = () => {
  return (
    <div className="dash-footer">
      <div className="dash-footer-content">
        <img src={edulogo} alt="eduSaathilogo" className="dash-footer-logo" />
        <div className="dash-footer-links">
          <a href="#fraud">Fraud Policy</a>
          <a href="#license">License Agreement</a>
          <a href="/termsandconditions">Privacy & Policy</a>
          <a href="/termsandconditions">Terms & Conditions</a>
        </div>
      </div>
    </div>
  );
};

export default Footer;