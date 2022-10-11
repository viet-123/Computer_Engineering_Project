import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
export default function RegisterSuccess() {
      const Animation = 'animate-sweet';

      return (
            <div
                  className={`fixed top-[80px] right-[20px] 
            bg-white shadow-4xl rounded-md max-w-[350px] flex items-center px-[25px] py-[20px] text-[16px] translate-x-[150%] + ${Animation}`}
            >
                  <FontAwesomeIcon
                        className="mr-[20px] px-[10px] py-[10px] bg-[#07a787] rounded-full text-white"
                        icon={faCheck}
                  />
                  <p>Đăng Ký Thành Công</p>
            </div>
      );
}
