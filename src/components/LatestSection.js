import React from 'react';
import './LatestSection.css';
import latestImage from './Assets/uni-image/hi.jpeg'; // Replace with the path to your latest article image

const LatestSection = () => {
  return (
    <div className="latest-section" id='discover'>
      <div className="latest-container">
        <h2>Latest</h2>
        <p className="subtitle">Read the latest articles</p>
        <img src={latestImage} alt="Latest Article" className="latest-image" />
        <h3>Latest Article's title will be here</h3>
        <p className="description">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam rerum illo perspiciatis debitis unde eaque, velit facilis asperiores quo quae eius necessitatibus nobis dignissimos voluptates quidem cupiditate, a, fugiat assumenda nisi repellat maxime non quisquam nulla. Earum voluptatibus cumque, soluta, possimus neque quidem similique necessitatibus ipsa libero veritatis voluptate optio?
        </p>
      </div>
      <div className="vertical-line"></div> {/* Add vertical line */}
      <div className="discover-container">
        <h2>Discover</h2>
        <p className="subtitle">Find out more</p>
        <div className="discover-grid">
          <div className="discover-item">
            <img src="https://img.freepik.com/premium-photo/library-with-many-books-shelves-knowledge-education-learning-concept-generative-ai_159242-23146.jpg" alt="Article 1" />
            <p>Article 1. Will be here.</p>
          </div>
          <div className="discover-item">
            <img src="https://img.freepik.com/premium-photo/library-with-many-books-shelves-knowledge-education-learning-concept-generative-ai_159242-23146.jpg" alt="Article 2" />
            <p>Article 2 will be here</p>
          </div>
          <div className="discover-item">
            <img src="https://img.freepik.com/premium-photo/library-with-many-books-shelves-knowledge-education-learning-concept-generative-ai_159242-23146.jpg" alt="Article 3" />
            <p>Article 3. Will be here.</p>
          </div>
          <div className="discover-item">
            <img src="https://img.freepik.com/premium-photo/library-with-many-books-shelves-knowledge-education-learning-concept-generative-ai_159242-23146.jpg" alt="Article 4" />
            <p>Article 4. Will be here.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestSection;
