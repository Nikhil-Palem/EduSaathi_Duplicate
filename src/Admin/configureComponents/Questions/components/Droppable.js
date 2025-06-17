import React from 'react';
import '../PersonalQuestions.css';
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import Draggable from "./Draggable.js";

function Droppable(props) {
    console.log("droppable", props.field);
    return (
        <div className="droppable">
            <SortableContext items={props.field} strategy={verticalListSortingStrategy}>
                {props.field.map((field) => (
                    <Draggable
                        key={field.id} // Use field.id as the key
                        id={field.id}
                        field={field} // Pass the individual field object
                        types={field.types}
                        onDelete={props.onDelete}
                    />
                ))}
            </SortableContext>
        </div>
    );
}

export default Droppable;