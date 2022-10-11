import React from 'react';
import { Chart } from '../../component/Chart/Chart';
import { PeopleIcon } from '../../component/Icon/Icon';
import Information from '../../component/Information/Information';
export default function Statistical() {
      return (
            <>
                  <h1 className="font-normal text-[36px] mb-[10px]">Statistical</h1>
                  <div className="flex mb-[40px]">
                        <PeopleIcon />
                        <div className="ml-[30px] grid grid-cols-2 flex-auto gap-2 h-[90%]">
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
                  <div className="flex">
                        <div className="">
                              <h4 className="">
                                    Statistics of accuracy according to the number of images to
                                    train
                              </h4>
                              <Chart />
                        </div>
                  </div>
            </>
      );
}
