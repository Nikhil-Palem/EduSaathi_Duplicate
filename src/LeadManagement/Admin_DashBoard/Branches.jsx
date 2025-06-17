import React, { useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react'; // You can change this to another icon or SVG if needed
import './Branches.css'; // Assuming you have a CSS file for styling
import axios from 'axios'
import Lottie from 'lottie-react'
import loadinganim from '../images/Loading.json'
function Branches() {
  const [branchesData, setbranchesData] = useState([])
  const [Loading, setLoading] = useState(false);
  useEffect(() => {
    fetchBranches();
  }, [])

  const collegeid = localStorage.getItem("collegeId");
  const fetchBranches = async () => {
    setLoading(true);
    try {
      const resp = await axios.get(`http://localhost:8080/api/v1/lead/getBranches?collegeid=${collegeid}`)
      // console.log('resp data', resp.data)
      setbranchesData(resp.data.branchCounts);
    } catch (err) {
      console.log('err', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="branches-container">
      <div className="branches-table">
        <div className="branches-header">
          <span className="header-name">Branch Name</span>
          <span className="header-leads">Total Leads</span>
        </div>
        {!Loading ? (branchesData.map((branch, index) => (
          <div className="branches-row" key={index}>
            <div className="branch-name">{branch.branchName}</div>
            <div className="branch-leads">{branch.branchCount}</div>
            <div className="branch-arrow">
              <ChevronRight />
            </div>
          </div>
        ))) :
          <div className="loading">
            <Lottie
              animationData={loadinganim}
              className='animationloading'
            />
            <p>loading...</p>
          </div>
        }
      </div>
    </div>
  );
}

export default Branches;
