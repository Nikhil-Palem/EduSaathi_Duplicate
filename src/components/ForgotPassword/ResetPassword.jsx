import { useState } from 'react';
import './ResetPassword.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleReset = async () => {
    setError('');
    if (!password || !confirmPassword) {
      setError('Please fill in both fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!strongPasswordRegex.test(password)) {
      setError('Password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character.');
      return;
    }
    setLoading(true);

    try {
      const email = sessionStorage.getItem('otpEmail');
      const userType = sessionStorage.getItem('userType');
      const baseUrl = userType === 'admin'
        ? 'http://localhost:8080/api/v1/lead/reset-password'
        : 'http://localhost:8080/api/v1/users/reset-password';
      const resp = await axios.patch(`${baseUrl}?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
      if (resp.status !== 200) {
        setError('Failed to reset password. Please try again.');
        return;
      }
      toast.success('Password has been changed successfully!', {
        onClose: () => {
          if (userType === 'admin') {
            navigate('/crm/signin');
          } else {
            navigate('/login');
          }
        }
      });
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-password-container">
      <h2>Reset Password</h2>
      <p>Enter your new password</p>

      <div className="password-input-container">
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span onClick={() => setShowPassword(!showPassword)} className="eye-icon">
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>

      <div className="password-input-container">
        <input
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="eye-icon">
          {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>

      <button onClick={handleReset} disabled={loading}>
        {loading ? 'Resetting...' : 'Reset Password'}
      </button>

      {error && <p className="error-message">{error}</p>}

      <ToastContainer position="top-right" autoClose={1500} />
    </div>
  );
}
