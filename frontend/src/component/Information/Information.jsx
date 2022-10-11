import React from 'react';

export default function Information(props) {
      const { text, number, className } = props;
      return (
            <div className={`rounded-xl text-white  py-[20px] px-[20px] ${className}`}>
                  <p className="text-white text-[14px] mb-[10px] ">{text}</p>
                  <p className="text-[24px]">{number}</p>
            </div>
      );
}
