import React, { useEffect, useState, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
import Chart from 'chart.js/auto';

function InternetSpeedChart() {
  const navigate = useNavigate();
  const [speedData, setSpeedData] = useState([]);
  const [timeLabels, setTimeLabels] = useState([]);
  const maxPoints = 6; // Limit the chart to the last 10 points
  const intervalRef = useRef(null);

  useEffect(() => {
    function measureSpeed() {
      const startTime = Date.now();
      const image = new Image();

      // Use a random query parameter to bypass cache
      const imageUrl = `https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png?cachebust=${Math.random()}`;

      image.onload = () => {
        const endTime = Date.now();
        const duration = (endTime - startTime) / 1000; // Time in seconds
        const imageSize = 14 * 1024; // Approx size of Google logo in bytes
        const speedMbps = ((imageSize * 8) / duration) / (1024 * 1024); // Mbps

        // Update chart data and labels
        setSpeedData((prev) => {
          const updated = [...prev, speedMbps];
          return updated.length > maxPoints ? updated.slice(1) : updated;
        });

        setTimeLabels((prev) => {
          const updated = [...prev, new Date().toLocaleTimeString()];
          return updated.length > maxPoints ? updated.slice(1) : updated;
        });
      };

      image.src = imageUrl;
    }

    // Start measuring speed every 1 seconds
    intervalRef.current = setInterval(measureSpeed, 1000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const chartData = {
    labels: timeLabels,
    datasets: [
      {
        label: 'Internet Speed (Mbps)',
        data: speedData,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2,
        tension: 0.4, // Smooth lines
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allows the chart to expand fully within its container
    plugins: {
      legend: { position: 'top' },
    },
    scales: {
      x: {
        title: { display: true, text: 'Time' },
        grid: { display: false },
      },
      y: {
        title: { display: true, text: 'Speed (Mbps)' },
        min: 0,
      },
    },
  };

  return (
    <div style={{ textAlign: 'center', margin: '50px auto', width: '90%' }}>
      <h2>Live Internet Speed</h2>
      <div
        style={{
          height: '400px', // Increased chart height
          width: '600px',
          margin: '0 auto',
        }}
      >
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}

export default InternetSpeedChart;
