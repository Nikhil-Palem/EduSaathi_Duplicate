import React, {useState, useRef, useEffect} from 'react';
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import ApplicationContext from "../../../context/ApplicationContext.js";
import {Route, useLocation, useNavigate} from "react-router-dom";
import AchievementsInformation from "./AchievementsInformation.js";

const ActivitiesInformation = () => {
    const { activitiesInfo, handleActivitiesChange } = React.useContext(ApplicationContext);
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();
    const [newActivity, setNewActivity] = useState({
        leadership: '',
        sports: '',
        volunteering: '',
        ncc_nss: '',
        cultural: '',
        olympiads: ''
    });

    const handleKeyDown = (e, key) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const trimmed = newActivity[key].trim();
            if (trimmed && !activitiesInfo[key].includes(trimmed)) {
                handleActivitiesChange(key, [...activitiesInfo[key], trimmed]);
            }
            setNewActivity(prev => ({ ...prev, [key]: '' }));
        }
    };

    const removeItem = (key, index) => {
        const updated = activitiesInfo[key].filter((_, i) => i !== index);
        handleActivitiesChange(key, updated);
    };
    useEffect(() => {
        if (location.pathname === '/activities') {
            setIsOpen(true);
        }
    }, []);
    const handleSave = () => {
        console.log("Saved Activities:", activitiesInfo);
        alert("Activities Information Saved! Check the console for details.");
        navigate("/achievements")
    };

    const activityFields = [
        { key: "leadership", label: "Leadership Roles" },
        { key: "sports", label: "Sports" },
        { key: "volunteering", label: "Volunteering" },
        { key: "ncc_nss", label: "NCC/NSS" },
        { key: "cultural", label: "Cultural Activities" },
        { key: "olympiads", label: "Olympiads & Competitions" }
    ];

    return (
        <div style={styles.accordionContainer}>
            <div style={styles.accordionHeader} onClick={() => setIsOpen(!isOpen)}>
                <h3 style={styles.headerText}>Activities</h3>
                <span style={styles.arrow}>{isOpen ? <FaAngleUp /> : <FaAngleDown />}</span>
            </div>

            <div
                ref={contentRef}
                style={{
                    ...styles.contentWrapper,
                    maxHeight: isOpen ? '500px' : '0px',
                    padding: isOpen ? '20px' : '0 20px'
                }}
            >
                <div style={styles.section}>
                    {activityFields.map(({ key, label }) => (
                        <div key={key} style={styles.fieldGroup}>
                            <label style={styles.label}>{label}</label>
                            <div style={styles.tagContainer}>
                                {activitiesInfo[key]?.map((item, index) => (
                                    <div key={index} style={styles.tag}>
                                        {item}
                                        <span style={styles.removeTag} onClick={() => removeItem(key, index)}><RxCross2 /></span>
                                    </div>
                                ))}
                                <input
                                    type="text"
                                    placeholder={`Add ${label}`}
                                    value={newActivity[key]}
                                    onChange={(e) => setNewActivity(prev => ({ ...prev, [key]: e.target.value }))}
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
    );
};

export default ActivitiesInformation;

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
