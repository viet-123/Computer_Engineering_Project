import React from 'react';
import Input from '../../component/Input/Input';
import Button from '../../component/Button/Button';
import Logo from '../../assets/image/logo.png';
import { Link } from 'react-router-dom';
export default function Login() {
      const handelLogin = (e) => {
            console.log(123);
      };
      return (
            <>
                  <div className="fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] lg:w-5/12 w-full mx-auto bg-[#f6f6f6] rounded">
                        <div className="md:px-[90px] px-[10px] py-[30px] flex justify-center w-full flex-col">
                              <div className="mb-[32px] text-center items-center">
                                    <div className="flex justify-center">
                                          <img src={Logo} width="200" alt="" />
                                    </div>

                                    <h1 className="font-bold text-[28px] text-[#16192c]">
                                          Welcome back!
                                    </h1>
                                    <p className="mt-[8px] text-[#525f7f]">
                                          Let's build something great
                                    </p>
                              </div>
                              <Input label="Email address" placeholder="Your email address" />
                              <Input label="Password" placeholder="Password" />
                              <div className="mb-[20px] ">
                                    <div className="pl-[24px] min-h-[26px] ">
                                          <input
                                                type="checkbox"
                                                className="cursor-pointer w-[16px] h-[16px] float-left ml-[-24px] mt-[5px] border rounded"
                                          />
                                          <label
                                                htmlFor=""
                                                className="text-[#16192c] font-medium text-[14px]"
                                          >
                                                Keep me logged
                                          </label>
                                    </div>
                              </div>
                              <Button
                                    onClick={handelLogin}
                                    bgColor="bg-[#5c60f5]"
                                    tColor="text-white"
                                    title="Sign in"
                              />
                              <div className="my-[24px]">
                                    <small className="text-[#525f7f] text-[14px]">
                                          Don't have an account?
                                    </small>
                                    <Link
                                          to="/signup"
                                          className="text-[#ff8c00] font-medium text-[14px]"
                                    >
                                          Sign up
                                    </Link>
                              </div>
                        </div>
                  </div>
            </>
      );
}
