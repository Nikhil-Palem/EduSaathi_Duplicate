import React, {useContext, useState} from 'react';
import {DndContext, closestCorners} from '@dnd-kit/core';
import Droppable from "./components/Droppable.js";
import {arrayMove} from "@dnd-kit/sortable";
import AddQuestion from "./components/AddQuestion.js";
import './PersonalQuestions.css'
import AddQuestionContext from "../../../context/AddQuestionContext.js";

function ExtraCurricular({add}) {
    const { addingQuestions} = useContext(AddQuestionContext);
    if (addingQuestions === 0) {
        add = null
    }

    const [field, setField] = useState([]);

    const addField = (name, types)=>{
        setField((field)=>
            [...field, {id: field.length+1, name, types}])
    }

    function handleDragEnd(event) {
        const {active, over} = event;

        if (active.id !== over.id) {
            setField((filed) => {
                const oldIndex =  field.findIndex(field => field.id === active.id);
                const newIndex = field.findIndex(field => field.id === over.id);

                return arrayMove(filed, oldIndex, newIndex);
            });
        }
    }

    return (
        <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
            {field.length===0 && <>
                <h1 style={{color: 'black'} }>Your application doesn't have any extra curricular question</h1>
            </>}
            <div className={`${add ===1? 'add-question': 'add-question-not'}`}>

                <AddQuestion onSubmit={addField}/>
            </div>

            <Droppable field={field}/>
        </DndContext>
    );
}

export default ExtraCurricular;