import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import './SelectCollege.css';
import { useNavigate, useLocation } from 'react-router-dom';

function SelectCollege() {
    const [searchInput, setSearchInput] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const { email, role } = location.state || {};
    // const colleges = ['Anurag University', 'JNTU Hyderabad', 'IIT Bombay']; // example
    // const branches = ['CSE', 'ECE', 'Mechanical', 'Civil'];

    return (
        <div className="select-college-box-admin">
            <div className="select-college-container-admin">
                <div className="search-box-admin">
                    <h1 className="select-college-heading">Admin Registration</h1>
                    <label className="select-college-label">Choose your college:</label>
                    <div className="select-college-search-container">
                        <FaSearch className="select-college-search-icon" />
                        <input
                            type="text"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            placeholder="Search your college"
                            className="select-college-input"
                        />
                    </div>
                </div>
                {/* Professional Separator */}
                <div className="separator-container">
                    <div className="separator-line"></div>
                    <div className="separator-text">or</div>
                    <div className="separator-line"></div>
                </div>

                {/* Add Your College Button */}
                <button className="add-college-button" onClick={() => {
                    navigate('/crm/admin/reg-college', {
                        state: { email, role }
                    })
                }}>
                    Add Your College
                </button>
            </div>
        </div>
    );
}

export default SelectCollege;
