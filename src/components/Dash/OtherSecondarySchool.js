import React, { useState } from "react";

import Footer from './footer-dashboard.js';
import './OtherSecondarySchool.css';


function OtherSecondarySchool() {

    const [schoolCount, setSchoolCount] = useState(1);
    const [showGradeSelection, setShowGradeSelection] = useState(true);
    const [selectedGrades, setSelectedGrades] = useState([]);

    const handleSchoolCountChange = (e) => {
        const count = parseInt(e.target.value, 10);
        setSchoolCount(count);
        setShowGradeSelection(count !== 1);
    };

    const handleGradeChange = (e) => {
        const selectedValue = e.target.value;
        const grades = selectedValue ? selectedValue.split(",").map(Number) : [];
        setSelectedGrades(grades);
    };

    return (
        <div className="colleges-container">
            <div className="student-dashboard">

                <div className="form-div">
                    <div className="form-container">
                        <div className="school_count">
                            <label>Select the number of schools you attended (excluding the graduated one)*</label>
                            <select name="school_count" onChange={handleSchoolCountChange} id="">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                        </div>
                        <form className="school-form">
                            <label>Enter School Name*</label>
                            <input type="text" placeholder="School Name" required />

                            <label>Enter School's Street Address*</label>
                            <input type="text" placeholder="Street Address" required />

                            <label>Enter School's City*</label>
                            <input type="text" placeholder="City" required />

                            <label>Enter School's State*</label>
                            <input type="text" placeholder="State" required />

                            {showGradeSelection && (
                                <>
                                    <label>Select the grades you attended at listed school*</label>
                                    <select name="grades" onChange={handleGradeChange} id="">
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                        <option value="11">11</option>
                                        <option value="12">12</option>
                                    </select>
                                </>
                            )}

                            {selectedGrades.map((grade) => (
                                <div key={grade} className="grade-section">
                                    <label>Enter your {grade}th grade percentage*</label>
                                    <input type="number" placeholder="Percentage" required />

                                    <label>Upload {grade}th grade marksheet*</label>
                                    <input type="file" accept=".pdf,.jpg,.png" />
                                </div>
                            ))}

                            <div className="file-upload">
                                <label>Upload Marksheet</label>
                                <input type="file" accept=".pdf,.jpg,.png" />
                            </div>

                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default OtherSecondarySchool;