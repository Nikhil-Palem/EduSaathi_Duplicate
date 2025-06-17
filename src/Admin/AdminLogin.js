import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import '../components/Login.css';
import Navbar from '../components/Navbar.js';
import Footer from '../components/Footer.js';
import axios from 'axios';
import {useCookies} from 'react-cookie';

axios.defaults.withCredentials = true;

const AdminLogin = () => {
    const [cookies, setCookies] = useCookies(['adminToken']);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();
    const {email, password} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = async e => {
        e.preventDefault();
        const admin = {
            email,
            password,
        };

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const body = JSON.stringify(admin);

            const res = await axios.post('http://localhost:8080/api/v1/admin/login', body, config);

            setCookies('adminToken', res.data.data.adminToken);
            navigate('/admin-dashboard');
        } catch (err) {
            console.error(err.response.data);
        }
    };

    return (
        <>
            <Navbar/>
            <div className="login-container">
                <div className="right-section">
                    <form className="form-login" onSubmit={onSubmit}>
                        <h2>Login</h2>
                        <div className="form-div">
                            <input style={{width: '94%'}} type="text" name="email" value={email} onChange={onChange} placeholder="Email"
                                   required/>
                            <input style={{width: '94%'}} type="password" name="password" value={password} onChange={onChange}
                                   placeholder="Password" required/>
                            <button type="submit" className="login-btn">SIGN IN</button>
                        </div>

                        <p><a href="/reset">Reset Password</a></p>
                        <p>Don't have an account? <a href="/admin/subcription">Sign Up</a></p>
                    </form>
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default AdminLogin;
