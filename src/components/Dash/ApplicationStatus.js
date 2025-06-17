import React, {useContext, useEffect, useState} from 'react';
import './ApplicationStatus.css';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import ApplicationContext from "../../context/ApplicationContext.js";
import Footer from './footer-dashboard.js';
import { NavLink } from 'react-router-dom';
import axios from "axios";


function ApplicationStatus() {
  const [myUniversities, setMyUniversities] = useState([]);
  const [show, setShow] = useState(null);
    const [length, setLength] = useState({
        application:0,
        personal: 0,
        educational: 0,
    });
    const {uploadApplication,answer} = useContext(ApplicationContext);
  // Load saved universities from localStorage
  useEffect(() => {
      console.log("Upload:- ",uploadApplication,"Question",answer)
      setLength({
          application: Object.keys(uploadApplication || {}).length,
            personal: Object.keys(answer.personal || {}).length,
          educational: Object.keys(answer.educational || {}).length,
      })
      // console.log(Object.keys(uploadApplication || {}).length);
      // console.log(Object.keys(answer || {}).length);

      const savedUniversities = JSON.parse(localStorage.getItem('myUniversities')) || [];
    setMyUniversities(savedUniversities);
  }, []);

  // Toggle dropdown for university details
  const handleUniversityClick = (index) => {
    setShow(show === index ? null : index);
  };

  const submit = async ()=>{
      // uploadApplication

      try {
          const response = await axios.post(
              "http://localhost:8080/api/v1/uploadApplication",
              { uploadApplication, answer}
          );
          console.log("Data fetched successfully:", response);

      } catch (error) {
          console.error("Error fetching questions:", error);
      }

  }

  return (
      <div className="colleges-container">
        <div className="student-dashboard">

          <div className="app-status">
            {myUniversities.length === 0 ? (
                <div className="no-universities">
                  <p>Nothing here yet! Add your first university to see it appear.</p>
                  <NavLink to="/colleges-search">Add more colleges</NavLink>
                </div>
            ) : (
                <div>
                  {myUniversities.map((university, index) => (
                      <div key={index} className="app-status-university">
                        <div
                            onClick={() => handleUniversityClick(index)}
                            className="app-status-header"
                        >
                          <p>{university.name}</p>
                          <span className={`arrow ${show === index ? 'rotate' : ''}`}>
                      <KeyboardArrowRightRoundedIcon />
                    </span>
                        </div>
                        {show === index && (
                            <div className="dropdown-content-app-status">
                                <NavLink
                                    to={`/upload-application/${university._id}`} // Replace with your route
                                    className="dropdown-item"
                                >
                                    Upload the Created Application
                                </NavLink>
                                <NavLink
                                    to={`/college-questions/${university._id}`} // Replace with your route
                                    className="dropdown-item"
                                >
                                    College Questions
                                </NavLink>
                                <NavLink
                                    to={`/pay-fee/${university._id}`} // Replace with your route
                                    className="dropdown-item"
                                >
                                    Pay the Fee
                                </NavLink>
                                <button
                                    className="btn-status"
                                    onClick={submit}
                                    style={length.application === 0 || length.personal === 0 || length.educational === 0? {display: 'none'} : {

                                    }}>
                                    Upload
                                </button>

                            </div>
                        )}

                      </div>
                  ))}
                </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
  );
}

export default ApplicationStatus;