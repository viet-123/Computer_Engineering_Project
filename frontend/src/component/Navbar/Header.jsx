import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
      faCoins,
      faEarthAsia,
      faGear,
      faHouse,
      faKeyboard,
      faSignOut,
      faUser,
} from '@fortawesome/free-solid-svg-icons';
import { HamburgerIcon, ThreeDotButtonIcon } from '../Icon/Icon';
import Logo from '../../assets/image/logo.png';
import Profile from '../../assets/image/profile.jpg';
import Menu from '../AccoutnItem/Menu/Menu';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/Action/UseAction';

const MENU_ITEMS = [
      {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'View profile',
            to: '/profile',
      },
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
];

export default function Header(props) {
      const dispath = useDispatch();

      const HandleLogout = () => {
            dispath(logout());
      };
      const { onChange, list } = props;
      const userMenu = [
            {
                  icon: <FontAwesomeIcon icon={faHouse} />,
                  title: 'Home',
                  to: '/',
            },
            {
                  icon: <FontAwesomeIcon icon={faCoins} />,
                  title: 'Accquitance history',
                  to: '/acchistory',
            },
            {
                  icon: <FontAwesomeIcon icon={faGear} />,
                  title: 'All history',
                  to: '/allhistory',
            },
            {
                  icon: <FontAwesomeIcon icon={faKeyboard} />,
                  title: 'Statistical',
                  to: '/statis',
            },
            ...MENU_ITEMS,
            {
                  icon: <FontAwesomeIcon icon={faSignOut} />,
                  title: 'Log out',
                  separate: true,
                  onClick: HandleLogout,
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
