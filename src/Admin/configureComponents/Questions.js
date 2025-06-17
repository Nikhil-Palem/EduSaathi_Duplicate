import React, { useContext, useEffect, useState } from 'react';
import { IoIosArrowDropdown, IoIosArrowUp, IoIosAddCircleOutline } from "react-icons/io";
import { useLocation } from 'react-router-dom'; // Import useLocation

import PersonalQuestions from "./Questions/PersonalQuestions.js";
import './Questions.css';
import AddQuestionContext from "../../context/AddQuestionContext.js";
import EducationQuestions from "./Questions/EducationQuestions.js";
import ExtraCurricular from "./Questions/ExtraCurricular.js";
import TestScore from "./Questions/TestScore.js";

const Questions = () => {
    const { addingQuestions, setAddQuestions } = useContext(AddQuestionContext);
    const [activeItem, setActiveItem] = useState(null); // Track which item is active
    const [addQuestion, setAddQuestion] = useState(null); // Local state for "Add Question"
    const location = useLocation();
    const handleItemClick = (index) => {
        setActiveItem((prev) => (prev === index ? null : index)); // Toggle active item
    };

    const handleAddQuestion = (index) => {
        if (addingQuestions === 0) {
            setAddQuestions(null)
        }
        setAddQuestion(index); // Toggle active item
    };

    
    useEffect(() => {
        if (location.state && location.state.activeSection) {
            handleItemClick(location.state.activeSection);
        }
    }, [location.state]);

    return (
        <div className="questions-section">
            <div className={`${activeItem === null ? 'nonActiveAdditionalNavbar' : 'activeAdditionalNavbar'}`}>
                <div className="additionalNavbar">
                    <div className="additionalNavbar-div" onClick={() => handleAddQuestion(1)}>
                        <p className='h'>Add Question</p>
                        <IoIosAddCircleOutline />
                    </div>
                    <div className="additionalNavbar-div">
                        <p className='h'>Reorder</p>
                        <IoIosAddCircleOutline />
                    </div>
                    <div className="additionalNavbar-div">
                        <p className='h'>Add Logic</p>
                        <IoIosAddCircleOutline />
                    </div>
                </div>
            </div>
            <ul className="questions">
                <div
                    className={`questions-list ${activeItem === 1 ? 'activeState' : 'nonActiveState'}`}
                    style={{ borderTop: "black solid 1px", paddingTop: "40px" }}
                >
                    <div className="special-questions" onClick={() => handleItemClick(1)}>
                        <p>1. Personal Questions</p>
                        <div className="special-buttons">
                            {activeItem === 1 ? (
                                <IoIosArrowUp color="black" />
                            ) : (
                                <IoIosArrowDropdown color="black" />
                            )}
                        </div>
                    </div>
                    <div className={`${activeItem === 1 ? 'activeDiv' : 'nonActiveDiv'}`}>
                        <PersonalQuestions add={addQuestion} />
                    </div>
                </div>
                <div
                    className={`questions-list ${activeItem === 2 ? 'activeState' : 'nonActiveState'}`}
                >
                    <div className="special-questions" onClick={() => handleItemClick(2)}>
                        <p>2. Education Questions</p>
                        <div className="special-buttons">
                            {activeItem === 2 ? (
                                <IoIosArrowUp color="black" />
                            ) : (
                                <IoIosArrowDropdown color="black" />
                            )}
                        </div>
                    </div>
                    <div className={`${activeItem === 2 ? 'activeDiv' : 'nonActiveDiv'}`}>
                        <EducationQuestions add={addQuestion} />
                    </div>
                </div>
                <div
                    className={`questions-list ${activeItem === 3 ? 'activeState' : 'nonActiveState'}`}
                >
                    <div className="special-questions" onClick={() => handleItemClick(3)}>
                        <p>3. Test Scores</p>
                        <div className="special-buttons">
                            {activeItem === 3 ? (
                                <IoIosArrowUp color="black" />
                            ) : (
                                <IoIosArrowDropdown color="black" />
                            )}
                        </div>
                    </div>
                    <div className={`${activeItem === 3 ? 'activeDiv' : 'nonActiveDiv'}`}>
                        <TestScore />
                    </div>
                </div>
                <div
                    className={`questions-list ${activeItem === 4 ? 'activeState' : 'nonActiveState'}`}
                >
                    <div className="special-questions" onClick={() => handleItemClick(4)}>
                        <p>4. Extracurricular Questions</p>
                        <div className="special-buttons">
                            {activeItem === 4 ? (
                                <IoIosArrowUp color="black" />
                            ) : (
                                <IoIosArrowDropdown color="black" />
                            )}
                        </div>
                    </div>
                    <div className={`${activeItem === 4 ? 'activeDiv' : 'nonActiveDiv'}`}>
                        <ExtraCurricular add={addQuestion} />
                    </div>
                </div>
            </ul>
        </div>
    );
};

export default Questions;
