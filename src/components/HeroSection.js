import React from 'react';
import './HeroSection.css';
import { Link } from 'react-router-dom';
const HeroSection = () => {
  return (
    <div className="hero-container" id="home">
      <div className="hero-content">
        <h1>Start Your College Journey With Us.</h1>
        <p>Simplify the process by applying to multiple universities with a single platform.</p>
        <Link to="/register"> 
          <button className="btn">Apply Now</button>
        </Link>
      </div>
      <div className="vertical-text-container">
        <div className="edu">
          <span>E</span>
          <span>D</span>
          <span>U</span>
        </div>
        <div className="saathi">
          <span>S</span>
          <span>A</span>
          <span>A</span>
          <span>T</span>
          <span>H</span>
          <span>I</span>
        </div>
      </div>

    </div>
  );
};

export default HeroSection;



