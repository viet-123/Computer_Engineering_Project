import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FeedIcon } from '../Icon/Icon';
export default function LeftSide(props) {
      const { list } = props;
      const [active, setActive] = useState();
      const FeedData = [
            {
                  id: 1,
                  Icon: FeedIcon.CameraIcon,
                  title: 'Turn on/off device',
                  link: '/',
            },
            {
                  id: 2,
                  Icon: FeedIcon.SearchIcon,
                  title: 'Accquaintace History',
                  link: '/history',
            },
            {
                  id: 3,
                  Icon: FeedIcon.SearchIcon,
                  title: 'All history',
                  link: '/history',
            },
            {
                  id: 4,
                  Icon: FeedIcon.StatisIcon,
                  title: 'Statistical',
                  link: '/statis',
            },
            {
                  id: 5,
                  Icon: FeedIcon.ProfileIcon,
                  title: 'Profile',
                  link: '/profile',
            },
      ];
      return (
            <>
                  <div
                        className={`leftside bg-white lg:w-1/6 min-w-[250px] w-[200px] min-h-full pt-[20px] + ${
                              list ? 'block ' : 'hidden'
                        }`}
                  >
                        <ul className="px-[15px] ">
                              {FeedData.map((Feed, Index) => (
                                    <Link to={Feed.link} key={Index}>
                                          <li
                                                onClick={() => setActive(Feed.id)}
                                                className={`cursor-pointer py-[10px] px-[20px] font-normal + ${
                                                      active === Feed.id
                                                            ? 'text-white bg-[#4a4fb0] rounded-lg'
                                                            : ''
                                                }`}
                                          >
                                                <span className="flex text-center opacity-100 visible relative ">
                                                      <span className="inline-block min-w-[20px] mr-[15px] ">
                                                            <Feed.Icon
                                                                  fill={
                                                                        active === Feed.id
                                                                              ? 'white'
                                                                              : 'black'
                                                                  }
                                                            />
                                                      </span>
                                                      <span className="text-[14px]">
                                                            {Feed.title}
                                                      </span>
                                                </span>
                                          </li>
                                    </Link>
                              ))}
                        </ul>
                  </div>
            </>
      );
}
