import React from 'react';
import './UniversitiesSection.css';
import usfimg from './Assets/uni-image/usf.jpg';
import gtech from './Assets/uni-image/gtech.jpg';
import vander from './Assets/uni-image/vandeerbilt.jpg'

const universities = [
  {
    name: 'University of South Florida',
    image: usfimg,
    video: 'path/to/usf-video.mp4'
  },
  {
    name: 'Georgia Tech',
    image: gtech,
    video: 'path/to/gt-video.mp4'
  },
  {
    name: 'Vanderbilt',
    image: vander,
    video: 'path/to/vanderbilt-video.mp4'
  }
];

const UniversitiesSection = () => {
  return (
    <div className="universities-section" id="universities">
      <h1>Universities</h1>
      <h2><span>You</span> might like</h2>
      <div className="universities-container">
        {universities.map((university, index) => (
          <div className="university-card" key={index}>
            <div className="media-container">
              <img src={university.image} alt={university.name} className="university-image" />
              <video src={university.video} className="university-video" muted loop />
            </div>
            <div className="university-info">
              <h3>{university.name}</h3>
            </div>
          </div>
        ))}
      </div>
      <button className="btn-more">More</button>
    </div>
  );
};

export default UniversitiesSection;
