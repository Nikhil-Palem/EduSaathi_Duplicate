import React from 'react';
import '../components/Register.css';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer.js';
import axios from 'axios';
import { useForm } from "react-hook-form";
import Navbar from '../components/Navbar.js';

const Register = () => {
    const { register, handleSubmit} = useForm();
    const navigate = useNavigate();

    const onSubmit = async (formData) => {

        if (formData.college_logo){
            formData.college_logo = formData.college_logo[0];
        }

        try {

            const res = await axios.post('http://localhost:8080/api/v1/admin/register', formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            console.log(res);
            if (res.data) {
                navigate('/admin/login');
            }
        } catch (err) {
            console.error(err.response ? err.response.data : err.message);
        }
    };

    return (
        <>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                <div style={{borderColor: 'black', borderWidth: '10px'}}>
                <Navbar />
                </div>
                <div className="register-container-admin">
                    <div className="admin-right-section">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <h2>Create Account</h2>
                            <input {...register("username", {required: true})} placeholder="Username"/>
                            <input {...register("name", {required: true})} placeholder="Name of College"/>
                            <input {...register("email", {required: true})} placeholder="Enter email"/>
                            <input {...register("number", {required: true})} placeholder="Enter contact number"/>
                            <input {...register("address")} placeholder="College Address"/>

                            {/* Radio buttons for college type */}
                            <div className="flex-center" style={{gap: 90, flexDirection: 'row'}}>
                                <div>
                                    <input type="radio" value="Public" {...register("collegeType", {required: true})}
                                           id="public"/>
                                    <label htmlFor="public">Public</label>
                                </div>
                                <div>
                                    <input type="radio" id="private" {...register("collegeType", {required: true})}
                                           value="Private"/>
                                    <label htmlFor="private">Private</label>
                                </div>
                            </div>

                            <input type="text" {...register("city", {required: true})} placeholder="City"/>
                            <input type="text" {...register("state", {required: true})} placeholder="State"/>
                            <input type="text" {...register("acronym", {required: true})}
                                   placeholder="e.g., Indian Institute of Technology Bombay (IITB)"/>
                            <input type="password" {...register("password", {required: true})} placeholder="Password"/>

                            {/* File input for college logo */}
                            <input type="file" {...register("college_logo")} />

                            {/* Input for college website link */}
                            <input type="text" {...register("college_link")} placeholder="College Website Link"/>

                            <button type="submit">SIGN UP</button>
                            <p>Already have an account? <a href="/admin/login">Sign In</a></p>
                        </form>
                    </div>
                </div>
                <Footer/>
            </div>


        </>
    );
};

export default Register;
