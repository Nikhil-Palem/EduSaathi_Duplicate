import React from 'react';
import './VideoSection.css';

const VideoSection = () => {
  return (
    <div className="video-section">
      <div className="video-content">
        <h1>
          <span className="highlight">H</span>ow to apply to Universities Using Edu Saathi
        </h1>
        <p>
          Follow few simple steps :
          Just create an account
          Fill out your personal details 
          Add colleges from college list
          And just click SUBMIT
        </p>
      </div>
      <div className="video-wrapper">
        <iframe
          src="https://www.youtube.com/watch?v=Ba4PiwIi6Mk"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default VideoSection;