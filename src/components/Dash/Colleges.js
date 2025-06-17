import React, { useState, useEffect } from 'react';
import Footer from './footer-dashboard.js';
import './Colleges.css';
import '../../global.css';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import EastIcon from '@mui/icons-material/East';
import ClearIcon from '@mui/icons-material/Clear';
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CollegeDetails = ({ university, onBack }) => (
  <div className="college-details-container">
    <div className="college-details-card">
      <div className="details-header">
        <div className="header-left">
          <img src={university.college_logo} alt="college" />
          <div className="header-info">
            <h2>{university.name}</h2>
            <p>{university.address}</p>
          </div>
        </div>
        <span className="more-details-btn-cdetails" onClick={onBack}>
          <ClearIcon />
        </span>
      </div>
      <div className="details-grid">
        <div className="details-section">
          <h3>DEADLINE</h3>
          <p>{university.deadline}</p>
        </div>
        <div className="details-section">
          <h3>LINKS</h3>
          <div className="links-list">
            <a href={university.website} target="_blank" rel="noopener noreferrer">COLLEGE WEBSITE</a>
            <a href={university.admissionPage} target="_blank" rel="noopener noreferrer">ADMISSION PAGE</a>
            <a href={university.virtualTour} target="_blank" rel="noopener noreferrer">VIRTUAL TOUR</a>
          </div>
        </div>
        <div className="details-section">
          <h3>FEES</h3>
          <p>{university.fees}</p>
        </div>
        <div className="details-section">
          <h3>TESTS</h3>
          <div className="tests-list">
            {university.tests.map((test, index) => (
              <p key={index}>{test}</p>
            ))}
          </div>
        </div>
        <div className="details-section contact-info">
          <div>
            <h3>EMAIL</h3>
            <p>{university.email}</p>
          </div>
          <div>
            <h3>PHONE</h3>
            <p>{university.phone}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const CollegesSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [stateFilter, setStateFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [myUniversities, setMyUniversities] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchCollegeData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:8080/api/v1/lead/colleges?search=${searchTerm}`);
      setUniversities(res.data);
      console.log("resp recevied", res.data)
    } catch (err) {
      console.error('Error fetching college data:', err);
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // if (searchTerm) {
    fetchCollegeData();
    // }
  }, [searchTerm]);

  const handleAddUniversity = async (university) => {
    toast.success(`${university.collegeName} college added successfully!`);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const user_id = localStorage.getItem("user_id");
      const body = JSON.stringify({
        user_id: user_id,
        clg_id: university._id
      });
      console.log("databody", body);
      const resp = await axios.post('http://localhost:8080/api/v1/users/addCollege', body, config);
      console.log("college added", resp.data)
    } catch (err) {
      console.log("error", err);
    }
  };

  return (
    <>
      <div className="colleges-container">
        <div className="student-dashboard-college">

          {!selectedUniversity ? (
            <div className="colleges-search">
              <div className="search-container-C">
                <div className="search-C">
                  <input
                    type="text"
                    className="search-box-C"
                    placeholder="Search for colleges..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <div className="icon-C">
                    <SearchIcon />
                  </div>
                </div>

              </div>
              <div className="filters">
                <select onChange={(e) => setStateFilter(e.target.value)} value={stateFilter}>
                  <option value="">All States</option>
                  <option value="Florida">Florida</option>
                  <option value="Rajasthan">Rajasthan</option>
                </select>
                <select onChange={(e) => setCityFilter(e.target.value)} value={cityFilter}>
                  <option value="">All Cities</option>
                  <option value="Tampa">Tampa</option>
                  <option value="Pilani">Pilani</option>
                </select>
                <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
                  <option value="asc">Sort A-Z</option>
                  <option value="desc">Sort Z-A</option>
                </select>
              </div>
              {loading ? (
                <div className="loading-message">Loading colleges...</div>
              ) : error ? (
                <div className="error-message">{error}</div>
              ) : (
                <div className="colleges">
                  {universities.map((university, index) => (
                    <div className="results" key={index}>
                      <div className="res-top">
                        <div className="logo-div">
                          {university?.college_logo != undefined ? <img src={university.college_logo} width={100} height={100} alt="college" /> : <MapsHomeWorkIcon />}
                        </div>
                        <div className="clg-name-ads">
                          <h3>{university.collegeName}</h3>
                          <p className="address">{university.address || "address is not available"}</p>
                        </div>
                      </div>
                      <div className="res-btm">
                        <button className='add-btn' onClick={() => handleAddUniversity(university)}>Add Now</button>
                        <button className='more-btn' onClick={() => setSelectedUniversity(university)}>More Details</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <CollegeDetails university={selectedUniversity} onBack={() => setSelectedUniversity(null)} />
          )}
        </div>
        <Footer />
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default CollegesSearch;
