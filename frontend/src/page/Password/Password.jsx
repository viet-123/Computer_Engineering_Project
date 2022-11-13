import React, { useRef } from 'react';
import ProfileInput from '../../component/ProfileInfo/ProfileInput/ProfileInput';

export default function Password() {
      const currentPassword = useRef();
      const newPassword = useRef();
      const confirmPassword = useRef();
      return (
            <div className="rounded-xl shadow-3xl px-[20px] bg-white py-[20px] h-[90%]">
                  <div className="border-b pb-[20px]">
                        <p className="capitalize text-[18px] text-[#333] leading-6 font-bold">
                              Change PassWord
                        </p>
                        <div className="text-[14px] leading-4 text-[#555] mt-[6px]">
                              For your account's security, do not share your password with anyone
                              else
                        </div>
                  </div>
                  <div className="mb-[30px] py-[30px] ">
                        <ProfileInput
                              label="Current Password"
                              className="w-[70%] mx-auto mb-[30px]"
                              type="password"
                              ref={currentPassword}
                        />
                        <ProfileInput
                              label="New Password"
                              className="w-[70%] mx-auto mb-[30px]"
                              type="password"
                              ref={newPassword}
                        />
                        <ProfileInput
                              label="Confirm Password"
                              className="w-[70%] mx-auto mb-[30px]"
                              type="password"
                              ref={confirmPassword}
                        />
                  </div>
            </div>
      );
}
