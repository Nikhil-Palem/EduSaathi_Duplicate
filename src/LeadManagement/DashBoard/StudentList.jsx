import React, { useState, useEffect } from 'react';
import { FaSearch, FaChevronDown, FaChevronLeft, FaChevronRight, FaPlus } from 'react-icons/fa';
import './StudentList.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StudentList = () => {
  const initialData = [
    { id: 1, name: 'Jane Cooper', phone: '(225) 555-0118', email: 'jane@microsoft.com', status: 'Verification' },
    { id: 2, name: 'Floyd Miles', phone: '(205) 555-0100', email: 'floyd@yahoo.com', status: 'Application' },
    { id: 3, name: 'Ronald Richards', phone: '(302) 555-0107', email: 'ronald@adobe.com', status: 'Exam slot' },
    { id: 4, name: 'Marvin McKinney', phone: '(252) 555-0126', email: 'marvin@tesla.com', status: 'Application' },
    { id: 5, name: 'Jerome Bell', phone: '(629) 555-0129', email: 'jerome@google.com', status: 'Lead created' },
    { id: 6, name: 'Kathryn Murphy', phone: '(406) 555-0120', email: 'kathryn@microsoft.com', status: 'Application' },
    { id: 7, name: 'Jacob Jones', phone: '(208) 555-0112', email: 'jacob@yahoo.com', status: 'Fees' },
    { id: 8, name: 'Kristin Watson', phone: '(704) 555-0127', email: 'kristin@facebook.com', status: 'Application' },
    { id: 9, name: 'Cameron Williamson', phone: '(684) 555-0102', email: 'cameron@apple.com', status: 'Verification' },
    { id: 10, name: 'Leslie Alexander', phone: '(684) 555-0158', email: 'leslie@google.com', status: 'Lead created' },
    { id: 11, name: 'Jenny Wilson', phone: '(217) 555-0114', email: 'jenny@facebook.com', status: 'Exam slot' },
    { id: 12, name: 'Guy Hawkins', phone: '(603) 555-0123', email: 'guy@adobe.com', status: 'Application' },
    { id: 13, name: 'Cody Fisher', phone: '(971) 555-0163', email: 'cody@microsoft.com', status: 'Fees' },
    { id: 14, name: 'Savannah Nguyen', phone: '(684) 555-0193', email: 'savannah@apple.com', status: 'Verification' },
    { id: 15, name: 'Darlene Robertson', phone: '(684) 555-0145', email: 'darlene@tesla.com', status: 'Application' },
    { id: 16, name: 'Ralph Edwards', phone: '(319) 555-0115', email: 'ralph@google.com', status: 'Lead created' },
    { id: 17, name: 'Brooklyn Simmons', phone: '(684) 555-0102', email: 'brooklyn@yahoo.com', status: 'Verification' },
    { id: 18, name: 'Wade Warren', phone: '(603) 555-0168', email: 'wade@microsoft.com', status: 'Application' },
    { id: 19, name: 'Courtney Henry', phone: '(505) 555-0125', email: 'courtney@google.com', status: 'Exam slot' },
    { id: 20, name: 'Devon Lane', phone: '(219) 555-0114', email: 'devon@facebook.com', status: 'Fees' },
    { id: 21, name: 'Robert Fox', phone: '(201) 555-0124', email: 'robert@adobe.com', status: 'Application' },
    { id: 22, name: 'Eleanor Pena', phone: '(801) 555-0119', email: 'eleanor@tesla.com', status: 'Lead created' },
    { id: 23, name: 'Theresa Webb', phone: '(405) 555-0128', email: 'theresa@apple.com', status: 'Verification' },
    { id: 24, name: 'Annette Black', phone: '(308) 555-0121', email: 'annette@yahoo.com', status: 'Application' }
  ];

  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('Newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [Loading, setLoading] = useState(false);
  const itemsPerPage = 8;
  const totalEntries = 24;
  const navigate = useNavigate();
  const collegeId = localStorage.getItem('collegeId');
  const lead_id = localStorage.getItem('lead_id')
  console.log("collegeid and leadid", collegeId, lead_id);

  useEffect(() => {
    let filteredData = [...students];

    if (searchTerm) {
      filteredData = filteredData.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.phone.includes(searchTerm) ||
        student.status.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    switch (sortOption) {
      case 'Newest':
        break;
      case 'Oldest':
        filteredData = [...filteredData].reverse();
        break;
      case 'Name (A-Z)':
        filteredData = [...filteredData].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'Name (Z-A)':
        filteredData = [...filteredData].sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    setStudents(filteredData);
  }, [searchTerm, sortOption]);

  const getStatusClass = (status) => {
    if (['Verification', 'Application', 'Lead created'].includes(status)) {
      return 'status-green';
    }
    if (['Exam slot', 'Fees'].includes(status)) {
      return 'status-red';
    }
    if (status === 'new') {
      return 'status-orange'
    }
    if (status === 'assigned') {
      return 'status-yellow'
    }
    return 'status-default';
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
    setShowSortOptions(false);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, students.length);
  const totalPages = Math.ceil(students.length / itemsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleClick = (student) => {
    navigate('/crm/dashboard/students', { state: { student } });
  }

  useEffect(() => {
    fetchStudents();
  }, [])

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8080/api/v1/lead/MyStudents?staffId=${lead_id}&collegeId=${collegeId}`);
      const data = await res.json();
      // console.log("std data", data.students);
      setStudents(data.students);
    } catch (err) {
      console.log("err from mystd fetching", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="lead-management-page">

      <main className="dashboard-content">
        <div className="students-header">
          <h1 className="students-title">All Students</h1>

          <div className="students-controls">
            <div className="search-container">
              <FaSearch className="search-icon" />
              <input
                type="text"
                className="search-input"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>

            <div className="sort-container">
              <button
                className="sort-button"
                onClick={() => setShowSortOptions(!showSortOptions)}
              >
                Sort by: {sortOption} <FaChevronDown />
              </button>

              {showSortOptions && (
                <div className="sort-options">
                  <div className="sort-option" onClick={() => handleSortChange('Newest')}>
                    Newest
                  </div>
                  <div className="sort-option" onClick={() => handleSortChange('Oldest')}>
                    Oldest
                  </div>
                  <div className="sort-option" onClick={() => handleSortChange('Name (A-Z)')}>
                    Name (A-Z)
                  </div>
                  <div className="sort-option" onClick={() => handleSortChange('Name (Z-A)')}>
                    Name (Z-A)
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {!Loading ? <div className="students-table-container">
          <table className="students-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            {students.length !== 0 ? <tbody>
              {students.slice(startIndex, endIndex).map(student => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.phone ? student.phone : "NA"}</td>
                  <td>{student.email}</td>
                  <td>
                    <span className={`status-button ${getStatusClass(student.status)}`}>
                      {student.status ? student.status : "NA"}
                    </span>
                  </td>
                  <td>
                    <button className="action-button" onClick={() => handleClick(student)}>
                      <FaPlus />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody> : <p>students has not yet assigned to you...</p>}
          </table>
        </div> : <p >Loading...</p>}

        <div className="pagination-container">
          <div className="pagination-info">
            Showing data {startIndex + 1} to {endIndex} of {totalEntries.toLocaleString()} entries
          </div>

          <div className="pagination-controls">
            <button
              className="pagination-button"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <FaChevronLeft />
            </button>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = i + 1;
              return (
                <button
                  key={pageNum}
                  className={`pagination-button ${currentPage === pageNum ? 'active' : ''}`}
                  onClick={() => goToPage(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}

            {totalPages > 5 && <span className="pagination-ellipsis">...</span>}

            <button
              className="pagination-button"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentList;