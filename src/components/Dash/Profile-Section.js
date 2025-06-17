import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css';
import PersonalInformation from "./Questions/PersonalInformation.js";
const ProfileSection = () => {
    const [user, setUser] = useState(null);
    const [editedUser, setEditedUser] = useState({});
    const [passwordInputs, setPasswordInputs] = useState({
        oldPassword: '',
        newPassword: ''
    });
    const [showPopup, setShowPopup] = useState(false);
    const [fieldToEdit, setFieldToEdit] = useState('');
    const [selectedImageFile, setSelectedImageFile] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/users/', { withCredentials: true })
            .then(response => {
                setUser(response.data.data);
                setEditedUser(response.data.data);
            })
            .catch(error => {
                console.error("Error fetching user data:", error);
            });
    }, []);

    const openEditPopup = () => setShowPopup(true);
    const handleFieldSelect = (field) => setFieldToEdit(field);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (fieldToEdit === 'password') {
            setPasswordInputs(prev => ({ ...prev, [name]: value }));
        } else {
            setEditedUser(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImageFile(file);
            const imageUrl = URL.createObjectURL(file);
            setEditedUser(prev => ({ ...prev, profileImage: imageUrl }));
        }
    };

    const handleSave = () => {
        if (fieldToEdit === 'profileImage') {
            if (selectedImageFile) {
                const formData = new FormData();
                formData.append('profileImage', selectedImageFile);

                axios.put('http://localhost:8080/api/v1/users/edit', formData, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then(response => {
                        setUser(response.data.data);
                        setEditedUser(response.data.data);
                        setSelectedImageFile(null);
                    })
                    .catch(error => {
                        console.error("Image upload failed:", error);
                    });
            } else if (editedUser.profileImage && editedUser.profileImage.startsWith('http')) {
                const payload = { profileImage: editedUser.profileImage };

                axios.put('http://localhost:8080/api/v1/users/edit', payload, {
                    withCredentials: true
                })
                    .then(response => {
                        setUser(response.data.data);
                        setEditedUser(response.data.data);
                    })
                    .catch(error => {
                        console.error("Image URL update failed:", error);
                    });
            }
        } else if (fieldToEdit === 'password') {
            axios.put('http://localhost:8080/api/v1/users/edit', passwordInputs, {
                withCredentials: true
            })
                .then(response => {
                    alert("Password updated successfully.");
                })
                .catch(error => {
                    alert("Incorrect old password or error updating.");
                    console.error("Password update failed:", error);
                });
        } else {
            const updatedField = { [fieldToEdit]: editedUser[fieldToEdit] };

            axios.put('http://localhost:8080/api/v1/users/edit', updatedField, {
                withCredentials: true
            })
                .then(response => {
                    setUser(response.data.data);
                    setEditedUser(response.data.data);
                })
                .catch(error => {
                    console.error("Update failed:", error);
                });
        }

        setShowPopup(false);
        setFieldToEdit('');
        setPasswordInputs({ oldPassword: '', newPassword: '' });
    };

    const handleCancel = () => {
        setShowPopup(false);
        setFieldToEdit('');
        setEditedUser(user);
        setSelectedImageFile(null);
        setPasswordInputs({ oldPassword: '', newPassword: '' });
    };

    if (!user) return <div className="loading">Loading...</div>;

    return (
        <div className="profile-card">
            <div className="profile-content">
                <img className="profile-image" style={{ width: '150px', height: '150px' }} src={user.profileImage} alt="Profile" />
                <h2 className="profile-name">{user.name}</h2>
                <div className="profile-info">
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Edu ID:</strong> {user.eduId}</p>
                </div>
                <div className="button-group">
                    <button className="edit-btn" style={{ fontSize: "23px" }} onClick={openEditPopup}>Edit</button>
                </div>
            </div>

            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup-box">
                        {!fieldToEdit ? (
                            <>
                                <h3>What do you want to edit?</h3>
                                <div className="popup-options">
                                    <button onClick={() => handleFieldSelect('name')}>Name</button>
                                    <button onClick={() => handleFieldSelect('email')}>Email</button>
                                    <button onClick={() => handleFieldSelect('password')}>Password</button>
                                    <button onClick={() => handleFieldSelect('profileImage')}>Profile Image</button>
                                </div>
                                <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
                            </>
                        ) : (
                            <>
                                <h3>Edit {fieldToEdit}</h3>

                                {fieldToEdit === 'profileImage' ? (
                                    <>
                                        <p>Paste image URL:</p>
                                        <input
                                            type="text"
                                            name="profileImage"
                                            className="edit-input"
                                            value={editedUser.profileImage || ''}
                                            onChange={handleChange}
                                        />
                                        <p>Or upload from device:</p>
                                        <label className="custom-file-upload">
                                            Upload from device
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                            />
                                        </label>
                                        {selectedImageFile && (
                                            <p style={{ marginTop: '10px' }}>{selectedImageFile.name}</p>
                                        )}
                                        {editedUser.profileImage && (
                                            <img
                                                src={editedUser.profileImage}
                                                alt="Preview"
                                                style={{
                                                    marginTop: '50px',
                                                    width: '100px',
                                                    height: '100px',
                                                    objectFit: 'cover',
                                                    borderRadius: '10px'
                                                }}
                                            />
                                        )}
                                    </>
                                ) : fieldToEdit === 'password' ? (
                                    <>
                                        <input
                                            type="password"
                                            name="oldPassword"
                                            placeholder="Old Password"
                                            className="edit-input"
                                            value={passwordInputs.oldPassword}
                                            onChange={handleChange}
                                        />
                                        <input
                                            type="password"
                                            name="newPassword"
                                            placeholder="New Password"
                                            className="edit-input"
                                            value={passwordInputs.newPassword}
                                            onChange={handleChange}
                                        />
                                    </>
                                ) : (
                                    <input
                                        type="text"
                                        name={fieldToEdit}
                                        className="edit-input"
                                        value={editedUser[fieldToEdit] || ''}
                                        onChange={handleChange}
                                    />
                                )}

                                <div className="button-group">
                                    <button className="save-btn" onClick={handleSave}>Save</button>
                                    <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileSection;
