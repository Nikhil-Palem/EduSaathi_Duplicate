import React from 'react';
import './TermsAndConditions.css'; // Import the CSS file
import eduSaathiLogo from './Assets/eduSaathiLogo.png'; // Import the image

const TermsAndConditions = () => {
  return (

    <div className="terms-container">
      <div className="terms-top">
        <img src={eduSaathiLogo} alt="logo" />
        <h1>Terms and Conditions</h1>
      </div>
      <div className="terms-div">
        <div className="terms-inner-div">
          <p>Welcome to UniApply, the centralized application portal for Indian universities. By using our platform, you agree to the following terms and conditions:</p>
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing or using UniApply, you agree to be bound by these terms and conditions. If you do not agree, please refrain from using our services.</p>

          <h2>2. Eligibility</h2>
          <p>You must be at least 16 years old and a resident of India to use this platform. By using UniApply, you confirm that you meet these eligibility requirements.</p>

          <h2>3. User Responsibilities</h2>
          <p>You are responsible for maintaining the confidentiality of your account and password. You agree to notify us immediately of any unauthorized use of your account.</p>

          <h2>4. Privacy Policy</h2>
          <p>Your use of UniApply is also governed by our <a href="/privacy-policy">Privacy Policy</a>, which outlines how we collect, use, and protect your personal information.</p>

          <h2>5. Intellectual Property</h2>
          <p>All content on UniApply, including text, graphics, logos, and software, is the property of UniApply or its licensors and is protected by Indian copyright laws.</p>

          <h2>6. Limitation of Liability</h2>
          <p>UniApply is not liable for any indirect, incidental, or consequential damages arising from your use of the platform.</p>

          <h2>7. Changes to Terms</h2>
          <p>We reserve the right to modify these terms and conditions at any time. Your continued use of the platform constitutes acceptance of the updated terms.</p>

          <h2>8. Governing Law</h2>
          <p>These terms and conditions are governed by the laws of India. Any disputes will be resolved in the courts of New Delhi.</p>

          <p>If you have any questions about these terms, please contact us at <a href="mailto:support@uniapply.in">support@uniapply.in</a>.</p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;