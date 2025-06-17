import React, { useContext, useEffect, useState } from 'react';
import './AdminProfile.css';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar.js';
import AddQuestionContext from "../context/AddQuestionContext.js";
import axios from "axios";

const AdminProfile = () => {
  const { datas } = useContext(AddQuestionContext);
  const navigate = useNavigate();
  const [noOfApp, setNoOfApp] = useState(0);
  const [data, setData] = useState({
    name: '',
    position: '',
    college: '',
    collegeType: '',
    picture: '',
    city: '',
    email: '',
    eduId: '',
    state: ''
  });

  const getApplicationCount = async () => {
    return await axios.get("http://localhost:8080/api/v1/admin/applicationCount");
  };

  const edit = () => {
    navigate(`/admin/edit`);
  };
  const profileSide = () => {
    navigate(`/admin-profile`);
  };
  const rolesSide = () => {
    navigate(`/admin-profile/admin-roles`);
  };

  useEffect(() => {
    getApplicationCount().then(response => {
      setNoOfApp(response.data.data);
    });
    setData({
      name: datas.username,
      position: datas.position,
      college: datas.name,
      email: datas.email,
      collegeType: datas.collegeType,
      city: datas.city,
      eduId: datas.eduId,
      picture: datas.college_logo,
      state: datas.state,
    });
  }, []);

  const adminData = {
    name: data.name,
    role: data.position,
    eduId: data.eduId,
    university: data.college,
    email: data.email,
    password: '*********',
    picture: data.picture,
  };

  return (
    <div className="admin-profile-container">
      <div className="sidebar-container">
        <AdminSidebar />
      </div>
      <div className="profile-card">
        <div className="profile-header">
          <div className="header-text">
            <p style={{color: 'rgb(204,196,196)'}}>Welcome</p>
            <h1 style={{color: 'white'}}>{adminData.name}</h1>
          </div>
          <div className="header-image">
            <img className="profile-picture" src={adminData.picture ? adminData.picture : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'} alt="profile" />
          </div>
        </div>
        <div className="profile-details">
          <div className="detail-item"><span>Role:</span> <span>{adminData.role}</span></div>
          <div className="detail-item"><span>Edu ID:</span> <span>{adminData.eduId}</span></div>
          <div className="detail-item"><span>University:</span> <span>{adminData.university}</span></div>
          <div className="detail-item"><span>Email:</span> <span>{adminData.email}</span></div>
          <div className="detail-item"><span>Password:</span> <span>{adminData.password}</span></div>
          <div className="detail-item"><span>Applications:</span> <span>{noOfApp}</span></div>
        </div>
        <div className="profile-actions">
          <button className="edit-button" onClick={edit}>Edit Profile</button>
        </div>
        <div className="navigation">
          <button className="nav-button" onClick={profileSide}>Profile</button>
          <button className="nav-button" onClick={rolesSide}>Roles</button>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;