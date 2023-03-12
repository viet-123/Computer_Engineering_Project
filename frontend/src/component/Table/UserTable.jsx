import React, { useState, useEffect } from 'react';
import ModalContent, {
    ModalBody,
    ModalFooter,
    ModalHeader,
} from '../../component/Modal/component/modal/ModalContent';
import OnChangeInput from '../../component/Input/OnChangeInput';
import Button from '../../component/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../Loading/Loading';
import Warning from '../../component/Warning/Warning';
import { CancelIcon } from '../../component/Icon/Icon';
import { TablePagination } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUserList } from '../../redux/Action/UserAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

export default function UserTable() {
    const dispatch = useDispatch();
    const [target, setTarget] = useState(-1);
    const [showAddUserModal, setShowAddUserModal] = useState(false);
    const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);
    const [input, setInput] = useState({
        username: '',
        password: '',
        confirmPassword: '',
    });
    const [showError, setShowError] = useState(false);
    const userList = useSelector((state) => state.userList);
    const { users, loading } = userList;

    useEffect(() => {
        dispatch(getUserList());
    }, [dispatch]);

    const handleLimitChange = (event) => {
        setLimit(event.target.value);
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const notify = () => toast.success('Add new user successfully!');

    const handleAddUser = () => {
        if (input.firstName === '' || input.lastName === '') {
            setShowError(true);
        } else {
            notify();
        }
    };

    const handleOnChange = (event) => {
        const { name, value } = event.target;
        setInput({ ...input, [name]: value });
    };

    const validateInput = (name) => {
        if (!input[name] && showError) {
            return (
                <Warning
                    text="Please enter a value"
                    icon={<CancelIcon />}
                    bgColor="bg-[#fff9fa]"
                    textColor="text-[#222]"
                    borColor="border-minus-red"
                />
            );
        }
    };

    const handleOpenAddUserModal = () => {
        this.username = '';
        this.password = '';
        this.confirmPassword = '';
        setShowError(false);
        setShowAddUserModal(true);
    };

    const handleOpenDeleteUserModal = (e) => {
        setTarget(e.currentTarget.dataset.index);
        setShowDeleteUserModal(true);
    };

    const handleDeleteUser = () => {
        console.log(target);
    };

    return (
        <>
            {loading ? (
                <div className="shadow-3xl px-[10px] py-[20px] rounded-xl bg-white">
                    {/* <div className="flex justify-end">
                        <Button
                            bgColor="bg-[#5c60f5]"
                            tColor="text-white"
                            title="Add new user"
                            onClick={handleOpenAddUserModal}
                        />
                    </div> */}
                    <table className="min-w-full bg-white mt-[20px] ">
                        <thead className="border-collapse border">
                            <tr>
                                <th className="w-[30%] border text-center py-[15px] px-2  font-semibold text-sm">
                                    Ordinal number
                                </th>
                                <th className="w-[40%] border text-center py-[15px] px-2 font-semibold text-sm">
                                    User Name
                                </th>
                                {/* <th className="w-[30%] border text-center py-[15px] px-2 font-semibold text-sm">
                                    Delete
                                </th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {users.data.data
                                .slice(limit * page, limit * page + limit)
                                .map((user, index) => {
                                    return (
                                        <tr
                                            className={index % 2 ? 'bg-white' : 'bg-[#f5f6ff]'}
                                            key={index}
                                        >
                                            <td className="w-[30%] border text-center py-[15px] px-2  text-sm">
                                                {index + 1}
                                            </td>
                                            <td className="w-[40%] border text-center py-[15px] px-2 text-sm">
                                                {user.username}
                                            </td>
                                            {/* <td className="w-[30%] border text-center items-center py-[15px] px-2 text-sm">
                                                <div className="w-full flex justify-center ">
                                                    <div
                                                        className="bg-[#fa0000] cursor-pointer w-[50px] h-[36px] flex items-center justify-center rounded-full text-white"
                                                        data-index={index}
                                                        onClick={handleOpenDeleteUserModal}
                                                    >
                                                        <FontAwesomeIcon icon={faTrashCan} />
                                                    </div>
                                                </div>
                                            </td> */}
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
                                label="User Name"
                                placeholder="Type User Name"
                                name="username"
                                onChange={handleOnChange}
                                value={input.username}
                            />
                            {validateInput('firstName')}
                            <OnChangeInput
                                type="password"
                                label="Password"
                                placeholder="Type password"
                                name="password"
                                onChange={handleOnChange}
                                value={input.password}
                            />
                            {validateInput('lastName')}
                            <OnChangeInput
                                type="password"
                                label="Confirm Password"
                                placeholder="Type confirm password"
                                name="confirmPassword"
                                onChange={handleOnChange}
                                value={input.confirmPassword}
                            />
                            {validateInput('lastName')}
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
