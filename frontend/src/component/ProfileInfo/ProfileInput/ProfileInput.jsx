import React, { forwardRef } from 'react';

function ProfileInput(props, ref) {
      const { className, label, type } = props;
      return (
            <div className={`flex items-center + ${className}`}>
                  <div className="w-[20%] capitalize text-right text-additional-black overflow-hidden text-[14px]">
                        <label>{label}</label>
                  </div>
                  <div className="w-[80%] pl-[20px]">
                        <div className="flex items-center bg-white rounded-sm border text-[#222] h-[40px] px-[10px] py-[10px]">
                              <input
                                    ref={ref}
                                    type={type}
                                    className="flex-1 text-[14px] bg-transparent focus:outline-none"
                              />
                        </div>
                  </div>
            </div>
      );
}

export default forwardRef(ProfileInput);
