import React from 'react'
import Timeline from '../DashBoard/Timeline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import '../DashBoard/Students.css'
import { useLocation } from 'react-router-dom';

function StudentDetails() {
    const location = useLocation();
    const studentDetails = location.state?.student;
    const prefferedName = studentDetails?.name.split(" ")[0];

    return (
        <div className='students-div'>
            <Timeline />
            <div className="student-top">
                <div className="header">
                    <AccountCircleIcon />
                    <h3>{studentDetails?.name}</h3>
                </div>
                <div className="social-media-icons">
                    <div className="social-media-icon">
                        <WhatsAppIcon />
                    </div>
                    <div className="social-media-icon">
                        <PhoneIcon />
                    </div>
                    <div className="social-media-icon">
                        <EmailIcon />
                    </div>
                </div>
            </div>
            <div className="student-bottom">
                <div className="form-left">
                    <div className="stu-form-group">
                        <label>Full Name</label>
                        <input type="text" value={studentDetails?.name} readOnly />
                    </div>

                    <div className="stu-form-group">
                        <label>Gender</label>
                        <input type="text" value={"Male"} readOnly />
                    </div>

                    <div className="stu-form-group">
                        <label>Age</label>
                        <input type="text" value={"19"} readOnly />
                    </div>

                    <div className="stu-form-group">
                        <label>Mobile Phone</label>
                        <input type="text" value={studentDetails?.phone ? studentDetails?.phone : "NA"} readOnly />
                    </div>
                    <div className="stu-form-group">
                        <label>City</label>
                        <input type="text" value={"hyderabad"} readOnly />
                    </div>
                </div>
                <div className="form-right">
                    <div className="stu-form-group">
                        <label>Preferred Name</label>
                        <input type="text" value={prefferedName} readOnly />
                    </div>

                    <div className="stu-form-group">
                        <label>Anticipated Start Years</label>
                        <input type="text" value={"Fall 2025"} readOnly />
                    </div>

                    <div className="stu-form-group">
                        <label>Anticipated Study Program</label>
                        <input type="text" value={"BTech"} readOnly />
                    </div>

                    <div className="stu-form-group">
                        <label>Level of Study</label>
                        <input type="text" value={"Bachelors"} readOnly />
                    </div>

                    <div className="stu-form-group">
                        <label>Lead Generated</label>
                        <input type="text" value={"Automated"} readOnly />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentDetails