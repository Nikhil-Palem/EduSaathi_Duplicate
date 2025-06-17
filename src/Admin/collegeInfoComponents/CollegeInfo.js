import React, { useState, useEffect, useContext } from 'react';
import './CollegeInfo.css';
import AddQuestionContext from "../../context/AddQuestionContext.js";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../configureComponents/Questions/ToastStyles.css"; // Custom styles

const CollegeInfo = () => {
    const { setValue6, setValue7, setValue8 } = useContext(AddQuestionContext);

    // Initialize state from localStorage or default values
    const [links, setLinks] = useState(() => {
        const savedLinks = localStorage.getItem('collegeLinks');
        return savedLinks ? JSON.parse(savedLinks) : [''];
    });

    const [contacts, setContacts] = useState(() => {
        const savedContacts = localStorage.getItem('collegeContacts');
        return savedContacts ? JSON.parse(savedContacts) : [''];
    });

    const [address, setAddress] = useState(() => {
        const savedAddress = localStorage.getItem('collegeAddress');
        return savedAddress || '';
    });

    // Save data to localStorage whenever state changes
    useEffect(() => {
        localStorage.setItem('collegeLinks', JSON.stringify(links));
        setValue6((prevValue) => ({
            ...prevValue,
            links: links,
        }));
    }, [links, setValue6]);

    useEffect(() => {
        localStorage.setItem('collegeContacts', JSON.stringify(contacts));
        setValue7((prevValue) => ({
            ...prevValue,
            contacts: contacts,
        }));
    }, [contacts, setValue7]);

    useEffect(() => {
        localStorage.setItem('collegeAddress', address);
        setValue8((prevValue) => ({
            ...prevValue,
            address: address,
        }));
    }, [address, setValue8]);

    // Handle link changes
    const handleLinkChange = (index, value) => {
        const updatedLinks = [...links];
        updatedLinks[index] = value;
        setLinks(updatedLinks);
    };

    const handleAddLink = () => {
        setLinks([...links, '']);
    };

    const handleDeleteLink = (index) => {
        if (links.length > 1) {
            const updatedLinks = links.filter((_, i) => i !== index);
            setLinks(updatedLinks);
        }
    };

    // Handle contact changes
    const handleContactChange = (index, value) => {
        const updatedContacts = [...contacts];
        updatedContacts[index] = value;
        setContacts(updatedContacts);
    };

    const handleAddContact = () => {
        setContacts([...contacts, '']);
    };

    const handleDeleteContact = (index) => {
        if (contacts.length > 1) {
            const updatedContacts = contacts.filter((_, i) => i !== index);
            setContacts(updatedContacts);
        }
    };

    // Save data to localStorage and context
    const saveData = () => {
        const allLinksFilled = links.every((link) => link.trim() !== '');
        const allContactsFilled = contacts.every((contact) => contact.trim() !== '');
        const addressFilled = address.trim() !== '';

        if (!allLinksFilled || !allContactsFilled || !addressFilled) {
            toast.error("Please fill all fields before saving!", {
                position: "top-right",
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
                pauseOnFocusLoss: false,
            });
            return;
        }

        localStorage.setItem('collegeLinks', JSON.stringify(links));
        setValue6((prevValue) => ({
            ...prevValue,
            links: links,
        }));

        localStorage.setItem('collegeContacts', JSON.stringify(contacts));
        setValue7((prevValue) => ({
            ...prevValue,
            contacts: contacts,
        }));

        localStorage.setItem('collegeAddress', address);
        setValue8((prevValue) => ({
            ...prevValue,
            address: address,
        }));

        toast.success("College information saved successfully!", {
            position: "top-right",
            autoClose: 5000,
            closeOnClick: true,
            pauseOnHover: true,
            pauseOnFocusLoss: false,
        });
    };

    return (
        <section>
            <div className="container">
                {/* Links Section */}
                <h3>Links</h3>
                {links.map((link, index) => (
                    <div key={index} className="input-group">
                        <input
                            type="text"
                            placeholder="Enter link"
                            value={link}
                            onChange={(e) => handleLinkChange(index, e.target.value)}
                            className="input-field"
                        />
                        <>
                            <button
                                onClick={() => handleDeleteLink(index)}
                                className="delete-button"
                                data-tooltip-id="delete-tooltip"
                            >
                                <DeleteIcon />
                            </button>
                            <Tooltip id="delete-tooltip" place="top" content="Delete link" />
                        </>
                        <>
                            <button onClick={handleAddLink} className="add-button"
                                data-tooltip-id='add-tooltip'>
                                <AddIcon />
                            </button>
                            <Tooltip id="add-tooltip" place="top" content="Add link" />
                        </>
                    </div>
                ))}

                {/* Address Section */}
                <h3>Address</h3>
                <div className="input-group"></div>
                <textarea
                    placeholder="Enter address"
                    className="textarea-field"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                ></textarea>
                <div />

                {/* Contact Info Section */}
                <h3>Contact Info</h3>
                {contacts.map((contact, index) => (
                    <div key={index} className="input-group">
                        <input
                            type="text"
                            placeholder="Enter contact"
                            value={contact}
                            onChange={(e) => handleContactChange(index, e.target.value)}
                            className="input-field"
                        />
                        <>
                            <button
                                onClick={() => handleDeleteContact(index)}
                                className="delete-button"
                                data-tooltip-id="delete-tooltip"
                            >
                                <DeleteIcon />
                            </button>
                            <Tooltip id="delete-tooltip" place="top" content="Delete Contact" />
                        </>
                        <>
                            <button onClick={handleAddContact} className="add-button"
                                data-tooltip-id='add-tooltip'
                            >
                                <AddIcon />
                            </button>
                            <Tooltip id="add-tooltip" place="top" content="Add Contact" />
                        </>
                    </div>
                ))}
                <button onClick={saveData} className="save-button">Save</button>
            </div>
            <ToastContainer />
        </section>
    );
};

export default CollegeInfo;