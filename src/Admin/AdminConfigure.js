import React, {useState} from 'react';
import './AdminConfigure.css';
import './index.css'
import AdminSidebar from './AdminSidebar.js';
import Navbar from "./configureComponents/Navbar.js";
import Questions from "./configureComponents/Questions.js";
import {Route, Routes} from "react-router-dom";
import Deadline from "./deadlineComponents/Deadline.js";
import Fee from "./feeComponents/Fee.js";
import CollegeInfo from "./collegeInfoComponents/CollegeInfo.js";
import Submit from "./Submission/Submit.js";
const AdminCustomFormBuilder = () => {
    ///////////////////////////////////////////////////////////////////////////////////////////////
    const [count, setCount] = useState(0);

    const handlePress = () => {
        setCount(prevCount => prevCount + 1);
    };

    return (

        <div className="all-section-color">
            <section>
                <div className="sidebar-admin-profile">
                    <AdminSidebar/>
                </div>
                <div className="admin-custom-form-builder">

                    <Navbar/>
                    <Routes>
                        <Route path="questions" element={<Questions count={count} press={handlePress}/>}/>
                        <Route path="deadlines" element={<Deadline/>}/>
                        <Route path="fees" element={<Fee/>}/>
                        <Route path="college-info" element={<CollegeInfo/>}/>
                        <Route path="submit" element={<Submit/>}/>
                    </Routes>


                    {/*<div className="content-admin">*/}
                    {/*<h2>Customize Your Application Form</h2>*/}
                    {/*<p>Drag and drop the sections below to rearrange the form. You can also add your own custom questions.</p>*/}

                    {/*/!* Drag-and-drop section *!/*/}
                    {/*<DragDropContext onDragEnd={onDragEnd}>*/}
                    {/*  <Droppable droppableId="sections">*/}
                    {/*    {(provided) => (*/}
                    {/*        <div*/}
                    {/*            className="section-list"*/}
                    {/*            {...provided.droppableProps}*/}
                    {/*            ref={provided.innerRef}*/}
                    {/*        >*/}
                    {/*          {sections.map((section, index) => (*/}
                    {/*              <Draggable key={section.id} draggableId={section.id} index={index}>*/}
                    {/*                {(provided) => (*/}
                    {/*                    <div*/}
                    {/*                        className="section-item"*/}
                    {/*                        {...provided.draggableProps}*/}
                    {/*                        {...provided.dragHandleProps}*/}
                    {/*                        ref={provided.innerRef}*/}
                    {/*                    >*/}
                    {/*                      {section.title}*/}
                    {/*                    </div>*/}
                    {/*                )}*/}
                    {/*              </Draggable>*/}
                    {/*          ))}*/}
                    {/*          {provided.placeholder}*/}
                    {/*        </div>*/}
                    {/*    )}*/}
                    {/*  </Droppable>*/}
                    {/*</DragDropContext>*/}

                    {/*/!* Custom questions section *!/*/}
                    {/*<div className="custom-questions">*/}
                    {/*  <h3>Custom Questions</h3>*/}
                    {/*  <input*/}
                    {/*      type="text"*/}
                    {/*      placeholder="Add your own question"*/}
                    {/*      value={newQuestion}*/}
                    {/*      onChange={(e) => setNewQuestion(e.target.value)}*/}
                    {/*  />*/}
                    {/*  <button onClick={handleAddCustomQuestion}>Add Question</button>*/}

                    {/*  <ul>*/}
                    {/*    {customQuestions.map((question, index) => (*/}
                    {/*        <li key={index}>*/}
                    {/*          {question}*/}
                    {/*          <button onClick={() => removeCustomQuestion(index)}>Remove</button>*/}
                    {/*        </li>*/}
                    {/*    ))}*/}
                    {/*  </ul>*/}
                    {/*</div>*/}

                    {/*/!* Save button *!/*/}
                    {/*<button className="save-btn">Save Form</button>*/}
                    {/*</div>*/}
                </div>
            </section>
        </div>

    );
};

export default AdminCustomFormBuilder;
