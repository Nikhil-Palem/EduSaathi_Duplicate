import React, { useContext } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import '../PersonalQuestions.css';
import AddQuestionContext from "../../../../context/AddQuestionContext.js";
import DeleteIcon from '@mui/icons-material/Delete';

function Draggable(props) {
    const { optionQuestion } = useContext(AddQuestionContext);
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: props.id });

    // Ensure transform and transition are valid
    const style = {
        transition: transition || "none",
        transform: transform ? CSS.Transform.toString(transform) : undefined,
    };

    return (
        <div className="draggable">
            <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
                <div>
                    {/* Render the field name */}
                    <label>{props.field.name}</label>

                    {/* Input Field */}
                    <input
                        type={props.field.types}
                        className={`draggable-input ${props.field.types === 'option' ? 'hidden' : ''}`}
                    />

                    {/* Dropdown for Social Category */}
                    {props.field.types === 'option' && props.field.id === 5 && (
                        <div className="draggable-input">
                            <select id="social-category" className="social-category" name="socialCategory">
                                <option value="general">General</option>
                                <option value="obc">OBC (Other Backward Class)</option>
                                <option value="sc">SC (Scheduled Caste)</option>
                                <option value="st">ST (Scheduled Tribe)</option>
                                <option value="ews">EWS (Economically Weaker Section)</option>
                            </select>
                        </div>
                    )}
                    {props.field.types === 'option' && props.field.id === "edu" && (
                        <div className="draggable-input">
                            <select id="social-category" className="social-category" name="socialCategory">
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                            </select>
                        </div>
                    )}

                    {/* Dropdown for custom options */}
                    {props.field.types === 'option' && props.field.id > 5 && (
                        <div className="draggable-input">
                            <select className="social-category">
                                {optionQuestion.map((option, i) => (
                                    <option key={i} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>
            </div>

             {/*Delete Button*/}
            <button
                // disabled={props.field.id <= 5}
                style={{display: props.field.id <= 5 ? 'none' : 'block' && props.field.id === "edu"? 'none' : 'block'}}
                onClick={() => props.onDelete(props.id)}
                className="delete-button"
                title='Delete Question'
            >
                <DeleteIcon />
            </button>
        </div>
    );
}

export default Draggable;