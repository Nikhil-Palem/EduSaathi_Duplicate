import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ForgotPassword.css';
import Lottie from 'lottie-react';
import forgotPasswordAnimation from '../Assets/ForgotPasswod.json';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const userType = location.state?.userType;
    console.log('User type from location state:', userType);
    sessionStorage.setItem('userType', userType);
    const handleSendOTP = async () => {
        if (!email) {
            setError('Please enter an email.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            console.log('User type:', userType);
            const baseUrl = userType === 'admin'
                ? 'http://localhost:8080/api/v1/lead/send-otp'
                : 'http://localhost:8080/api/v1/users/send-otp';
            const response = await fetch(`${baseUrl}?email=${encodeURIComponent(email)}`);
            const data = await response.json();
            console.log('OTP data', data);
            sessionStorage.setItem('otpEmail', email);
            if (response.status !== 200) {
                setError(data.messages || 'Failed to send OTP. Please try again.');
                return;
            }
            navigate('/verify-otp');
        } catch (err) {
            console.log("error", err);
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="forgot-password-container">
            <Lottie
                animationData={forgotPasswordAnimation}
                loop
                autoplay
                className="forgot-password-animation"
            />
            <h2>Forgot Password?</h2>
            <p>Enter your email. We will send you an OTP to reset your password.</p>

            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
            />

            {error && <div className="error-message">{error}</div>}
            {loading ? (
                <div className="loading-message">Sending OTP...</div>
            ) : (
                <button onClick={handleSendOTP}>Send OTP</button>
            )}
        </div>
    );
}
