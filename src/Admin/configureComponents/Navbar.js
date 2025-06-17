import React from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className='navbar-section'>
            <ul>
                <li>
                    <NavLink
                        to='/admin-configuration/questions'
                        className={({isActive}) => isActive ? "nav-links active-link" : "nav-links"}
                    >
                        Questions
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/admin-configuration/deadlines'
                        className={({isActive}) => isActive ? "nav-links active-link" : "nav-links"}
                    >
                        Deadlines
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/admin-configuration/fees'
                        className={({isActive}) => isActive ? "nav-links active-link" : "nav-links"}
                    >
                        Fees
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/admin-configuration/college-info'
                        className={({isActive}) => isActive ? "nav-links active-link" : "nav-links"}
                    >
                        College Info
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/admin-configuration/submit'
                        className={({isActive}) => isActive ? "nav-links active-link" : "nav-links"}
                    >
                        Submit
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
