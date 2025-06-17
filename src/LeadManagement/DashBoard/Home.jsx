import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import './Home.css';
import annotationPlugin from 'chartjs-plugin-annotation';
Chart.register(annotationPlugin);

const Home = () => {
  const lineChartRef = useRef(null);

  const funnelData = [
    { label: 'Enquiries', value: 100, percentage: '100%', color: 'rgba(74, 144, 226, 0.9)' },
    { label: 'Verification', value: 75, percentage: '75%', color: 'rgba(74, 144, 226, 0.8)' },
    { label: 'Application Submitted', value: 50, percentage: '50%', color: 'rgba(74, 144, 226, 0.7)' },
    { label: 'Application in Progress', value: 30, percentage: '30%', color: 'rgba(74, 144, 226, 0.6)' },
    { label: 'Exam Booked', value: 15, percentage: '15%', color: 'rgba(74, 144, 226, 0.5)' }
  ];

  useEffect(() => {
    const lineChartCtx = lineChartRef.current.getContext('2d');

    // Create gradient for Enquiries
    const enquiriesGradient = lineChartCtx.createLinearGradient(0, 0, 0, 400);
    enquiriesGradient.addColorStop(0, 'rgba(74, 144, 226, 0.6)');
    enquiriesGradient.addColorStop(1, 'rgba(74, 144, 226, 0)');

    // Create gradient for Applications  
    const applicationsGradient = lineChartCtx.createLinearGradient(0, 0, 0, 400);
    applicationsGradient.addColorStop(0, 'rgba(226, 92, 74, 0.6)');
    applicationsGradient.addColorStop(1, 'rgba(226, 92, 74, 0)');

    if (lineChartRef.current.chart) {
      lineChartRef.current.chart.destroy();
    }

    // Create annotation for forecast transition point
    const forecastLine = {
      type: 'line',
      mode: 'vertical',
      scaleID: 'x',
      value: '2024',
      borderColor: 'rgba(0, 0, 0, 0.2)',
      borderWidth: 2,
      borderDash: [6, 6],
      label: {
        enabled: true,
        content: 'Forecast Start',
        position: 'start',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        font: {
          size: 11
        }
      }
    };

    lineChartRef.current.chart = new Chart(lineChartCtx, {
      type: 'line',
      data: {
        labels: ['2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028'],
        datasets: [
          {
            label: 'Enquiries',
            data: [120, 150, 180, 210, 240, 270, 300, 330, 360],
            borderColor: '#4a90e2',
            backgroundColor: enquiriesGradient, // Using gradient
            tension: 0.4,
            fill: true,
            pointRadius: (ctx) => ctx.parsed.x < 4 ? 4 : 3,
            pointBackgroundColor: (ctx) => ctx.parsed.x < 4 ? '#4a90e2' : 'rgba(74, 144, 226, 0.7)',
            pointBorderColor: (ctx) => ctx.parsed.x < 4 ? '#fff' : 'rgba(255, 255, 255, 0.7)',
            pointBorderWidth: 2,
            segment: {
              borderDash: ctx => ctx.p0.parsed.x >= 4 ? [6, 6] : undefined,
            }
          },
          {
            label: 'Applications',
            data: [80, 100, 120, 150, 180, 200, 220, 240, 260],
            borderColor: '#e25c4a',
            backgroundColor: applicationsGradient, // Using gradient
            tension: 0.4,
            fill: true,
            pointRadius: (ctx) => ctx.parsed.x < 4 ? 4 : 3,
            pointBackgroundColor: (ctx) => ctx.parsed.x < 4 ? '#e25c4a' : 'rgba(226, 92, 74, 0.7)',
            pointBorderColor: (ctx) => ctx.parsed.x < 4 ? '#fff' : 'rgba(255, 255, 255, 0.7)',
            pointBorderWidth: 2,
            segment: {
              borderDash: ctx => ctx.p0.parsed.x >= 4 ? [6, 6] : undefined,
            }
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animations: {
          tension: {
            duration: 1000,
            easing: 'linear',
            from: 0,
            to: 0.4,
            loop: false
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Year'
            },
            grid: {
              color: (ctx) => ctx.index === 4 ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.1)'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Number'
            },
            beginAtZero: true
          }
        },
        plugins: {
          tooltip: {
            mode: 'index',
            intersect: false,
            callbacks: {
              title: function (context) {
                const year = context[0].label;
                return year > 2024 ? `${year} (Forecast)` : year;
              }
            }
          },
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Enquiries & Applications Trend'
          },
          annotation: {
            annotations: {
              forecastLine
            }
          }
        }
      }
    });
  }, []);

  return (
    <div className="lead-management-page">

      <main className="dashboard-content">
        <div className="data-boxes">
          <div className="data-box">
            <h3>Enquiries</h3>
            <div className="data-content">
              <span className="data-number">14,781</span>
              <p className="data-description">Total enquiries received</p>
            </div>
          </div>

          <div className="data-box">
            <h3>Successful Payments</h3>
            <div className="data-content">
              <span className="data-number">1,381</span>
              <p className="data-description">Payments processed successfully</p>
            </div>
          </div>

          <div className="data-box">
            <h3>Awaiting Payment</h3>
            <div className="data-content">
              <span className="data-number">3,301</span>
              <p className="data-description">Pending payment confirmations</p>
            </div>
          </div>

          <div className="data-box">
            <h3>Application in Progress</h3>
            <div className="data-content">
              <span className="data-number">9,937</span>
              <p className="data-description">Applications currently in review</p>
            </div>
          </div>
        </div>

        <div className="chart-container">
          {/* Line Chart */}
          <div className="chart-box">
            <canvas ref={lineChartRef}></canvas>
          </div>

          {/* Funnel Chart */}
          <div className="chart-box funnel-chart-box">
            <h3 className="funnel-title">Enrollment Funnel</h3>
            <div className="funnel-chart">
              {funnelData.map((item, index) => (
                <div
                  key={index}
                  className="funnel-segment animated-funnel"
                  style={{
                    width: `${item.value}%`,
                    backgroundColor: "#000000",
                    animationDelay: `${index * 0.15}s`,
                  }}
                >
                  <div className="funnel-label">
                    <span className="funnel-text">{item.label}</span>
                    <span className="funnel-percent">{item.percentage}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

    </div>
  );
};

export default Home;