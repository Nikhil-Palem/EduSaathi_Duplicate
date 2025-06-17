import React, { useEffect, useState, useCallback, useContext } from 'react';
import AdminSidebar from './AdminSidebar.js';
import ArrowOutwardOutlinedIcon from '@mui/icons-material/ArrowOutwardOutlined';
//please do not change this
import AddQuestionContext from "../context/AddQuestionContext.js";
///
import AdminDashboardMap from "./AdminDashboardMap.js";
import { Line, Bar, Pie } from 'react-chartjs-2';
import './AdminDashboard.css';
import Cookies from "js-cookie";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { useNavigate } from "react-router-dom";
import axios from "axios";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const lineChartData = {
    labels: ['2010', '2011', '2012', '2013', '2014', '2015', '2016'],
    datasets: [
        {
            label: 'Acquisitions by year',
            data: [10, 20, 15, 25, 22, 30, 28],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            fill: false,
        },
    ],
};

const barChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'Applications Submitted',
            data: [10, 15, 20, 25, 30, 35, 40],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
        },
    ],
};

const pieChartData = {
    labels: ['0-50', '50-70', '70-90', '90-100'],
    datasets: [
        {
            label: 'Number of Applicants',
            data: [20, 30, 25, 25],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
            ],
            borderWidth: 1,
        },
    ],
};

const progressChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'Applications in Progress',
            data: [5, 10, 15, 20, 25, 30, 35],
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1,
        },
    ],
};

const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2,
    animation: { duration: 2000 },
};

const pieChartOptions = {
    ...chartOptions,
    aspectRatio: 2,
    layout: {
        padding: {
            top: 20,
            bottom: 20,
        }
    },
};

const AdminDashboard = () => {
    //this also
    const {setDatas} = useContext(AddQuestionContext)
    // const [id, setId] = useState('')
    //
    // const navigate = useNavigate();
    // const cookies = Cookies.get('adminToken');

    const getAdmin = useCallback(async () => {
        
            console.log("got it")
        try {
            console.log("got it")
            const response = await axios.get("http://localhost:8080/api/v1/admin/verify", {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            //
            const obj = response.data.data;
            console.log(obj)
            // setId(obj._id)
            setDatas({
                acronym: obj.acronym,
                address: obj.address,
                city: obj.city,
                collegeType: obj.collegeType,
                college_link: obj.college_link,
                college_logo: obj.college_logo,
                contactNumber: obj.contactNumber,
                eduId: obj.eduId,
                email: obj.email,
                name: obj.name,
                position: obj.position,
                state: obj.state,
                username: obj.username
            })
            //
            console.log(response.data.data);
        } catch (error) {
            console.error("Error fetching admin data:", error);
        }
    }, []);

    useEffect(() => {
        getAdmin();
    }, [ getAdmin]);

    return (
        <div className="admin-dashboard">
            <AdminSidebar />
            <div className="content">
                <div id="india-map" style={{ marginBottom: '20px', width: '100%' }}>
                    <AdminDashboardMap />
                </div>

                <div className="chart-section">
                    <div className="chart-container">
                        <div className="chart-card">
                            <h2>Application submitted</h2>
                            <Line data={lineChartData} options={chartOptions} />
                        </div>
                        <div className="chart-card">
                            <h2>Applications Submitted per Month</h2>
                            <Bar data={barChartData} options={chartOptions} />
                        </div>
                        <div className="chart-card">
                            <h2>Score Range of Applicants</h2>
                            <div className="pie-chart-container">
                                <Pie data={pieChartData} options={pieChartOptions} />
                            </div>
                        </div>
                        <div className="chart-card">
                            <h2>Applications in Progress</h2>
                            <Bar data={progressChartData} options={chartOptions} />
                        </div>
                    </div>
                </div>

                <div className="bottom-content">
                    <div className="notifications">
                        <h3>Notifications</h3>
                        <hr />
                        <div className="notification-list">
                            <li>Things to keep in mind while reviewing this year's applications</li>
                            <li>Update deadlines for next year's admissions</li>
                        </div>
                    </div>
                    <div className="student-lookup">
                        <h3>Student Look-up</h3>
                        <div className="input-field1">
                            <input type="text" placeholder="Enter EDU ID" />
                            <span><ArrowOutwardOutlinedIcon /></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;