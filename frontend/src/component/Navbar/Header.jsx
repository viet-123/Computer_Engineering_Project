import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthAsia, faSignOut, faUser } from '@fortawesome/free-solid-svg-icons';
import { HamburgerIcon, ThreeDotButtonIcon } from '../Icon/Icon';
import Logo from '../../assets/image/logo.png';
import Profile from '../../assets/image/profile.jpg';
import Menu from '../AccountItem/Menu/Menu';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/Action/UserAction';

export default function Header(props) {
    const dispath = useDispatch();

    const HandleLogout = () => {
        dispath(logout());
    };
    const { onChange, list } = props;
    const userMenu = [
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
                    <div className="px-[15px] w-1/6 cursor-pointer flex justify-start items-center">
                        <div className="" onClick={() => onChange(!list)}>
                            <HamburgerIcon />
                        </div>
                        <img src={Logo} width={80} alt={'Logo'} className="logo" />
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
                                <ThreeDotButtonIcon className={'ml-[20px] cursor-pointer'} />
                            </button>
                        </Menu>
                    </div>
                </div>
            </header>
        </>
    );
}
