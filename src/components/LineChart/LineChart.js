import React from 'react';
import { Chart } from 'chart.js';
import { Line } from 'react-chartjs-2';
import annotationPlugin from 'chartjs-plugin-annotation';
import styles from './styles.module.css';

Chart.register(annotationPlugin);


export const LineChart = ({
  data,
  annotation,
  label,
}) => {
  let defaultOptions = {
    animation: false,
    responsive: true,
    layout: {
      padding: {
        top: 20,
      },
    },
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
      annotation: {
        annotations: {
          todayLine: {
            type: 'line',
            xMin: annotation/10,
            xMax: annotation/10,
            borderColor: 'rgb(255,255,255)',
            borderDash: [4,4],
            label: {
              enabled: true,
              font: {
                family: 'Heebo',
                style: 'normal',
                size: 14,
              },
              backgroundColor: 'rgba(255,255,255,0.0)',
              color: '#fff',
              content: label,
              position: 'start',
              cornerRadius: 0,
              xPadding: 0,
              yPadding: 0,
              yAdjust: -20,
            },
          },
        },
      },
    },
  };

  return (
    <div className={ styles.lineChartWrapper }>
      <Line data={data} options={defaultOptions} />
    </div>
  );
}
