import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getManagedBuildings } from '../../redux/Action/buildingAction';
import { updateInfo } from '../../redux/Action/UserAction';

import Loading from '../Loading/Loading';
import Warning from '../../component/Warning/Warning';
import { CancelIcon } from '../../component/Icon/Icon';

export default function ProfileInfo() {
    const dispatch = useDispatch();
    const { fullName, username, role } = useSelector((state) => state.userLogin).user.data.user;
    const { buildings, loading } = useSelector((state) => state.buildingManaged);

    const [inputFullName, setInputFullName] = useState(fullName);
    const [showError, setShowError] = useState(false);

    const { user, fetched } = useSelector((state) => state.userInfoUpdated);

    useEffect(() => {
        dispatch(getManagedBuildings());
    }, [dispatch]);

    useEffect(() => {
        if (fetched) {
            window.location.reload(false);
        }
    }, [fetched]);

    const handleUpdateInfo = (e) => {
        e.preventDefault();
        if (inputFullName.length < 6) {
            setShowError(true);
        } else {
            dispatch(updateInfo(inputFullName));
        }
    };

    const validateInput = () => {
        if (showError) {
            if (inputFullName.length < 6) {
                return (
                    <Warning
                        text="Input value must be at least 6 characters long"
                        icon={<CancelIcon />}
                        bgColor="bg-[#fff9fa]"
                        textColor="text-[#222]"
                        borColor="border-minus-red"
                    />
                );
            }
        }
    };

    return loading ? (
        <div className="pr-[50px] mt-[30px] w-full">
            <form action="" method="post" className="w-full">
                <div className="mb-[30px] ">
                    <div className="flex items-center">
                        <div className="w-[20%] capitalize text-right text-additional-black overflow-hidden font-bold">
                            <label>User name</label>
                        </div>
                        <div className="w-[80%] pl-[20px]">
                            <div className="flex items-center">
                                <div className="text-[#333] ">{username}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mb-[30px] ">
                    <div className="flex items-center">
                        <div className="w-[20%] capitalize text-right text-additional-black overflow-hidden font-bold">
                            <label>Full Name</label>
                        </div>
                        <div className="w-[80%] pl-[20px]">
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    className="mt-[8px] w-full py-[12px] px-[20px] text-[16px] font-normal text-[#16192c] bg-white border-solid border border-[#e7eaf0] rounded-md
          shadow-blue-blur focus:shadow-blue-focus focus:outline-none"
                                    onChange={(value) => setInputFullName(value.target.value)}
                                    value={inputFullName}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex items-center">
                        <div className="w-[20%] capitalize text-right text-additional-black overflow-hidden text-[14px]"></div>
                        <div className="w-[80%] pl-[20px]">{validateInput()}</div>
                    </div>
                </div>
                <div className="mb-[30px] ">
                    <div className="flex items-center">
                        <div className="w-[20%] capitalize text-right text-additional-black overflow-hidden font-bold">
                            <label>Role</label>
                        </div>
                        <div className="w-[80%] pl-[20px]">
                            <div className="flex items-center">
                                <div className="text-[#333] ">{role}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mb-[30px] ">
                    <div className="flex items-center">
                        <div className="w-[20%] capitalize text-right text-additional-black overflow-hidden font-bold">
                            <label>Managed buildings</label>
                        </div>
                        <div className="w-[80%] pl-[20px]">
                            <div className="flex items-center">
                                <div className="text-[#333] ">
                                    {role === 'admin'
                                        ? 'All buildings'
                                        : buildings?.data.data.map((el) => el.name).join(', ')}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-[60px]">
                    <div className="flex items-center">
                        <div className="w-[20%] capitalize text-right text-additional-black overflow-hidden text-[14px]"></div>
                        <div className="w-[80%] pl-[20px]">
                            <button
                                onClick={handleUpdateInfo}
                                className="text-white h-[40px] min-w-[70px] max-w-[220px] bg-[#5c60f5] rounded-md"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    ) : (
        <Loading></Loading>
    );
}
