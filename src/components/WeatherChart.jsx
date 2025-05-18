// src/components/WeatherChart.jsx

import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
} from 'chart.js';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Legend, Tooltip);

const WeatherChart = ({ data }) => {
  if (!data) return null;

  const chartData = {
    labels: data.time,
    datasets: [
      {
        label: 'Max Temp (°C)',
        data: data.temperature_2m_max,
        borderColor: 'red',
        backgroundColor: 'rgba(255, 0, 0, 0.3)',
        tension: 0.4,
      },
      {
        label: 'Min Temp (°C)',
        data: data.temperature_2m_min,
        borderColor: 'blue',
        backgroundColor: 'rgba(0, 0, 255, 0.3)',
        tension: 0.4,
      },
      {
        label: 'Mean Temp (°C)',
        data: data.temperature_2m_mean,
        borderColor: 'green',
        backgroundColor: 'rgba(0, 255, 0, 0.3)',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: { mode: 'index', intersect: false },
    },
    scales: {
      x: { display: true, title: { display: true, text: 'Date' } },
      y: { display: true, title: { display: true, text: 'Temperature (°C)' } },
    },
  };

  return (
    <div className="my-6">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default WeatherChart;
