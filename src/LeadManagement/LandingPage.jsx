import React, { useState } from 'react';
import './LandingPage.css';
import eduSaathiLogo from '../components/Assets/eduSaathiLogo.png';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LandingPage() {
    const Navigate = useNavigate();
    const [FormData, setFormData] = useState({
        name: '',
        email: '',
        role: ''
    });
    const [Loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...FormData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const { name, email, role } = FormData;

        if (!name || !email || !role) {
            toast.warn("Please fill all the fields", { position: "top-right", theme: "colored" });
            setLoading(false);
            return;
        }

        const body = JSON.stringify(FormData);
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            const resp = await axios.post('http://localhost:8080/api/v1/lead/waitlist', body, config);
            console.log("Response from waitlist API:", resp.data);
            if (resp.status === 201) {
                toast.success("You have been added to the waitlist successfully!", { position: "top-right" });
            } else {
                toast.error("Failed to add to waitlist. Please try again.", { position: "top-right" });
            }
        } catch (err) {
            console.error("Error:", err.response);
            toast.error(err.response.data.messages || 'something went wrong', { position: "top-right" });
        } finally {
            setLoading(false);
        }

        setFormData({
            name: '',
            email: '',
            role: ''
        });
    };

    return (
        <div className="landing-page">
            <ToastContainer />
            <nav className="navbar-crm">
                <div className="navbar-left">
                    <div className="logo">
                        <img src={eduSaathiLogo} alt="eduSaathiLogo" />
                    </div>
                    <div className="contact-text">EduSaathi</div>
                </div>
                <div className="navbar-right">
                    <p onClick={() => { Navigate('/crm/signup') }}>Sign Up</p>
                    <span>or</span>
                    <p onClick={() => { Navigate('/crm/signin') }}>Sign In</p>
                </div>
            </nav>

            <section className="hero">
                <h1 className="hero-title">
                    &gt;&gt; Revolutionized <br />
                    Your Admission Process With Us
                </h1>
                <span className="hero-subtitle">Streamline Your College Applications with Ease and Confidence — On One Platform, End-to-End Solutions</span>
            </section>

            <section className="features-section">
                <div className="features-container">
                    <h2 className="section-title">What we provide</h2>
                    <div className="features-list">
                        {[
                            {
                                title: 'Data',
                                desc: 'We leverage advanced algorithms to optimize and streamline college applications, providing a comprehensive and fair evaluation process that identifies potential sooner & rather more.',
                            },
                            {
                                title: 'Customise',
                                desc: 'Empower colleges to effortlessly personalize their application process with intuitive features, enhancing flexibility and ease of use for administrators.',
                            },
                            {
                                title: 'Streamline',
                                desc: 'Instantly send acceptances to thousands of students with a single click. Robust workflows help coordinate outreach and accelerate response acquisition communications efficiency.',
                            },
                            {
                                title: 'Lead Management',
                                desc: 'Effortlessly manage student inquiries with our automated lead management system. It generates prospective leads from multiple sources, sends them to your team, and provides real-time outreach functionality — helping you respond faster, stay organized, and boost conversions.',
                            },
                        ].map((feature, idx) => (
                            <div key={idx} className="feature-card">
                                <div className="feature-number">{`0${idx + 1}`}</div>
                                <h3 className="feature-title">{feature.title}</h3>
                                <p className="feature-desc">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="waitlist-section">
                <div className="waitlist-container">
                    <div className="waitlist-text">
                        <div className="logo">
                            <img src={eduSaathiLogo} alt="eduSaathiLogo" />
                        </div>
                        <h3 className="waitlist-title">Join the waitlist</h3>
                        <p className="waitlist-desc">Complete the adjacent form and join our waitlist. We’ll reach out soon to discuss our exciting offerings and how we can meet your needs.</p>
                    </div>
                    <form className="waitlist-form" onSubmit={handleSubmit}>
                        <input type="text" placeholder="Enter your name" name='name' className="form-input" onChange={handleChange} value={FormData.name} />
                        <input type="email" placeholder="Enter your email" name='email' className="form-input" onChange={handleChange} value={FormData.email} />
                        <input type="text" placeholder="Enter your role" name='role' className="form-input" onChange={handleChange} value={FormData.role} />
                        <button type="submit" disabled={Loading} className="form-submit">{Loading ? 'Submitting...' : 'Submit'}</button>
                    </form>
                </div>
            </section>
            <Footer />
        </div>
    );
}
