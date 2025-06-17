import React, {useState, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminEdit.css';
import AdminSidebar from './AdminSidebar.js';
import EditForm from "./EditForm.js";

const AdminEdit = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const inputFile = useRef(null);
  const editFormRef = useRef(null);
  const breadcrumbs = ['Dashboard', 'Profile', 'Edit'];

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(URL.createObjectURL(selectedFile));
    }
  };

  const handleSave = () => {
    if (editFormRef.current) {
      editFormRef.current.submitForm();
    }
  };

  const handleCancel = () => {
    navigate('/admin-profile');
  };

  return (
      <div className="admin-edit-container">
        <div className="admin-sidebar">
          <AdminSidebar />
        </div>
        <div className="admin-edit-main">
          <div className="breadcrumb">
            {breadcrumbs.map((item, index) => (
                <React.Fragment key={item}>
              <span className="breadcrumb-item">
                {item}
              </span>
                  {index < breadcrumbs.length - 1 && (
                      <span className="breadcrumb-separator">/</span>
                  )}
                </React.Fragment>
            ))}
          </div>

          <div className="edit-card">
            <div className="edit-header">
              <div className="edit-header-content">
                <div className="profile-image-container">
                  <img
                      src={file || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                      alt="Profile"
                      className="profile-image"
                  />
                  <input
                      type="file"
                      style={{display: 'none'}}
                      onChange={handleChange}
                      ref={inputFile}
                      accept="image/*"
                  />
                  <button
                      onClick={() => inputFile.current.click()}
                      className="change-photo-btn"
                  >
                    Change Photo
                  </button>
                </div>
                <div className="header-text">
                  <h1>Edit Profile</h1>
                  <p>Update your personal information</p>
                </div>
              </div>
            </div>
            <div className="edit-form-container">
              <div className="form-section">
                <EditForm ref={editFormRef} file={file} />
              </div>
              <div className="form-actions">
                <button className="cancel-btn" onClick={handleCancel}>
                  Cancel
                </button>
                <button className="save-btn" onClick={handleSave}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default AdminEdit;