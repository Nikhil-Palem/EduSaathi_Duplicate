import React, { useState } from 'react'
import EduSaathiLogo from '../../components/Assets/eduSaathiLogo.png';
import './Navbar.css'
import { useLocation, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import LogoutIcon from '@mui/icons-material/Logout';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';

function Navbar() {
    const [dropdown, setDropdown] = useState(false);
    const location = useLocation();
    const path = location.pathname.split('/').pop();
    console.log(path);
    const [Active, setActive] = useState(path);
    const navigate = useNavigate();
    const username = localStorage.getItem('lead_username');
    const userImage = localStorage.getItem('lead_image') || null;
    const userRole = localStorage.getItem('lead_role') || null;
    const handleClick = (path) => {
        setActive(path);
        if (userRole === 'staff')
            navigate(`/crm/dashboard/${path}`);
        else
            navigate(`/crm/admin-dashboard/${path}`);
    }

    const handleToggle = () => {
        setDropdown(!dropdown);
    }
    const handleLogout = () => {
        localStorage.removeItem('lead_email');
        localStorage.removeItem('lead_username');
        localStorage.removeItem('lead_role');
        navigate('/crm/signin');
    }
    return (
        <div className='navbar-div'>
            <div className="nav-left">
                <img src={EduSaathiLogo} alt="EduSaathi_logo" />
                <h3>Lead Management</h3>
            </div>
            <div className="nav-right">
                <span className={`${Active === 'home' ? 'active' : ''}`} onClick={() => { handleClick('home') }}>Home</span>

                {userRole === 'staff' && (<><span
                    className={`${Active === 'studentslist' || Active === 'students' ? 'active' : ''}`}
                    onClick={() => { handleClick('studentslist') }}
                >
                    My Students
                </span>
                    <span className={`${Active === 'tasks' ? 'active' : ''}`} onClick={() => { handleClick('tasks') }}>My Tasks</span>
                    <span className={`${Active === 'campaigns' ? 'active' : ''}`} onClick={() => { handleClick('campaigns') }}>My Campaigns</span></>)}

                {userRole === 'admin' && (<><span
                    className={`${Active === 'studentslist' || Active === 'studentdetails' ? 'active' : ''}`}
                    onClick={() => { handleClick('studentslist') }}
                >
                    Students List
                </span>
                    <span className={`${Active === 'branches' ? 'active' : ''}`} onClick={() => { handleClick('branches') }}>Branch</span>
                    <span className={`${Active === 'studentallocation' ? 'active' : ''}`} onClick={() => { handleClick('studentallocation') }}>Student Allocation</span></>)}
            </div>

            <div className="crm-profile">
                <div className="profile-icon" onClick={() => { handleToggle() }}>
                    <Avatar
                        src={userImage || undefined}
                        alt={username}
                        sx={{ bgcolor: userImage ? 'transparent' : '#4285f4' }}
                        className='profile-avatar'
                    >
                        {!userImage && username.charAt(0).toUpperCase()}
                    </Avatar>
                </div>
                {dropdown && (
                    <div className="dropdown-items">
                        <div className="dropdown-item" onClick={() => { navigate('/crm/redirect-dashboard') }}>
                            <ReplyAllIcon className='crm-icons' />
                            <span>Back to CRM</span>
                        </div>
                        <div className="dropdown-item" onClick={() => { handleLogout() }} >
                            <LogoutIcon className='crm-icons' />
                            <span>Logout</span>
                        </div>

                    </div>
                )}
            </div>
        </div>
    )
}

export default Navbar