import React, { useEffect, useState,useContext } from 'react';
import axios from 'axios';
import ApplicationContext from "../../../context/ApplicationContext.js";
const UploadApplication = () => {
    const [user, setUser] = useState({});
    const [application, setApplication] = useState([]);
    const [selectedApplication, setSelectedApplication] = useState(null); // State to track selected application
    const {  setUploadApplication } = useContext(ApplicationContext);

    useEffect(() => {
        // Fetch application data
        axios.get('http://localhost:8080/api/v1/application/application2')
            .then(response => {

                setApplication(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching application:', error);
            });

        // Fetch user data
        axios.get('http://localhost:8080/api/v1/users/googleAuth')
            .then(response => {
                console.log(response.data.data);
                setUser(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching user profile:', error);
            });
    }, []);

    // Handle application selection
    const handleApplicationSelect = (app) => {
        setSelectedApplication(app);
    };

    // Handle upload button click
    const handleUpload = () => {
        if (selectedApplication) {
            console.log('Uploading application:', selectedApplication);
            setUploadApplication(selectedApplication);
            alert(`Uploading application: ${selectedApplication.applicationName}`);
            // Add your upload logic here (e.g., API call)
        } else {
            alert('Please select an application to upload.');
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Upload Application</h1>
            <p style={styles.subHeading}>Select your application here</p>

            {/* Display user information */}
            {user && (
                <div style={styles.userInfo}>
                    <p style={styles.userDetail}><strong>User:</strong> {user.name}</p>
                    <p style={styles.userDetail}><strong>Email:</strong> {user.email}</p>
                </div>
            )}

            {/* Display list of applications */}
            <div style={styles.applicationList}>
                {application.map((app, index) => (
                    <div
                        key={index}
                        style={{
                            ...styles.applicationCard,
                            ...(selectedApplication?.applicationName === app.applicationName ? styles.selectedCard : {}),
                        }}
                        onClick={() => handleApplicationSelect(app)}
                    >
                        <p style={styles.applicationName}>
                            <span style={styles.index}>{index + 1}.</span> {app.applicationName}
                        </p>
                    </div>
                ))}
            </div>

            {/* Upload Button */}
            <div style={styles.buttonContainer}>
                <button
                    onClick={handleUpload}
                    style={{
                        ...styles.button,
                        ...(!selectedApplication ? styles.disabledButton : {}),
                    }}
                    disabled={!selectedApplication}
                >
                    Upload Selected Application
                </button>
            </div>
        </div>
    );
};

export default UploadApplication;

// Styles
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
        marginBottom: '10px',
    },
    subHeading: {
        textAlign: 'center',
        color: '#555',
        marginBottom: '20px',
    },
    userInfo: {
        marginBottom: '20px',
        padding: '15px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    userDetail: {
        margin: '5px 0',
        fontSize: '16px',
        color: '#333',
    },
    applicationList: {
        marginTop: '20px',
    },
    applicationCard: {
        padding: '15px',
        marginBottom: '10px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        cursor: 'pointer',
    },
    selectedCard: {
        backgroundColor: '#e3f2fd',
        border: '2px solid #007bff',
    },
    applicationName: {
        margin: '0',
        fontSize: '16px',
        color: '#333',
    },
    index: {
        fontWeight: 'bold',
        marginRight: '10px',
        color: '#007bff',
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
    disabledButton: {
        backgroundColor: '#ccc',
        cursor: 'not-allowed',
    },
};