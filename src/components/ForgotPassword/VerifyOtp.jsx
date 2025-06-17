import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './VerifyOtp.css';
import Lottie from 'lottie-react';
import otpAnimation from '../Assets/VerifyOtp.json';
export default function VerifyOTP() {
  const [enteredOTP, setEnteredOTP] = useState('');
  const navigate = useNavigate();
  const [Error, setError] = useState('');
  const [Loading, setLoading] = useState(false);
  const email = sessionStorage.getItem('otpEmail');

  const handleVerify = async () => {
    const email = sessionStorage.getItem('otpEmail');
    setLoading(true);
    setError('');
    try {
      if (!email) {
        setError('No email found in session storage. Please request a new OTP.');
        return;
      }
      console.log('Verifying OTP for email:', email);
      console.log('Entered OTP:', enteredOTP);

      const userType = sessionStorage.getItem('userType');
      const baseUrl = userType === 'admin'
        ? 'http://localhost:8080/api/v1/lead/verify-otp'
        : 'http://localhost:8080/api/v1/users/verify-otp';
      const verify = await fetch(`${baseUrl}?email=${encodeURIComponent(email)}&otp=${enteredOTP}`)
      const data = await verify.json();
      console.log('OTP verification data', data);
      if (verify.status !== 200) {
        setError(data.messages || 'Failed to verify OTP. Please try again.');
        return;
      }
      navigate('/reset-password');
    } catch (err) {
      console.log("error", err);
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="verify-otp-container">
      <Lottie animationData={otpAnimation} loop={true} className="otp-animation" />
      <h2>Verify OTP</h2>
      <p>Enter the OTP sent to your email {email}</p>
      <input
        type="text"
        placeholder="Enter OTP"
        value={enteredOTP}
        onChange={(e) => setEnteredOTP(e.target.value)}
      />
      <button onClick={handleVerify}>{Loading ? 'Verifying...' : 'Verify OTP'}</button>
      {Error && <div className="error-message">{Error}</div>}
    </div>
  );
}