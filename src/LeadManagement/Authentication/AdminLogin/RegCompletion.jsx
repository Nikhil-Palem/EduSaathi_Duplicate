import React, { useState } from 'react';
import './RegCompletion.css';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function RegCompletion() {
    const allBranches = ['CSE', 'ECE', 'Mechanical', 'Civil', 'IT', 'EEE'];
    const navigate = useNavigate();
    const [collegeName, setCollegeName] = useState('');
    const [adminCode, setAdminCode] = useState('');
    const [selectedBranches, setSelectedBranches] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const location = useLocation();
    const { email, role } = location.state || {};
    console.log("email", email);
    const handleBranchToggle = (branch) => {
        if (selectedBranches.includes(branch)) {
            setSelectedBranches(selectedBranches.filter(b => b !== branch));
        } else {
            setSelectedBranches([...selectedBranches, branch]);
        }
    };

    const handleRemoveBranch = (branchToRemove) => {
        setSelectedBranches(selectedBranches.filter(branch => branch !== branchToRemove));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const body = JSON.stringify({
                collegeName: collegeName,
                branches: selectedBranches,
                adminCode: adminCode,
                email: email,
            });

            const res = await axios.post('http://localhost:8080/api/v1/lead/admin-registration', body, config);
            // console.log("resp from backend", res.data.data._id);
            localStorage.setItem("collegeId",res.data.data._id);
            if (res.data.success) {
                navigate('/crm/redirect-dashboard');
            }
        } catch (err) {
            console.log("Error in registration", err);
        }
    }
    return (
        <div className="add-college-container">
            <div className="add-college-box">
                <h2 className="add-college-heading">Admin Registeration</h2>

                <label className="add-college-label">College Name</label>
                <input
                    type="text"
                    value={collegeName}
                    onChange={(e) => setCollegeName(e.target.value)}
                    placeholder="Enter College Name"
                    className="add-college-input"
                />

                <label className="add-college-label">Select your branches:</label>
                <div className="multi-select-dropdown">
                    <div
                        className="multi-select-header"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                        {selectedBranches.length > 0
                            ? `${selectedBranches.length} branch(es) selected`
                            : "Select Branches"}
                        <span className="dropdown-arrow">{dropdownOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}</span>
                    </div>

                    {dropdownOpen && (
                        <div className="multi-select-options">
                            {allBranches.map((branch, index) => (
                                <label key={index} className="multi-select-option">
                                    <input
                                        type="checkbox"
                                        checked={selectedBranches.includes(branch)}
                                        onChange={() => handleBranchToggle(branch)}
                                    />
                                    {branch}
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                <div className="selected-branches-container">
                    {selectedBranches.map((branch, index) => (
                        <div key={index} className="selected-branch-tag">
                            {branch}
                            <span
                                className="remove-branch"
                                onClick={() => handleRemoveBranch(branch)}
                            >
                                ×
                            </span>
                        </div>
                    ))}
                </div>

                <label className="add-college-label">Admin code</label>
                <input
                    type="text"
                    value={adminCode}
                    onChange={(e) => setAdminCode(e.target.value)}
                    placeholder="Enter Admin Code here"
                    className="add-college-input"
                />
                <button className="reg-cmplt-btn" onClick={handleSubmit}>Complete Registration</button>
            </div>
        </div>
    );
}
export default RegCompletion;
