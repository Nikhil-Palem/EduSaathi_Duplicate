import React, { useContext, useState, useEffect } from 'react';
import { DndContext, closestCorners } from '@dnd-kit/core';
import Droppable from "./components/Droppable.js";
import { arrayMove } from "@dnd-kit/sortable";
import AddQuestion from "./components/AddQuestion.js";
import './PersonalQuestions.css';
import AddQuestionContext from "../../../context/AddQuestionContext.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ToastStyles.css"; // Custom styles

function EducationQuestions({ add }) {
    const { addingQuestions, setValue2 } = useContext(AddQuestionContext);

    if (addingQuestions === 0) {
        add = null;
    }

    // Initialize `field` state with localStorage or default values
    const [field, setField] = useState(() => {
        const savedFields = localStorage.getItem("educationQuestions");
        return savedFields
            ? JSON.parse(savedFields)
            : [
                { id: 1, name: "Enter School Name", types: 'text', value: '' },
                { id: 2, name: "Enter School's Street Address", types: 'text', value: '' },
                { id: 3, name: "Enter School's City", types: 'text', value: '' },
                { id: 4, name: "Enter School's State", types: 'text', value: '' },
                { id: "edu", name: "Select the grades you attended at listed school", types: 'option', value: '' },


            ];
    });

    useEffect(() => {
        localStorage.setItem("educationQuestions", JSON.stringify(field));
    }, [field]);

    const addField = (name, types) => {
        setField((prevFields) => [
            ...prevFields,
            { id: prevFields.length + 1, name, types, value: '' },
        ]);
    };

    const deleteField = (id) => {
        console.log(id);
        setField((prevFields) => prevFields.filter((field) => field.id !== id));
    };

    const handleFieldChange = (id, key, value) => {
        setField((prevFields) =>
            prevFields.map((field) =>
                field.id === id ? { ...field, [key]: value } : field
            )
        );
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            setField((prevFields) => {
                const oldIndex = prevFields.findIndex((field) => field.id === active.id);
                const newIndex = prevFields.findIndex((field) => field.id === over.id);

                return arrayMove(prevFields, oldIndex, newIndex);
            });
        }
    };

    const saveData = () => {
        localStorage.setItem("educationQuestions", JSON.stringify(field));
        setValue2((prevValue) => ({
            ...prevValue,
            educationalQuestions: field,
        }));

        toast.success("Education Questions saved successfully!", {
            position: "top-right",
            autoClose: 5000,
            closeOnClick: true,
            pauseOnHover: true,
            pauseOnFocusLoss: false
        });
    };

    return (
        <DndContext
            onDragEnd={handleDragEnd}
            collisionDetection={closestCorners}
        >
            <div className={add === 1 ? 'add-question' : 'add-question-not'}>
                <AddQuestion onSubmit={addField} />
            </div>

            <Droppable
                field={field}
                onDelete={deleteField}
                onChange={handleFieldChange}
            />

            <button onClick={saveData} className="save-button">Save</button>

            <ToastContainer />
        </DndContext>
    );
}

export default EducationQuestions;