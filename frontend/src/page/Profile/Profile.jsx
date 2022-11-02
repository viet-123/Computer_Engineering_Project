import React from 'react';
import ProfileInfo from '../../component/ProfileInfo/ProfileInfo';
export default function Profile() {
      const user = {
            name: 'Hung09092001',
            email: 'admin@gmail.com',
            password: 'admin',
            phone: '123456789',
            sex: 'Nam',
            dateofbirth: '9/9/2001',
      };
      return (
            <div className="rounded-xl shadow-3xl px-[20px] bg-white py-[20px]">
                  <div className="border-b pb-[20px]">
                        <h1 className="capitalize text-[18px] text-[#333] leading-6">My Profile</h1>
                        <div className="text-[14px] leading-4 text-[#555] mt-[6px]">
                              Manage profile information for account security
                        </div>
                  </div>
                  <ProfileInfo user={user} />
            </div>
      );
}
