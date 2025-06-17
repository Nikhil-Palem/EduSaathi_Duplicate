
import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";
import './PersonalQuestions.css';
import { MdDelete } from "react-icons/md";
import { IoIosAddCircleOutline } from 'react-icons/io';
import AddQuestionContext from "../../../context/AddQuestionContext.js";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
function TestScore() {
    const { setValue3 } = useContext(AddQuestionContext);
    const [field, setField] = useState([]);
    const [searchData, setSearchData] = useState([]);
    const [search, setSearch] = useState('');

    // Load initial data from localStorage
    useEffect(() => {
        const savedField = JSON.parse(localStorage.getItem('testExams')) || [];
        setField(savedField);
    }, []);

    // Save `field` to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('testExams', JSON.stringify(field));
        setValue3((prevValue) => ({
            ...prevValue,
            testExams: field,
        }));
    }, [field, setValue3]);

    const deleteExam = (name) => {
        console.log(name);
        setField((field) => {
            return field.filter((exam) => exam.name !== name);
        });
    };

    const addExam = (name) => {
        setField((field) => {
            const alreadyExist = field.some((exam) => exam.name === name);
            if (!alreadyExist) {
                return [...field, { id: field.length + 1, name }];
            } else {
                return field;
            }
        });
    };

    useEffect(() => {
        if (search !== '') {
            try {
                const res = axios.post('http://localhost:8080/api/v1/dashboard/examApi', search);
                res.then((data) => {
                    let Data = data.data.data.exams;
                    const newFilterData = Data.filter((book) => {
                        return book.short_form_2.includes(search) || book.short_form.includes(search);

                    });
                    setSearchData(newFilterData);
                });
            } catch (e) {
                console.log(e);
            }
        } else {
            setSearchData([]);
        }
    }, [search]);

    return (
        <div className="test-score">
            <div className="test-search">
                <label className="test-label">Search The Exam</label>
                <div className="test-input-search">
                    <input
                        type="text"
                        name="search"
                        value={search}
                        autoComplete={'off'}
                        placeholder='Type to search'
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <span><SearchOutlinedIcon /></span>
                </div>
                {searchData.map((data, index) => (
                    <div key={index} className="add-exam">
                        <div className={'test-exam'}  >
                            <span className="span-class">{data.exam_name}</span>
                            <IoIosAddCircleOutline color='black' style={{ cursor: 'pointer' }} onClick={() => {
                                addExam(data.short_form)
                            }} />
                        </div>

                    </div>
                ))
                }

                <div className='exams-box'>
                    {field.map((exam, i) => (
                        <>
                            <div className="exam-list" key={i}>
                                <p><span>{i + 1}</span></p>
                                <span>
                                    {exam.name}
                                </span>
                            <MdDelete className='del-btn' color='black' style={{ cursor: 'pointer' }} onClick={() => deleteExam(exam.name)} />
                            </div>
                        </>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TestScore;
