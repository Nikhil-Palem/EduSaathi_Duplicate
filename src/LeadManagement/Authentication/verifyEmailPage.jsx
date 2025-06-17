// Verify.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VerifyEmailPage = ({ email, role }) => {
    const [isVerified, setIsVerified] = useState(false);
    const [checking, setChecking] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                const res = await axios.post("http://localhost:8080/api/v1/lead/check-verification", { email });
                console.log("Verification check:", res.data);

                if (res.data.isVerified) {
                    setIsVerified(true);
                    clearInterval(interval);

                    // Delay for UX
                    setTimeout(() => {
                        if (role === "staff") {
                            navigate("/crm/staff/selectcollege", {
                                state: { email, role }
                            });
                        } else if (role === "admin") {
                            navigate("/crm/admin/selectcollege", {
                                state: { email, role }
                            });
                        }
                    }, 1000);
                }
            } catch (error) {
                console.error("Error checking verification:", error);
            } finally {
                setChecking(false);
            }
        }, 3000); // Poll every 3 seconds

        return () => clearInterval(interval);
    }, [email, navigate, role]);

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2>Verify Your Email</h2>
            <p>We've sent a verification link to <strong>{email}</strong>.</p>
            <p>Please click the link in your email to activate your account.</p>
            {checking && <p>Checking verification status...</p>}
            {isVerified && <p>Email verified! Redirecting...</p>}
        </div>
    );
};

export default VerifyEmailPage;
