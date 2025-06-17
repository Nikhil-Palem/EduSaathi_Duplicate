import React, { useContext } from 'react';
import './Submit.css';
import AddQuestionContext from "../../context/AddQuestionContext.js";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Submit = () => {
    const { value1, value2, value3, value4, value5, value6, value7, value8 } = useContext(AddQuestionContext);
    const navigate = useNavigate();
    console.log(value1, value2, value3, value4, value5, value6, value7, value8);
    const submitData = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/v1/admin/submit', {
                value1,
                value2,
                value3,
                value4,
                value5,
                value6,
                value7,
                value8,
            });
            console.log('Data submitted successfully:', response.data);
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };
    const handleEditClick = (section) => {
        navigate('/admin-configuration/questions', { state: { activeSection: section } });
    };
    return (
        <div className='submit-section'>
            <h1>Preview</h1>
            <p>Here’s a preview of the questions students will see:</p>
            <div className="flex-center">

                <div className="container-submit">
                    <div className="questions">
                        <div className="qn-top">
                            <h2>Personal Questions</h2>
                            <span onClick={() => handleEditClick(1)}>Edit</span>
                        </div>
                        <div className="questions-div-sub">
                            {
                                value1 && value1.personalQuestions?.length > 0 ? (
                                    value1.personalQuestions.map((q, index) => (
                                        <div key={q.id}>
                                            <span>{index + 1}</span>
                                            <p>{q.name}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p>No personal questions available.</p>
                                )
                            }
                        </div>

                    </div>
                    <div className="questions">
                        <div className="qn-top">
                            <h2>Education Questions</h2>
                            <span onClick={() => handleEditClick(2)}>Edit</span>
                        </div>
                        <div className="questions-div-sub">
                            {
                                value2 && value2.educationalQuestions?.length > 0 ? (
                                    value2.educationalQuestions.map((q, index) => (
                                        <div key={q.id}>
                                            <span>{index + 1}</span>
                                            <p>{q.name}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p>No education questions available.</p>
                                )
                            }
                        </div>
                    </div>
                    <div className="questions">
                        <div className="qn-top">
                            <h2>Test Scores</h2>
                            <span onClick={() => handleEditClick(3)}>Edit</span>
                        </div>
                        <div className="questions-div-sub">
                            {
                                value3 && value3.testExams?.length > 0 ? (
                                    value3.testExams.map((q) => (
                                        <div key={q.id}>
                                            <p>{q.name}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p>No test scores available.</p>
                                )
                            }
                        </div>
                    </div>
                    <div className="questions">
                        <div className="qn-top">
                            <h2>Deadlines</h2>
                            <span onClick={() => navigate('/admin-configuration/deadlines')}>Edit</span>
                        </div>
                        <div className="questions-div-sub">
                            {
                                value4 && value4.deadlines ? (
                                    <>
                                        <p className='deadline-div'><p className='deadline-p'>Early Decision:</p> {value4.deadlines.earlyDecision}</p>
                                        <p className='deadline-div'><p className='deadline-p'>Regular Decision:</p> {value4.deadlines.regularDecision}</p>
                                        <p className='deadline-div'><p className='deadline-p'>Late Decision:</p>{value4.deadlines.lateDecision}</p>
                                    </>
                                ) : (
                                    <p>No deadlines available.</p>
                                )
                            }
                        </div>
                    </div>
                    <div className="questions">
                        <div className="qn-top">
                            <h2>Fees</h2>
                            <span onClick={() => navigate('/admin-configuration/fees')}>Edit</span>
                        </div>
                        <div className="questions-div-sub">
                            {
                                value5 && value5.fees ? (
                                    <p>{value5.fees}</p>
                                ) : (
                                    <p>No fees available.</p>
                                )
                            }
                        </div>
                    </div>
                    <div className="questions">
                        <div className="qn-top">
                            <h2>Links</h2>
                            <span onClick={() => navigate('/admin-configuration/college-info')}>Edit</span>
                        </div>
                        <div className="questions-div-sub">
                            {
                                value6 && value6.links?.length > 0 ? (
                                    value6.links.map((link, index) => (
                                        <p key={index}>{link}</p>
                                    ))
                                ) : (
                                    <p>No links available.</p>
                                )
                            }
                        </div>
                    </div>
                    <div className="questions">
                        <div className="qn-top">
                            <h2>Contacts</h2>
                            <span onClick={() => navigate('/admin-configuration/college-info')}>Edit</span>
                        </div>
                        <div className="questions-div-sub">
                            {
                                value7 && value7.contacts?.length > 0 ? (
                                    value7.contacts.map((contact, index) => (
                                        <p key={index}>{contact}</p>
                                    ))
                                ) : (
                                    <p>No contacts available.</p>
                                )
                            }
                        </div>
                    </div>
                    <div className="questions">
                        <div className="qn-top">
                            <h2>Address</h2>
                            <span onClick={() => navigate('/admin-configuration/college-info')}>Edit</span>
                        </div>
                        <div className="questions-div-sub">
                            {
                                value8 && value8.address ? (
                                    <p>{value8.address}</p>
                                ) : (
                                    <p>No address available.</p>
                                )
                            }
                        </div>
                    </div>
                    <button onClick={submitData}>Submit</button>
                </div>
            </div>
        </div>
    );
};

export default Submit;