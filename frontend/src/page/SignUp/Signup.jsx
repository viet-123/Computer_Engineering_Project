import React, { useRef } from 'react';
import Input from '../../component/Input/Input';
import Button from '../../component/Button/Button';
export default function Signup() {
      const name = useRef();
      const email = useRef();
      const handelLogin = (e) => {
            console.log(123);
      };

      return (
            <>
                  <div className="fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] lg:w-5/12 mx-auto bg-[#f6f6f6] rounded w-full ">
                        <div className="md:px-[90px] px-[10px] pb-[40px] pt-[30px] flex justify-center w-full flex-col">
                              <div className="mb-[32px] text-center items-center">
                                    <h1 className="font-bold text-[28px] text-[#16192c]">
                                          Create your account
                                    </h1>
                                    <p className="mt-[8px] text-[#525f7f]">It's free and easy</p>
                              </div>
                              <Input
                                    type="name"
                                    label="Your name"
                                    placeholder="Enter your name"
                                    ref={name}
                              />
                              <Input
                                    type="email"
                                    label="E-mail or phone number"
                                    placeholder="Type your e-mail or phone number"
                              />
                              <Input
                                    type="password"
                                    label="Password"
                                    placeholder="Password"
                                    ref={email}
                              />
                              <Input
                                    type="password"
                                    label="Confirm Password"
                                    placeholder="Confirm Password"
                                    ref={email}
                              />
                              <div className="mb-[20px] ">
                                    <div className="pl-[24px] min-h-[26px] ">
                                          <input
                                                type="checkbox"
                                                className="cursor-pointer w-[16px] h-[16px] float-left ml-[-24px] mt-[5px] border rounded"
                                          />
                                          <label
                                                htmlFor=""
                                                className="text-[#525f7f] font-medium text-[14px]"
                                          >
                                                By creating an account means you agree to the
                                                <strong> Terms and Conditions, </strong>
                                                and our <strong>Privacy Policy</strong>
                                          </label>
                                    </div>
                              </div>
                              <Button
                                    onClick={handelLogin}
                                    bgColor="bg-[#5c60f5]"
                                    tColor="text-white"
                                    title="Register"
                              />
                        </div>
                  </div>
            </>
      );
}
