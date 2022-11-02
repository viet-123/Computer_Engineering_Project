import React, { useRef } from 'react';
import { Chart } from '../../component/Chart/Chart';
import { PeopleIcon } from '../../component/Icon/Icon';
import Information from '../../component/Information/Information';
import { useContainerDimensions } from '../../hooks/useContainerDemensions';
export default function Statistical() {
      const componentRef = useRef();
      const { width, height } = useContainerDimensions(componentRef);

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

            maintainAspectRatio: true,
            aspecRatio: 2,
            responsive: true,
      };

      const barData = {
            labels: ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100'],
            datasets: [
                  {
                        label: 'Number people',
                        backgroundColor: [
                              'rgba(255, 99, 132, 0.2)',
                              'rgba(54, 162, 235, 0.2)',
                              'rgba(255, 206, 86, 0.2)',
                              'rgba(75, 192, 192, 0.2)',
                              'rgba(153, 102, 255, 0.2)',
                              'rgba(255, 159, 64, 0.2)',
                        ],
                        borderColor: [
                              'rgba(255,99,132,1)',
                              'rgba(54, 162, 235, 1)',
                              'rgba(255, 206, 86, 1)',
                              'rgba(75, 192, 192, 1)',
                              'rgba(153, 102, 255, 1)',
                              'rgba(255, 159, 64, 1)',
                        ],
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                        hoverBorderColor: 'rgba(255,99,132,1)',
                        data: [65, 59, 80, 81, 56, 55, 40, 56, 55, 40],
                        borderSkipped: 'bottom',
                  },
            ],
      };

      // const areaData = {
      //       labels: ['2013', '2014', '2015', '2016', '2017'],
      //       datasets: [
      //             {
      //                   label: '# of Votes',
      //                   data: [12, 19, 3, 5, 2, 3],
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
      //                   fill: true, // 3: no fill
      //             },
      //       ],
      // };

      // const areaOptions = {
      //       plugins: {
      //             filler: {
      //                   propagate: true,
      //             },
      //       },
      // };
      return (
            <>
                  <h1 className="font-normal text-[36px] mb-[10px]">Statistical</h1>
                  <div className="flex xl:flex-row flex-col mb-[40px] ">
                        <div className="xl:max-w-[50%] " ref={componentRef}>
                              <PeopleIcon width={width} height={height} />
                        </div>

                        <div className="xl:ml-[30px] flex-auto grid grid-cols-2 gap-2 xl:max-w-[50%] w-full">
                              <Information
                                    text="Total number of arrivals"
                                    number="6"
                                    className="bg-[#78a2ff]"
                              />
                              <Information
                                    text="Total number of arrivals in"
                                    number="6"
                                    className="bg-[#474ca6]"
                              />
                              <Information
                                    text="Total number of arrivals out"
                                    number="6"
                                    className="bg-[#767fec]"
                              />
                              <Information
                                    text="Total strangers number of arrivals"
                                    number="6"
                                    className="bg-[#fd857d]"
                              />
                        </div>
                  </div>
                  <div className="flex flex-wrap">
                        <div className="lg:grow-0 lg:shrink-0 lg:basis-6/12 lg:max-w-[50%] w-full pr-[15px]">
                              <h4 className="">
                                    Statistics of accuracy according to the number of images to
                                    train
                              </h4>
                              <Chart
                                    type="barChart"
                                    data={barData}
                                    height={chartHeight}
                                    width={chartWidth}
                                    options={chartOptions}
                              />
                        </div>
                        <div className="lg:grow-0 lg:shrink-0 lg:basis-6/12 lg:max-w-[50%] w-full lg:pl-[15px]">
                              <h4 className="">
                                    Statistics of accuracy according to the number of images to
                                    train
                              </h4>
                              <Chart
                                    type="barChart"
                                    data={barData}
                                    height={chartHeight}
                                    width={chartWidth}
                                    options={chartOptions}
                              />
                        </div>
                  </div>
            </>
      );
}
