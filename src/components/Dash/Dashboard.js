import React, { useEffect, useState } from 'react';

import Footer from './footer-dashboard.js';

import './Dashboard.css';
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import ClgNotFound from '../Assets/CollegesNotFound.png'
const Dashboard = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [myUniversities, setMyUniversities] = useState([]);

    const [cookies, setCookies, removeCookies] = useCookies(['token']);



    useEffect(() => {
        if (!cookies.token) {
            navigate('/login');
        } else {
            axios.get('http://localhost:8080/api/v1/users/').then(response=>{
                console.log(response.data);
           if (response.data.message ===  "Success") {
               setUserName(response.data.data.name);
           }

            })
            axios.get('http://localhost:8080/api/v1/users/googleAuth')
                .then(response => {
                    // console.log(response);
                    setUserName(`${response.data.data.name}`);
                    // setUserName(response.data.data.name);
                })
                .catch(error => {
                    console.error('Error fetching user profile:', error);
                });

            const savedUniversities = JSON.parse(localStorage.getItem('myUniversities')) || [];
            setMyUniversities(savedUniversities);
        }
    }, [navigate, cookies.token]);

    return (
        <>

        <div className="dashboard-container"> {/* Add this wrapper */}
            <div className="student-dashboard">
                <div className="content">
                    <div className="welcome">Hi, {userName}</div>
                    {myUniversities.length === 0 ? (
                        <div className="no-universities">
                            <img src={ClgNotFound} alt="CLg_LOGO" />
                            <p>Nothing here yet! Add your first university to see it appear.</p>
                            <a href="/colleges-search">Add more colleges</a>
                        </div>
                    ) : (
                        <div className="universities-list-stu">
                            {myUniversities.map((university, index) => (
                                <div
                                    className="university-card-stu"
                                    key={index}
                                >
                                    <div className="university-card-left">
                                        <img src={university.college_logo} alt={university.name} className="university-logo-stu" />
                                        <h3>{university.name}</h3>
                                    </div>
                                    <div className="university-card-right">
                                        <p>Add DeadLine Application here</p>
                                        <div className="status">
                                            <p className='in-progress-bg'>In progress</p>
                                            <p><RadioButtonCheckedIcon className="icon in-progress" /></p></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    {myUniversities.length > 0 && (
                        <div className="load-more">
                            <span className="load-more-button">+ Load More</span>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
        </>
    );
};

export default Dashboard;