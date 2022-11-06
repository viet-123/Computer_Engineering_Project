import React from 'react';
import { Link } from 'react-router-dom';
export default function MenuItem({ data }) {
      return (
            <>
                  <Link to={data.to}>
                        <div
                              className="flex items-center hover:bg-[#cac9c9] pl-[10px] rounded-lg"
                              onClick={data.onClick}
                        >
                              {data.icon}
                              <button className="rounded-none bg-inherit hover:bg-[#cac9c9] text-black">
                                    {data.title}
                              </button>
                        </div>
                  </Link>
            </>
      );
}
