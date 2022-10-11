import React from 'react';
import { HamburgerIcon, ThreeDotButtonIcon } from '../Icon/Icon';
import Logo from '../../assets/image/logo.png';
import Profile from '../../assets/image/profile.jpg';
export default function Header(props) {
      const { onChange, list } = props;
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
                                    <ThreeDotButtonIcon className={'ml-[20px] cursor-pointer'} />
                              </div>
                        </div>
                  </header>
            </>
      );
}
