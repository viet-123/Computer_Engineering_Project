import React, { forwardRef } from 'react';

function Input(props, ref) {
    return (
        <>
            <div className="mb-[20px]">
                <label htmlFor="" className=" text-[14px] font-medium text-[#16192c]">
                    {props.label}
                </label>
                <input
                    type={props.type}
                    ref={ref}
                    className="mt-[8px] w-full py-[12px] px-[20px] text-[16px] font-normal text-[#16192c] bg-white border-solid border border-[#e7eaf0] rounded-md
          shadow-blue-blur focus:shadow-blue-focus focus:outline-none"
                    placeholder={props.placeholder}
                    name={props.name}
                    onChange={props.onChange}
                    value={props.value || ''}
                />
            </div>
        </>
    );
}

export default forwardRef(Input);
