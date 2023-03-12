import React, { useRef } from 'react';
import Input from '../../component/Input/Input';
import Button from '../../component/Button/Button';
import Logo from '../../assets/image/logo.png';
import { CancelIcon } from '../../component/Icon/Icon';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/Action/UserAction';
import Warning from '../../component/Warning/Warning';
export default function Login() {
    const dispatch = useDispatch();
    const userDetail = useSelector((state) => state.userLogin);
    const { error } = userDetail;

    const email = useRef();
    const password = useRef();

    const handelLogin = (e) => {
        e.preventDefault();
        dispatch(login(email.current.value, password.current.value));
    };

    return (
        <>
            <form
                className="fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] lg:w-5/12 w-full mx-auto bg-[#f6f6f6] rounded"
                onSubmit={handelLogin}
            >
                <div className="md:px-[90px] px-[10px] py-[30px] flex justify-center w-full flex-col">
                    <div className="mb-[32px] text-center items-center">
                        <div className="flex justify-center">
                            <img src={Logo} width="200" alt="" />
                        </div>

                        <h1 className="font-bold text-[28px] text-[#16192c]">Welcome back!</h1>
                        <p className="mt-[8px] text-[#525f7f]">Let's build something great</p>
                    </div>
                    {error ? (
                        <Warning
                            text="Incorrect username or password"
                            icon={<CancelIcon />}
                            bgColor="bg-[#fff9fa]"
                            textColor="text-[#222]"
                            borColor="border-minus-red"
                        />
                    ) : (
                        <></>
                    )}
                    <Input ref={email} label="Username" placeholder="Your Username" type="text" />
                    <Input ref={password} label="Password" placeholder="Password" type="password" />
                    <div className="mb-[20px] ">
                        <div className="pl-[24px] min-h-[26px] ">
                            <input
                                type="checkbox"
                                className="cursor-pointer w-[16px] h-[16px] float-left ml-[-24px] mt-[5px] border rounded"
                            />
                            <label htmlFor="" className="text-[#16192c] font-medium text-[14px]">
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
                        <span>Are you a customer? </span>
                        <Link to="/inforegister" className="text-[#ff8c00] font-medium ">
                            Register identity information
                        </Link>
                    </div>
                </div>
            </form>
        </>
    );
}
