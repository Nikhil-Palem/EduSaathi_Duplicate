import React, { useState } from "react";
import "./SignUp.css";
import SignUpImg from '../images/signup-img.svg';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import VerifyEmailPage from "./verifyEmailPage";

const SignUp = () => {
    const [isEmailVerificationPending, setIsEmailVerificationPending] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        reEnteredPswd: "",
        role: "",
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const validate = async () => {
        const newErrors = {};
        if (formData.name.trim().length < 3) {
            newErrors.name = "Name must be at least 3 characters";
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Invalid email format";
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

        if (!passwordRegex.test(formData.password)) {
            newErrors.password =
                "Password must be at least 8 characters, include uppercase, lowercase, number, and special character";
        }

        if (formData.password !== formData.reEnteredPswd) {
            newErrors.reEnteredPswd = "Passwords do not match";
        }

        if (!formData.role) {
            newErrors.role = "Please select a role";
        }

        return newErrors;

    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" }); // Clear error as user types
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const validationErrors = await validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setIsSubmitting(false);
            return;
        }

        try {
            setIsSubmitting(true);
            setIsEmailVerificationPending(true);

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const body = JSON.stringify(formData);
            const res = await axios.post('http://localhost:8080/api/v1/lead/signUp', body, config);
            console.log("signup data...", res.data);
            localStorage.setItem("lead_id", res?.data?.data?.lead?._id);
            localStorage.setItem("lead_email", formData.email);
            localStorage.setItem("lead_username", formData.name);
            localStorage.setItem("lead_role", formData.role);
            if (formData.role === 'admin')
                localStorage.setItem("collegeId", res?.data?.data?.createdCollegeId?.collegeId);
        } catch (err) {
            console.error(err.response?.data || err.message);
            console.log("Error during sign up:", err.message);
            setIsEmailVerificationPending(false);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {isEmailVerificationPending ? (
                <VerifyEmailPage email={formData.email} role={formData.role} />
            ) : (
                <div className="auth-signup-div">
                    <div className="auth-container">
                        <h2>Create an Account</h2>
                        <form onSubmit={handleSubmit} className="auth-form">
                            {["name", "email", "password", "reEnteredPswd"].map((field, index) => (
                                <div key={index} className="form-group">
                                    <input
                                        type={field.includes("password") ? "password" : "text"}
                                        name={field}
                                        placeholder=" "
                                        value={formData[field]}
                                        onChange={handleChange}
                                        className={errors[field] ? "error-input" : ""}
                                        required
                                    />
                                    <label>
                                        {field === "reEnteredPswd" ? "Re-Enter Password" :
                                            field.charAt(0).toUpperCase() + field.slice(1)}
                                    </label>
                                    {errors[field] && <span className="error-text">{errors[field]}</span>}
                                </div>
                            ))}

                            <div className="form-group">
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className={errors.role ? "error-input" : ""}
                                >
                                    <option value="" disabled>Select Role</option>
                                    <option value="staff">Staff</option>
                                    <option value="admin">Admin</option>
                                </select>
                                {errors.role && <span className="error-text">{errors.role}</span>}
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="student-btn"
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="loader"></span>
                                        Signing Up...
                                    </>
                                ) : (
                                    "Sign Up"
                                )}
                            </button>
                        </form>

                        <div className="divider"><span>or</span></div>
                        <div className="auth-options">
                            {/* External sign-up options */}
                        </div>

                        <p>
                            Already have an account? <a href="/crm/signin">Sign In</a>
                        </p>
                    </div>
                    <img src={SignUpImg} alt="Sign up visual" />
                </div>
            )}
        </>
    );
};

export default SignUp;
