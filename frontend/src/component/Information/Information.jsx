import React from 'react';

export default function Information(props) {
      const { text, number, total, className } = props;
      return (
            <div className={`rounded-xl text-white m-[10px]  py-[20px] px-[20px] ${className}`}>
                  <p className="text-white text-[16px] mb-[10px] ">{text}</p>
                  <div className="flex items-center">
                        <b className="text-[30px]">{number}</b>
                        <p className="text-[24px] ml-[10px]">
                              {total ? '(' + ((number / total) * 100).toFixed(2) + '%)' : ''}
                        </p>
                  </div>
            </div>
      );
}
