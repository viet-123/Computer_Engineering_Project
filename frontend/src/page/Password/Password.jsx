import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProfileInput from '../../component/ProfileInfo/ProfileInput/ProfileInput';
import { changepassword } from '../../redux/Action/UserAction';

export default function Password() {
    const dispatch = useDispatch();
    const userDetail = useSelector((state) => state.userChangpassword);
    const { user } = userDetail;
    const currentPassword = useRef();
    const [password, setPassword] = useState(undefined);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showerror, setShowerror] = useState(false);

    const TimeoutRef = useRef(null);

    useEffect(() => {
        TimeoutRef.current && clearTimeout(TimeoutRef.current);
        if (user) {
            TimeoutRef.current = setTimeout(() => alert('123456'), 5000);
        }
        return () => {
            TimeoutRef.current && clearTimeout(TimeoutRef.current);
        };
    }, [user]);

    useEffect(() => {
        if (typeof password !== 'undefined') {
            password.length < 6 ? setShowerror(true) : setShowerror(false);
        }
    }, [password]);

    const handleChangePassword = (e) => {
        e.preventDefault();
        dispatch(changepassword(currentPassword.current.value, password, confirmPassword));
    };
    return (
        <>
            <h1 className="font-normal text-[36px] mb-[10px]">Change Password</h1>
            <div className="rounded-xl shadow-3xl px-[20px] bg-white py-[20px] h-[90%]">
                <div className="border-b pb-[20px]">
                    <div className="text-[14px] leading-4 text-[#555] mt-[6px]">
                        For your account's security, do not share your password with anyone else
                    </div>
                </div>
                <form className="mb-[30px] py-[30px] ">
                    <ProfileInput
                        label="Current Password"
                        className="w-[70%] mx-auto mb-[30px]"
                        type="password"
                        ref={currentPassword}
                    />
                    <ProfileInput
                        label="New Password"
                        className={`w-[70%] mx-auto ${showerror === true ? '' : 'mb-[30px]'} `}
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {showerror ? (
                        <div className="flex items-center + w-[70%] mx-auto mb-[30px]">
                            <div className="w-[20%] text-right"></div>
                            <div className="text-[#ff424f] px-[22px] pt-[5px]">
                                Password must be more than 6 characters long
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}
                    <ProfileInput
                        label="Confirm Password"
                        className="w-[70%] mx-auto mb-[30px]"
                        type="password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <div className="flex items-center + w-[70%] mx-auto mb-[30px]">
                        <div className="w-[20%] capitalize text-right text-additional-black overflow-hidden text-[14px]"></div>
                        <div className="w-[80%] pl-[20px]">
                            <button onClick={handleChangePassword}>Save</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
