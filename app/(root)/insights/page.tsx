
"use client"
// pages/financial-dashboard.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const FinancialDashboard = () => {
  // Dummy historical and predicted spending data
  const historicalData = [500, 700, 600, 900, 850, 1000];
  const futurePredictions = [1050, 1100, 1150, 1200, 1250, 1300];

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Historical Spending ($)',
        data: [...historicalData],
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
      },
      {
        label: 'Predicted Spending ($)',
        data: [...historicalData, ...futurePredictions],
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
        borderDash: [5, 5], // Dashed line for predictions
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const label = tooltipItem.dataset.label || '';
            const value = tooltipItem.raw;
            return `${label}: $${value}`;
          },
        },
      },
    },
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Financial Dashboard</h1>
      <p>Based on your spending, the AI predicts that your expenses will follow this trend:</p>
      <div style={{ width: '80%', margin: 'auto' }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default FinancialDashboard;
