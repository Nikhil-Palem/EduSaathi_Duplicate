import React from "react";
import './Timeline.css'; // Assuming you have a CSS file for styling
const steps = [
    "Lead Created",
    "Verification",
    "Application",
    "Application fees",
    "Decision",
    "Exam slot",
];

const currentStep = 2; // Change this to simulate different progress states

const Timeline = () => {
    return (
        <div className="tl-container">
            <div className="tl-wrapper">
                {steps.map((step, index) => (
                    <div key={index} className={`tl-step ${index < currentStep
                            ? "completed"
                            : index === currentStep
                                ? "current"
                                : "pending"
                        }`}>
                        {index !== 0 && (
                            <div className={`tl-line ${index <= currentStep ? "active" : "inactive"}`}></div>
                        )}
                        <div
                            className={`tl-circle ${index < currentStep
                                    ? "completed"
                                    : index === currentStep
                                        ? "current"
                                        : "pending"
                                }`}
                        >
                            {index < currentStep ? "✔" : index === currentStep ? "•" : ""}
                        </div>
                        <span className="tl-text">{step}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Timeline;