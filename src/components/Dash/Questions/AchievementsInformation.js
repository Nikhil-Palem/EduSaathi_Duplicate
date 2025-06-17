import React, {useContext, useEffect, useRef, useState} from 'react';
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import ApplicationContext from "../../../context/ApplicationContext.js";
import {useLocation, useNavigate} from "react-router-dom";

const AchievementsInformation = () => {
    const { newAward, setNewAward, awards, setAwards } = useContext(ApplicationContext);
    const [isOpen10th, setIsOpen10th] = useState(false);
    const [isOpen12th, setIsOpen12th] = useState(false);
    const contentRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();
    const awardFields = [
        { key: "academics", label: "Academic Excellence" },
        { key: "olympiads", label: "Olympiads" },
        { key: "scholarships", label: "Scholarships" },
        { key: "competitions", label: "Competitions" },
        { key: "schoolAwards", label: "School Awards" },
        { key: "other", label: "Other Recognitions" }
    ];

    const handleKeyDown = (e, key) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const trimmed = newAward[key].trim();
            if (trimmed && !awards[key].includes(trimmed)) {
                setAwards(prev => ({ ...prev, [key]: [...prev[key], trimmed] }));
            }
            setNewAward(prev => ({ ...prev, [key]: '' }));
        }
    };

    const removeItem = (key, index) => {
        const updated = awards[key].filter((_, i) => i !== index);
        setAwards(prev => ({ ...prev, [key]: updated }));
    };
    useEffect(() => {
        if (location.pathname === '/achievements') {
            setIsOpen10th(true);
        }
    }, [location]);
    const handleSave = () => {
        console.log("Saved Achievements:", awards);
        alert("Achievements Information Saved! Check the console for details.");
        navigate("/review");
    };

    return (
        <div>
            <div style={styles.accordionContainer}>
                <div style={styles.accordionHeader} onClick={() => setIsOpen10th(!isOpen10th)}>
                    <h3 style={styles.headerText}>10th Achievements</h3>
                    <span style={styles.arrow}>{isOpen10th ? <FaAngleUp/> : <FaAngleDown/>}</span>
                </div>

                <div
                    ref={contentRef}
                    style={{
                        ...styles.contentWrapper,
                        maxHeight: isOpen10th ? '500px' : '0px',
                        padding: isOpen10th ? '20px' : '0 20px'
                    }}
                >
                    <div style={styles.section}>
                        {awardFields.map(({key, label}) => (
                            <div key={key} style={styles.fieldGroup}>
                                <label style={styles.label}>{label}</label>
                                <div style={styles.tagContainer}>
                                    {awards[key]?.map((item, index) => (
                                        <div key={index} style={styles.tag}>
                                            {item}
                                            <span style={styles.removeTag}
                                                  onClick={() => removeItem(key, index)}><RxCross2/></span>
                                        </div>
                                    ))}
                                    <input
                                        type="text"
                                        placeholder={`Add ${label}`}
                                        value={newAward[key]}
                                        onChange={(e) => setNewAward(prev => ({...prev, [key]: e.target.value}))}
                                        onKeyDown={(e) => handleKeyDown(e, key)}
                                        style={styles.input}
                                    />
                                </div>
                            </div>
                        ))}
                        <button onClick={()=>{
                            setIsOpen10th(false);
                            setIsOpen12th(true);
                        }} style={styles.saveButton}>Next</button>
                    </div>
                </div>
            </div>
                {/*//12th*/}
            <div style={styles.accordionContainer}>
                <div style={styles.accordionHeader} onClick={() => setIsOpen12th(!isOpen12th)}>
                    <h3 style={styles.headerText}>12th Achievements</h3>
                    <span style={styles.arrow}>{isOpen12th ? <FaAngleUp/> : <FaAngleDown/>}</span>
                </div>

                <div
                    ref={contentRef}
                    style={{
                        ...styles.contentWrapper,
                        maxHeight: isOpen12th ? '500px' : '0px',
                        padding: isOpen12th ? '20px' : '0 20px'
                    }}
                >
                    <div style={styles.section}>
                        {awardFields.map(({key, label}) => (
                            <div key={key} style={styles.fieldGroup}>
                                <label style={styles.label}>{label}</label>
                                <div style={styles.tagContainer}>
                                    {awards[key]?.map((item, index) => (
                                        <div key={index} style={styles.tag}>
                                            {item}
                                            <span style={styles.removeTag}
                                                  onClick={() => removeItem(key, index)}><RxCross2/></span>
                                        </div>
                                    ))}
                                    <input
                                        type="text"
                                        placeholder={`Add ${label}`}
                                        value={newAward[key]}
                                        onChange={(e) => setNewAward(prev => ({...prev, [key]: e.target.value}))}
                                        onKeyDown={(e) => handleKeyDown(e, key)}
                                        style={styles.input}
                                    />
                                </div>
                            </div>
                        ))}
                        <button onClick={handleSave} style={styles.saveButton}>Continue</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AchievementsInformation;

const styles = {
    accordionContainer: {
        maxWidth: '800px',
        margin: '20px auto',
        border: '1px solid #ccc',
        borderRadius: '8px',
        backgroundColor: '#fff',
        overflow: 'hidden',
    },
    accordionHeader: {
        padding: '15px 20px',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerText: {
        margin: 0,
        fontSize: '18px',
        fontWeight: '600',
        color: '#333',
    },
    arrow: {
        fontSize: '18px',
        color: '#555',
    },
    contentWrapper: {
        maxHeight: '0px',
        overflowY: 'auto',
        transition: 'max-height 0.3s ease, padding 0.3s ease',
    },
    section: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
    },
    fieldGroup: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    label: {
        width: '50%',
        fontWeight: '500',
        textAlign: 'left',
        marginBottom: '5px',
    },
    tagContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
        width: '50%',
    },
    tag: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#e0e0e0',
        borderRadius: '16px',
        padding: '5px 10px',
        fontSize: '14px',
    },
    removeTag: {
        marginLeft: '8px',
        cursor: 'pointer',
        fontWeight: 'bold',
        color: '#333',
    },
    input: {
        flex: '1',
        minWidth: '120px',
        border: 'none',
        borderBottom: '1px solid #ccc',
        outline: 'none',
        fontSize: '14px',
        padding: '4px 6px',
    },
    saveButton: {
        padding: '10px 20px',
        backgroundColor: '#000000',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '10px',
    },
};