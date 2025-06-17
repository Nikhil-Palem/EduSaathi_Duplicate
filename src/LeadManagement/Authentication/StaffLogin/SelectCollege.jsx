import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import './SelectCollege.css';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { useNavigate } from 'react-router-dom';


function SelectCollege() {
    const [searchInput, setSearchInput] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [SelectedCollegeID, setSelectedCollegeID] = useState('');
    const [selectedCollege, setSelectedCollege] = useState('');
    const [branches, setBranches] = useState([]);
    const [selectedBranch, setSelectedBranch] = useState('');
    const navigate = useNavigate();
    const staff_email = localStorage.getItem('lead_email');

    console.log("suggestions", suggestions[0]?.collegeName);
    useEffect(() => {
        const fetchSuggestions = async () => {
            if (searchInput?.length === 0) {
                setSuggestions([]);
                return;
            }

            try {
                const response = await axios.get(`http://localhost:8080/api/v1/lead/search?q=${searchInput}`);
                setSuggestions(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Failed to fetch college suggestions");
            }
        };

        const delay = setTimeout(fetchSuggestions, 300); // debounce

        return () => clearTimeout(delay);
    }, [searchInput]);

    const handleSuggestionClick = (CollegeData) => {
        // console.log("collegename",CollegeData);
        setSelectedCollegeID(CollegeData._id);
        setSelectedCollege(CollegeData?.collegeName);
        setSearchInput(CollegeData?.collegeName);
        setBranches(CollegeData?.branches);
        setSuggestions([]);
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
                collegeId:SelectedCollegeID,
                collegeName: selectedCollege,
                branch: selectedBranch,
                staff_email: staff_email
            });

            const res = await axios.post('http://localhost:8080/api/v1/lead/staff-registration', body, config);
            console.log("resp from backend", res.data);
             localStorage.setItem("collegeId", res?.data?.data?.collegeId);
            if (res.data.success) {
                navigate('/crm/redirect-dashboard');
            }
        } catch (err) {
            console.log("Error in registration", err);
        }
    }

    return (
        <div className="select-college-box">
            <div className="select-college-container">
                <h1 className="select-college-heading">Staff Registration</h1>
                <label className="select-college-label">Choose your college:</label>

                <div className="search-wrapper">
                    <div className="select-college-search-container">
                        <FaSearch className="select-college-search-icon" />
                        <input
                            type="text"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            placeholder="Search your college"
                            className={`select-college-input ${suggestions?.length > 0 ? 'has-suggestions' : ''}`}
                        />
                    </div>

                    {searchInput && (
                        <>
                            {suggestions?.length > 0 ? (
                                <ul className="suggestions-list">
                                    {suggestions?.map((item, index) => (
                                        <li
                                            key={index}
                                            onClick={() => handleSuggestionClick(item)}
                                        >
                                            <div className="college-icon">
                                                <ApartmentIcon />
                                            </div>
                                            {item.collegeName}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="select-college-error">
                                    Oops! Your college admin has not registered your college yet.
                                </p>
                            )}
                        </>
                    )}
                </div>

                {selectedCollege && (
                    <div className="select-branch-container">
                        <label className="select-college-label">Select your branch:</label>
                        <select className="select-college-dropdown" onChange={(e) => setSelectedBranch(e.target.value)}>
                            <option value="">-- Select Branch --</option>
                            {branches?.map((branch, index) => (
                                <option key={index} value={branch}>{branch}</option>
                            ))}
                        </select>
                    </div>
                )}

                {selectedBranch && selectedCollege && <button className="reg-cmplt-btn" onClick={handleSubmit}>Complete Registration</button>}
            </div>
        </div>

    );
}

export default SelectCollege;
