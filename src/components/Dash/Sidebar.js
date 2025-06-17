import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import EdusaathiLogo from '../Assets/eduSaathiLogo.png';
import { RxDashboard } from "react-icons/rx";
import { PiStudentFill } from "react-icons/pi";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { FaUniversity, FaUser } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";
import axios from "axios";
import { useCookies } from "react-cookie";

const Sidebar = () => {
    const navigate = useNavigate();
    const [removeCookies] = useCookies(['token']);
    const [isExpanded, setIsExpanded] = useState(false);
    const [activeTab, setActiveTab] = useState('');
    const [activeApp, setActiveApp] = useState(null);
    const [showAppDropdown, setShowAppDropdown] = useState(false);

    const logout = async () => {
        try {
            await axios.post("http://localhost:8080/api/v1/users/logout");
            removeCookies('token');
            navigate('/login');
        } catch (error) {
            console.log(error);
        }
    };

    const location = useLocation();

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setIsExpanded(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {

        const path = location.pathname;
        if (path.startsWith('/dashboard')) setActiveTab('Dashboard');
        else if (path.startsWith('/personal-info') )setActiveTab('Application')
        else if (path.startsWith('/colleges-search')) setActiveTab('College Search');
        else if (path.startsWith('/my-universities')) setActiveTab('My Universities');
        else if (path.startsWith('/user-profile')) setActiveTab('user-profile');

        if (path.startsWith('/personal-info')) setActiveApp('Profile');
        else if (path.startsWith('/education')) setActiveApp('Education');
        else if (path.startsWith('/test-scores')) setActiveApp('Test Scores');
        else if (path.startsWith("/activities")) setActiveApp('Activities');
        else if (path.startsWith("/achievements")) setActiveApp('Achievements')
        else if (path.startsWith("/review")) setActiveApp('Review')


    }, [location]);



    const toggleSidebar = (tab) => {

        setActiveApp(tab)
        setIsExpanded(!isExpanded);
    };

    const toggleAppDropdown = () => {
        setShowAppDropdown(prev => !prev);
    };

    return (
        <>
            <div className={`hamburger-icon ${isExpanded ? 'expanded' : ''}`} onClick={toggleSidebar}>
                <div></div>
                <div></div>
            </div>

            <div className={`sidebar-student_portal ${isExpanded ? 'expanded' : ''}`}>
                <div className="brand">
                    <img src={EdusaathiLogo} alt="edu logo" />
                    <p>Edusaathi</p>
                </div>

                <div className="sidebar-menu">
                    {/* Dashboard */}
                    <NavLink
                        onClick={toggleSidebar}
                        to="/dashboard"
                        className={`menu-item ${activeTab === 'Dashboard' ? 'active' : ''}`}
                    >
                        <span className="menu-icon"><RxDashboard /></span>
                        <span className="menu-text">Dashboard</span>
                    </NavLink>

                    {/* Application Dropdown */}
                    <NavLink
                        to={"/personal-info"}
                        className={`menu-item dropdown ${activeTab === 'Application' ? 'active' : ''}`}
                        onClick={toggleAppDropdown}
                    >
                        <span className="menu-icon"><PiStudentFill /></span>
                        <span className="menu-text">Application</span>
                    </NavLink>

                    {activeTab === "Application" && (
                        <div >
                            <NavLink
                                to="/personal-info"
                                className={`dropdown-item`}
                                style={{
                                    backgroundColor: activeApp === 'Profile' ? '#000000' : '',
                                    color: activeApp === 'Profile' ? '#ffffff' : ''
                                }}
                                onClick={()=>{toggleSidebar('Profile')}}
                            >
                                Personal Information
                            </NavLink>
                            {/*<NavLink*/}
                            {/*    to="/family"*/}
                            {/*    className="dropdown-item"*/}
                            {/*    style={{*/}
                            {/*        backgroundColor: activeApp === 'Family' ? '#000000' : '',*/}
                            {/*        color: activeApp === 'Family' ? '#ffffff' : ''*/}
                            {/*    }}*/}
                            {/*    onClick={()=>{toggleSidebar('Family')}}*/}
                            {/*>*/}
                            {/*    Family*/}
                            {/*</NavLink>*/}
                            <NavLink
                                to="/education"
                                className="dropdown-item"
                                style={{
                                    backgroundColor: activeApp === 'Education' ? '#000000' : '',
                                    color: activeApp === 'Education' ? '#ffffff' : ''
                                }}
                                onClick={()=>{toggleSidebar('Education')}}
                            >
                                Education
                            </NavLink>

                            <NavLink
                                to="/test-scores"
                                className="dropdown-item"
                                style={{
                                    backgroundColor: activeApp === 'Test Scores' ? '#000000' : '',
                                    color: activeApp === 'Test Scores' ? '#ffffff' : ''
                                }}
                                onClick={()=>{toggleSidebar('Education')}}
                            >
                                Test Scores
                            </NavLink>

                            <NavLink
                                to="/activities"
                                className="dropdown-item"
                                style={{
                                    backgroundColor: activeApp === 'Activities' ? '#000000' : '',
                                    color: activeApp === 'Activities' ? '#ffffff' : ''
                                }}
                                onClick={()=>{toggleSidebar('Activities')}}
                            >
                                Activities
                            </NavLink>
                            <NavLink
                                to="/achievements"
                                className="dropdown-item"
                                style={{
                                    backgroundColor: activeApp === 'Achievements' ? '#000000' : '',
                                    color: activeApp === 'Achievements' ? '#ffffff' : ''
                                }}
                                onClick={()=>{toggleSidebar('Achievements')}}
                            >
                                Achievements
                            </NavLink>
                            <NavLink
                                to="/review"
                                className="dropdown-item"
                                style={{
                                    backgroundColor: activeApp === 'Review' ? '#000000' : '',
                                    color: activeApp === 'Review' ? '#ffffff' : ''
                                }}
                                onClick={()=>toggleSidebar('Review')}
                            >
                             Review
                            </NavLink>
                        </div>

                    )}
                    {/* College Search */}
                    <NavLink
                        onClick={toggleSidebar}
                        to="/colleges-search"
                        className={`menu-item ${activeTab === 'College Search' ? 'active' : ''}`}
                    >
                        <span className="menu-icon"><HiMagnifyingGlass /></span>
                        <span className="menu-text">College Search</span>
                    </NavLink>

                    {/* My Universities */}
                    <NavLink
                        onClick={toggleSidebar}
                        to="/my-universities"
                        className={`menu-item ${activeTab === 'My Universities' ? 'active' : ''}`}
                    >
                        <span className="menu-icon"><FaUniversity /></span>
                        <span className="menu-text">My Universities</span>
                    </NavLink>

                    {/* Questions */}
                    <NavLink
                        onClick={toggleSidebar}
                        to="/user-profile"
                        className={`menu-item ${activeTab === 'user-profile' ? 'active' : ''}`}
                    >
                        <span className="menu-icon"><FaUser /></span>
                        <span className="menu-text">Profile</span>
                    </NavLink>
                </div>

                {/* Footer */}
                <div className="sidebar-footer">
                    <button className="signout-button" onClick={logout}>
                        <span className="menu-icon"><TbLogout2 /></span>
                        <span className="menu-text">Sign Out</span>
                    </button>
                    <p>© Edu Saathi</p>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
