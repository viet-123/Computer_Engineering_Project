import React, { useRef } from 'react';
import { NarrowDownIcon, NarrowUpIcon } from '../Icon/Icon';

export default function Date(props) {
      const dayOfBirth = useRef();
      const monthOfBirth = useRef();
      const yearOfBirth = useRef();

      const { DateRef, showitem, onChange, birth, onCheck } = props;

      const Date = [...Array(31).keys()];
      const Month = [...Array(12).keys()];
      const Year = [...Array(120).keys()];
      const getYear = () => {
            return new window.Date();
      };
      const CurrentYear = getYear().toString().split(' ')[3];

      const HandleSelect = (item, index) => {
            let tempArr = [...birth];
            if (index === 0) {
                  tempArr[0] = `${item + 1}`;
                  onCheck(tempArr);
            } else if (index === 1) {
                  tempArr[1] = `${item + 1}`;
                  onCheck(tempArr);
            } else {
                  tempArr[2] = `${CurrentYear - item}`;
                  onCheck(tempArr);
            }
      };
      return (
            <>
                  {showitem.map((item, index) => {
                        return (
                              <div
                                    className="w-[32%] flex relative cursor-pointer"
                                    key={index}
                                    ref={DateRef}
                              >
                                    <div
                                          className="w-full text-blur-black border rouned-sm h-[40px] bg-white flex items-center px-[15px] hover:border-[#ff9600]"
                                          onClick={() => {
                                                let tempArr = [...showitem];
                                                tempArr.map((item) => {
                                                      item.id === index && item.isShow === false
                                                            ? (item.isShow = true)
                                                            : (item.isShow = false);
                                                      return tempArr;
                                                });
                                                onChange(tempArr);
                                          }}
                                    >
                                          {index === 0 ? (
                                                <span
                                                      className="flex-1 text-[14px]"
                                                      ref={dayOfBirth}
                                                >
                                                      {birth[0]}
                                                </span>
                                          ) : index === 1 ? (
                                                <span
                                                      className="flex-1 text-[14px]"
                                                      ref={monthOfBirth}
                                                >
                                                      Tháng {birth[1]}
                                                </span>
                                          ) : (
                                                <span
                                                      className="flex-1 text-[14px]"
                                                      ref={yearOfBirth}
                                                >
                                                      Năm {birth[2]}
                                                </span>
                                          )}

                                          {item.isShow === false ? (
                                                <NarrowDownIcon
                                                      className={'ml-[5px] text-[14px]'}
                                                />
                                          ) : (
                                                <NarrowUpIcon className={'ml-[5px] text-[14px]'} />
                                          )}
                                    </div>
                                    <div className="absolute z-[600] top-[40px] left-0 w-[187.49px] overflow-x-hidden overflow-y-auto max-h-[134px] bg-white">
                                          <ul>
                                                {index === 0 && item.isShow ? (
                                                      Date.map((x, Index) => (
                                                            <li
                                                                  key={Index}
                                                                  className="w-full box-border py-[5px] flex items-center px-[15px] text-blur-black text-[14px] hover:text-[#ff9600]"
                                                                  onClick={() => {
                                                                        item.isShow = false;
                                                                        HandleSelect(
                                                                              Date[Index],
                                                                              0,
                                                                        );
                                                                  }}
                                                            >
                                                                  {x + 1}
                                                            </li>
                                                      ))
                                                ) : index === 1 && item.isShow ? (
                                                      Month.map((x, Index) => (
                                                            <li
                                                                  key={Index}
                                                                  className="w-full box-border py-[5px] flex items-center px-[15px] text-blur-black text-[14px] hover:text-[#ff9600]"
                                                                  onClick={() => {
                                                                        item.isShow = false;
                                                                        HandleSelect(
                                                                              Date[Index],
                                                                              1,
                                                                        );
                                                                  }}
                                                            >
                                                                  Tháng {x + 1}
                                                            </li>
                                                      ))
                                                ) : index === 2 && item.isShow ? (
                                                      Year.map((x, Index) => (
                                                            <li
                                                                  key={Index}
                                                                  className="w-full box-border py-[5px] flex items-center px-[15px] text-blur-black text-[14px] hover:text-[#ff9600]"
                                                                  onClick={() => {
                                                                        item.isShow = false;
                                                                        HandleSelect(
                                                                              Date[Index],
                                                                              2,
                                                                        );
                                                                  }}
                                                            >
                                                                  Năm {CurrentYear - x}
                                                            </li>
                                                      ))
                                                ) : (
                                                      <></>
                                                )}
                                          </ul>
                                    </div>
                              </div>
                        );
                  })}
            </>
      );
}
