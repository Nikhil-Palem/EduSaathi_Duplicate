import React from 'react';
import '../components/Register.css';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer.js';
import PricingBox from "./components/PricingBox.js";
import './Subcription.css'
import Navbar from '../components/Navbar.js';
const Subcription = () => {

    return (
        <>
            <div className="subcription-container">
            <Navbar />
            <PricingBox/>
            <Footer/>
            </div>

        </>
    );
};

export default Subcription;
