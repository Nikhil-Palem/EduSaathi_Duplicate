import React, { useState, useEffect } from 'react';
import { FaSearch, FaChevronDown, FaChevronLeft, FaChevronRight, FaPlus } from 'react-icons/fa';
// import './StudentList.css';
import '../DashBoard/StudentList.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Lottie from 'lottie-react';
import loadinganim from '../images/Loading.json'

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('Newest');
    const [currentPage, setCurrentPage] = useState(1);
    const [showSortOptions, setShowSortOptions] = useState(false);
    const [Loading, setLoading] = useState(false);
    const collegeId = localStorage.getItem('collegeId');
    const itemsPerPage = 8;
    const totalEntries = 24;
    const navigate = useNavigate();

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
        if(status==='new'){
            return 'status-orange'
        }
        if(status==='assigned'){
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
        navigate('/crm/admin-dashboard/studentdetails', { state: { student } });
    }

    useEffect(() => {
        fetchStudentData();
    }, [])

    const fetchStudentData = async () => {
        setLoading(true);
        try {
            const resp = await axios.get(`http://localhost:8080/api/v1/users/getStdData?collegeId=${collegeId}`);
            console.log("resp std data", resp.data);
            setStudents(resp.data);
        } catch (err) {
            console.log(err);
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
                        <tbody>
                            {students.slice(startIndex, endIndex).map(student => (
                                <tr key={student.eduId}>
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
                        </tbody>
                    </table>
                </div> : <div className="loading">
                    <Lottie
                        animationData={loadinganim}
                        className='animationloading'
                    />
                    <p>loading...</p>
                </div>}

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