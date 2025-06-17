import React, { useContext, useState, useEffect, useCallback } from 'react';
import { DndContext, closestCorners } from '@dnd-kit/core';
import Droppable from "./components/Droppable.js";
import { arrayMove } from "@dnd-kit/sortable";
import AddQuestion from "./components/AddQuestion.js";
import './PersonalQuestions.css';
import AddQuestionContext from "../../../context/AddQuestionContext.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ToastStyles.css"; // Custom styles

function PersonalQuestions({ add }) {
    const { addingQuestions, setValue1 } = useContext(AddQuestionContext);

    // Initialize field state with localStorage or default values
    const [field, setField] = useState(() => {
        const savedFields = localStorage.getItem("personalQuestions");
        return savedFields
            ? JSON.parse(savedFields)
            : [
                { id: 1, name: "Legal/Given Name", types: 'text' },
                { id: 2, name: "Middle Name", types: 'text' },
                { id: 3, name: "Last Name/Surname", types: 'text' },
                { id: 4, name: "Date of Birth", types: 'date' },
                { id: 5, name: "Social Category", types: 'option' },
            ];
    });

    // Save field state to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("personalQuestions", JSON.stringify(field));
    }, [field]);

    // Add a new field
    const addField = (name, types) => {
        setField((prevFields) => [
            ...prevFields,
            { id: prevFields.length + 1, name, types },
        ]);
    };

    // Delete a field
    const deleteField = (id) => {
        setField((prevFields) => prevFields.filter((field) => field.id !== id));
    };

    // Handle drag-and-drop events
    const handleDragEnd = useCallback((event) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            setField((prevFields) => {
                const oldIndex = prevFields.findIndex((field) => field.id === active.id);
                const newIndex = prevFields.findIndex((field) => field.id === over.id);

                return arrayMove(prevFields, oldIndex, newIndex);
            });
        }
    }, []);

    // Save data to localStorage and context
    const saveData = () => {
        localStorage.setItem("personalQuestions", JSON.stringify(field));
        setValue1((prevValue) => ({
            ...prevValue,
            personalQuestions: field,
        }));

        toast.success("Personal Questions saved successfully!", {
            position: "top-right",
            autoClose: 5000,
            closeOnClick: true,
            pauseOnHover: true,
            pauseOnFocusLoss: false,
        });
    };

    return (
        <div className="personal-questions-container">
            <DndContext
                onDragEnd={handleDragEnd}
                collisionDetection={closestCorners}
            >
                {/* Conditionally render the AddQuestion component */}
                {add === 1 && (
                    <div className="add-question">
                        <AddQuestion onSubmit={addField} />
                    </div>
                )}

                {/* Render the Droppable component */}
                <Droppable
                    field={field}
                    onDelete={deleteField}
                />

                {/* Save button */}
                <button onClick={saveData} className="save-button">Save</button>
            </DndContext>

            {/* Toast container for notifications */}
            <ToastContainer />
        </div>
    );
}

export default PersonalQuestions;