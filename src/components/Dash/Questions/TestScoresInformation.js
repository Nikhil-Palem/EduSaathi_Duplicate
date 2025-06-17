import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import ApplicationContext from "../../../context/ApplicationContext.js";

const TestScoresInformation = () => {
    const location = useLocation();
    const { testScores, handleTestScoreChange } = React.useContext(ApplicationContext);

    const [isOpen, setIsOpen] = useState(false);
    const [errors, setErrors] = useState({});
    const contentRef = useRef(null);
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};

        // JEE Score Validation
        if (testScores.jeeScore && (testScores.jeeScore < 0 || testScores.jeeScore > 300))
            newErrors.jeeScore = "Enter a valid JEE Score (0-300)";

        // NEET Score Validation
        if (testScores.neetScore && (testScores.neetScore < 0 || testScores.neetScore > 720))
            newErrors.neetScore = "Enter a valid NEET Score (0-720)";

        // SAT Score Validation
        if (testScores.satScore && (testScores.satScore < 400 || testScores.satScore > 1600))
            newErrors.satScore = "Enter a valid SAT Score (400-1600)";

        // GRE Score Validation
        if (testScores.greScore && (testScores.greScore < 260 || testScores.greScore > 340))
            newErrors.greScore = "Enter a valid GRE Score (260-340)";

        // GMAT Score Validation
        if (testScores.gmatScore && (testScores.gmatScore < 200 || testScores.gmatScore > 800))
            newErrors.gmatScore = "Enter a valid GMAT Score (200-800)";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        if (!validateForm()) {
            alert("Please fix the errors before continuing.");
            return;
        }

        console.log("Saved Test Scores:", testScores);
        alert("Test Scores Saved! Check the console for details.");
        navigate("/activities");
    };

    useEffect(() => {
        if (location.pathname === '/test-scores') {
            setIsOpen(true);
        }
    }, [location.pathname]);

    useEffect(() => {
        if (contentRef.current) {
            if (isOpen) {
                contentRef.current.style.height = 'auto';
                const scrollHeight = contentRef.current.scrollHeight;
                contentRef.current.style.height = scrollHeight + "px";
            } else {
                contentRef.current.style.height = "0px";
            }
        }
    }, [isOpen, errors, testScores]);

    return (
        <div style={styles.accordionContainer}>
            <div style={styles.accordionHeader} onClick={() => setIsOpen(prev => !prev)}>
                <h3 style={styles.headerText}>Test Scores</h3>
                <span style={styles.arrow}>{isOpen ? <FaAngleUp /> : <FaAngleDown />}</span>
            </div>

            <div
                ref={contentRef}
                style={{
                    ...styles.contentWrapper,
                    padding: isOpen ? '20px' : '0 20px'
                }}
            >
                <div style={styles.personalInfo}>

                    {/* JEE Score */}
                    <label style={styles.label}>JEE Score (Optional)</label>
                    <input
                        type="number"
                        name="jeeScore"
                        value={testScores.jeeScore || ''}
                        onChange={(e) => handleTestScoreChange('jeeScore', e.target.value)}
                        style={{ ...styles.input, borderColor: errors.jeeScore ? 'red' : '#ccc' }}
                    />
                    {errors.jeeScore && <span style={styles.errorText}>{errors.jeeScore}</span>}

                    {/* NEET Score */}
                    <label style={styles.label}>NEET Score (Optional)</label>
                    <input
                        type="number"
                        name="neetScore"
                        value={testScores.neetScore || ''}
                        onChange={(e) => handleTestScoreChange('neetScore', e.target.value)}
                        style={{ ...styles.input, borderColor: errors.neetScore ? 'red' : '#ccc' }}
                    />
                    {errors.neetScore && <span style={styles.errorText}>{errors.neetScore}</span>}

                    {/* SAT Score */}
                    <label style={styles.label}>SAT Score (Optional)</label>
                    <input
                        type="number"
                        name="satScore"
                        value={testScores.satScore || ''}
                        onChange={(e) => handleTestScoreChange('satScore', e.target.value)}
                        style={{ ...styles.input, borderColor: errors.satScore ? 'red' : '#ccc' }}
                    />
                    {errors.satScore && <span style={styles.errorText}>{errors.satScore}</span>}

                    {/* GRE Score */}
                    <label style={styles.label}>GRE Score (Optional)</label>
                    <input
                        type="number"
                        name="greScore"
                        value={testScores.greScore || ''}
                        onChange={(e) => handleTestScoreChange('greScore', e.target.value)}
                        style={{ ...styles.input, borderColor: errors.greScore ? 'red' : '#ccc' }}
                    />
                    {errors.greScore && <span style={styles.errorText}>{errors.greScore}</span>}

                    {/* GMAT Score */}
                    <label style={styles.label}>GMAT Score (Optional)</label>
                    <input
                        type="number"
                        name="gmatScore"
                        value={testScores.gmatScore || ''}
                        onChange={(e) => handleTestScoreChange('gmatScore', e.target.value)}
                        style={{ ...styles.input, borderColor: errors.gmatScore ? 'red' : '#ccc' }}
                    />
                    {errors.gmatScore && <span style={styles.errorText}>{errors.gmatScore}</span>}

                    <button onClick={handleSave} style={styles.saveButton}>Continue</button>
                </div>
            </div>
        </div>
    );
};

export default TestScoresInformation;

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
        height: '0px',
        overflow: 'hidden',
        transition: 'height 0.3s ease, padding 0.3s ease',
    },
    personalInfo: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
    },
    label: {
        textAlign: 'left',
        width: '50%',
        fontWeight: '500',
    },
    input: {
        width: '50%',
        marginBottom: '10px',
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ccc',
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
    errorText: {
        color: 'red',
        fontSize: '12px',
        alignSelf: 'flex-start',
        width: '50%',
        marginTop: '-8px',
        marginBottom: '6px',
    },
};
