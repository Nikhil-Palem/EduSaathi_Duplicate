import React, { useContext, useEffect, useState } from 'react';
import Footer from './footer-dashboard.js';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';
import ApplicationContext from '../../context/ApplicationContext.js';
import axios from 'axios';
import './TestScores.css';

function TestScores() {
    const { testScore, handleTestChange } = useContext(ApplicationContext);
    const [field, setField] = useState([]);
    const [searchData, setSearchData] = useState([]);
    const [search, setSearch] = useState('');
    const [fileUploads, setFileUploads] = useState({});

    useEffect(() => {
        console.log(testScore);
    }, [testScore]);

    const deleteExam = (name) => {
        setField((prevField) => prevField.filter((exam) => exam.name !== name));
        setFileUploads((prev) => {
            const newUploads = { ...prev };
            delete newUploads[name];
            return newUploads;
        });
    };

    const addExam = (name) => {
        setField((prevField) => {
            const alreadyExist = prevField.some((exam) => exam.name === name);
            if (!alreadyExist) {
                return [...prevField, { id: prevField.length + 1, name }];
            } else {
                return prevField;
            }
        });
    };

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (search) {
                axios
                    .post('http://localhost:8080/api/v1/dashboard/examApi', { search })
                    .then((res) => {
                        const exams = res.data.data.exams;
                        const newFilterData = exams.filter(
                            (exam) =>
                                exam.short_form_2.includes(search) ||
                                exam.short_form.includes(search)
                        );
                        setSearchData(newFilterData);
                    })
                    .catch((e) => {
                        console.error(e);
                    });
            } else {
                setSearchData([]);
            }
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [search]);

    const handleFileChange = (examName, file) => {
        if (!file) return;

        const allowedTypes = ['application/pdf'];
        const maxSize = 5 * 1024 * 1024; // 5MB

        if (!allowedTypes.includes(file.type)) {
            alert('Only PDF files are allowed!');
            return;
        }

        if (file.size > maxSize) {
            alert('File size should not exceed 5MB!');
            return;
        }

        setFileUploads((prev) => ({ ...prev, [examName]: file }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (Object.keys(fileUploads).length === 0) {
            alert('Please select at least one file to upload.');
            return;
        }

        console.log('Uploading files:', fileUploads);
        handleTestChange('testScore', fileUploads);
        alert('Files uploaded successfully!');
    };

    return (
        <div className="colleges-container">
            <div className="student-dashboard">
                <div className="test-scores">
                    <div className="test-search">
                        <label className="test-label">Search The Exam</label>
                        <div className="test-input-search">
                            <input
                                type="text"
                                name="search"
                                value={search}
                                autoComplete="off"
                                placeholder="Type to search"
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <span>
                                <SearchOutlinedIcon/>
                            </span>
                        </div>
                        {searchData.map((data, index) => (
                            <div key={index} className="add-exam">
                                <div className="test-exam">
                                    <span className="span-class">{data.exam_name}</span>
                                    <IoIosAddCircleOutline
                                        color="black"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => addExam(data.short_form)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <form onSubmit={handleSubmit} className="upload-form">
                        <h3>Upload Test Scores</h3>
                        {field.map((exam, i) => (
                            <div key={i} className="upload-score">
                                <h4>{exam.name}</h4>
                               <div style={{display: 'flex', alignItems: 'center', gap: 20, justifyContent: 'center'}}>

                                <input
                                    type="file"
                                    accept=".pdf"
                                    onChange={(e) => handleFileChange(exam.name, e.target.files[0])}
                                />
                                <MdDelete

                                    color="black"
                                    size={40}
                                    style={{ cursor: 'pointer' , marginBottom: '15px'}}
                                    onClick={() => deleteExam(exam.name)}
                                />
                               </div>
                            </div>
                        ))}
                        <button type="submit">Upload All</button>
                    </form>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default TestScores;
