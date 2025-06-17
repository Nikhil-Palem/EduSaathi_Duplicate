import React, { useState } from 'react';

import './ExtraCirculars.css';
import Footer from './footer-dashboard.js';
function ExtraCirculars() {
  const [option, setOption] = useState("");
  const [Selected, setSelected] = useState(1);
  const handleOption = (e) => {
    setOption(e.target.value); // Correctly updating the state with the selected value
  };
  const handleSelect = (e) => {
    setSelected(parseInt(e.target.value));
  }

  console.log(option); // This will correctly log "yes" or "no"

  return (
    <div className="extra-container">
      <div className="student-dashboard">

        <div className="extra-circular-div">
          <label htmlFor="yesorno">
            Do you wish to enter extracurricular activities <span style={{ color: "red" }}>*</span>
          </label>
          <div className="yesnodiv">
            <label>
              <input type="radio" name="yesorno" value="yes" onChange={handleOption} /> Yes
            </label>
            <label>
              <input type="radio" name="yesorno" value="no" onChange={handleOption} /> No
            </label>
          </div>
          {
            option === "yes" && (
              <div className='showActivities_feilds'>
                <label htmlFor="no_of_activities">How many activities you wish to include in your application<span style={{ color: "red" }}>*</span></label>
                <select name="no_of_activities" id="" onChange={handleSelect}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
                {[...Array(Selected)].map((_, index) => (
                  <div key={index} className="additional-exam">
                    <label htmlFor={`search-exam-input-${index}`}>Extra Circular {index + 1} Type<span style={{ color: "red" }}>*</span>
                      (Eg: Golf) </label>

                    <input type="text" name={`search-exam-input-${index}`} id={`search-exam-input-${index}`} />

                    <label htmlFor={`search-exam-input-${index}`}>Position Description <span style={{ color: "red" }}>*</span>
                      (Eg: Team Captain)</label>
                    <input type="text" name={`search-exam-input-${index}`} id={`search-exam-input-${index}`} />

                    <label htmlFor={`search-exam-input-${index}`}>Organization/School Name <span style={{ color: "red" }}>*</span> </label>
                    <input type="text" name={`search-exam-input-${index}`} id={`search-exam-input-${index}`} />

                    <label htmlFor={`search-exam-input-${index}`}>Please describe what you learned or achieved <span style={{ color: "red" }}>*</span> </label>
                    <textarea name="description" id=""></textarea>
                  </div>
                ))}
              </div>
            )
          }
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ExtraCirculars;
