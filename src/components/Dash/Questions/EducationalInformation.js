import React, { useState, useRef, useEffect } from 'react';
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import ApplicationContext from "../../../context/ApplicationContext.js";
import { RxCross2 } from "react-icons/rx";
import { useLocation, useNavigate } from "react-router-dom";

const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa",
    "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
    "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
    "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi", "Jammu and Kashmir", "Ladakh"
];

const EducationalInformation = () => {
    const { educationalInfo, handleEducationalChange } = React.useContext(ApplicationContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef(null);
    const [error, setError] = useState("");
    const [newSubjects, setNewSubjects] = useState({ subjects12: '', subjects10: '' });

    const validateForm = () => {
        const requiredFields = [
            "school12", "schoolAddress12", "school10", "schoolAddress10",
            "board12", "board10", "marks12", "marks10", "date12", "date10"
        ];

        for (let field of requiredFields) {
            if (!educationalInfo[field]) {
                return `Please fill in ${field}`;
            }
        }

        if (educationalInfo.board12 === "State Board" && !educationalInfo.state12)
            return "Please select a state for 12th board";
        if (educationalInfo.board12 === "Other" && !educationalInfo.otherBoard12)
            return "Please specify the 12th board name";
        if (educationalInfo.board10 === "State Board" && !educationalInfo.state10)
            return "Please select a state for 10th board";
        if (educationalInfo.board10 === "Other" && !educationalInfo.otherBoard10)
            return "Please specify the 10th board name";

        return "";
    };

    const handleSave = () => {
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        setError("");
        console.log("Saved Educational Information:", educationalInfo);
        alert("Educational Information Saved! Check the console for details.");
        navigate('/test-scores');
    };

    const handleSubjectKeyDown = (e, key) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const trimmed = newSubjects[key].trim();
            if (trimmed && !educationalInfo[key].includes(trimmed)) {
                handleEducationalChange(key, [...educationalInfo[key], trimmed]);
            }
            setNewSubjects(prev => ({ ...prev, [key]: '' }));
        }
    };

    const removeSubject = (key, indexToRemove) => {
        const updated = educationalInfo[key].filter((_, i) => i !== indexToRemove);
        handleEducationalChange(key, updated);
    };

    useEffect(() => {
        if (location.pathname === '/education') setIsOpen(true);
    }, []);

    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.style.height = isOpen ? `${contentRef.current.scrollHeight}px` : "0px";
        }
    }, [isOpen, educationalInfo]);

    useEffect(() => {
        if (educationalInfo.board12 === "State Board")
            handleEducationalChange("state12", educationalInfo.state12 || "");
        else if (educationalInfo.board12 === "Other")
            handleEducationalChange("otherBoard12", educationalInfo.otherBoard12 || "");
        else {
            handleEducationalChange("state12", "");
            handleEducationalChange("otherBoard12", "");
        }

        if (educationalInfo.board10 === "State Board")
            handleEducationalChange("state10", educationalInfo.state10 || "");
        else if (educationalInfo.board10 === "Other")
            handleEducationalChange("otherBoard10", educationalInfo.otherBoard10 || "");
        else {
            handleEducationalChange("state10", "");
            handleEducationalChange("otherBoard10", "");
        }
    }, [educationalInfo.board12, educationalInfo.board10]);

    return (
        <div style={styles.accordionContainer}>
            <div style={styles.accordionHeader} onClick={() => setIsOpen(!isOpen)}>
                <h3 style={styles.headerText}>Educational Information</h3>
                <span style={styles.arrow}>{isOpen ? <FaAngleUp /> : <FaAngleDown />}</span>
            </div>

            <div ref={contentRef} style={{ ...styles.contentWrapper, padding: isOpen ? '20px' : '0 20px' }}>
                <div style={styles.personalInfo}>
                    {error && <div style={styles.error}>{error}</div>}

                    {[
                        { label: 'School Name of 12th', name: 'school12', type: 'text' },
                        { label: 'School Address (12th)', name: 'schoolAddress12', type: 'textarea' },
                        { label: 'School Name of 10th', name: 'school10', type: 'text' },
                        { label: 'School Address (10th)', name: 'schoolAddress10', type: 'textarea' }
                    ].map((field, i) => (
                        <React.Fragment key={i}>
                            <label style={styles.label}>{field.label}</label>
                            {field.type === 'textarea' ? (
                                <textarea
                                    name={field.name}
                                    value={educationalInfo[field.name]}
                                    onChange={(e) => handleEducationalChange(field.name, e.target.value)}
                                    style={styles.textarea}
                                />
                            ) : (
                                <input
                                    type="text"
                                    name={field.name}
                                    value={educationalInfo[field.name]}
                                    onChange={(e) => handleEducationalChange(field.name, e.target.value)}
                                    style={styles.input}
                                />
                            )}
                        </React.Fragment>
                    ))}

                    <label style={styles.label}>Board (12th)</label>
                    <select name="board12" value={educationalInfo.board12} onChange={(e) => handleEducationalChange('board12', e.target.value)} style={styles.input}>
                        <option value="">Select Board</option>
                        <option value="CBSE">CBSE</option>
                        <option value="ICSE">ICSE</option>
                        <option value="State Board">State Board</option>
                        <option value="Other">Other</option>
                    </select>

                    {educationalInfo.board12 === "State Board" && (
                        <select name="state12" value={educationalInfo.state12 || ""} onChange={(e) => handleEducationalChange('state12', e.target.value)} style={styles.input}>
                            <option value="">Select State</option>
                            {indianStates.map((state, idx) => <option key={idx} value={state}>{state}</option>)}
                        </select>
                    )}

                    {educationalInfo.board12 === "Other" && (
                        <input type="text" name="otherBoard12" placeholder="Specify other board" value={educationalInfo.otherBoard12 || ""} onChange={(e) => handleEducationalChange('otherBoard12', e.target.value)} style={styles.input} />
                    )}

                    <label style={styles.label}>Board (10th)</label>
                    <select name="board10" value={educationalInfo.board10} onChange={(e) => handleEducationalChange('board10', e.target.value)} style={styles.input}>
                        <option value="">Select Board</option>
                        <option value="CBSE">CBSE</option>
                        <option value="ICSE">ICSE</option>
                        <option value="State Board">State Board</option>
                        <option value="Other">Other</option>
                    </select>

                    {educationalInfo.board10 === "State Board" && (
                        <select name="state10" value={educationalInfo.state10 || ""} onChange={(e) => handleEducationalChange('state10', e.target.value)} style={styles.input}>
                            <option value="">Select State</option>
                            {indianStates.map((state, idx) => <option key={idx} value={state}>{state}</option>)}
                        </select>
                    )}

                    {educationalInfo.board10 === "Other" && (
                        <input type="text" name="otherBoard10" placeholder="Specify other board" value={educationalInfo.otherBoard10 || ""} onChange={(e) => handleEducationalChange('otherBoard10', e.target.value)} style={styles.input} />
                    )}

                    <label style={styles.label}>Marks (12th)</label>
                    <input type="number" name="marks12" value={educationalInfo.marks12} onChange={(e) => handleEducationalChange('marks12', e.target.value)} style={styles.input} />

                    <label style={styles.label}>Marks (10th)</label>
                    <input type="number" name="marks10" value={educationalInfo.marks10} onChange={(e) => handleEducationalChange('marks10', e.target.value)} style={styles.input} />

                    <label style={styles.label}>Date of Completion (12th)</label>
                    <input type="date" name="date12" value={educationalInfo.date12} onChange={(e) => handleEducationalChange('date12', e.target.value)} style={styles.input} />

                    <label style={styles.label}>Date of Completion (10th)</label>
                    <input type="date" name="date10" value={educationalInfo.date10} onChange={(e) => handleEducationalChange('date10', e.target.value)} style={styles.input} />

                    <label style={styles.label}>Subjects (12th)</label>
                    <div style={styles.subjectWrapper}>
                        {educationalInfo.subjects12.map((subject, index) => (
                            <div key={index} style={styles.subjectTag}>
                                {subject}
                                <span style={styles.removeTag} onClick={() => removeSubject('subjects12', index)}><RxCross2 /></span>
                            </div>
                        ))}
                        <input type="text" placeholder="Add subject" value={newSubjects.subjects12} onChange={(e) => setNewSubjects({ ...newSubjects, subjects12: e.target.value })} onKeyDown={(e) => handleSubjectKeyDown(e, 'subjects12')} style={styles.subjectInput} />
                    </div>

                    <label style={styles.label}>Subjects (10th)</label>
                    <div style={styles.subjectWrapper}>
                        {educationalInfo.subjects10.map((subject, index) => (
                            <div key={index} style={styles.subjectTag}>
                                {subject}
                                <span style={styles.removeTag} onClick={() => removeSubject('subjects10', index)}><RxCross2 /></span>
                            </div>
                        ))}
                        <input type="text" placeholder="Add subject" value={newSubjects.subjects10} onChange={(e) => setNewSubjects({ ...newSubjects, subjects10: e.target.value })} onKeyDown={(e) => handleSubjectKeyDown(e, 'subjects10')} style={styles.subjectInput} />
                    </div>

                    <button onClick={handleSave} style={styles.saveButton}>Continue</button>
                </div>
            </div>
        </div>
    );
};

export default EducationalInformation;

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
    textarea: {
        width: '50%',
        height: '80px',
        marginBottom: '10px',
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        resize: 'vertical',
        fontFamily: 'inherit',
        fontSize: '14px',
    },
    subjectWrapper: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
        width: '50%',
        marginBottom: '10px',
    },
    subjectTag: {
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
    subjectInput: {
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
    error: {
        color: 'red',
        fontWeight: '500',
        marginBottom: '10px',
    }
};
