import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Navbar from './Navbar.js';
import Footer from './Footer.js';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import { useCookies } from 'react-cookie';

axios.defaults.withCredentials = true;

const Login = () => {
  const [cookies, setCookies] = useCookies(['token']);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState('');
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setErrors('');
    const user = {
      email,
      password,
    };
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const body = JSON.stringify(user);

      const res = await axios.post(`http://localhost:8080/api/v1/users/login`, body, config);
      setCookies('token', res.data.data.token);
      console.log("login data", res.data)
      localStorage.setItem("user_id", res.data.data.user._id);
      navigate('/dashboard');
    } catch (err) {
      console.error("error msg", err.response.data);
      setErrors(err.response.data.messages);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="login-container">
        <div className="left-section">

        </div>
        <div className="right-section">
          <form onSubmit={onSubmit}>
            <h2>Login</h2>
            <p>Welcome back! please enter your details.</p>
            <input type="email" name="email" value={email} onChange={onChange} placeholder="Email Address" required />
            <input type="password" name="password" value={password} onChange={onChange} placeholder="Password" required />
            <p className='reset-pswd'><a onClick={() => { navigate('/forgot-password', { state: { userType: 'student' } }) }}>Forgot Password?</a></p>
            <button type="submit" disabled={Loading} className='login-btn-std'>{Loading ? (
              <>
                <span className="loader"></span>
                Signing In...
              </>
            ) : (
              "Sign In"
            )}</button>
            {errors && <p className='error-text'>{errors}</p>}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <GoogleLogin
                onSuccess={credentialResponse => {
                  console.log(credentialResponse);
                  setCookies("token", credentialResponse.credential)
                  navigate("/dashboard");
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
              />
            </div>
            <p className='dont-have-acc'>Don't have an account? <a href="/register">Sign up</a></p>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
