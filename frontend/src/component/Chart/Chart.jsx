import React from 'react';
import {
      Chart as ChartJS,
      CategoryScale,
      LinearScale,
      BarElement,
      Title,
      Tooltip,
      Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const chartHeight = 350;
const chartWidth = 650;
const chartOptions = {
      plugins: {
            legend: {
                  position: 'top',
                  display: false,
            },
            title: {
                  display: false,
                  text: 'Chart.js Bar Chart',
            },
      },

      maintainAspectRatio: false,
      responsive: false,
};

const barData = {
      labels: ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100'],
      datasets: [
            {
                  label: 'Number people',
                  backgroundColor: [
                        'rgba(255,99,132,0.4)',
                        'rgba(204,229,253,0.4)',
                        'rgba(255, 222, 4, 0.17)',
                        'rgba(156, 255, 214, 0.32)',
                        'rgba(140, 122, 239, 0.21)',
                        'rgba(255, 222, 4, 0.17)',
                        'rgba(255,99,132,0.4)',
                        'rgba(56, 150, 238, 0.17)',
                        'rgba(255, 222, 4, 0.17)',
                        'rgba(89, 89, 89, 0.17)',
                  ],
                  borderColor: [
                        '#ffa4b4',
                        '#96d7f4',
                        '#f6c863',
                        '#6eb2bb',
                        '#9c7def',
                        '#fdcf6a',
                        '#ffa4b4',
                        '#96d7f4',
                        '#fdcf6a',
                        '#b5b7bf',
                  ],
                  borderWidth: 2,
                  hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                  hoverBorderColor: 'rgba(255,99,132,1)',
                  data: [65, 59, 80, 81, 56, 55, 40, 56, 55, 40],
                  borderSkipped: 'bottom',
            },
      ],
};

export function Chart() {
      return (
            <>
                  <Bar
                        data={barData}
                        height={chartHeight}
                        width={chartWidth}
                        options={chartOptions}
                  />
            </>
      );
}
