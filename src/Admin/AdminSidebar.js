import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './AdminSidebar.css';
import axios from 'axios';
import AddQuestionContext from '../context/AddQuestionContext.js';
import DashboardCustomizeRoundedIcon from '@mui/icons-material/DashboardCustomizeRounded';
import LocalPoliceOutlinedIcon from '@mui/icons-material/LocalPoliceOutlined';
import InsightsOutlinedIcon from '@mui/icons-material/InsightsOutlined';
import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
const AdminSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { datas } = useContext(AddQuestionContext);
  const navigate = useNavigate();
  const colorWhite = window.location.pathname.startsWith('/admin-configuration');
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsExpanded(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const loggedOut = async () => {
    try {
      // const response = await axios.post('http://localhost:8080/api/v1/admin/logout', {
      //   withCredentials: true,
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // });
      // if (response.status === 200) {
      //   navigate('');
      // }

      localStorage.removeItem('lead_email');
      localStorage.removeItem('lead_username');
      localStorage.removeItem('lead_role');
      navigate('/crm/signin');
    } catch (e) {
      console.error(e);
    }
  };

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div className={`hamburger-icon ${colorWhite ? 'white' : ''} ${isExpanded ? 'expanded' : ''}`} onClick={toggleSidebar}>
        <div></div>
        <div></div>
      </div>
      <div className={`admin-sidebar-main ${isExpanded ? 'expanded' : ''}`}>
        <div className="logo">
          <img
            width={100}
            style={{ borderRadius: '100%' }}
            src={datas?.college_logo}
            alt="logo"
          />
        </div>
        <div className="sidebar-menu">
          <NavLink
            to="/admin-dashboard"
            className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}
          >
            <span><DashboardCustomizeRoundedIcon /></span>
            Dashboard
          </NavLink>
          <NavLink
            to="/admin-configuration/questions"
            className={({ isActive }) => `menu-item ${isActive || window.location.pathname.startsWith('/admin-configuration') ? 'active' : ''}`}
          >
            <span><LocalPoliceOutlinedIcon /></span>
            Configuration
          </NavLink>
          <NavLink
            to="/admin-data"
            className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}
          >
            <span><InsightsOutlinedIcon /></span>
            Data
          </NavLink>
          <NavLink
            to="/admin-profile"
            className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}
          >
            <span><SentimentSatisfiedAltOutlinedIcon /></span>
            Profile
          </NavLink>
        </div>
        <div className="signout-btn">
          <button onClick={loggedOut}>
            <LogoutIcon />
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;