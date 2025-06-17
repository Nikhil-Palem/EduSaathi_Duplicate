import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import ApplicationContext from "../../../context/ApplicationContext.js";

const PersonalInformation = () => {
    const location = useLocation();
    const { personalInfo, handleInputChange } = React.useContext(ApplicationContext);

    const [isOpen, setIsOpen] = useState(false);
    const [errors, setErrors] = useState({});
    const contentRef = useRef(null);
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};
        if (!personalInfo.givenName) newErrors.givenName = "Given name is required";
        if (!personalInfo.lastName) newErrors.lastName = "Last name is required";
        if (!personalInfo.gender) newErrors.gender = "Gender is required";
        if (!personalInfo.dob) newErrors.dob = "Date of birth is required";
        if (!personalInfo.fatherName) newErrors.fatherName = "Father's name is required";
        if (!personalInfo.motherName) newErrors.motherName = "Mother's name is required";
        if (!personalInfo.address) newErrors.address = "Address is required";
        if (!personalInfo.email) {
            newErrors.email = "Email is required";
        } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(personalInfo.email)) {
            newErrors.email = "Invalid email format";
        }
        if (!personalInfo.contact) {
            newErrors.contact = "Contact number is required";
        } else if (!/^\d{10}$/.test(personalInfo.contact)) {
            newErrors.contact = "Contact must be 10 digits";
        }
        if (personalInfo.socialCategory === 'others' && !personalInfo.customCategory) {
            newErrors.customCategory = "Please mention your social category";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        if (!validateForm()) {
            alert("Please fix the errors before continuing.");
            return;
        }

        console.log("Saved Personal Information:", personalInfo);
        alert("Personal Information Saved! Check the console for details.");
        navigate("/education");
    };

    useEffect(() => {
        if (location.pathname === '/personal-info') {
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
    }, [isOpen, errors, personalInfo]);

    return (
        <div style={styles.accordionContainer}>
            <div style={styles.accordionHeader} onClick={() => setIsOpen(prev => !prev)}>
                <h3 style={styles.headerText}>Personal Information</h3>
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
                    <label style={styles.label}>Legal/Given Name</label>
                    <input type="text" name="givenName" value={personalInfo.givenName} onChange={(e) => handleInputChange('givenName', e.target.value)} style={{ ...styles.input, borderColor: errors.givenName ? 'red' : '#ccc' }} />
                    {errors.givenName && <span style={styles.errorText}>{errors.givenName}</span>}

                    <label style={styles.label}>Middle Name</label>
                    <input type="text" name="middleName" value={personalInfo.middleName} onChange={(e) => handleInputChange('middleName', e.target.value)} style={styles.input} />

                    <label style={styles.label}>Last Name/Surname</label>
                    <input type="text" name="lastName" value={personalInfo.lastName} onChange={(e) => handleInputChange('lastName', e.target.value)} style={{ ...styles.input, borderColor: errors.lastName ? 'red' : '#ccc' }} />
                    {errors.lastName && <span style={styles.errorText}>{errors.lastName}</span>}

                    <label style={styles.label}>Gender</label>
                    <div style={{ display: 'flex', gap: '20px', marginBottom: '10px' }}>
                        {["Male", "Female", "Other"].map((gender) => (
                            <label key={gender} style={styles.radioLabel}>
                                <input type="radio" name="gender" value={gender} checked={personalInfo.gender === gender} onChange={(e) => handleInputChange("gender", e.target.value)} style={styles.radioInput} />
                                {gender}
                            </label>
                        ))}
                    </div>
                    {errors.gender && <span style={styles.errorText}>{errors.gender}</span>}

                    <label style={styles.label}>Date of Birth</label>
                    <input type="date" name="dob" value={personalInfo.dob} onChange={(e) => handleInputChange('dob', e.target.value)} style={{ ...styles.input, borderColor: errors.dob ? 'red' : '#ccc' }} />
                    {errors.dob && <span style={styles.errorText}>{errors.dob}</span>}

                    <label style={styles.label}>Social Category</label>
                    <select name="socialCategory" value={personalInfo.socialCategory} onChange={(e) => handleInputChange('socialCategory', e.target.value)} style={styles.select}>
                        <option value="General">General</option>
                        <option value="SC">Scheduled Caste</option>
                        <option value="ST">Scheduled Tribe</option>
                        <option value="EWS">Economically Weaker Class</option>
                        <option value="NA">Not Applicable</option>
                        <option value="others">Others</option>
                    </select>

                    {personalInfo.socialCategory === 'others' && (
                        <div style={styles.customCategory}>
                            <label htmlFor="custom-category" style={styles.customCategoryLabel}>Please Mention your Social Category</label>
                            <input type="text" name="customCategory" value={personalInfo.customCategory} onChange={(e) => handleInputChange('customCategory', e.target.value)} style={{ ...styles.customCategoryInput, borderColor: errors.customCategory ? 'red' : '#ccc' }} />
                            {errors.customCategory && <span style={styles.errorText}>{errors.customCategory}</span>}
                        </div>
                    )}

                    <label style={styles.label}>Father's Name</label>
                    <input type="text" name="fatherName" value={personalInfo.fatherName} onChange={(e) => handleInputChange('fatherName', e.target.value)} style={{ ...styles.input, borderColor: errors.fatherName ? 'red' : '#ccc' }} />
                    {errors.fatherName && <span style={styles.errorText}>{errors.fatherName}</span>}

                    <label style={styles.label}>Mother's Name</label>
                    <input type="text" name="motherName" value={personalInfo.motherName} onChange={(e) => handleInputChange('motherName', e.target.value)} style={{ ...styles.input, borderColor: errors.motherName ? 'red' : '#ccc' }} />
                    {errors.motherName && <span style={styles.errorText}>{errors.motherName}</span>}

                    <label style={styles.label}>Address</label>
                    <input type="text" name="address" value={personalInfo.address} onChange={(e) => handleInputChange('address', e.target.value)} style={{ ...styles.input, borderColor: errors.address ? 'red' : '#ccc' }} />
                    {errors.address && <span style={styles.errorText}>{errors.address}</span>}

                    <label style={styles.label}>Email</label>
                    <input type="email" name="email" value={personalInfo.email} onChange={(e) => handleInputChange('email', e.target.value)} style={{ ...styles.input, borderColor: errors.email ? 'red' : '#ccc' }} />
                    {errors.email && <span style={styles.errorText}>{errors.email}</span>}

                    <label style={styles.label}>Contact Number</label>
                    <input type="tel" name="contact" value={personalInfo.contact} onChange={(e) => handleInputChange('contact', e.target.value)} style={{ ...styles.input, borderColor: errors.contact ? 'red' : '#ccc' }} />
                    {errors.contact && <span style={styles.errorText}>{errors.contact}</span>}

                    <button onClick={handleSave} style={styles.saveButton}>Continue</button>
                </div>
            </div>
        </div>
    );
};

export default PersonalInformation;

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
    select: {
        width: '52%',
        height: '40px',
        marginBottom: '10px',
        marginTop: '5px',
        padding: '6px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    customCategory: {
        width: '52%',
        textAlign: 'left',
    },
    customCategoryInput: {
        width: '97%',
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    customCategoryLabel: {
        textAlign: 'left',
        width: '100%',
        marginBottom: '4px',
        fontWeight: '500',
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
    radioLabel: {
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
    },
    radioInput: {
        marginRight: '4px',
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
