import React, { useState } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar.js';
import Footer from './Footer.js';
import axios from 'axios';

axios.defaults.withCredentials = true;

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const { name, email, password } = formData;
  const [Loading, setLoading] = useState(false);
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });


  const validate = () => {
    const newErrors = {};
    const { name, email, password } = formData;
    // Name validation
    if (!name.trim()) newErrors.name = "Name is required";
    else if (!/^[a-zA-Z\s\-']{3,50}$/.test(name)) {
      newErrors.name = "Name must be 3-50 characters and contain only letters and spaces";
    }

    // Email validation
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Email format is invalid";
    }

    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!password.trim()) newErrors.password = "Password is required";
    else if (!passwordRegex.test(password)) {
      newErrors.password = "Password must have 8+ chars, uppercase, lowercase, number, and special char";
    }

    return newErrors;
  };

  const onSubmit = async e => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      return setErrors(validationErrors);
    }

    setLoading(true);

    const newUser = {
      name,
      email,
      password
    };

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const body = JSON.stringify(newUser);

      const res = await axios.post('http://localhost:8080/api/v1/users/register', body, config);
      console.log("reg data", res);
      localStorage.setItem("user_id", res.data.data._id);

      if (!res.data.success) {
        console.log(res);
        setErrors({ api: res.data.message || "Registration failed" });
        return;
      }

      if (res.data) {
        navigate("/login")
      }
      // Redirect to dashboard upon successful registration
      navigate('/dashboard');
    } catch (err) {
      setErrors({ api: err.response.data.messages || "Server error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="register-container">
        <div className="left-section"></div>
        <div className="right-section">
          <form style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} onSubmit={onSubmit}>
            <h2>Create Account</h2>
            <input type="text" className={`${errors.name ? 'error-input' : ""}`} name="name" value={name} onChange={onChange} placeholder="Name" required />
            {errors.name && <p className="error-text">{errors.name}</p>}
            {/*<input type="text" name="school" value={school} onChange={onChange} placeholder="School" required />*/}
            {/*<input type="text" name="class" value={className} onChange={onChange} placeholder="Class" required />*/}
            <input type="email" className={` ${errors.email ? 'error-input' : ""}`} name="email" value={email} onChange={onChange} placeholder="Email" required />
            {errors.email && <p className="error-text">{errors.email}</p>}
            {/*<input type="text" name="phone" value={phone} onChange={onChange} placeholder="Phone" required />*/}
            <input type="password" className={` ${errors.password ? 'error-input' : ""}`} name="password" value={password} onChange={onChange} placeholder="Password" required />
            {errors.password && <p className="error-text">{errors.password}</p>}
            <button type="submit" disabled={Loading} className="student-btn">{Loading ? (
              <>
                <span className="loader"></span>
                Signing Up...
              </>
            ) : (
              "Sign Up"
            )}</button>
            <p>Already have an account? <a href="/login">Sign In</a></p>

            <span className='span-error'>
              {errors.api && <p>{errors.api}</p>}
            </span>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;


