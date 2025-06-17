import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminApplications.css';
import AdminSidebar from './AdminSidebar.js';

const AdminApplications = () => {
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [customRangeVisible12th, setCustomRangeVisible12th] = useState(false);
  const [customRangeVisibleJEE, setCustomRangeVisibleJEE] = useState(false);
  const [customRange12th, setCustomRange12th] = useState({ min: '', max: '' });
  const [customRangeJEE, setCustomRangeJEE] = useState({ min: '', max: '' });
  
  // Add document viewing state
  const [showDocuments, setShowDocuments] = useState(false);
  const [viewingDocument, setViewingDocument] = useState(null);

  const [filters, setFilters] = useState({
    score12th: '',
    scoreJEE: '',
    city: '',
    state: '',
    caste: ''
  });

  const [interviewDetails, setInterviewDetails] = useState({
    meetingLink: '',
    interviewerName: '',
    interviewerEmail: '',
    interviewDate: '',
    interviewTime: ''
  });

  // Helper function to generate documents for each student
  const generateDocuments = (studentId) => {
    return [
      { id: `doc1-${studentId}`, name: '9th Marksheet', type: 'pdf', size: '1.2 MB', url: '#' },
      { id: `doc2-${studentId}`, name: '10th Marksheet', type: 'pdf', size: '1.1 MB', url: '#' },
      { id: `doc3-${studentId}`, name: '11th Marksheet', type: 'pdf', size: '1.3 MB', url: '#' },
      { id: `doc4-${studentId}`, name: '12th Marksheet', type: 'pdf', size: '1.4 MB', url: '#' },
      { id: `doc5-${studentId}`, name: 'Personal essay', type: 'docx', size: '250 KB', url: '#' },
      { id: `doc6-${studentId}`, name: 'College essay', type: 'docx', size: '350 KB', url: '#' },
      { id: `doc7-${studentId}`, name: 'Awards and Certifications', type: 'pdf', size: '2.5 MB', url: '#' },
      { id: `doc8-${studentId}`, name: 'JEE marksheet', type: 'pdf', size: '1.1 MB', url: '#' }
    ];
  };

  // Updated dummy data with Edu IDs and documents
  const [dummyApplications, setDummyApplications] = useState([
    {
      eduId: "12345600",
      studentId: {
        name: "Rahul Sharma",
        email: "rahul@example.com",
      },
      academicInformation: {
        grade: "A",
        percentage_12: 94.5,
        jeePercentile: 98.5
      },
      city: "Mumbai",
      state: "Maharashtra",
      caste: "General",
      phoneNumber: "9876543210",
      applicationDate: "2025-02-15",
      status: "Pending",
      documents: generateDocuments(1)
    },
    {
      eduId: "12345601",
      studentId: {
        name: "Priya Patel",
        email: "priya.patel@example.com",
      },
      academicInformation: {
        grade: "B+",
        percentage_12: 87.2,
        jeePercentile: 92.1
      },
      city: "Delhi",
      state: "Delhi",
      caste: "OBC",
      phoneNumber: "8765432109",
      applicationDate: "2025-02-12",
      status: "Under Review",
      documents: generateDocuments(2)
    },
    {
      eduId: "12345602",
      studentId: {
        name: "Amit Kumar",
        email: "amit.kumar@example.com",
      },
      academicInformation: {
        grade: "A+",
        percentage_12: 96.8,
        jeePercentile: 99.2
      },
      city: "Bangalore",
      state: "Karnataka",
      caste: "General",
      phoneNumber: "7654321098",
      applicationDate: "2025-02-18",
      status: "Approved",
      documents: generateDocuments(3)
    },
    {
      eduId: "12345603",
      studentId: {
        name: "Sneha Gupta",
        email: "sneha.gupta@example.com",
      },
      academicInformation: {
        grade: "B",
        percentage_12: 78.5,
        jeePercentile: 85.7
      },
      city: "Chennai",
      state: "Tamil Nadu",
      caste: "SC",
      phoneNumber: "9567812340",
      applicationDate: "2025-02-10",
      status: "Pending",
      documents: generateDocuments(4)
    },
    {
      eduId: "12345604",
      studentId: {
        name: "Vikram Singh",
        email: "vikram.singh@example.com",
      },
      academicInformation: {
        grade: "C+",
        percentage_12: 65.7,
        jeePercentile: 72.3
      },
      city: "Mumbai",
      state: "Maharashtra",
      caste: "ST",
      phoneNumber: "8901234567",
      applicationDate: "2025-02-14",
      status: "Rejected",
      documents: generateDocuments(5)
    },
    {
      eduId: "12345605",
      studentId: {
        name: "Neha Verma",
        email: "neha.verma@example.com",
      },
      academicInformation: {
        grade: "B+",
        percentage_12: 82.9,
        jeePercentile: 88.6
      },
      city: "Pune",
      state: "Maharashtra",
      caste: "OBC",
      phoneNumber: "7890123456",
      applicationDate: "2025-02-16",
      status: "Under Review",
      documents: generateDocuments(6)
    },
    {
      eduId: "12345606",
      studentId: {
        name: "Rajesh Khanna",
        email: "rajesh.khanna@example.com",
      },
      academicInformation: {
        grade: "A",
        percentage_12: 91.3,
        jeePercentile: 95.8
      },
      city: "Delhi",
      state: "Delhi",
      caste: "EWS",
      phoneNumber: "9012345678",
      applicationDate: "2025-02-13",
      status: "Approved",
      documents: generateDocuments(7)
    },
    {
      eduId: "12345607",
      studentId: {
        name: "Sonia Reddy",
        email: "sonia.reddy@example.com",
      },
      academicInformation: {
        grade: "D",
        percentage_12: 48.2,
        jeePercentile: 62.1
      },
      city: "Hyderabad",
      state: "Telangana",
      caste: "General",
      phoneNumber: "8123456790",
      applicationDate: "2025-02-11",
      status: "Rejected",
      documents: generateDocuments(8)
    },
    {
      eduId: "12345608",
      studentId: {
        name: "Manish Joshi",
        email: "manish.joshi@example.com",
      },
      academicInformation: {
        grade: "B",
        percentage_12: 75.6,
        jeePercentile: 79.4
      },
      city: "Jaipur",
      state: "Rajasthan",
      caste: "SC",
      phoneNumber: "7234567890",
      applicationDate: "2025-02-17",
      status: "Pending",
      documents: generateDocuments(9)
    },
    {
      eduId: "12345609",
      studentId: {
        name: "Anjali Mehta",
        email: "ishuvijay88@gmail.com",
      },
      academicInformation: {
        grade: "A-",
        percentage_12: 89.4,
        jeePercentile: 91.2
      },
      city: "Ahmedabad",
      state: "Gujarat",
      caste: "General",
      phoneNumber: "9345678012",
      applicationDate: "2025-02-19",
      status: "Under Review",
      documents: generateDocuments(10)
    }
  ]);

  useEffect(() => {
    fetchApplications();
  }, [searchTerm, filters, customRange12th, customRangeJEE, dummyApplications]);

  const fetchApplications = async () => {
    let filteredData = [...dummyApplications]; 
    
    if (searchTerm) {
      filteredData = filteredData.filter(app => 
        app.studentId.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // 12th Percentage filtering
    if (filters.score12th) {
      if (filters.score12th === 'custom') {
        if (customRange12th.min !== '' && customRange12th.max !== '') {
          filteredData = filteredData.filter(app => {
            const score = app.academicInformation.percentage_12;
            return score >= Number(customRange12th.min) && score <= Number(customRange12th.max);
          });
        }
      } else if (filters.score12th === 'below 50') {
        filteredData = filteredData.filter(app => 
          app.academicInformation.percentage_12 < 50
        );
      } else {
        const [min, max] = filters.score12th.split('-').map(Number);
        filteredData = filteredData.filter(app => {
          const score = app.academicInformation.percentage_12;
          return score >= min && score <= max;
        });
      }
    }
    
    // JEE Percentile filtering
    if (filters.scoreJEE) {
      if (filters.scoreJEE === 'custom') {
        if (customRangeJEE.min !== '' && customRangeJEE.max !== '') {
          filteredData = filteredData.filter(app => {
            const score = app.academicInformation.jeePercentile;
            return score >= Number(customRangeJEE.min) && score <= Number(customRangeJEE.max);
          });
        }
      } else if (filters.scoreJEE === 'below 50') {
        filteredData = filteredData.filter(app => 
          app.academicInformation.jeePercentile < 50
        );
      } else {
        const [min, max] = filters.scoreJEE.split('-').map(Number);
        filteredData = filteredData.filter(app => {
          const score = app.academicInformation.jeePercentile;
          return score >= min && score <= max;
        });
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

  // Document helper functions
  const getDocumentIcon = (type) => {
    switch(type.toLowerCase()) {
      case 'pdf':
        return '📄';
      case 'docx':
      case 'doc':
        return '📝';
      case 'jpg':
      case 'jpeg':
      case 'png':
        return '🖼️';
      default:
        return '📁';
    }
  };

  const handleViewDocument = (document) => {
    setViewingDocument(document);
  };

  const handleDownload = (document) => {
    // In a real app, this would initiate a file download
    alert(`Downloading ${document.name}`);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'score12th' && value === 'custom') {
      setCustomRangeVisible12th(true);
    } else if (name === 'score12th') {
      setCustomRangeVisible12th(false);
    }
    
    if (name === 'scoreJEE' && value === 'custom') {
      setCustomRangeVisibleJEE(true);
    } else if (name === 'scoreJEE') {
      setCustomRangeVisibleJEE(false);
    }
    
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const handleCustomRange12thChange = (e) => {
    const { name, value } = e.target;
    setCustomRange12th({
      ...customRange12th,
      [name]: value
    });
  };

  const handleCustomRangeJEEChange = (e) => {
    const { name, value } = e.target;
    setCustomRangeJEE({
      ...customRangeJEE,
      [name]: value
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
      score12th: '',
      scoreJEE: '',
      city: '',
      state: '',
      caste: ''
    });
    setSearchTerm('');
    setCustomRangeVisible12th(false);
    setCustomRangeVisibleJEE(false);
    setCustomRange12th({ min: '', max: '' });
    setCustomRangeJEE({ min: '', max: '' });
  };

  const updateApplicationStatus = (eduId, newStatus) => {
    const updatedApplications = dummyApplications.map(app => {
      if (app.eduId === eduId) {
        return { ...app, status: newStatus };
      }
      return app;
    });
    
    setDummyApplications(updatedApplications);
    
    if (selectedApplication && selectedApplication.eduId === eduId) {
      setSelectedApplication({ ...selectedApplication, status: newStatus });
    }
  };

  const handleBulkAction = (action) => {
    let newStatus;
    
    switch(action) {
      case 'approve':
        newStatus = 'Approved';
        break;
      case 'reject':
        newStatus = 'Rejected';
        break;
      case 'review':
        newStatus = 'Under Review';
        break;
      default:
        return;
    }
    
    // Apply action to all filtered applications
    const updatedApplications = dummyApplications.map(app => {
      if (applications.some(filteredApp => filteredApp.eduId === app.eduId)) {
        return { ...app, status: newStatus };
      }
      return app;
    });
    
    setDummyApplications(updatedApplications);
    
    // Update selected application if it's in the filtered set
    if (selectedApplication && applications.some(app => app.eduId === selectedApplication.eduId)) {
      setSelectedApplication({ ...selectedApplication, status: newStatus });
    }
  };

  const handleApprove = (eduId) => {
    updateApplicationStatus(eduId, 'Approved');
    // Close the modal after approval
    if (selectedApplication && selectedApplication.eduId === eduId) {
      setTimeout(() => setSelectedApplication(null), 1000);
    }
  };
  
  const handleReject = (eduId) => {
    updateApplicationStatus(eduId, 'Rejected');
    // Close the modal after rejection
    if (selectedApplication && selectedApplication.eduId === eduId) {
      setTimeout(() => setSelectedApplication(null), 1000);
    }
  };

  const handleHoldForReview = () => {
    if (!selectedApplication) return;
    
    // Show the interview scheduling modal
    setShowInterviewModal(true);
  };

  const handleInterviewDetailsChange = (e) => {
    const { name, value } = e.target;
    setInterviewDetails({
      ...interviewDetails,
      [name]: value
    });
  };

  const scheduleInterview = () => {
    if (!selectedApplication) return;
    
    const eduId = selectedApplication.eduId;
    updateApplicationStatus(eduId, 'Under Review');
    
    setEmailSent(true);

    setTimeout(() => {
      setEmailSent(false);
      setShowInterviewModal(false);
      setSelectedApplication(null);
    }, 3000);
  };

  const handleBackToApplication = () => {
    setShowInterviewModal(false);
    setEmailSent(false);
    setShowDocuments(false);
    setViewingDocument(null);
  };

  return (
    <div className="admin-applications">
      {/* <AdminSidebar /> */}
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
              {/* Replace the score type selector with two separate filters */}
              <div className="filter-group">
                <label>12th Percentage</label>
                <select name="score12th" value={filters.score12th} onChange={handleFilterChange}>
                  <option value="">All Scores</option>
                  <option value="90-100">90-100%</option>
                  <option value="80-89">80-89%</option>
                  <option value="70-79">70-79%</option>
                  <option value="60-69">60-69%</option>
                  <option value="50-59">50-59%</option>
                  <option value="below 50">Below 50%</option>
                  <option value="custom">Custom Range</option>
                </select>
                {customRangeVisible12th && (
                  <div className="custom-range">
                    <input
                      type="number"
                      name="min"
                      placeholder="Min %"
                      value={customRange12th.min}
                      onChange={handleCustomRange12thChange}
                    />
                    <span>to</span>
                    <input
                      type="number"
                      name="max"
                      placeholder="Max %"
                      value={customRange12th.max}
                      onChange={handleCustomRange12thChange}
                    />
                  </div>
                )}
              </div>

              <div className="filter-group">
                <label>JEE Percentile</label>
                <select name="scoreJEE" value={filters.scoreJEE} onChange={handleFilterChange}>
                  <option value="">All Scores</option>
                  <option value="90-100">90-100</option>
                  <option value="80-89">80-89</option>
                  <option value="70-79">70-79</option>
                  <option value="60-69">60-69</option>
                  <option value="50-59">50-59</option>
                  <option value="below 50">Below 50</option>
                  <option value="custom">Custom Range</option>
                </select>
                {customRangeVisibleJEE && (
                  <div className="custom-range">
                    <input
                      type="number"
                      name="min"
                      placeholder="Min"
                      value={customRangeJEE.min}
                      onChange={handleCustomRangeJEEChange}
                    />
                    <span>to</span>
                    <input
                      type="number"
                      name="max"
                      placeholder="Max"
                      value={customRangeJEE.max}
                      onChange={handleCustomRangeJEEChange}
                    />
                  </div>
                )}
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

            <div className="filter-actions">
              <button className="clear-filters" onClick={clearFilters}>Clear Filters</button>

              <div className="bulk-actions">
                <span className="bulk-action-label">Bulk Actions:</span>
                <button className="bulk-btn approve" onClick={() => handleBulkAction('approve')}>
                  Approve All
                </button>
                <button className="bulk-btn reject" onClick={() => handleBulkAction('reject')}>
                  Reject All
                </button>
                <button className="bulk-btn review" onClick={() => handleBulkAction('review')}>
                  Hold All for Review
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="applications-list">
          {applications.length > 0 ? (
            <div className="applications-grid">
              {applications.map((application) => (
                <div className="application-card" key={application.eduId}>
                  <div className="card-header">
                    <h3>{application.studentId.name}</h3>
                    <span className={`status-badge ${getStatusClass(application.status)}`}>
                      {application.status}
                    </span>
                  </div>
                  <div className="card-body">
                    <div className="edu-id-preview">
                      Edu ID: {application.eduId}
                    </div>
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
                      <span className="info-label">12th Percentage:</span>
                      <span className="info-value">{application.academicInformation.percentage_12}%</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">JEE Percentile:</span>
                      <span className="info-value">{application.academicInformation.jeePercentile}</span>
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

      {/* Application Details Modal */}
      {selectedApplication && !showInterviewModal && !emailSent && !showDocuments && !viewingDocument && (
        <div className="application-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Application Details</h2>
              <button onClick={() => setSelectedApplication(null)} className="close-btn">&times;</button>
            </div>
            <div className="modal-body">
              <div className="edu-id-box">
                Edu ID: {selectedApplication.eduId}
              </div>
              <h3>{selectedApplication.studentId.name}</h3>

              {/* Moved Documents section to be right after the student name */}
              <div className="detail-section">
                <h4>Documents</h4>
                <div className="documents-preview">
                  <p>This student has submitted {selectedApplication.documents.length} documents.</p>
                  <button
                    className="view-docs-btn"
                    onClick={() => setShowDocuments(true)}
                  >
                    View Documents
                  </button>
                </div>
              </div>

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
                <div className="detail-row">
                  <span className="detail-label">JEE Percentile:</span>
                  <span className="detail-value">{selectedApplication.academicInformation.jeePercentile}</span>
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
              <button className="back-btn" onClick={() => setSelectedApplication(null)}>Back</button>
              <div className="action-buttons">
                <button
                  className="approve-btn"
                  onClick={() => handleApprove(selectedApplication.eduId)}
                >
                  Approve
                </button>
                <button
                  className="reject-btn"
                  onClick={() => handleReject(selectedApplication.eduId)}
                >
                  Reject
                </button>
                <button
                  className="hold-btn"
                  onClick={handleHoldForReview}
                >
                  Hold for Review
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Documents Modal */}
      {selectedApplication && showDocuments && !viewingDocument && (
        <div className="application-modal">
          <div className="modal-content documents-modal">
            <div className="modal-header">
              <h2>Student Documents</h2>
              <button onClick={() => setShowDocuments(false)} className="close-btn">&times;</button>
            </div>
            <div className="modal-body">
              <div className="edu-id-box">
                Edu ID: {selectedApplication.eduId}
              </div>
              <h3>Documents for {selectedApplication.studentId.name}</h3>

              <div className="documents-list">
                {selectedApplication.documents.map((doc) => (
                  <div className="document-item" key={doc.id}>
                    <div className="document-info">
                      <span className="document-type">{getDocumentIcon(doc.type)}</span>
                      <span className="document-name">{doc.name}</span>
                      <span className="document-size">{doc.size}</span>
                    </div>
                    <div className="document-actions">
                      <button
                        className="view-btn"
                        title="View Document"
                        onClick={() => handleViewDocument(doc)}
                      >
                        👁️
                      </button>
                      <button
                        className="download-btn"
                        title="Download Document"
                        onClick={() => handleDownload(doc)}
                      >
                        ⬇️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="modal-footer">
              <button className="back-btn" onClick={() => setShowDocuments(false)}>Back</button>
            </div>
          </div>
        </div>
      )}

      {/* Document Preview Modal */}
      {selectedApplication && viewingDocument && (
        <div className="application-modal">
          <div className="modal-content document-preview-modal">
            <div className="modal-header">
              <h2>{viewingDocument.name}</h2>
              <button onClick={() => setViewingDocument(null)} className="close-btn">&times;</button>
            </div>
            <div className="modal-body document-preview">
              <div className="edu-id-box">
                Edu ID: {selectedApplication.eduId}
              </div>
              <div className="document-preview-container">
                <div className="document-placeholder">
                  <span className="document-icon">{getDocumentIcon(viewingDocument.type)}</span>
                  <p>Backend part to be done for document/pdf preview</p>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="back-btn" onClick={() => setViewingDocument(null)}>Back</button>
              <button
                className="download-btn-large"
                onClick={() => handleDownload(viewingDocument)}
              >
                Download
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interview Scheduling Modal */}
      {showInterviewModal && !emailSent && (
        <div className="application-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Schedule Interview</h2>
              <button onClick={handleBackToApplication} className="close-btn">&times;</button>
            </div>
            <div className="modal-body">
              <div className="edu-id-box">
                Edu ID: {selectedApplication.eduId}
              </div>
              <h3>Interview for: {selectedApplication.studentId.name}</h3>

              <div className="interview-form">
                <div className="form-group">
                  <label>Meeting Link:</label>
                  <input
                    type="text"
                    name="meetingLink"
                    value={interviewDetails.meetingLink}
                    onChange={handleInterviewDetailsChange}
                    placeholder="e.g., https://meet.google.com/xyz-abcd-123"
                  />
                </div>

                <div className="form-group">
                  <label>Interviewer Name:</label>
                  <input
                    type="text"
                    name="interviewerName"
                    value={interviewDetails.interviewerName}
                    onChange={handleInterviewDetailsChange}
                    placeholder="e.g., Dr. Sharma"
                  />
                </div>

                <div className="form-group">
                  <label>Interviewer Email:</label>
                  <input
                    type="email"
                    name="interviewerEmail"
                    value={interviewDetails.interviewerEmail}
                    onChange={handleInterviewDetailsChange}
                    placeholder="e.g., interviewer@university.edu"
                  />
                </div>

                <div className="form-group date-time">
                  <div className="date-input">
                    <label>Interview Date:</label>
                    <input
                      type="date"
                      name="interviewDate"
                      value={interviewDetails.interviewDate}
                      onChange={handleInterviewDetailsChange}
                    />
                  </div>

                  <div className="time-input">
                    <label>Interview Time:</label>
                    <input
                      type="time"
                      name="interviewTime"
                      value={interviewDetails.interviewTime}
                      onChange={handleInterviewDetailsChange}
                    />
                  </div>
                </div>

                <div className="email-preview">
                  <h4>Email Preview</h4>
                  <div className="email-content">
                    <p><strong>To Student:</strong> {selectedApplication.studentId.email}</p>
                    <p><strong>Subject:</strong> Interview Scheduled - Your Application to University</p>
                    <p><strong>Body:</strong></p>
                    <div className="email-body">
                      <p>Dear {selectedApplication.studentId.name},</p>
                      <p>Thank you for your application. We are pleased to inform you that you have been shortlisted for an interview.</p>
                      <p>Interview Details:</p>
                      <ul>
                        <li>Date: {interviewDetails.interviewDate || "(Please select a date)"}</li>
                        <li>Time: {interviewDetails.interviewTime || "(Please select a time)"}</li>
                        <li>Meeting Link: {interviewDetails.meetingLink || "(Please provide a meeting link)"}</li>
                        <li>Interviewer: {interviewDetails.interviewerName || "(Please provide interviewer name)"}</li>
                      </ul>
                      <p>Please be prepared with all your academic documents.</p>
                      <p>Best regards,<br/>Admissions Team</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="back-btn" onClick={handleBackToApplication}>Back</button>
              <button
                className="schedule-btn"
                onClick={scheduleInterview}
                disabled={!interviewDetails.meetingLink ||
                         !interviewDetails.interviewerName ||
                         !interviewDetails.interviewerEmail ||
                         !interviewDetails.interviewDate ||
                         !interviewDetails.interviewTime}
              >
                Schedule & Send Email
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Email Sent Confirmation */}
      {emailSent && (
        <div className="application-modal">
          <div className="modal-content email-sent">
            <div className="email-sent-icon">✓</div>
            <h2>Email Sent Successfully!</h2>
            <p>Interview details have been sent to:</p>
            <ul>
              <li>Student: {selectedApplication.studentId.email}</li>
              <li>Interviewer: {interviewDetails.interviewerEmail}</li>
            </ul>
            <p>Application status updated to "Under Review"</p>
            <div className="modal-footer">
              <button className="ok-btn" onClick={() => {
                setEmailSent(false);
                setSelectedApplication(null);
              }}>
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminApplications;