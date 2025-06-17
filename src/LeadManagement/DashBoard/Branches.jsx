import React, { useState } from 'react';
import './Branches.css';

const Branches = () => {
  // Sample branch data
  const [branchData, setBranchData] = useState([
    { name: 'Delhi Branch', totalLeads: 156 },
    { name: 'Mumbai Branch', totalLeads: 243 },
    { name: 'Bangalore Branch', totalLeads: 189 },
    { name: 'Hyderabad Branch', totalLeads: 127 },
    { name: 'Chennai Branch', totalLeads: 98 },
    { name: 'Kolkata Branch', totalLeads: 112 }
  ]);
  
  // State for sorting
  const [sortDirection, setSortDirection] = useState(null); // null, 'asc', or 'desc'
  
  // Function to handle sorting
  const handleSort = () => {
    const sorted = [...branchData];
    if (sortDirection === null || sortDirection === 'desc') {
      // Sort ascending
      sorted.sort((a, b) => a.name.localeCompare(b.name));
      setSortDirection('asc');
    } else {
      // Sort descending
      sorted.sort((a, b) => b.name.localeCompare(a.name));
      setSortDirection('desc');
    }
    setBranchData(sorted);
  };
  
  // Function to get the appropriate sort icon
  const getSortIcon = () => {
    if (sortDirection === 'asc') {
      return '↑'; // Unicode up arrow
    } else if (sortDirection === 'desc') {
      return '↓'; // Unicode down arrow
    }
    return '⇅'; // Unicode up/down arrow
  };

  return (
    <div className="branches-container">
      <div className="branches-table-container">
        <table className="branches-table">
          <thead>
            <tr>
              <th onClick={handleSort} className="sortable-header">
                Branch Name
                <span className="sort-icon">{getSortIcon()}</span>
              </th>
              <th>Total Leads</th>
              <th></th> {/* For arrow icon */}
            </tr>
          </thead>
          <tbody>
            {branchData.map((branch, index) => (
              <tr key={index}>
                <td>{branch.name}</td>
                <td>{branch.totalLeads}</td>
                <td className="arrow-cell">
                  <span className="arrow-icon">→</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Branches;