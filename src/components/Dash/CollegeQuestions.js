import React, {useContext, useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import Footer from "./footer-dashboard.js";
import "./CollegeQuestions.css";
import axios from "axios";
import ApplicationContext from "../../context/ApplicationContext.js";
function CollegeQuestions() {
    const [myUniversities, setMyUniversities] = useState([]);

    const {setAnswer} = useContext(ApplicationContext);
    const [personalQuestions, setPersonalQuestions] = useState([]);
    const [eduQuestions, setEduQuestions] = useState([]);
    const [answers, setAnswers] = useState({ personal: {}, educational: {} });
    const { id } = useParams();

    // Fetch College Questions
    const fetchQuestions = async () => {
        try {
            const response = await axios.post(
                "http://localhost:8080/api/v1/admin/getCollegeQuestions",
                { id }
            );
            console.log("Data fetched successfully:", response.data.data);
            setPersonalQuestions(response.data.data.personalQuestions);
            setEduQuestions(response.data.data.educationalQuestion);
        } catch (error) {
            console.error("Error fetching questions:", error);
        }
    };

    // Handle input changes
    const handleAnswerChange = (category, index, value) => {
        setAnswers((prev) => ({
            ...prev,
            [category]: {
                ...prev[category],
                [index]: value,
            },
        }));
    };

    // Save and Print Answers
    const saveAnswers = () => {
        setAnswer({
            personal: answers.personal,
            educational: answers.educational,
        })
        console.log("Saved Answers:", answers);
    };

    // Fetch Questions when `id` changes
    useEffect(() => {
        if (!id) return; // Prevent calling API if `id` is undefined
        fetchQuestions();

        // Load saved universities from localStorage
        const savedUniversities = JSON.parse(localStorage.getItem("myUniversities")) || [];
        setMyUniversities(savedUniversities);
    }, [id]); // ✅ Depend on `id` to re-fetch if it changes

    return (
        <div className="colleges-container">
            <div className="student-dashboard">
                <h1>College Questions</h1>
                <div className="college-questions">
                    {myUniversities.length === 0 ? (
                        <div className="no-questions">
                            <p>Your Selected University doesn't have any questions.</p>
                            <div className="vertical-line-container">
                                <div className="vertical-line"></div>
                            </div>
                            <p>You haven't added any University yet.</p>
                        </div>
                    ) : (
                        <div className="clg-questions-div">
                            <h2>Personal Questions</h2>
                            {personalQuestions.length > 0 ? (
                                personalQuestions
                                    .filter(question => question.id > 5)
                                    .map((question, index) => (
                                        <div key={index} className="question-item">
                                            <label htmlFor={`personal-${index}`}>{question.name}</label>
                                            <input
                                                type="text"
                                                id={`personal-${index}`}
                                                name={`personal-${index}`}
                                                placeholder="Enter your answer"
                                                onChange={(e) => handleAnswerChange("personal", question.name, e.target.value)}
                                            />
                                        </div>
                                    ))
                            ) : (
                                <p>No personal questions available.</p>
                            )}

                            <h2>Educational Questions</h2>
                            {eduQuestions.length > 0 ? (
                                eduQuestions
                                    .filter(question => question.id > 5)
                                    .map((question, index) => (
                                        <div key={index} className="question-item">
                                            <label htmlFor={`educational-${index}`}>{question.name}</label>
                                            <input
                                                type="text"
                                                id={`educational-${index}`}
                                                name={`educational-${index}`}
                                                placeholder="Enter your answer"
                                                onChange={(e) => handleAnswerChange("educational", question.name, e.target.value)}
                                            />
                                        </div>
                                    ))
                            ) : (
                                <p>No educational questions available.</p>
                            )}

                            <button className="save-btn" onClick={saveAnswers}>
                                Save Answers
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default CollegeQuestions;
