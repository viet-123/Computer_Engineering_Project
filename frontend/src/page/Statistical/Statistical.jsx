import React from 'react';
import { Chart } from '../../component/Chart/Chart';
import Information from '../../component/Information/Information';
import Select from 'react-select';

export default function Statistical() {
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

            maintainAspectRatio: true,
            aspecRatio: 2,
            responsive: true,
      };

      // const barData = {
      //       labels: ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100'],
      //       datasets: [
      //             {
      //                   label: 'Number people',
      //                   backgroundColor: [
      //                         'rgba(255, 99, 132, 0.2)',
      //                         'rgba(54, 162, 235, 0.2)',
      //                         'rgba(255, 206, 86, 0.2)',
      //                         'rgba(75, 192, 192, 0.2)',
      //                         'rgba(153, 102, 255, 0.2)',
      //                         'rgba(255, 159, 64, 0.2)',
      //                   ],
      //                   borderColor: [
      //                         'rgba(255,99,132,1)',
      //                         'rgba(54, 162, 235, 1)',
      //                         'rgba(255, 206, 86, 1)',
      //                         'rgba(75, 192, 192, 1)',
      //                         'rgba(153, 102, 255, 1)',
      //                         'rgba(255, 159, 64, 1)',
      //                   ],
      //                   borderWidth: 1,
      //                   hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      //                   hoverBorderColor: 'rgba(255,99,132,1)',
      //                   data: [65, 59, 80, 81, 56, 55, 40, 56, 55, 40],
      //                   borderSkipped: 'bottom',
      //             },
      //       ],
      // };

      const barData = {
            labels: ['AUG', 'JUL', 'JUN'],
            datasets: [
                  {
                        label: 'Number of arrivals',
                        backgroundColor: '#ffe000',
                        data: [10, 20, 15],
                  },
                  {
                        label: 'Number of unknow arrivals',
                        backgroundColor: '#1BD2A4',
                        data: [7, 13, 13],
                  },
                  {
                        label: 'Number of no masked arrivals',
                        backgroundColor: '#DC2425',
                        data: [7, 7, 7],
                  },
            ],
      };

      const options = [
            { value: 'day', label: 'Daily' },
            { value: 'month', label: 'Monthly' },
      ];

      return (
            <>
                  <h1 className="font-normal text-[36px] mb-[10px]">Statistical</h1>
                  <div className="rounded-xl shadow-3xl px-[40px] bg-white py-[40px] h-[90%]">
                        <Select
                              options={options}
                              className="w-80"
                              defaultValue={{ value: 'day', label: 'Daily' }}
                        />
                        <div className="">
                              <div className="grid grid-cols-3">
                                    <Information
                                          text="Total number of arrivals"
                                          number="6"
                                          className="bg-[#ffe000]"
                                    />
                                    <Information
                                          text="Total number of unknow arrivals"
                                          number="3"
                                          total="6"
                                          className="bg-[#1BD2A4]"
                                    />
                                    <Information
                                          text="Total number of no masked arrivals"
                                          number="1"
                                          total="6"
                                          className="bg-[#DC2425]"
                                    />
                              </div>
                              <div className="w-full mt-[20px]">
                                    <h4>Statistics of number of arrivals</h4>
                                    <Chart type="barChart" data={barData} options={chartOptions} />
                              </div>
                        </div>
                  </div>
            </>
      );
}
