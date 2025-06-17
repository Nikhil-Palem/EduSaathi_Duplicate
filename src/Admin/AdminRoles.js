import React, { useState } from 'react';
import './AdminRoles.css';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar.js';
import { UserPlus, Users, Shield, AlertCircle } from 'lucide-react';

const AdminRoles = () => {
    const [noRole, setNoRole] = useState(true);
    const navigate = useNavigate();

    const profileSide = () => navigate(`/admin-profile`);
    const rolesSide = () => navigate(`/admin-profile/admin-roles`);
    const addRole = () => {};

    return (
        <div className="admin-roles-container">
            <div className="admin-sidebar">
                <AdminSidebar />
            </div>
            
            <div className="admin-roles-main">
                {/* Breadcrumb */}
                <div className="breadcrumb">
                    <span className="breadcrumb-item">Dashboard</span>
                    <span className="breadcrumb-separator">/</span>
                    <span className="breadcrumb-item">Profile</span>
                    <span className="breadcrumb-separator">/</span>
                    <span className="breadcrumb-item">Roles</span>
                </div>

                <div className="roles-content">
                    <div className="roles-header">
                        <div className="roles-title">
                            <Shield className="roles-icon" />
                            <h1>Role Management</h1>
                        </div>
                        <button className="add-role-btn" onClick={addRole}>
                            <UserPlus size={20} />
                            Add New Role
                        </button>
                    </div>

                    {noRole ? (
                        <div className="no-roles-container">
                            <div className="no-roles-content">
                                <AlertCircle size={48} className="no-roles-icon" />
                                <h2>No Roles Assigned</h2>
                                <p>There are currently no roles assigned. Click the button above to add a new role.</p>
                            </div>
                        </div>
                    ) : (
                        <div className="roles-list">
                            {/* Role items would go here */}
                        </div>
                    )}

                    <div className="navigation-tabs">
                        <button 
                            className={`nav-tab active`}
                            onClick={rolesSide}
                        >
                            <Users size={20} />
                            Roles
                        </button>
                        <button 
                            className="nav-tab"
                            onClick={profileSide}
                        >
                            <Shield size={20} />
                            Profile
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminRoles;