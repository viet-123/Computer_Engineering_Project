import React from 'react';
import { Link } from 'react-router-dom';
export default function MenuItem({ data }) {
      return (
            <>
                  <Link to={data.to}>
                        <div className="flex items-center">
                              {data.icon}
                              <button className="rounded-none bg-white text-black">
                                    {data.title}
                              </button>
                        </div>
                  </Link>
            </>
      );
}
