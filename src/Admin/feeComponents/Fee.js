import React, { useState, useEffect, useContext } from 'react';
import './Fee.css';
import AddQuestionContext from "../../context/AddQuestionContext.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../configureComponents/Questions/ToastStyles.css"; // Custom styles

const Fee = () => {
    const { setValue5 } = useContext(AddQuestionContext);

    // State for fee amount, initialized from localStorage or empty
    const [feeAmount, setFeeAmount] = useState(() => {
        const savedFee = localStorage.getItem("feeAmount");
        return savedFee ? parseInt(savedFee, 10) : '';
    });

    // Update localStorage whenever the feeAmount changes
    useEffect(() => {
        localStorage.setItem("feeAmount", feeAmount);
        setValue5((prevValue) => ({
            ...prevValue,
            fees: feeAmount,
        }));
    }, [feeAmount, setValue5]);

    // Handle input change
    const handleInputChange = (e) => {
        setFeeAmount(e.target.value);
    };

    // Handle button click to save fee
    const handleSetFee = () => {
        if (feeAmount === '') {
            toast.error("Please enter a fee amount before saving!");
            return;
        }

        localStorage.setItem("feeAmount", feeAmount);
        setValue5((prevValue) => ({
            ...prevValue,
            fees: feeAmount,
        }));

        toast.success(`Fee amount of ₹${feeAmount} has been saved!`);
    };

    return (
        <section className="fee-container">
            <h1 className="heading">How it Works?</h1>

            <div className="steps-row">
                <div className="step"><p>1 </p><br /><p> Send your fees change amount</p></div>
                <div className="step"><p>2 </p><br /><p>We will review your change</p> </div>
                <div className="step"><p>3 </p><br /> <p>You will receive an email with our decision</p></div>
            </div>

            <div className="input-container">
                <label htmlFor="fee-input">Enter new fee amount*</label>
                <input
                    id="feeInput"
                    type="number"
                    value={feeAmount}
                    onChange={handleInputChange}
                    placeholder="Enter fee amount"
                />
                <button onClick={handleSetFee}>Set Fee</button>
            </div>

            <ToastContainer />
        </section>
    );
};

export default Fee;
