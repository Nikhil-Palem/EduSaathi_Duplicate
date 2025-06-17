import React, { useState } from "react";

import "./SignIn.css";
import LoginImg from "../images/login-img.svg";
import axios from "axios";
import { useCookies } from "react-cookie";

import { useNavigate } from "react-router-dom";
const SignIn = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [cookies, setCookies] = useCookies(['token']);
    const [Error, setError] = useState('');
    const [Loading, setLoading] = useState(false);
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const body = JSON.stringify(formData);

            const res = await axios.post('http://localhost:8080/api/v1/lead/signIn', body, config);
            // setCookies('token', res.data.data.token);
            console.log("lead data", res.data?.success);
            const resData = res.data;
            console.log("resdata", resData);
            if (resData?.success) {
                localStorage.setItem("lead_id", resData?.data?.user?._id);
                localStorage.setItem("lead_email", resData?.data?.user?.email);
                localStorage.setItem("lead_username", resData?.data.user?.name);
                localStorage.setItem("lead_role", resData?.data.user?.role);
                localStorage.setItem("collegeId", resData?.data?.createdCollegeId?.collegeId);
                navigate("/crm/redirect-dashboard");
            } else {
                console.log("error in sign in");
            }
        } catch (err) {
            // console.log(err?.response?.data?.messages);
            setError(err?.response?.data?.messages || "An error occurred during sign in.");
        } finally {
            setLoading(false);
        }
        // console.log("Sign In Data:", formData);
    };

    return (
        <div className="auth-signin-div">
            <div className="auth-container">
                <h2>Welcome Back 👋</h2>
                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            placeholder=" " /* Add a space as the placeholder */
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <label>Email</label>
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            name="password"
                            placeholder=" " /* Add a space as the placeholder */
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <label>Password</label>
                    </div>
                    <span className="forgot-pswd"> <a onClick={() => { navigate('/forgot-password', { state: { userType: 'admin' } }) }}> Forgot Password ?</a></span>
                    <button disabled={Loading} type="submit">{Loading ? (
                        <>
                            <span className="loader"></span>
                            Signing In...
                        </>
                    ) : (
                        "Sign In"
                    )}</button>
                    <span className="error-text">{Error}</span>
                </form>

                <div className="divider">
                    <span>or</span>
                </div>

                <div className="auth-options">
                    {/* Google Sign In */}
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {/*<GoogleLogin*/}

                        {/*    onSuccess={credentialResponse => {*/}
                        {/*        console.log(credentialResponse);*/}
                        {/*        setCookies("leadToken", credentialResponse.credential)*/}
                        {/*        navigate("/crm/dashboard/home");*/}
                        {/*        // You can also make a request to your backend to log in the user with the Google credential*/}

                        {/*    }}*/}
                        {/*    onError={() => {*/}
                        {/*        console.log('Login Failed');*/}
                        {/*    }}*/}
                        {/*/>*/}
                    </div>


                    {/* Facebook Sign In */}

                </div>

                <p>
                    Don't have an account? <a href="/crm/signup">Sign Up</a>
                </p>
            </div>
            <img src={LoginImg} alt="login_img" />
        </div>
    );
};

export default SignIn;