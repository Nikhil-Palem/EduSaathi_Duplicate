import React, { useContext } from 'react';

import Footer from './footer-dashboard.js';
import ApplicationContext from '../../context/ApplicationContext.js';
import PersonalInformation from "./Questions/PersonalInformation.js";
function Profile() {
    const { personalInfo, handleInputChange } = useContext(ApplicationContext);

    const handleSave = () => {
        console.log("Saved Personal Information:", personalInfo);
        alert("Personal Information Saved! Check the console for details.");
    };



    return (
        <div className="colleges-container">
            <div>
                <h1>Profile</h1>
            </div>
    <PersonalInformation/>
            <Footer />
        </div>
    );
}

export default Profile;
