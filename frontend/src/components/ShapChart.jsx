import React from 'react';
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ShapChart = ({ shapData, dark = true }) => {
  const sortedFeatures = Object.entries(shapData || {})
    .sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]))
    .slice(0, 5);

  const labels = sortedFeatures.map(([feat]) => feat.replace('_', ' '));
  const dataValues = sortedFeatures.map(([, val]) => val);
  
  const colors = dataValues.map((v) => v >= 0 ? '#3b82f6' : '#ef4444');

  const data = {
    labels,
    datasets: [{
      data: dataValues,
      backgroundColor: colors,
      borderRadius: 8,
      barThickness: 16
    }],
  };

  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#0f172a',
        padding: 12,
        bodyFont: { weight: 'bold' },
        titleFont: { weight: 'black' }
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(255,255,255,0.05)' },
        ticks: { color: '#475569', font: { weight: 'bold', size: 10 } }
      },
      y: {
        grid: { display: false },
        ticks: { color: '#f8fafc', font: { weight: 'black', size: 10 } }
      }
    }
  };

  return <Bar data={data} options={options} />;
};

export default ShapChart;
