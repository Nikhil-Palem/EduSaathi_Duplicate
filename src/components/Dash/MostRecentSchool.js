import React, { useContext, useState } from "react";

import Footer from './footer-dashboard.js';
import './OtherSecondarySchool.css';
import ApplicationContext from "../../context/ApplicationContext.js";

function MostRecentSchool() {
    const { educationalInfo, handleEducationalChange } = useContext(ApplicationContext);
    const [selectedGrades, setSelectedGrades] = useState([]);

    const handleGradeChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions);
        const grades = selectedOptions.map(option => option.value);
        setSelectedGrades(grades);
        handleEducationalChange('grades', grades);
    };

    const handlePercentageChange = (grade, value) => {
        handleEducationalChange('percentages', {
            ...educationalInfo.percentages,
            [grade]: value
        });
    };

    const handleFileUpload = (grade, file) => {
        handleEducationalChange('marksheets', {
            ...educationalInfo.marksheets,
            [grade]: file
        });
    };

    const handleSave = (e) => {
        e.preventDefault();
        console.log("Educational Information Saved:", educationalInfo);
        alert("Educational information saved successfully!");
    };

    return (
        <div className="colleges-container">
            <div className="student-dashboard">

                <div className="form-div">
                    <div className="form-container">
                        <form className="school-form" onSubmit={handleSave}>
                            <label>Enter School Name</label>
                            <input
                                type="text"
                                placeholder="School Name"
                                value={educationalInfo.schoolName || ''}
                                onChange={(e) => handleEducationalChange('schoolName', e.target.value)}
                                required
                            />

                            <label>Enter School's Street Address</label>
                            <input
                                type="text"
                                placeholder="Street Address"
                                value={educationalInfo.address || ''}
                                onChange={(e) => handleEducationalChange('address', e.target.value)}
                                required
                            />

                            <label>Enter School's City</label>
                            <input
                                type="text"
                                placeholder="City"
                                value={educationalInfo.city || ''}
                                onChange={(e) => handleEducationalChange('city', e.target.value)}
                                required
                            />

                            <label>Enter School's State</label>
                            <input
                                type="text"
                                placeholder="State"
                                value={educationalInfo.state || ''}
                                onChange={(e) => handleEducationalChange('state', e.target.value)}
                                required
                            />

                            <label>Select the grades you attended at listed school</label>
                            <select
                                multiple
                                value={selectedGrades}
                                onChange={handleGradeChange}
                                className="grade-select"
                            >
                                <option value="9">Grade 9</option>
                                <option value="10">Grade 10</option>
                                <option value="11">Grade 11</option>
                                <option value="12">Grade 12</option>
                            </select>
                            <small className="select-hint">(Hold Ctrl/Cmd to select multiple grades)</small>

                            <div className="selected-grades-container">
                                {selectedGrades.map((grade) => (
                                    <div key={grade} className="grade-section">
                                        <h3>Grade {grade} Details</h3>

                                        <label>Enter your {grade}th grade percentage*</label>
                                        <input
                                            type="number"
                                            placeholder="Percentage"
                                            min="0"
                                            max="100"
                                            value={educationalInfo.percentages?.[grade] || ''}
                                            onChange={(e) => handlePercentageChange(grade, e.target.value)}
                                            required
                                        />

                                        <label>Upload {grade}th grade marksheet (PDF)</label>
                                        <input
                                            type="file"
                                            accept=".pdf"
                                            onChange={(e) => handleFileUpload(grade, e.target.files[0])}
                                            required
                                        />

                                        {educationalInfo.marksheets?.[grade] && (
                                            <div className="file-preview">
                                                Uploaded: {educationalInfo.marksheets[grade].name}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="form-actions">
                                <button type="submit" className="save-button">
                                    Save Information
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default MostRecentSchool;