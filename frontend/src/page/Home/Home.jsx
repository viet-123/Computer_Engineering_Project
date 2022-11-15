import React from 'react';

export default function Home() {
      return (
            <>
                  <h1 className="font-normal text-[36px] mb-[10px]">Home</h1>
                  <div className="rounded-xl shadow-3xl px-[20px] bg-white py-[20px] h-[90%] flex flex-wrap">
                        <div className="w-[50%] h-[400px] bg-white">
                              <div className="w-full h-full bg-slate-500"></div>
                        </div>
                        <div className="w-[50%] px-[20px]">
                              <h1 className="text-[28px] font-normal">Current Access</h1>
                              <p className="text-[24px]">First Name:</p>
                              <p className="text-[24px]">Last Name:</p>
                              <p className="text-[24px]">Access Time:</p>
                        </div>
                  </div>
            </>
      );
}
