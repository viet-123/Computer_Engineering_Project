import React from 'react';

export default function Radio(props) {
      const { selected, onChange, text, value, className } = props;
      return (
            <div
                  className={`flex items-center cursor-pointer select-none + ${className}`}
                  onClick={() => {
                        onChange(value);
                  }}
            >
                  <div
                        className={`flex justify-center items-center mr-[6px] ease-linear duration-100 w-[18px] h-[18px] border-2 rounded-full  ${
                              value !== selected && 'border-2'
                        }`}
                  >
                        <div
                              className={`w-[8px] h-[8px] bg-[#ff9600] rounded-full ease-linear duration-100 ${
                                    value !== selected && 'w-0 h-0'
                              }`}
                        />
                  </div>
                  <div className="text-[#666] pr-[8px]">{text}</div>
            </div>
      );
}
