import React, {useContext, useState} from 'react';
import './Options.css';
import AddQuestionContext from "../../../../context/AddQuestionContext.js";

const OptionsQuestion = ({ options, onSubmit, onChange }) => {

    const {setType, type, setOptionQuestion, setAddQuestions} = useContext(AddQuestionContext)
    const [optionValues, setOptionValues] = useState(Array(options).fill(""));
    const [textValues, setTextValues] = useState('')
    const handleChange = (index, value) => {
        const updatedOptions = [...optionValues];
        updatedOptions[index] = value;
        setOptionValues(updatedOptions);
        setType("option")

    };
    const addedQuestion=()=>{

        onSubmit(textValues,type )
        setOptionQuestion(optionValues)

        setOptionValues([].fill(""))
        setAddQuestions(0)
        onChange(0)

    }
    return (
        <div className={`options ${options>1? '':'hidden'}`}>
            <input style={{width: '94%'}} type="text" placeholder="Enter the Instruction"  onChange={(e)=>setTextValues(e.target.value)}/>
            {options > 0
                ? Array.from({length: options}, (_, index) => (
                    <div key={index} className="option-field">

                        <input
                            type="text"
                            style={{width: '94%'}}
                            value={optionValues[index]}
                            onChange={(e) => handleChange(index, e.target.value)}
                            placeholder={`Enter option ${index + 1}`}
                        />

                    </div>
                ))
                : "No options available"}
            <button className="add-question-options-div-left-button" onClick={addedQuestion}>Add</button>
        </div>
    );
};

export default OptionsQuestion;
