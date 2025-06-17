import React, { useEffect, useRef } from 'react';
import { Chart } from 'react-google-charts';
import './AdminDashboardMap.css';

const data = [
  ['State Code', 'State', 'Applications Received', { role: 'tooltip', p: { html: true } }],
  ['IN-UP', 'Uttar Pradesh', 450, '<div >Applications: 450<br/>Score Range: 65-92</div>'],
  ['IN-MH', 'Maharashtra', 320, '<div >Applications: 320<br/>Score Range: 70-95</div>'],
  ['IN-BR', 'Bihar', 210, '<div >Applications: 210<br/>Score Range: 60-88</div>'],
  ['IN-WB', 'West Bengal', 260, '<div >Applications: 260<br/>Score Range: 68-90</div>'],
  ['IN-MP', 'Madhya Pradesh', 300, '<div >Applications: 300<br/>Score Range: 62-89</div>'],
  ['IN-TN', 'Tamil Nadu', 380, '<div >Applications: 380<br/>Score Range: 72-94</div>'],
  ['IN-RJ', 'Rajasthan', 330, '<div>Applications: 330<br/>Score Range: 65-91</div>'],
  ['IN-KA', 'Karnataka', 390, '<div >Applications: 390<br/>Score Range: 75-96</div>'],
  ['IN-GJ', 'Gujarat', 404, '<div >Applications: 404<br/>Score Range: 70-93</div>'],
  ['IN-AP', 'Andhra Pradesh', 220, '<div >Applications: 220<br/>Score Range: 68-92</div>'],
  ['IN-OR', 'Odisha', 133, '<div >Applications: 133<br/>Score Range: 60-85</div>'],
  ['IN-TG', 'Telangana', 233, '<div >Applications: 233<br/>Score Range: 70-94</div>'],
  ['IN-KL', 'Kerala', 311, '<div >Applications: 311<br/>Score Range: 75-95</div>'],
  ['IN-JH', 'Jharkhand', 290, '<div >Applications: 290<br/>Score Range: 62-88</div>'],
  ['IN-AS', 'Assam', 180, '<div >Applications: 180<br/>Score Range: 65-89</div>'],
  ['IN-PB', 'Punjab', 300, '<div >Applications: 300<br/>Score Range: 68-92</div>'],
  ['IN-CT', 'Chhattisgarh', 230, '<div >Applications: 230<br/>Score Range: 63-87</div>'],
  ['IN-HR', 'Haryana', 300, '<div >Applications: 300<br/>Score Range: 70-93</div>'],
  ['IN-JK', 'Jammu and Kashmir', 200, '<div >Applications: 200<br/>Score Range: 65-90</div>'],
  ['IN-UT', 'Uttarakhand', 208, '<div >Applications: 208<br/>Score Range: 67-91</div>'],
  ['IN-HP', 'Himachal Pradesh', 107, '<div >Applications: 107<br/>Score Range: 65-88</div>'],
  ['IN-TR', 'Tripura', 120, '<div >Applications: 120<br/>Score Range: 62-86</div>'],
  ['IN-ML', 'Meghalaya', 210, '<div >Applications: 210<br/>Score Range: 63-87</div>'],
  ['IN-MN', 'Manipur', 220, '<div >Applications: 220<br/>Score Range: 64-88</div>'],
  ['IN-NL', 'Nagaland', 201, '<div >Applications: 201<br/>Score Range: 62-86</div>'],
  ['IN-GA', 'Goa', 121, '<div >Applications: 121<br/>Score Range: 70-92</div>'],
  ['IN-AR', 'Arunachal Pradesh', 143, '<div >Applications: 143<br/>Score Range: 61-85</div>'],
  ['IN-MZ', 'Mizoram', 123, '<div >Applications: 123<br/>Score Range: 63-87</div>'],
  ['IN-SK', 'Sikkim', 104, '<div >Applications: 104<br/>Score Range: 62-86</div>'],
  ['IN-DL', 'Delhi', 331, '<div >Applications: 331<br/>Score Range: 75-96</div>'],
  ['IN-PY', 'Puducherry', 133, '<div >Applications: 133<br/>Score Range: 68-90</div>'],
  ['IN-CH', 'Chandigarh', 120, '<div >Applications: 120<br/>Score Range: 72-94</div>'],
  ['IN-AN', 'Andaman and Nicobar Islands', 110, '<div >Applications: 110<br/>Score Range: 65-88</div>'],
  ['IN-DN', 'Dadra and Nagar Haveli', 80, '<div >Applications: 80<br/>Score Range: 63-86</div>'],
  ['IN-DD', 'Daman and Diu', 75, '<div >Applications: 75<br/>Score Range: 64-87</div>'],
  ['IN-LD', 'Lakshadweep', 50, '<div >Applications: 50<br/>Score Range: 62-85</div>']
];

const options = {
  region: 'IN',
  displayMode: 'regions',
  resolution: 'provinces',
  colorAxis: {
    colors: ['#e0f3db', '#a8ddb5', '#43a2ca']
  },
  backgroundColor: 'transparent',
  datalessRegionColor: '#f5f5f5',
  tooltip: { 
    isHtml: true
  },
  sizeAxis: { minSize: 12, maxSize: 40 },
  magnifyingGlass: { enable: true, zoomFactor: 7.5 },
  chartArea: {
    left: 0,
    top: 10,
    width: '100%',
    height: '100%'
  }
};

const AdminDashboardMap = () => {
  const chartRef = useRef(null);

  return (
    <div className="india-map-container" ref={chartRef}>
      <h2 className="map-title">Applications Received Across States</h2>
      <Chart
        chartType="GeoChart"
        width="100%"
        height="600px"
        data={data}
        options={options}
      />
    </div>
  );
};

export default AdminDashboardMap;