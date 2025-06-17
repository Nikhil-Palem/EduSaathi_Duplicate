import React, { useEffect, useState } from 'react';
import './StudentAllocation.css';
import { CheckCircle } from 'lucide-react'; // or use your preferred icon
// import SortIcon from '@mui/icons-material/Sort';
import SortAsc from '../images/asc.png';
import DoneIcon from '@mui/icons-material/Done';
import SortDesc from '../images/desc.png';
import axios from 'axios';
import Lottie from 'lottie-react';
import loadinganim from '../images/Loading.json'
const StudentAllocation = () => {
  const [staffData, setstaffData] = useState([]);
  const [SortingOrder, setSortingOrder] = useState('asc');
  const [tabs, settabs] = useState('evenly');
  const [Loading, setLoading] = useState(false);
  const handleSort = () => {
    setSortingOrder((prev) => prev === 'asc' ? 'desc' : 'asc');
    const sortedData = [...staffData].sort((a, b) => {
      if (SortingOrder === 'asc') {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return -1;
        } else if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return 1;
        }
        return 0;
      }
      else {
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return -1;
        } else if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return 1;
        }
        return 0;
      }
    });
    setstaffData(sortedData); // Update the state to trigger re-render
  };

  const handleOverflowToggle = (staff) => {
    const updatedData = staffData.map((s) => {
      if (s.name === staff.name) {
        return { ...s, limit: 'OF access', overflow: !s.overflow };
      }
      return s;
    });
    setstaffData(updatedData);
  };

  useEffect(() => {
    staffStdMapping();
    fetchStaff();
  }, []);


  const collegeId = localStorage.getItem("collegeId");

  const staffStdMapping = async () => {
    try {
      const res = await axios.post(`http://localhost:8080/api/v1/lead/mapStudentsToStaff`, {
        collegeId
      });
      console.log("Student-Staff mapping done:", res.data);
    } catch (err) {
      console.error("Error during student-staff mapping:", err);
    }
  };

  const fetchStaff = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/lead/staffdata?collegeId=${collegeId}`);
      console.log("Data", response);
      const rawStaff = response.data.staff;
      const totalStudents = response.data.studentCount;

      const staffCount = rawStaff.length;
      const baseCount = Math.floor(totalStudents / staffCount);
      let remainder = totalStudents % staffCount;

      // Distribute students
      const staffData = rawStaff.map((staff, index) => {
        const assignedStudents = baseCount + (remainder > 0 ? 1 : 0);
        if (remainder > 0) remainder--;

        return {
          name: staff.name,
          active: assignedStudents || 0,
          limit: staff.studentLimit || 0,
          overflow: staff.overflow || 0
        };
      });

      setstaffData(staffData);
    } catch (error) {
      console.error('Error fetching staff data:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="allocation-container">
      <div className="allocation-header">
        <div className="header-left">
          <p>Distribute Lead Generated among staff</p>
        </div>
        <div className="header-right">
          <button className={`btn ${tabs === 'evenly' ? 'active' : ''}`} onClick={() => settabs('evenly')}>Evenly among staff</button>
          <button className={`btn ${tabs === 'limit' ? 'active' : ''}`} onClick={() => settabs('limit')}>Upto student limit</button>
        </div>
      </div>

      {tabs === 'limit' ? <div className="allocation-table">
        <div className="allocation-table-header">
          <span >
            Staff Name
            <span>
              <img src={SortingOrder === 'asc' ? SortAsc : SortDesc} alt="sort" className="sort-icon" onClick={handleSort} />
            </span>
          </span>
          <span>Active Students</span>
          <span>Student Limit</span>
          <span>Overflow</span>
        </div>

        {!Loading ? (staffData.map((staff, idx) => (
          <div className="allocation-table-row" key={idx}>
            <div className="staff-name">
              <img src="/avatar.png" alt="avatar" className="avatar" />
              <span>{staff.name}</span>
            </div>
            <div>{staff.active}</div>
            <div>{staff.limit}</div>
            <div className="overflow-status">
              <button
                className={`circle-button ${staff.overflow ? 'active' : ''}`}
                onClick={() => handleOverflowToggle(staff)}
              >{staff.overflow && <DoneIcon />}</button>
            </div>
          </div>
        ))) : <div className="loading">
          <Lottie
            animationData={loadinganim}
            className='animationloading'
          />
          <p>loading...</p>
        </div>
        }
      </div> : <div className="allocation-table">
        <div className="allocation-table-header active">
          <span >
            Staff Name
            <span>
              <img src={SortingOrder === 'asc' ? SortAsc : SortDesc} alt="sort" className="sort-icon" onClick={handleSort} />
            </span>
          </span>
          <span>Active Students</span>
        </div>

        {!Loading ? (staffData.map((staff, idx) => (
          <div className="allocation-table-row active" key={idx}>
            <div className="staff-name">
              <img src="/avatar.png" alt="avatar" className="avatar" />
              <span>{staff.name}</span>
            </div>
            <div>{staff.active}</div>
          </div>
        ))) :
          <div className="loading">
            <Lottie
              animationData={loadinganim}
              className='animationloading'
            />
            <p>loading...</p>
          </div>}
      </div>}
    </div>
  );
};

export default StudentAllocation;