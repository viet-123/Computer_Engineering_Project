import React from 'react';
import ProfileInfo from '../../component/ProfileInfo/ProfileInfo';
export default function Profile() {
    return (
        <>
            <h1 className="font-normal text-[36px] mb-[10px]">My Profile</h1>
            <div className="rounded-xl shadow-3xl px-[20px] bg-white py-[20px]">
                <div className="border-b pb-[20px]">
                    <div className="leading-4 text-[#555] mt-[6px]">Manage profile information</div>
                </div>
                <ProfileInfo />
            </div>
        </>
    );
}
