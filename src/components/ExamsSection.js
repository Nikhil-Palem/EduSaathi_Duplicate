import React from 'react';
import './ExamsSection.css';
import satLogo from './Assets/uni-image/sat.png';
import jeeLogo from './Assets/uni-image/jee.jpeg';
import bitsatLogo from './Assets/uni-image/bits.png';
import neetLogo from './Assets/uni-image/neet.jpeg';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
const exams = [
  {
    name: 'SAT',
    logo: satLogo
  },
  {
    name: 'JEE',
    logo: jeeLogo
  },
  {
    name: 'BITSAT',
    logo: bitsatLogo
  },
  {
    name: 'NEET',
    logo: neetLogo
  }
];


const ExamsSection = () => {
  return (
    <div className="exams-section" id="exams">
      <div className="exams-header">
        <h2>Exams</h2>
        <a href="#view-all" className="view-all">VIEW ALL<ArrowForwardIcon/></a>
      </div>
      <div className="exams-container">
        {exams.map((exam, index) => (
          <div className="exam-card" key={index}>
            <img src={exam.logo} alt={exam.name} className="exam-logo" />
            <p className="exam-name">{exam.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExamsSection;
