import React, { useContext, useEffect, useState } from 'react';
import './Deadline.css';
import AddQuestionContext from "../../context/AddQuestionContext.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../configureComponents/Questions/ToastStyles.css"; // Custom styles

const Deadline = () => {
    const { setValue4 } = useContext(AddQuestionContext);

    // Initialize state from localStorage or default values
    const [deadlines, setDeadlines] = useState(() => {
        const savedDeadlines = localStorage.getItem("deadlines");
        return savedDeadlines
            ? JSON.parse(savedDeadlines)
            : { earlyDecision: '', regularDecision: '', lateDecision: '' };
    });

    // Update localStorage whenever the deadlines state changes
    useEffect(() => {
        localStorage.setItem("deadlines", JSON.stringify(deadlines));
        setValue4((prevValue) => ({
            ...prevValue,
            deadlines: deadlines,
        }));
    }, [deadlines, setValue4]);

    // Handle input changes for deadlines
    const handleChange = (e) => {
        const { id, value } = e.target;
        setDeadlines((prevDeadlines) => ({
            ...prevDeadlines,
            [id]: value,
        }));
    };

    // Save data to localStorage and context
    const saveData = () => {
        const allFieldsFilled = Object.values(deadlines).every((value) => value.trim() !== '');

        if (!allFieldsFilled) {
            toast.error("Please fill all fields before saving!", {
                position: "top-right",
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
                pauseOnFocusLoss: false,
            });
            return;
        }

        localStorage.setItem("deadlines", JSON.stringify(deadlines));
        setValue4((prevValue) => ({
            ...prevValue,
            deadlines: deadlines,
        }));

        toast.success("Deadlines saved successfully!", {
            position: "top-right",
            autoClose: 5000,
            closeOnClick: true,
            pauseOnHover: true,
            pauseOnFocusLoss: false,
        });
    };

    return (
        <section className="deadline">
            <div className="deadline-container">
                <div className="deadline1">
                    <label htmlFor="earlyDecision">Select the early decision deadline</label>
                    <input
                        id="earlyDecision"
                        type="date"
                        value={deadlines.earlyDecision}
                        onChange={handleChange}
                    />
                </div>
                <div className="deadline2">
                    <label htmlFor="regularDecision">Select the regular decision deadline</label>
                    <input
                        id="regularDecision"
                        type="date"
                        value={deadlines.regularDecision}
                        onChange={handleChange}
                    />
                </div>
                <div className="deadline3">
                    <label htmlFor="lateDecision">Select the late decision deadline</label>
                    <input
                        id="lateDecision"
                        type="date"
                        value={deadlines.lateDecision}
                        onChange={handleChange}
                    />
                </div>
                <button onClick={saveData} className="save-button">Save</button>
            </div>
            <ToastContainer />
        </section>
    );
};

export default Deadline;