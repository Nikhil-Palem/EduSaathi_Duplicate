import React from 'react';
import './Footer.css';
import { useNavigate } from 'react-router-dom';
import edulogo from '../../src/components/Assets/eduSaathiLogo.png';

// MUI Icons
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

const Footer = () => {
  const navigate = useNavigate();
  
  return (
    <div className="footer">
      <div className="footer-logo">
        <img src={edulogo} alt="EduSaathi Logo" />
        <div className="footer-terms">
          <p onClick={() => navigate('/termsandconditions')}>Terms & Conditions</p>
          <p onClick={() => navigate('/termsandconditions')}>Privacy & Policy</p>
        </div>
      </div>

      <hr className="landing-footer-hr" />

      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()}</p>

        <div className="footer-section">
          <a href="#home">How it Works?</a>
          <a href="#home">Our Mission</a>
          <a href="#home">Why Apply Through Us</a>
        </div>

        <div className="footer-section">
          <p><EmailIcon fontSize="small" /> EduSaathi@gmail.com</p>
          <p><PhoneIcon fontSize="small" /> +91 9823856781</p>
          <div className="footer-socials">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <InstagramIcon fontSize="medium" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <TwitterIcon fontSize="medium" />
            </a>
          </div>
        </div>

        <div className="footer-section">
          <p><LocationOnIcon fontSize="small" /> 118, Rafi Marg, New Delhi, India</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
