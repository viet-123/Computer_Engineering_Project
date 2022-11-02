import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
      faCircleQuestion,
      faCoins,
      faEarthAsia,
      faGear,
      faKeyboard,
      faSignOut,
      faUser,
} from '@fortawesome/free-solid-svg-icons';
import { HamburgerIcon, ThreeDotButtonIcon } from '../Icon/Icon';
import Logo from '../../assets/image/logo.png';
import Profile from '../../assets/image/profile.jpg';
import Menu from '../AccoutnItem/Menu/Menu';

const MENU_ITEMS = [
      {
            icon: <FontAwesomeIcon icon={faEarthAsia} />,
            title: 'English',
            children: {
                  title: 'Language',
                  data: [
                        {
                              type: 'language',
                              code: 'en',
                              title: 'English',
                        },
                        {
                              type: 'language',
                              code: 'vi',
                              title: 'Tiếng Việt',
                        },
                  ],
            },
      },
      {
            icon: <FontAwesomeIcon icon={faCircleQuestion} />,
            title: 'Feedback and help',
            to: '/feedback',
      },
      {
            icon: <FontAwesomeIcon icon={faKeyboard} />,
            title: 'Keyboard shortcuts',
      },
];

export default function Header(props) {
      const { onChange, list } = props;
      const userMenu = [
            {
                  icon: <FontAwesomeIcon icon={faUser} />,
                  title: 'View profile',
                  to: '/profile',
            },
            {
                  icon: <FontAwesomeIcon icon={faCoins} />,
                  title: 'Get coins',
                  to: '/coin',
            },
            {
                  icon: <FontAwesomeIcon icon={faGear} />,
                  title: 'Settings',
                  to: '/settings',
            },
            ...MENU_ITEMS,
            {
                  icon: <FontAwesomeIcon icon={faSignOut} />,
                  title: 'Log out',
                  to: '/logout',
                  separate: true,
            },
      ];
      return (
            <>
                  <header className="bg-white shadow-4xl fixed top-0 left-0 z-10 w-full h-[69px]">
                        <div className="flex justify-between items-center px-[15px]">
                              <div className="px-[15px] w-1/6 cursor-pointer flex justify-between items-center">
                                    <img src={Logo} width={80} alt={'Logo'} className="logo" />
                                    <div className="" onClick={() => onChange(!list)}>
                                          <HamburgerIcon className="ml-[50px]" />
                                    </div>
                              </div>
                              <div className="flex items-center px-[15px]">
                                    <div className="w-[50px] h-[50px] cursor-pointer">
                                          <div
                                                className="rounded-full w-full h-full bg-center bg-no-repeat"
                                                style={{
                                                      backgroundImage: `url(${Profile})`,
                                                }}
                                          ></div>
                                    </div>{' '}
                                    <Menu items={userMenu}>
                                          <button className="bg-white px-0 py-0">
                                                <ThreeDotButtonIcon
                                                      className={'ml-[20px] cursor-pointer'}
                                                />
                                          </button>
                                    </Menu>
                              </div>
                        </div>
                  </header>
            </>
      );
}
