import React, { useContext, useEffect } from 'react';
import ApplicationContext from '../../../context/ApplicationContext.js';
import axios from "axios";

const ReviewPage = () => {
    const {
        personalInfo,
        educationalInfo,
        testScores,
        activitiesInfo,
        newAward,
        awards
    } = useContext(ApplicationContext);

useEffect(() => {
    console.log(testScores)
},[])
    const styles = {
        container: {
            maxWidth: '900px',
            margin: '40px auto',
            padding: '40px',
            fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
            backgroundColor: '#fdfdfd',
            borderRadius: '10px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
        },
        heading: {
            fontSize: '32px',
            marginBottom: '40px',
            textAlign: 'center',
            color: '#222',
            fontWeight: 600,
        },
        section: {
            marginBottom: '30px',
            display: 'flex',
            flexDirection: 'column',
            padding: '25px 30px',
            backgroundColor: '#fff',
            borderRadius: '8px',
            border: '1px solid #e0e0e0',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)',
        },
        sectionTitle: {
            fontSize: '22px',
            marginBottom: '16px',
            color: '#333',
            fontWeight: 600,
        },
        list: {
            listStyleType: 'none',
            display: 'flex',
            flexDirection: 'column',
            padding: 0,
            margin: 0,
        },
        item: {
            padding: '10px 0',
            borderBottom: '1px solid #f0f0f0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            color: '#444',
        },
        label: {
            fontWeight: 600,
            color: '#000',
            marginBottom: '4px',
            textTransform: 'capitalize',
        },
        value: {
            color: '#555',
        },
        noData: {
            fontStyle: 'italic',
            color: '#888',
        },
        saveButton: {
            backgroundColor: '#000',
            color: '#fff',
            padding: '12px 24px',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '600',
            marginTop: '30px',
            alignSelf: 'center',
            transition: 'background-color 0.3s ease',
        },

    };

    const formatLabel = (label) => {
        return label
            .replace(/_/g, ' ')
            .replace(/([a-z])([A-Z])/g, '$1 $2')
            .replace(/\b\w/g, (c) => c.toUpperCase());
    };

    const renderObject = (obj) => (
        <ul style={styles.list}>
            {Object.entries(obj).map(([key, value]) => (
                <li key={key} style={styles.item}>
                    <span style={styles.label}>{formatLabel(key)}</span>
                    <span style={styles.value}>{Array.isArray(value) ? value.join(', ') : value || '-'}</span>
                </li>
            ))}
        </ul>
    );

    const handleSave = async () => {
        const allData = {
            personalInfo,
            educationalInfo,
            testScores,
            activitiesInfo,
            newAward,
            awards
        };

        try {
            console.log('📦 Sending data to server:', allData);

            const response = await axios.post(
                'http://localhost:8080/api/v1/application/',
                allData,
                { headers: { 'Content-Type': 'application/json' } }
            );
            console.log('Data submitted successfully:', response.data);
            // const response = await fetch('http://localhost:8080/api/s', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify(allData)
            // });

            // const result = await response.json();
            // console.log('✅ Data saved successfully:', res);
        } catch (error) {
            console.error('❌ Error saving data:', error);
        }
    };


    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Application Review</h1>

            <section style={styles.section}>
                <h2 style={styles.sectionTitle}>Personal Information</h2>
                {Object.entries(personalInfo).length > 0 ? (
                    <ul style={styles.list}>
                        {Object.entries(personalInfo).map(([key, value]) => (
                            <li key={key} style={styles.item}>
                                <span style={styles.label}>{formatLabel(key)}</span>
                                <span
                                    style={styles.value}>{Array.isArray(value) ? value.join(', ') : value || '-'}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p style={styles.noData}>No personal information provided.</p>
                )}
            </section>

            <section style={styles.section}>
                <h2 style={styles.sectionTitle}>Educational Information</h2>
                {renderObject(educationalInfo)}
            </section>

            <section style={styles.section}>
                <h2 style={styles.sectionTitle}>Test Scores</h2>
                {testScores && Object.keys(testScores).length > 0 ? (
                    <ul style={styles.list}>
                        {Object.entries(testScores).map(([key, value], i) => (
                            <li key={i} style={styles.item}>
                                <span style={styles.label}>{key}</span>
                                <span style={styles.value}>{JSON.stringify(value)}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p style={styles.noData}>No test scores provided.</p>
                )}

            </section>

            <section style={styles.section}>
                <h2 style={styles.sectionTitle}>Activities</h2>
                {renderObject(activitiesInfo)}
            </section>

            <section style={styles.section}>
                <h2 style={styles.sectionTitle}>New Awards (Draft)</h2>
                {renderObject(newAward)}
            </section>

            <section style={styles.section}>
                <h2 style={styles.sectionTitle}>All Awards</h2>
                {renderObject(awards)}
            </section>
            <button style={styles.saveButton} onClick={handleSave}>Save</button>

        </div>
    );
};

export default ReviewPage;
