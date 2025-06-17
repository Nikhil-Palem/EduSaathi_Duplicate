import React, { useState } from 'react';
import ApplicationContext from "./ApplicationContext.js";

export function ApplicationContextProvider({ children }) {
    const [personalInfo, setPersonalInfo] = useState({
        givenName: '',
        middleName: '',
        lastName: '',
        dob: '',
        gender: '',
        socialCategory: 'General',
        customCategory: '',
        fatherName: '',
        motherName: '',
        address: '',
        email: '',
        contact: ''
    });

    const [educationalInfo, setEducationalInfo] = useState({
        school12: '',
        schoolAddress12: '',
        school10: '',
        schoolAddress10: '',
        board12: '',
        board10: '',
        marks12: '',
        marks10: '',
        date12: '',
        date10: '',
        subjects12: [],
        subjects10: []
    });

    const [testScores, setTestScores] = useState({
        jeeScore: '',
        neetScore: '',
        satScore: '',
        greScore: '',
        gmatScore: ''
    });

    const [uploadApplication, setUploadApplication] = useState(null);

    const [answer, setAnswer] = useState({
        personal: {},
        educational: {}
    });

    const [activitiesInfo, setActivitiesInfo] = useState({
        leadership: [],
        sports: [],
        volunteering: [],
        ncc_nss: [],
        cultural: [],
        olympiads: []
    });

    const [newAward, setNewAward] = useState({
        academics: '',
        olympiads: '',
        scholarships: '',
        competitions: '',
        schoolAwards: '',
        other: ''
    });

    const [awards, setAwards] = useState({
        academics: [],
        olympiads: [],
        scholarships: [],
        competitions: [],
        schoolAwards: [],
        other: []
    });

    const handleInputChange = (name, value) => {
        setPersonalInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleEducationalChange = (name, value) => {
        setEducationalInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleTestScoreChange = (name, value) => {
        setTestScores(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleActivitiesChange = (key, value) => {
        setActivitiesInfo(prev => ({
            ...prev,
            [key]: value
        }));
    };

    return (
        <ApplicationContext.Provider
            value={{
                answer,
                setAnswer,
                personalInfo,
                handleInputChange,
                educationalInfo,
                handleEducationalChange,
                testScores,
                handleTestScoreChange,
                uploadApplication,
                setUploadApplication,
                activitiesInfo,
                handleActivitiesChange,
                newAward,
                setNewAward,
                awards,
                setAwards
            }}
        >
            {children}
        </ApplicationContext.Provider>
    );
}
