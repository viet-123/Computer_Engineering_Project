import React, { useState, useEffect } from 'react';
import { SearchIcon } from '../Icon/Icon';
import ImgModal from '../Modal/ImgModal';
import ModalContent, {
    ModalBody,
    ModalFooter,
    ModalHeader,
} from '../../component/Modal/component/modal/ModalContent';
import OnChangeInput from '../../component/Input/OnChangeInput';
import Button from '../../component/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPeople, deletePerson, addPerson } from '../../redux/Action/personAction';
import Loading from '../Loading/Loading';
import Warning from '../../component/Warning/Warning';
import { CancelIcon } from '../../component/Icon/Icon';
import date from 'date-and-time';
import { snakeCase } from 'snake-case';
import { TablePagination } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
export default function PersonTable() {
    const storageURL = 'https://test8afa.blob.core.windows.net/testcontainer/';
    const dispatch = useDispatch();
    const [target, setTarget] = useState(0);
    const [showImgModal, setShowImgModal] = useState(false);
    const [showAddPersonModal, setShowAddPersonModal] = useState(false);
    const [showEditPersonModal, setShowEditPersonModal] = useState(false);
    const [showDeletePersonModal, setShowDeletePersonModal] = useState(false);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);
    const [input, setInput] = useState({
        firstName: '',
        lastName: '',
    });
    const [showError, setShowError] = useState(false);
    const [img, setImg] = useState([]);

    const { people, loading } = useSelector((state) => state.personList);

    const personDeleted = useSelector((state) => state.personDeleted);
    const deletedError = personDeleted.error;
    const deletedIsFetching = personDeleted.isfetching;

    const personAdded = useSelector((state) => state.personAdded);
    const addedError = personAdded.error;
    const addedIsFetching = personAdded.isfetching;
    const addedData = personAdded.person;

    useEffect(() => {
        dispatch(getAllPeople());
    }, [dispatch]);

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

    const handleOpenImgModal = (e) => {
        setTarget(e.currentTarget.dataset.index);
        const curPerson = people.data.data[e.currentTarget.dataset.index];
        const imgName = `${storageURL}${snakeCase(curPerson.lastName)}-${curPerson._id}`;
        setImg([`${imgName}-${1}.png`, `${imgName}-${2}.png`, `${imgName}-${3}.png`]);
        setShowImgModal(true);
    };

    const handleOpenAddUserModal = () => {
        input.firstName = '';
        input.lastName = '';
        setShowError(false);
        setShowAddPersonModal(true);
    };

    const handleAddPerson = () => {
        if (input.firstName === '' || input.lastName === '') {
            setShowError(true);
        } else {
            dispatch(addPerson(input.firstName, input.lastName));
        }
    };

    useEffect(() => {
        if (addedIsFetching) {
            if (!addedError) {
                people.data.data.push(addedData.data.data);
                notify('success', 'Add person successfully!');
                setShowAddPersonModal(false);
            } else {
                notify('error', 'Add person unsuccessfully!');
                setShowAddPersonModal(false);
            }
        }
    }, [addedError, addedIsFetching]);

    const handleOpenEditUserModal = (e) => {
        setTarget(e.currentTarget.dataset.index);
        input.firstName = people.data.data[target].firstName;
        input.lastName = people.data.data[target].lastName;
        setShowEditPersonModal(true);
    };

    const handleEditPerson = () => {};

    const handleOpenDeletePersonModal = (e) => {
        setTarget(e.currentTarget.dataset.index);
        setShowDeletePersonModal(true);
    };

    const handleDeletePerson = () => {
        dispatch(deletePerson(people.data.data[target]._id));
    };

    useEffect(() => {
        if (deletedIsFetching) {
            if (!deletedError) {
                people.data.data.splice(target, 1);
                notify('success', 'Delete person successfully!');
                setShowDeletePersonModal(false);
            } else {
                notify('error', 'Delete person unsuccessfully!');
                setShowDeletePersonModal(false);
            }
        }
    }, [deletedError, deletedIsFetching]);

    const formatTime = (time) => {
        let now = new Date(Date.parse(time));
        return date.format(now, 'YYYY/MM/DD HH:mm:ss', true);
    };

    return (
        <>
            {loading ? (
                <div className="shadow-3xl px-[10px] py-[20px] rounded-xl bg-white">
                    <div className="flex justify-end">
                        <Button
                            bgColor="bg-[#5c60f5]"
                            tColor="text-white"
                            title="Add new person"
                            onClick={handleOpenAddUserModal}
                        />
                    </div>
                    <table className="min-w-full bg-white mt-[20px] ">
                        <thead className="border-collapse border">
                            <tr>
                                <th className="w-[10%] border text-center py-[15px] px-2  font-semibold text-sm">
                                    Ordinal number
                                </th>
                                <th className="w-[20%] border text-center py-[15px] px-2 font-semibold text-sm">
                                    First Name
                                </th>
                                <th className="w-[20%] border text-center py-[15px] px-2 font-semibold text-sm">
                                    Last Name
                                </th>
                                <th className="w-[20%] border text-center py-[15px] px-2 font-semibold text-sm">
                                    Last access
                                </th>
                                <th className="w-[10%] border text-center py-[15px] px-2 font-semibold text-sm">
                                    Image details
                                </th>
                                {/* <th className="w-[10%] border text-center py-[15px] px-2 font-semibold text-sm">
                                    Edit person info
                                </th> */}
                                <th className="w-[10%] border text-center py-[15px] px-2 font-semibold text-sm">
                                    Delete person
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {people.data.data
                                .slice(limit * page, limit * page + limit)
                                .map((person, index) => {
                                    return (
                                        <tr
                                            className={index % 2 ? 'bg-white' : 'bg-[#f5f6ff]'}
                                            key={index}
                                        >
                                            <td className="w-[10%] border text-center py-[15px] px-2  text-sm">
                                                {index + 1}
                                            </td>
                                            <td className="w-[20%] border text-center py-[15px] px-2 text-sm">
                                                {person.firstName}
                                            </td>
                                            <td className="w-[20%] border text-center py-[15px] px-2 text-sm">
                                                {person.lastName}
                                            </td>
                                            <td className="w-[20%] border text-center py-[15px] px-2 text-sm">
                                                {!person.turns.length
                                                    ? 'No access'
                                                    : formatTime(
                                                          person.turns[person.turns.length - 1]
                                                              .time,
                                                      )}
                                            </td>
                                            <td className="w-[10%] border  text-center items-center py-[15px] px-2 text-sm">
                                                <div className="w-full flex justify-center ">
                                                    <div
                                                        className="bg-[#4a4fb0] cursor-pointer w-[50px] h-[36px] flex items-center justify-center rounded-full "
                                                        data-index={index}
                                                        onClick={handleOpenImgModal}
                                                    >
                                                        <SearchIcon
                                                            fill={'white'}
                                                            width={'16px'}
                                                            height={'16px'}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            {/* <td className="w-[10%] border text-center items-center py-[15px] px-2 text-sm">
                                                <div className="w-full flex justify-center ">
                                                    <div
                                                        className="bg-[#4a4fb0] cursor-pointer w-[50px] h-[36px] flex items-center justify-center rounded-full text-white"
                                                        data-index={index}
                                                        onClick={handleOpenEditUserModal}
                                                    >
                                                        <FontAwesomeIcon icon={faPenToSquare} />
                                                    </div>
                                                </div>
                                            </td> */}
                                            <td className="w-[1 0%] border text-center items-center py-[15px] px-2 text-sm">
                                                <div className="w-full flex justify-center ">
                                                    <div
                                                        className="bg-[#fa0000] cursor-pointer w-[50px] h-[36px] flex items-center justify-center rounded-full text-white"
                                                        data-index={index}
                                                        onClick={handleOpenDeletePersonModal}
                                                    >
                                                        <FontAwesomeIcon icon={faTrashCan} />
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                    <TablePagination
                        component="div"
                        count={people.data.data.length}
                        onPageChange={handlePageChange}
                        onRowsPerPageChange={handleLimitChange}
                        page={page}
                        rowsPerPage={limit}
                        rowsPerPageOptions={[5, 10, 25]}
                    />
                    <ImgModal show={showImgModal} setShow={setShowImgModal} image={img} />

                    <ModalContent show={showAddPersonModal} setShow={setShowAddPersonModal}>
                        <ModalHeader>
                            <h2>Add new person</h2>
                        </ModalHeader>
                        <ModalBody>
                            <OnChangeInput
                                type="text"
                                label="First Name"
                                placeholder="Type your First Name"
                                name="firstName"
                                onChange={handleOnChange}
                                value={input.firstName}
                            />
                            {validateInput('firstName')}
                            <OnChangeInput
                                type="text"
                                label="Last Name"
                                placeholder="Type your Last Name"
                                name="lastName"
                                onChange={handleOnChange}
                                value={input.lastName}
                            />
                            {validateInput('lastName')}
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                bgColor="bg-[#565e64]"
                                tColor="text-white"
                                title="Close"
                                cName="mr-[10px]"
                                onClick={() => setShowAddPersonModal(false)}
                            />
                            <Button
                                bgColor="bg-[#5c60f5]"
                                tColor="text-white"
                                title="Add"
                                onClick={handleAddPerson}
                            />
                        </ModalFooter>
                    </ModalContent>

                    <ModalContent show={showEditPersonModal} setShow={setShowEditPersonModal}>
                        <ModalHeader>
                            <h2>Edit person</h2>
                        </ModalHeader>
                        <ModalBody>
                            <OnChangeInput
                                type="text"
                                label="First Name"
                                placeholder="Type your First Name"
                                name="firstName"
                                onChange={handleOnChange}
                                value={input.firstName}
                            />
                            {validateInput('firstName')}
                            <OnChangeInput
                                type="text"
                                label="Last Name"
                                placeholder="Type your Last Name"
                                name="lastName"
                                onChange={handleOnChange}
                                value={input.lastName}
                            />
                            {validateInput('lastName')}
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                bgColor="bg-[#565e64]"
                                tColor="text-white"
                                title="Close"
                                cName="mr-[10px]"
                                onClick={() => setShowEditPersonModal(false)}
                            />
                            <Button
                                bgColor="bg-[#5c60f5]"
                                tColor="text-white"
                                title="Edit"
                                onClick={handleEditPerson}
                            />
                        </ModalFooter>
                    </ModalContent>

                    <ModalContent show={showDeletePersonModal} setShow={setShowDeletePersonModal}>
                        <ModalHeader>
                            <h2>Delete user</h2>
                        </ModalHeader>
                        <ModalBody>
                            <h2 className="italic">Do you want to delete this person?</h2>
                            {people ? (
                                <p className="mt-[10px]">
                                    {people.data.data[target].firstName}{' '}
                                    {people.data.data[target].lastName}
                                </p>
                            ) : (
                                <></>
                            )}
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                bgColor="bg-[#565e64]"
                                tColor="text-white"
                                title="Close"
                                cName="mr-[10px]"
                                onClick={() => setShowDeletePersonModal(false)}
                            />
                            <Button
                                bgColor="bg-[#5c60f5]"
                                tColor="text-white"
                                title="Delete"
                                onClick={handleDeletePerson}
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
