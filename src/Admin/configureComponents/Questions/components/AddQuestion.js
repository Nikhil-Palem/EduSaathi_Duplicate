import React, { useContext, useState } from 'react';
import '../PersonalQuestions.css';
import { RxCross2 } from "react-icons/rx";
import { FaLongArrowAltRight } from "react-icons/fa";
import AddQuestionContext from "../../../../context/AddQuestionContext.js";
import { useForm } from "react-hook-form";
import OptionsQuestion from "./OptionsQuestion.js";

const AddQuestion = ({ onSubmit }) => {
    const { register } = useForm();
    const { setAddQuestions } = useContext(AddQuestionContext);
    const [input, setInput] = useState('');
    const [options, setOptions] = useState(0);
    const [finalValue, setFinalValue] = useState(0);

    const handleSubmit = () => {
        onSubmit(input, 'text');
        setInput('');
        setAddQuestions(0);
    };

    const handleOptionChange = () => {
        setFinalValue(options);
        setOptions(0);
    };

    const handleClose = () => {
        setAddQuestions(0);
    };

    return (
        <div className="add-question-item">
            <div className="add-question-nav">
                <h3 className="add-question-h3">Add Question</h3>
                <RxCross2 color="black" onClick={handleClose} />
            </div>
            <div className="add-question-options">
                <div className="add-question-options-div">
                    <div>
                        <h4>Add a question with options</h4>
                        <div className="options-div">
                            <div className="options-div-flex">
                                <input
                                    {...register("options", { min: 2 })}
                                    className="options-div-input"
                                    style={{ width: '94%' }}
                                    placeholder="Enter number of options"
                                    type="number"
                                    value={options}
                                    onChange={(e) => setOptions(e.target.value)}
                                />
                                <FaLongArrowAltRight onClick={handleOptionChange} />
                            </div>
                            <div className={`options-question ${finalValue > 1 ? '' : 'hidden'}`}>
                                <OptionsQuestion options={finalValue} onChange={handleOptionChange} onSubmit={onSubmit} />
                            </div>
                        </div>
                    </div>

                    <div className="add-question-options-div-right">
                        <h4>Add a question without options</h4>
                        <div>
                            <input
                                style={{ width: '94%' }}
                                placeholder="Enter instruction here"
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            />
                            <button className="add-question-options-div-right-button" onClick={handleSubmit}>
                                Add Question
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddQuestion;