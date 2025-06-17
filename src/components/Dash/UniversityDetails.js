import React from 'react';
import { useLocation } from 'react-router-dom';
import './UniversityDetail.css';

const UniversityDetail = () => {
    const location = useLocation();
    const { university } = location.state;

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle submission of college-specific questions and payment here
        console.log('College-specific form submitted');
    };

    return (
        <div>

        
            <div className="university-detail">
                <h2>{university.name}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Question 1</label>
                        <input type="text" name="question1" required />
                    </div>
                    <div className="form-group">
                        <label>Question 2</label>
                        <input type="text" name="question2" required />
                    </div>
                    {/* Add more questions as needed */}
                    <button type="submit" className="submit-button">Submit</button>
                </form>
                <div className="application-fee">
                    <h3>Application Fee</h3>
                    <p>$50</p>
                    <button className="pay-button">Pay Now</button>
                </div>
            </div>
        </div>
    );
};

export default UniversityDetail;
