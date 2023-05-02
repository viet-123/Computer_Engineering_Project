import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ModalContent, {
    ModalBody,
    ModalFooter,
    ModalHeader,
} from '../../component/Modal/component/modal/ModalContent';
import OnChangeInput from '../../component/Input/OnChangeInput';
import Button from '../../component/Button/Button';
import Loading from '../Loading/Loading';
import Warning from '../../component/Warning/Warning';
import { CancelIcon } from '../../component/Icon/Icon';
import { getUserList, addUser, editUser, deleteUser } from '../../redux/Action/UserAction';
import { getAllBuildings } from '../../redux/Action/buildingAction';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';
import { TablePagination } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UserTable() {
    const dispatch = useDispatch();
    const [target, setTarget] = useState(-1);
    const [showAddUserModal, setShowAddUserModal] = useState(false);
    const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
    const [showEditUserModal, setShowEditUserModal] = useState(false);
    const [buildingOptions, setBuildingOptions] = useState([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);
    const [input, setInput] = useState({
        fullName: '',
        username: '',
        password: '',
        confirmPassword: '',
        buildings: [],
    });
    const [showError, setShowError] = useState(false);
    const [data, setData] = useState([]);

    const { users, loading } = useSelector((state) => state.userList);
    const { buildings } = useSelector((state) => state.buildingList);

    const userAdded = useSelector((state) => state.userAdded);
    const addedError = userAdded.error;
    const addedIsFetching = userAdded.isfetching;
    const addedData = userAdded.user;

    const userEdited = useSelector((state) => state.userEdited);
    const editedError = userEdited.error;
    const editedIsFetching = userEdited.isfetching;
    const editedData = userEdited.user;

    const userDeleted = useSelector((state) => state.userDeleted);
    const deletedError = userDeleted.error;
    const deletedIsFetching = userDeleted.isfetching;

    useEffect(() => {
        dispatch(getUserList());
        dispatch(getAllBuildings());
    }, [dispatch]);

    useEffect(() => {
        if (loading) {
            setData(users.data.data);
        }
    }, [loading]);

    useEffect(() => {
        if (buildings) {
            setBuildingOptions([]);
            buildings.data.data.forEach((building) =>
                setBuildingOptions((prev) => [
                    ...prev,
                    { value: building._id, label: building.name },
                ]),
            );
        }
    }, [buildings]);

    useEffect(() => {
        if (addedIsFetching) {
            if (!addedError) {
                setData((prevState) => [addedData.data.data, ...prevState]);
                notify('success', 'Add user successfully!');
            } else {
                notify('error', 'Add user unsuccessfully!');
            }
            setShowAddUserModal(false);
        }
    }, [addedError, addedIsFetching]);

    useEffect(() => {
        if (editedIsFetching) {
            if (!editedError) {
                data[target] = editedData.data.data;
                notify('success', 'Edit user successfully!');
                setShowEditUserModal(false);
            } else {
                notify('error', 'Edit user unsuccessfully!');
                setShowEditUserModal(false);
            }
        }
    }, [editedError, editedIsFetching]);

    useEffect(() => {
        if (deletedIsFetching) {
            if (!deletedError) {
                data.splice(target, 1);
                notify('success', 'Delete user successfully!');
                setShowDeleteUserModal(false);
            } else {
                notify('error', 'Delete user unsuccessfully!');
                setShowDeleteUserModal(false);
            }
        }
    }, [deletedError, deletedIsFetching]);

    const handleLimitChange = (event) => {
        setLimit(event.target.value);
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const notify = (type, message) => {
        if (type === 'success') return toast.success(message);
        else return toast.error(message);
    };

    const handleAddUser = () => {
        if (
            input.fullName.length < 6 ||
            input.username.length < 6 ||
            input.password.length < 6 ||
            input.confirmPassword.length < 6 ||
            input.confirmPassword !== input.password ||
            input.buildings.length === 0 ||
            data.findIndex((el) => el.username === input.username) >= 0
        ) {
            setShowError(true);
        } else {
            const buildingIds = input.buildings.map((el) => el.value);
            dispatch(
                addUser(
                    input.fullName,
                    input.username,
                    input.password,
                    input.confirmPassword,
                    buildingIds,
                ),
            );
        }
    };

    const handleOnChange = (event) => {
        const { name, value } = event.target;
        setInput({ ...input, [name]: value });
    };

    const handleChangeBuildings = (choice) => {
        setInput((prev) => {
            return { ...prev, buildings: choice };
        });
    };

    const validateInput = (name) => {
        if (showError) {
            if (input[name].length < 5) {
                return (
                    <Warning
                        text="Input value must be at least 6 characters long"
                        icon={<CancelIcon />}
                        bgColor="bg-[#fff9fa]"
                        textColor="text-[#222]"
                        borColor="border-minus-red"
                    />
                );
            } else if (
                name === 'username' &&
                data.findIndex((el) => el.username === input.username) >= 0
            ) {
                return (
                    <Warning
                        text="This username is already in use"
                        icon={<CancelIcon />}
                        bgColor="bg-[#fff9fa]"
                        textColor="text-[#222]"
                        borColor="border-minus-red"
                    />
                );
            } else if (name === 'confirmPassword' && input.confirmPassword !== input.password) {
                return (
                    <Warning
                        text="Confirm password must be must be same as password"
                        icon={<CancelIcon />}
                        bgColor="bg-[#fff9fa]"
                        textColor="text-[#222]"
                        borColor="border-minus-red"
                    />
                );
            }
        }
    };

    const validateBuildings = () => {
        if (showError) {
            if (input.buildings.length === 0) {
                return (
                    <Warning
                        text="Please select at least 1 building"
                        icon={<CancelIcon />}
                        bgColor="bg-[#fff9fa]"
                        textColor="text-[#222]"
                        borColor="border-minus-red"
                    />
                );
            }
        }
    };

    const handleOpenAddUserModal = () => {
        setInput({
            fullName: '',
            username: '',
            password: '',
            confirmPassword: '',
            buildings: [],
        });
        setShowError(false);
        setShowAddUserModal(true);
    };

    const handleOpenEditUserModal = (e) => {
        const buildingObjects = data[e.currentTarget.dataset.index].buildings.map((buildingId) => {
            return buildingOptions.find((option) => option.value === buildingId);
        });
        setInput({
            fullName: data[e.currentTarget.dataset.index].fullName,
            username: '',
            password: '',
            confirmPassword: '',
            buildings: buildingObjects,
        });
        setTarget(e.currentTarget.dataset.index);
        setShowError(false);
        setShowEditUserModal(true);
    };

    const handleEditUser = () => {
        if (input.fullName.length < 6 || input.buildings.length === 0) {
            setShowError(true);
        } else {
            const buildingIds = input.buildings.map((el) => el.value);
            dispatch(editUser(data[target]._id, input.fullName, buildingIds));
        }
    };

    const handleOpenDeleteUserModal = (e) => {
        setTarget(e.currentTarget.dataset.index);
        setShowDeleteUserModal(true);
    };

    const handleDeleteUser = () => {
        dispatch(deleteUser(data[target]._id));
    };

    return (
        <>
            {loading ? (
                <div className="shadow-3xl px-[10px] py-[20px] rounded-xl bg-white">
                    <div className="flex justify-end">
                        <Button
                            bgColor="bg-[#5c60f5]"
                            tColor="text-white"
                            title="Add new user"
                            onClick={handleOpenAddUserModal}
                        />
                    </div>
                    <table className="min-w-full bg-white mt-[20px] ">
                        <thead className="border-collapse border">
                            <tr>
                                <th className="w-[5%] border text-center py-[15px] px-2  font-semibold text-sm">
                                    #
                                </th>
                                <th className="w-[20%] border text-center py-[15px] px-2 font-semibold text-sm">
                                    User Name
                                </th>
                                <th className="w-[25%] border text-center py-[15px] px-2 font-semibold text-sm">
                                    Full Name
                                </th>
                                <th className="w-[20%] border text-center py-[15px] px-2 font-semibold text-sm">
                                    Managed Buildings
                                </th>
                                <th className="w-[10%] border text-center py-[15px] px-2 font-semibold text-sm">
                                    Role
                                </th>
                                <th className="w-[10%] border text-center py-[15px] px-2 font-semibold text-sm">
                                    Edit
                                </th>
                                <th className="w-[10%] border text-center py-[15px] px-2 font-semibold text-sm">
                                    Delete
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.slice(limit * page, limit * page + limit).map((user, index) => {
                                return (
                                    <tr
                                        className={index % 2 ? 'bg-white' : 'bg-[#f5f6ff]'}
                                        key={index}
                                    >
                                        <td className="w-[5%] border text-center py-[15px] px-2  text-sm">
                                            {index + 1}
                                        </td>
                                        <td className="w-[20%] border text-center py-[15px] px-2 text-sm">
                                            {user.username}
                                        </td>
                                        <td className="w-[25%] border text-center py-[15px] px-2 text-sm">
                                            {user.fullName}
                                        </td>
                                        <td className="w-[20%] border text-center py-[15px] px-2 text-sm">
                                            {user.role === 'admin'
                                                ? 'All buildings'
                                                : user.buildings
                                                      .map((buildingId) => {
                                                          return buildingOptions.find(
                                                              (option) =>
                                                                  option.value === buildingId,
                                                          )?.label;
                                                      })
                                                      .join(', ')}
                                        </td>
                                        <td className="w-[10%] border text-center py-[15px] px-2 text-sm">
                                            {user.role}
                                        </td>
                                        {user.role === 'admin' ? (
                                            <>
                                                <td className="w-[10%] border text-center items-center py-[15px] px-2 text-sm"></td>
                                                <td className="w-[10%] border text-center items-center py-[15px] px-2 text-sm"></td>
                                            </>
                                        ) : (
                                            <>
                                                <td className="w-[10%] border text-center items-center py-[15px] px-2 text-sm">
                                                    <div className="w-full flex justify-center ">
                                                        <div
                                                            className="bg-sky-500 cursor-pointer w-[50px] h-[36px] flex items-center justify-center rounded-full text-white"
                                                            data-index={index}
                                                            onClick={handleOpenEditUserModal}
                                                        >
                                                            <FontAwesomeIcon icon={faPenToSquare} />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="w-[10%] border text-center items-center py-[15px] px-2 text-sm">
                                                    <div className="w-full flex justify-center ">
                                                        <div
                                                            className="bg-[#fa0000] cursor-pointer w-[50px] h-[36px] flex items-center justify-center rounded-full text-white"
                                                            data-index={index}
                                                            onClick={handleOpenDeleteUserModal}
                                                        >
                                                            <FontAwesomeIcon icon={faTrashCan} />
                                                        </div>
                                                    </div>
                                                </td>
                                            </>
                                        )}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <TablePagination
                        component="div"
                        count={users.data.data.length}
                        onPageChange={handlePageChange}
                        onRowsPerPageChange={handleLimitChange}
                        page={page}
                        rowsPerPage={limit}
                        rowsPerPageOptions={[5, 10, 25]}
                    />

                    <ModalContent show={showAddUserModal} setShow={setShowAddUserModal}>
                        <ModalHeader>
                            <h2>Add new user</h2>
                        </ModalHeader>
                        <ModalBody>
                            <OnChangeInput
                                type="text"
                                label="Full Name"
                                placeholder="Type Full Name"
                                name="fullName"
                                onChange={handleOnChange}
                                value={input.fullName}
                            />
                            {validateInput('fullName')}
                            <OnChangeInput
                                type="text"
                                label="User Name"
                                placeholder="Type User Name"
                                name="username"
                                onChange={handleOnChange}
                                value={input.username}
                            />
                            {validateInput('username')}
                            <OnChangeInput
                                type="password"
                                label="Password"
                                placeholder="Type password"
                                name="password"
                                onChange={handleOnChange}
                                value={input.password}
                            />
                            {validateInput('password')}
                            <OnChangeInput
                                type="password"
                                label="Confirm Password"
                                placeholder="Type confirm password"
                                name="confirmPassword"
                                onChange={handleOnChange}
                                value={input.confirmPassword}
                            />
                            {validateInput('confirmPassword')}
                            <label htmlFor="" className=" text-[14px] font-medium text-[#16192c]">
                                Managed buildings
                            </label>
                            <Select
                                isMulti
                                className="mt-[8px] mb-[20px]"
                                options={buildingOptions}
                                value={input.buildings}
                                onChange={handleChangeBuildings}
                            />
                            {validateBuildings()}
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                bgColor="bg-[#565e64]"
                                tColor="text-white"
                                title="Close"
                                cName="mr-[10px]"
                                onClick={() => setShowAddUserModal(false)}
                            />
                            <Button
                                bgColor="bg-[#5c60f5]"
                                tColor="text-white"
                                title="Add"
                                onClick={handleAddUser}
                            />
                        </ModalFooter>
                    </ModalContent>

                    <ModalContent show={showEditUserModal} setShow={setShowEditUserModal}>
                        <ModalHeader>
                            <h2>Edit user</h2>
                        </ModalHeader>
                        <ModalBody>
                            <OnChangeInput
                                type="text"
                                label="Full Name"
                                placeholder="Type Full Name"
                                name="fullName"
                                onChange={handleOnChange}
                                value={input.fullName}
                            />
                            {validateInput('fullName')}
                            <label htmlFor="" className=" text-[14px] font-medium text-[#16192c]">
                                Managed buildings
                            </label>
                            <Select
                                isMulti
                                className="mt-[8px] mb-[20px]"
                                options={buildingOptions}
                                value={input.buildings}
                                onChange={handleChangeBuildings}
                            />
                            {validateBuildings()}
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                bgColor="bg-[#565e64]"
                                tColor="text-white"
                                title="Close"
                                cName="mr-[10px]"
                                onClick={() => setShowEditUserModal(false)}
                            />
                            <Button
                                bgColor="bg-[#5c60f5]"
                                tColor="text-white"
                                title="Update"
                                onClick={handleEditUser}
                            />
                        </ModalFooter>
                    </ModalContent>

                    <ModalContent show={showDeleteUserModal} setShow={setShowDeleteUserModal}>
                        <ModalHeader>
                            <h2>Delete user</h2>
                        </ModalHeader>
                        <ModalBody>Do you want to delete this user!</ModalBody>
                        <ModalFooter>
                            <Button
                                bgColor="bg-[#565e64]"
                                tColor="text-white"
                                title="Close"
                                cName="mr-[10px]"
                                onClick={() => setShowDeleteUserModal(false)}
                            />
                            <Button
                                bgColor="bg-[#5c60f5]"
                                tColor="text-white"
                                title="Delete"
                                onClick={handleDeleteUser}
                            />
                        </ModalFooter>
                    </ModalContent>

                    <ToastContainer autoClose={5000} />
                </div>
            ) : (
                <Loading></Loading>
            )}
        </>
    );
}
