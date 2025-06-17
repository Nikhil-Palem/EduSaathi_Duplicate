import React, { useContext, useState, useEffect } from 'react';
import ApplicationContext from '../../context/ApplicationContext.js';
import axios from 'axios';
import EditApplication from "./aplication/editApplication.js";

const SaveApplication = () => {
    const { personalInfo, educationalInfo, testScore } = useContext(ApplicationContext);
    const [applicationId, setApplicationId] = useState(null);
    const [applicationName, setApplicationName] = useState('');
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);


    const handleSubmit = async () => {
        if (!applicationName) {
            alert('Please enter a name for the application.');
            return;
        }

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("applicationName", applicationName);
            formData.append("personalInfo", JSON.stringify(personalInfo));
            formData.append("educationalInfo", JSON.stringify(educationalInfo));

            // Handle marksheets correctly
            if (educationalInfo?.marksheets) {
                Object.keys(educationalInfo.marksheets).forEach((key) => {
                    formData.append("marksheets", educationalInfo.marksheets[key]);
                });
            }
            if (testScore?.testScore){
                formData.append("testScore", JSON.stringify(testScore.testScore));
                Object.keys(testScore.testScore).forEach((key) => {
                    formData.append("testScore", testScore?.testScore[key]);
                });
            }

            const response = await axios.post(
                'http://localhost:8080/api/v1/application/application2',
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );
            console.log('Data submitted successfully:', response.data);
            alert('Application saved successfully!');
        } catch (error) {
            console.error('Error submitting data:', error);
            alert('Failed to save application. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {

        // Object.keys(testScore.testScore).map((k,i)=>{
        //     console.log(k)
        // })

        const getApplication = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/application/application2');
                if (response.data.data.length > 0) {
                    setApplicationId(response.data.data[0]._id);
                }
            } catch (error) {
                console.error('Error fetching application:', error);
                alert('Failed to fetch application. Please try again.');
            } finally {
                setFetching(false);
            }
        };

        getApplication();
    }, [handleSubmit]);

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Application Details</h1>
            {fetching ? (
                <p style={styles.loadingText}>Loading application data...</p>
            ) : applicationId ? (
                <>
                    <h4>Edit Your Application</h4>
                    <EditApplication applicationId={applicationId} />
                </>
            ) : (
                <>
                    <div style={styles.inputContainer}>
                        <label htmlFor="applicationName" style={styles.label}>
                            <strong>Application Name:</strong>
                        </label>
                        <input
                            type="text"
                            id="applicationName"
                            value={applicationName}
                            onChange={(e) => setApplicationName(e.target.value)}
                            placeholder="Enter application name"
                            style={styles.input}
                        />
                    </div>

                    {/* Personal Information */}
                    <div style={styles.section}>
                        <h2 style={styles.sectionHeading}>Personal Information</h2>
                        <p style={styles.detail}><strong>Given Name:</strong> {personalInfo?.givenName}</p>
                        <p style={styles.detail}><strong>Middle Name:</strong> {personalInfo?.middleName}</p>
                        <p style={styles.detail}><strong>Last Name:</strong> {personalInfo?.lastName}</p>
                        <p style={styles.detail}><strong>Date of Birth:</strong> {personalInfo?.dob}</p>
                        <p style={styles.detail}><strong>Social Category:</strong> {personalInfo?.socialCategory}</p>
                        <p style={styles.detail}><strong>Custom Category:</strong> {personalInfo?.customCategory}</p>
                    </div>

                    {/* Educational Information */}
                    <div style={styles.section}>
                        <h2 style={styles.sectionHeading}>Educational Information</h2>
                        <p style={styles.detail}><strong>School Name:</strong> {educationalInfo?.schoolName}</p>
                        <p style={styles.detail}><strong>Address:</strong> {educationalInfo?.address}</p>
                        <p style={styles.detail}><strong>City:</strong> {educationalInfo?.city}</p>
                        <p style={styles.detail}><strong>State:</strong> {educationalInfo?.state}</p>

                        {educationalInfo?.percentages &&
                            Object.keys(educationalInfo?.percentages).map((key, index) => (
                                <p key={index} style={styles.detail}>
                                    <strong>Grade:</strong> {key}, <strong>Percentage:</strong> {educationalInfo.percentages[key]}
                                </p>
                            ))}
                    </div>

                    {/* Test Scores */}
                    <div style={styles.section}>
                        <h2 style={styles.sectionHeading}>Test Scores</h2>
                        {Object.keys(testScore?.testScore).map((k,i)=>

                            (
                            <p key={i} style={styles.detail}><strong>Test Score {i+1}:</strong> {k}</p>
                            )

                        )}
                    </div>

                    {/* Submit Button */}
                    <div style={styles.buttonContainer}>
                        <button onClick={handleSubmit} style={styles.button} disabled={loading}>
                            {loading ? 'Saving...' : 'Save Application'}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default SaveApplication;

const styles = {
    container: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f9f9f9',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    heading: {
        textAlign: 'center',
        color: '#333',
        marginBottom: '20px',
    },
    loadingText: {
        textAlign: 'center',
        fontSize: '18px',
        color: '#666',
    },
    inputContainer: {
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
    },
    label: {
        marginRight: '10px',
        fontSize: '16px',
        color: '#555',
    },
    input: {
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        width: '100%',
        maxWidth: '400px',
        fontSize: '16px',
    },
    buttonContainer: {
        textAlign: 'center',
        marginTop: '20px',
    },
    button: {
        padding: '12px 24px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        transition: 'background-color 0.3s ease',
    },
};
