import React from 'react';
import './RedirectDashBoard.css';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Footer from '../../components/Dash/footer-dashboard.js';
import RememberMeIcon from '@mui/icons-material/RememberMe';
import { useNavigate } from 'react-router-dom';
import eduSaathiLogo from '../../components/Assets/eduSaathiLogo.png'; // Adjust the path as necessary

function RedirectDashboard() {

    const lead_email = localStorage.getItem("lead_email");
    const username = localStorage.getItem("lead_username");
    const lead_role = localStorage.getItem("lead_role");
    console.log("lead role ...",lead_role);
    const navigate = useNavigate();
    const handleRedirect=()=>{
        if(lead_role==='admin'){
            navigate('/crm/admin-dashboard/home');
        }else{
            navigate('/crm/dashboard/home');
        }
    }
    const handleButtonClick = (path) => {
        navigate(path);
    };
    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <img src={eduSaathiLogo} alt="Logo" className="dashboard-logo" />
                <h1>Hello, <span className="user-name">{username}</span>!</h1>
                <p>your email {lead_email}</p>
            </div>

            <div className="dashboard-image-placeholder">
                {/* Placeholder for image or graphic */}
            </div>

            <div className="dashboard-buttons">
                <div className="dashboard-card" onClick={() => handleButtonClick('/admin-dashboard')}>
                    <RememberMeIcon className='card-icon' />
                    <p className="card-label">Review</p>
                </div>
                <div className="dashboard-card" onClick={() => {handleRedirect()}}>
                    <ManageAccountsIcon className='card-icon' />
                    <p className="card-label">Lead Management</p>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default RedirectDashboard;
