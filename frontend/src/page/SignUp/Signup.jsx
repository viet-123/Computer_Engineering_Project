import React, { useRef } from 'react';
import Input from '../../component/Input/Input';
import Button from '../../component/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/Action/UseAction';
import Warning from '../../component/Warning/Warning';
import { CancelIcon, CheckIcon } from '../../component/Icon/Icon';
export default function Signup() {
      const dispatch = useDispatch();
      const userDetail = useSelector((state) => state.userRegister);
      const { error, isfetching } = userDetail;
      const email = useRef();
      const password = useRef();
      const confirmPassword = useRef();

      const handleSignup = (e) => {
            e.preventDefault();
            dispatch(
                  register(
                        email.current.value,
                        password.current.value,
                        confirmPassword.current.value,
                  ),
            );
      };

      const handleError = (error) => {
            let temp = error.substring(error.search('{') + 1, error.length - 1);
            temp = temp.substring(temp.indexOf('[') + 1, temp.length);
            temp = temp.substring(0, temp.indexOf(']'));
            return temp;
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
                              {!error && isfetching ? (
                                    <Warning
                                          text="Đăng kí thành công"
                                          icon={<CheckIcon />}
                                          bgColor="bg-[#f9fffa]"
                                          textColor="text-[#222]"
                                          borColor="border-minus-green"
                                    />
                              ) : error && isfetching ? (
                                    <Warning
                                          text={handleError(error)}
                                          icon={<CancelIcon />}
                                          bgColor="bg-[#fff9fa]"
                                          textColor="text-[#222]"
                                          borColor="border-minus-red"
                                    />
                              ) : (
                                    <></>
                              )}

                              <Input
                                    type="text"
                                    label="Username"
                                    placeholder="Type your Username"
                                    ref={email}
                              />
                              <Input
                                    type="password"
                                    label="Password"
                                    placeholder="Password"
                                    ref={password}
                              />
                              <Input
                                    type="password"
                                    label="Confirm Password"
                                    placeholder="Confirm Password"
                                    ref={confirmPassword}
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
                                    onClick={handleSignup}
                                    bgColor="bg-[#5c60f5]"
                                    tColor="text-white"
                                    title="Register"
                              />
                        </div>
                  </div>
            </>
      );
}
