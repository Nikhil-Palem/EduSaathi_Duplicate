import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // If using React Router
import axios from "axios";

const VerifyEmailPage = () => {
    const [status, setStatus] = useState("Verifying...");
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token"); // Get "token" from URL
    const navigate = useNavigate();
    useEffect(() => {
        const verifyEmail = async () => {
            if (!token) {
                setStatus("Invalid verification link.");
                return;
            }
            try {
                const response = await axios.post("http://localhost:8080/api/v1/lead/verify", { token });
                console.log(response)
                if (response.data.success) {
                    setStatus("Email verified successfully! 🎉");
                    // navigate('/crm/signin');
                } else {
                    setStatus("Verification failed. Link may be expired.");
                }
            } catch (error) {
                setStatus("An error occurred while verifying.");
            }
        };

        verifyEmail();
    }, [token]);

    return (
        <div className="p-6 max-w-md mx-auto text-center border rounded shadow">
            <h2 className="text-xl font-semibold">Email Verification</h2>
            <p className="mt-2">{status}</p>
        </div>
    );
};

export default VerifyEmailPage;