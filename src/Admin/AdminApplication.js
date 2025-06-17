import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminApplications.css';
import AdminSidebar from './AdminSidebar.js';

const AdminApplications = () => {
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedApplication, setSelectedApplication] = useState(null);

  const [filters, setFilters] = useState({
    score: '',
    city: '',
    state: '',
    caste: ''
  });
  // dummy data
  const dummyApplications = [
    {
      id: 1,
      studentId: {
        name: "Rahul Sharma",
        email: "rahul.sharma@example.com",
      },
      academicInformation: {
        grade: "A",
        percentage_12: 94.5,
      },
      city: "Mumbai",
      state: "Maharashtra",
      caste: "General",
      phoneNumber: "9876543210",
      applicationDate: "2025-02-15",
      status: "Pending"
    },
    {
      id: 2,
      studentId: {
        name: "Priya Patel",
        email: "priya.patel@example.com",
      },
      academicInformation: {
        grade: "B+",
        percentage_12: 87.2,
      },
      city: "Delhi",
      state: "Delhi",
      caste: "OBC",
      phoneNumber: "8765432109",
      applicationDate: "2025-02-12",
      status: "Under Review"
    },
    {
      id: 3,
      studentId: {
        name: "Amit Kumar",
        email: "amit.kumar@example.com",
      },
      academicInformation: {
        grade: "A+",
        percentage_12: 96.8,
      },
      city: "Bangalore",
      state: "Karnataka",
      caste: "General",
      phoneNumber: "7654321098",
      applicationDate: "2025-02-18",
      status: "Approved"
    },
    {
      id: 4,
      studentId: {
        name: "Sneha Gupta",
        email: "sneha.gupta@example.com",
      },
      academicInformation: {
        grade: "B",
        percentage_12: 78.5,
      },
      city: "Chennai",
      state: "Tamil Nadu",
      caste: "SC",
      phoneNumber: "9567812340",
      applicationDate: "2025-02-10",
      status: "Pending"
    },
    {
      id: 5,
      studentId: {
        name: "Vikram Singh",
        email: "vikram.singh@example.com",
      },
      academicInformation: {
        grade: "C+",
        percentage_12: 65.7,
      },
      city: "Mumbai",
      state: "Maharashtra",
      caste: "ST",
      phoneNumber: "8901234567",
      applicationDate: "2025-02-14",
      status: "Rejected"
    },
    {
      id: 6,
      studentId: {
        name: "Neha Verma",
        email: "neha.verma@example.com",
      },
      academicInformation: {
        grade: "B+",
        percentage_12: 82.9,
      },
      city: "Pune",
      state: "Maharashtra",
      caste: "OBC",
      phoneNumber: "7890123456",
      applicationDate: "2025-02-16",
      status: "Under Review"
    },
    {
      id: 7,
      studentId: {
        name: "Rajesh Khanna",
        email: "rajesh.khanna@example.com",
      },
      academicInformation: {
        grade: "A",
        percentage_12: 91.3,
      },
      city: "Delhi",
      state: "Delhi",
      caste: "EWS",
      phoneNumber: "9012345678",
      applicationDate: "2025-02-13",
      status: "Approved"
    },
    {
      id: 8,
      studentId: {
        name: "Sonia Reddy",
        email: "sonia.reddy@example.com",
      },
      academicInformation: {
        grade: "D",
        percentage_12: 48.2,
      },
      city: "Hyderabad",
      state: "Telangana",
      caste: "General",
      phoneNumber: "8123456790",
      applicationDate: "2025-02-11",
      status: "Rejected"
    },
    {
      id: 9,
      studentId: {
        name: "Manish Joshi",
        email: "manish.joshi@example.com",
      },
      academicInformation: {
        grade: "B",
        percentage_12: 75.6,
      },
      city: "Jaipur",
      state: "Rajasthan",
      caste: "SC",
      phoneNumber: "7234567890",
      applicationDate: "2025-02-17",
      status: "Pending"
    },
    {
      id: 10,
      studentId: {
        name: "Anjali Mehta",
        email: "anjali.mehta@example.com",
      },
      academicInformation: {
        grade: "A-",
        percentage_12: 89.4,
      },
      city: "Ahmedabad",
      state: "Gujarat",
      caste: "General",
      phoneNumber: "9345678012",
      applicationDate: "2025-02-19",
      status: "Under Review"
    }
  ];

  useEffect(() => {
    fetchApplications();
  }, [searchTerm, filters]);

  const fetchApplications = async () => {
    /*
    try {
      const res = await axios.get('http://localhost:8080/api/applications/university', {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } // Authenticated request
      });
      setApplications(res.data.data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
    */

    let filteredData = [...dummyApplications];
    
    if (searchTerm) {
      filteredData = filteredData.filter(app => 
        app.studentId.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (filters.score) {
      if (filters.score === 'below 50') {
        filteredData = filteredData.filter(app => app.academicInformation.percentage_12 < 50);
      } else {
        const [min, max] = filters.score.split('-').map(Number);
        filteredData = filteredData.filter(app => 
          app.academicInformation.percentage_12 >= min && app.academicInformation.percentage_12 <= max
        );
      }
    }
    
    if (filters.city) {
      filteredData = filteredData.filter(app => app.city === filters.city);
    }
    
    if (filters.state) {
      filteredData = filteredData.filter(app => app.state === filters.state);
    }
    
    if (filters.caste) {
      filteredData = filteredData.filter(app => app.caste === filters.caste);
    }
    
    setApplications(filteredData);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const reviewApplication = (application) => {
    setSelectedApplication(application);
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'approved': return 'status-approved';
      case 'rejected': return 'status-rejected';
      case 'pending': return 'status-pending';
      case 'under review': return 'status-review';
      default: return '';
    }
  };

  const clearFilters = () => {
    setFilters({
      score: '',
      city: '',
      state: '',
      caste: ''
    });
    setSearchTerm('');
  };

  return (
    <div className="admin-applications">
      <AdminSidebar />
      <div className="admin-content">
        <div className="content-header">
          <h1>Applications for Review</h1>
          <div className="applications-count">
            Showing {applications.length} of {dummyApplications.length} applications
          </div>
        </div>

        <div className="search-filter-container">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search by student name"
              value={searchTerm}
              onChange={handleSearch}
            />
            <i className="search-icon">🔍</i>
          </div>

          <div className="filters-section">
            <h3>Filters</h3>
            <div className="filters">
              <div className="filter-group">
                <label>Score Range</label>
                <select name="score" value={filters.score} onChange={handleFilterChange}>
                  <option value="">All Scores</option>
                  <option value="90-100">90-100</option>
                  <option value="80-89">80-89</option>
                  <option value="70-79">70-79</option>
                  <option value="60-69">60-69</option>
                  <option value="50-59">50-59</option>
                  <option value="below 50">Below 50</option>
                </select>
              </div>

              <div className="filter-group">
                <label>City</label>
                <select name="city" value={filters.city} onChange={handleFilterChange}>
                  <option value="">All Cities</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Pune">Pune</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Jaipur">Jaipur</option>
                  <option value="Ahmedabad">Ahmedabad</option>
                </select>
              </div>

              <div className="filter-group">
                <label>State</label>
                <select name="state" value={filters.state} onChange={handleFilterChange}>
                  <option value="">All States</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Gujarat">Gujarat</option>
                </select>
              </div>

              <div className="filter-group">
                <label>Category</label>
                <select name="caste" value={filters.caste} onChange={handleFilterChange}>
                  <option value="">All Categories</option>
                  <option value="General">General</option>
                  <option value="OBC">OBC</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                  <option value="EWS">EWS</option>
                </select>
              </div>
            </div>
            <button className="clear-filters" onClick={clearFilters}>Clear Filters</button>
          </div>
        </div>

        <div className="applications-list">
          {applications.length > 0 ? (
            <div className="applications-grid">
              {applications.map((application) => (
                <div className="application-card" key={application.id}>
                  <div className="card-header">
                    <h3>{application.studentId.name}</h3>
                    <span className={`status-badge ${getStatusClass(application.status)}`}>
                      {application.status}
                    </span>
                  </div>
                  <div className="card-body">
                    <div className="info-row">
                      <span className="info-label">Email:</span>
                      <span className="info-value">{application.studentId.email}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Phone:</span>
                      <span className="info-value">{application.phoneNumber}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Grade:</span>
                      <span className="info-value">{application.academicInformation.grade}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Percentage (12th):</span>
                      <span className="info-value">{application.academicInformation.percentage_12}%</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Location:</span>
                      <span className="info-value">{application.city}, {application.state}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Category:</span>
                      <span className="info-value">{application.caste}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Applied on:</span>
                      <span className="info-value">{application.applicationDate}</span>
                    </div>
                  </div>
                  <div className="card-footer">
                    <button 
                      className="review-btn" 
                      onClick={() => reviewApplication(application)}
                    >
                      Review Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <div className="no-results-icon">📄</div>
              <p>No applications found matching your filters</p>
              <button className="clear-filters" onClick={clearFilters}>Clear Filters</button>
            </div>
          )}
        </div>
      </div>

      {selectedApplication && (
        <div className="application-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Application Details</h2>
              <button onClick={() => setSelectedApplication(null)} className="close-btn">&times;</button>
            </div>
            <div className="modal-body">
              <h3>{selectedApplication.studentId.name}</h3>
              <div className="detail-section">
                <h4>Personal Information</h4>
                <div className="detail-row">
                  <span className="detail-label">Email:</span>
                  <span className="detail-value">{selectedApplication.studentId.email}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Phone:</span>
                  <span className="detail-value">{selectedApplication.phoneNumber}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Location:</span>
                  <span className="detail-value">{selectedApplication.city}, {selectedApplication.state}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Category:</span>
                  <span className="detail-value">{selectedApplication.caste}</span>
                </div>
              </div>
              <div className="detail-section">
                <h4>Academic Information</h4>
                <div className="detail-row">
                  <span className="detail-label">Grade:</span>
                  <span className="detail-value">{selectedApplication.academicInformation.grade}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">12th Percentage:</span>
                  <span className="detail-value">{selectedApplication.academicInformation.percentage_12}%</span>
                </div>
              </div>
              <div className="detail-section">
                <h4>Application Status</h4>
                <div className="detail-row">
                  <span className="detail-label">Current Status:</span>
                  <span className={`status-badge ${getStatusClass(selectedApplication.status)}`}>
                    {selectedApplication.status}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Application Date:</span>
                  <span className="detail-value">{selectedApplication.applicationDate}</span>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="approve-btn">Approve</button>
              <button className="reject-btn">Reject</button>
              <button className="hold-btn">Hold for Review</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminApplications;
