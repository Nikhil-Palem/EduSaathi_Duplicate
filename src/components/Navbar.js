import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';
import axios from 'axios';
import logoDefault from './Assets/edu2.png';
import logoActive from './Assets/edu.png';
import { useCookies } from 'react-cookie';

axios.defaults.withCredentials = true;

const Navbar = ({ navbar, styles }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cookies, setCookies, removeCookies] = useCookies(['token']);
  const [menuActive, setMenuActive] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (cookies.token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [cookies]);

  const logout = async () => {
    try {
      const req = await axios.post("http://localhost:8080/api/v1/users/logout");
      removeCookies('token');
      setIsLoggedIn(false);
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <nav className={navbar ? 'navbar active' : 'navbar'}>
      <div style={styles} className="navbar-container">
        <NavLink to="/" className="navbar-logo">
          <img src={navbar ? logoActive : logoDefault} alt="EduSaathi Logo" className="logo" />
        </NavLink>

        {isMobile ? (
          <>
            <div className={`hamburger ${menuActive ? 'active' : ''}`} onClick={toggleMenu}>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div className={`nav-items ${menuActive ? 'active' : ''}`}>
              <div className="links-div">
                <NavLink to='/howtoapply' className={"nav-links"}>How To Apply ?</NavLink>
                <NavLink
                  to="#"
                  className="nav-links"
                  onClick={() => document.getElementById('universities').scrollIntoView({ behavior: 'smooth' })}
                >
                  Universities
                </NavLink>
                <NavLink
                  to="#"
                  className="nav-links"
                  onClick={() => document.getElementById('exams').scrollIntoView({ behavior: 'smooth' })}
                >
                  Exams
                </NavLink>
                <NavLink
                  to="#"
                  className="nav-links"
                  onClick={() => document.getElementById('discover').scrollIntoView({ behavior: 'smooth' })}
                >
                  Discover
                </NavLink>
                <NavLink
                  to="/crm/adduniversity"
                  className="nav-links"
                >
                  Add Your University
                </NavLink>
              </div>
              <div className="apply-div">
                <NavLink to="/register"><button className='apply-btn'>Apply Now</button></NavLink>
              </div>
            </div>
          </>
        ) : (
          <div className="nav-items">
            <div className="links-div">
              <NavLink to='/howtoapply' className={"nav-links"}>How To Apply ?</NavLink>
              <NavLink
                to="#"
                className="nav-links"
                onClick={() => document.getElementById('universities').scrollIntoView({ behavior: 'smooth' })}
              >
                Universities
              </NavLink>
              <NavLink
                to="#"
                className="nav-links"
                onClick={() => document.getElementById('exams').scrollIntoView({ behavior: 'smooth' })}
              >
                Exams
              </NavLink>
              <NavLink
                to="#"
                className="nav-links"
                onClick={() => document.getElementById('discover').scrollIntoView({ behavior: 'smooth' })}
              >
                Discover
              </NavLink>
              <NavLink
                to="/crm/adduniversity"
                className="nav-links"
              >
                Add Your University
              </NavLink>
            </div>
            <div className="apply-div">
              <NavLink to="/register"><button className='apply-btn'>Apply Now</button></NavLink>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;