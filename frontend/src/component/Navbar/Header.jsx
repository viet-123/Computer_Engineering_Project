import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOut, faBars } from '@fortawesome/free-solid-svg-icons';
import Logo from '../../assets/image/logo.png';
import Menu from '../AccountItem/Menu/Menu';
import { logout } from '../../redux/Action/UserAction';

export default function Header(props) {
    const dispath = useDispatch();

    const { username, fullName } = useSelector((state) => state.userLogin).user.data.user;

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
                            <FontAwesomeIcon icon={faBars} className="h-[30px]" />
                        </div>
                        <a className="ml-[10px]" href="/">
                            <img src={Logo} width={80} alt={'Logo'} className="logo" />
                        </a>
                    </div>
                    <div className="flex items-center px-[15px]">
                        <Menu title={fullName ? fullName : username} items={userMenu}>
                            <button className="bg-white px-0 py-0">
                                <img
                                    className="rounded-full h-[50px]"
                                    src="/images/user-img.png"
                                    alt=""
                                />
                            </button>
                        </Menu>
                    </div>
                </div>
            </header>
        </>
    );
}
