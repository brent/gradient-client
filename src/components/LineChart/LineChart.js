import React from 'react';
import { Line } from 'react-chartjs-2';


const defaultOptions = {
  scales: {
    y: {
      grid: {
        display: false,
        drawBorder: false,
      },
      ticks: {
        display: false,
      },
      beginAtZero: true,
    },
    x: {
      grid: {
        display: false,
        drawBorder: false,
      },
      ticks: {
        display: false,
        color: 'rgb(255,255,255)',
      },
    },
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};
export const LineChart = ({ data, options = defaultOptions }) => {
  return (
    <div className='lineChartWrapper'>
      <Line data={data} options={options} />
    </div>
  );
}
