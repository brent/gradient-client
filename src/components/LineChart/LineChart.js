import React from 'react';
import { Chart } from 'chart.js';
import { Line } from 'react-chartjs-2';
import annotationPlugin from 'chartjs-plugin-annotation';
import styles from './styles.module.css';

Chart.register(annotationPlugin);

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
          xMin: 0,
          xMax: 0,
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
            content: `TODAY vs AVERAGE`,
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

export const LineChart = ({ data, annotation, options = defaultOptions }) => {
  console.log('annotationn', annotation);
  options.plugins.annotation.annotations.todayLine.xMin = annotation/10;
  options.plugins.annotation.annotations.todayLine.xMax = annotation/10;
  console.log('options', options);

  return (
    <div className={ styles.lineChartWrapper }>
      <Line data={data} options={options} />
    </div>
  );
}
