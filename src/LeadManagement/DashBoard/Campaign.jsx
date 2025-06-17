import React from 'react';
import Lottie from 'lottie-react'; // Correct import for Lottie
import UnderConstruction from '../images/UnderConstruction.json'; // Path to your Lottie JSON file

function Campaign() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Lottie animationData={UnderConstruction} style={{ width: 300, height: 300 }} />
    </div>
  );
}

export default Campaign;