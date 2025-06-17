import React from "react";
import "./PricingBox.css"; // Import the CSS file
import Box from "./Box.js";

const PricingBox = () => {
    const featureBox1 = [
        "10 users included",
        "2 GB of storage",
        "Email support",
        "Help center access",
    ];
    const featureBox2 = [
        "20 users included",
        "10 GB of storage",
        "Priority email support",
        "Help center access",
    ];

    return (
        <div className="card-deck">
            <Box
                price="0"
                title="Free"
                btnClass="btn-outline-primary"
                btnTitle="Sign up for free"
                feature={featureBox1}
            />
            <Box
                price="15"
                title="Pro"
                btnClass="btn-primary"
                btnTitle="Get started"
                feature={featureBox2}
            />
        </div>
    );
};

export default PricingBox;
