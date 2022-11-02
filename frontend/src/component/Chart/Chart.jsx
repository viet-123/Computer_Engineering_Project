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
import { Bar, Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export function Chart(props) {
      const { type, data, height, width, options } = props;
      return (
            <>
                  {type === 'barChart' ? (
                        <Bar data={data} height={height} width={width} options={options} />
                  ) : (
                        <Line data={data} height={height} width={width} options={options} />
                  )}
            </>
      );
}
