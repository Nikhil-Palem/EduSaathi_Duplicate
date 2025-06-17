import React, { useState, useEffect } from 'react';
import Footer from './footer-dashboard.js';
import './MyUniversities.css';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ClgNotFound from '../Assets/CollegesNotFound.png'

const MyUniversities = () => {
    const [myUniversities, setMyUniversities] = useState([]);

    useEffect(() => {
        const savedUniversities = JSON.parse(localStorage.getItem('myUniversities')) || [];
        setMyUniversities(savedUniversities);
    }, []);

    const removeUniversity = (indexToRemove) => {
        const updatedUniversities = myUniversities.filter((_, index) => index !== indexToRemove);
        setMyUniversities(updatedUniversities);
        localStorage.setItem('myUniversities', JSON.stringify(updatedUniversities));
    };

    return (
        <>
            <div className="colleges-container">
                <div className="student-dashboard-myuniversities">

                    <div className="my-universities">
                        {/* <h1>My Universities</h1> */}
                        {myUniversities.length > 0 ? <div className='universities-list'>
                            {myUniversities.map((university, index) => (
                                <div className='university-item' key={index}>
                                    <img src={university.college_logo} width={100} height={100} alt='college' />
                                    <div className='university-details'>
                                        <h3>{university.name}</h3>
                                        <p>{university.address}</p>
                                        <p>{university.email}</p>
                                        <p>{university.contactNumber}</p>
                                    </div>
                                    <button
                                        className='remove-button'
                                        onClick={() => removeUniversity(index)}
                                    >
                                        <DeleteOutlineIcon />
                                    </button>
                                </div>
                            ))}
                        </div> : <div className='colleges-not-found'>
                            <img src={ClgNotFound} alt="clg Logo" />
                            <p>Nothing here yet! Add your first university to see it appear.<a href="/colleges-search">Add more colleges</a></p>
                        </div>}
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default MyUniversities;