import React, {useEffect, useState} from 'react';
import AdminApplications from './AdminApplications.js';
import AdminSelectionData from './AdminSelectionData.js';
import './AdminData.css';
import AdminSidebar from "./AdminSidebar.js";
import axios from "axios";

const AdminData = () => {
  const [activePage, setActivePage] = useState('applications');
  const getApplications = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/uploadApplication/getApplications');
      console.log(response)
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getApplications()

  },[activePage])

  const renderContent = () => {
    switch (activePage) {
      case 'selection':
        return <AdminSelectionData />;
      case 'applications':
        return <AdminApplications />;
      default:
        return <AdminSelectionData />;
    }
  };

  return (
    <div className="admin-data-container">
      <AdminSidebar />
      <div className="admin-data-content">
        <div className="data-header">
          <button 
            className={`data-tab ${activePage === 'selection' ? 'active' : ''}`}
            onClick={() => setActivePage('selection')}
          >
            Selection Data
          </button>
          <button 
            className={`data-tab ${activePage === 'applications' ? 'active' : ''}`} 
            onClick={() => setActivePage('applications')}
          >
            All Applications
          </button>
        </div>
        <div className="data-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminData;