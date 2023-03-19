import React, { useState, useEffect } from 'react';
import ModalContent, {
    ModalBody,
    ModalFooter,
    ModalHeader,
} from '../../component/Modal/component/modal/ModalContent';
import OnChangeInput from '../../component/Input/OnChangeInput';
import Button from '../../component/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import {
    getAllBuildings,
    deleteBuilding,
    addBuilding,
    editBuilding,
} from '../../redux/Action/buildingAction';
import Loading from '../Loading/Loading';
import Warning from '../../component/Warning/Warning';
import { CancelIcon } from '../../component/Icon/Icon';
import { TablePagination } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
export default function BuildingTable() {
    const dispatch = useDispatch();
    const [target, setTarget] = useState(0);
    const [showAddBuildingModal, setShowAddBuildingModal] = useState(false);
    const [showEditBuildingModal, setShowEditBuildingModal] = useState(false);
    const [showDeleteBuildingModal, setShowDeleteBuildingModal] = useState(false);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);
    const [input, setInput] = useState({
        name: '',
        description: '',
    });
    const [showError, setShowError] = useState(false);

    const { buildings, loading } = useSelector((state) => state.buildingList);

    const buildingDeleted = useSelector((state) => state.buildingDeleted);
    const deletedError = buildingDeleted.error;
    const deletedIsFetching = buildingDeleted.isfetching;

    const buildingAdded = useSelector((state) => state.buildingAdded);
    const addedError = buildingAdded.error;
    const addedIsFetching = buildingAdded.isfetching;
    const addedData = buildingAdded.building;

    const buildingEdited = useSelector((state) => state.buildingEdited);
    const editedError = buildingEdited.error;
    const editedIsFetching = buildingEdited.isfetching;
    const editedData = buildingEdited.building;

    useEffect(() => {
        dispatch(getAllBuildings());
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

    const handleOpenAddBuildingModal = () => {
        input.name = '';
        input.description = '';
        setShowError(false);
        setShowAddBuildingModal(true);
    };

    const handleAddBuilding = () => {
        if (input.name === '') {
            setShowError(true);
        } else {
            dispatch(addBuilding(input.name, input.description));
        }
    };

    useEffect(() => {
        if (addedIsFetching) {
            if (!addedError) {
                buildings.data.data.push(addedData.data.data);
                notify('success', 'Add building successfully!');
                setShowAddBuildingModal(false);
            } else {
                notify('error', 'Add building unsuccessfully!');
                setShowAddBuildingModal(false);
            }
        }
    }, [addedError, addedIsFetching]);

    const handleOpenEditBuildingModal = (e) => {
        setTarget(e.currentTarget.dataset.index);
        input.name = buildings.data.data[target].name;
        input.description = buildings.data.data[target].description;
        setShowEditBuildingModal(true);
    };

    const handleEditBuilding = () => {
        if (input.name === '') {
            setShowError(true);
        } else {
            dispatch(editBuilding(buildings.data.data[target]._id, input.name, input.description));
        }
    };

    useEffect(() => {
        if (editedIsFetching) {
            if (!editedError) {
                buildings.data.data[target] = editedData.data.data;
                notify('success', 'Edit building successfully!');
                setShowEditBuildingModal(false);
            } else {
                notify('error', 'Edit building unsuccessfully!');
                setShowEditBuildingModal(false);
            }
        }
    }, [editedError, editedIsFetching]);

    const handleOpenDeleteBuildingModal = (e) => {
        setTarget(e.currentTarget.dataset.index);
        setShowDeleteBuildingModal(true);
    };

    const handleDeleteBuilding = () => {
        dispatch(deleteBuilding(buildings.data.data[target]._id));
    };

    useEffect(() => {
        if (deletedIsFetching) {
            if (!deletedError) {
                buildings.data.data.splice(target, 1);
                notify('success', 'Delete building successfully!');
                setShowDeleteBuildingModal(false);
            } else {
                notify('error', 'Delete building unsuccessfully!');
                setShowDeleteBuildingModal(false);
            }
        }
    }, [deletedError, deletedIsFetching]);

    return (
        <>
            {loading ? (
                <div className="shadow-3xl px-[10px] py-[20px] rounded-xl bg-white">
                    <div className="flex justify-end">
                        <Button
                            bgColor="bg-[#5c60f5]"
                            tColor="text-white"
                            title="Add new building"
                            onClick={handleOpenAddBuildingModal}
                        />
                    </div>
                    <table className="min-w-full bg-white mt-[20px] ">
                        <thead className="border-collapse border">
                            <tr>
                                <th className="w-[10%] border text-center py-[15px] px-2  font-semibold text-sm">
                                    Ordinal number
                                </th>
                                <th className="w-[20%] border text-center py-[15px] px-2 font-semibold text-sm">
                                    Name
                                </th>
                                <th className="w-[20%] border text-center py-[15px] px-2 font-semibold text-sm">
                                    Description
                                </th>
                                <th className="w-[10%] border text-center py-[15px] px-2 font-semibold text-sm">
                                    Edit building
                                </th>
                                <th className="w-[10%] border text-center py-[15px] px-2 font-semibold text-sm">
                                    Delete building
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {buildings.data.data
                                .slice(limit * page, limit * page + limit)
                                .map((building, index) => {
                                    return (
                                        <tr
                                            className={index % 2 ? 'bg-white' : 'bg-[#f5f6ff]'}
                                            key={index}
                                        >
                                            <td className="w-[10%] border text-center py-[15px] px-2  text-sm">
                                                {index + 1}
                                            </td>
                                            <td className="w-[20%] border text-center py-[15px] px-2 text-sm">
                                                {building.name}
                                            </td>
                                            <td className="w-[20%] border text-center py-[15px] px-2 text-sm">
                                                {building.description}
                                            </td>
                                            <td className="w-[10%] border text-center items-center py-[15px] px-2 text-sm">
                                                <div className="w-full flex justify-center ">
                                                    <div
                                                        className="bg-[#4a4fb0] cursor-pointer w-[50px] h-[36px] flex items-center justify-center rounded-full text-white"
                                                        data-index={index}
                                                        onClick={handleOpenEditBuildingModal}
                                                    >
                                                        <FontAwesomeIcon icon={faPenToSquare} />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="w-[1 0%] border text-center items-center py-[15px] px-2 text-sm">
                                                <div className="w-full flex justify-center ">
                                                    <div
                                                        className="bg-[#fa0000] cursor-pointer w-[50px] h-[36px] flex items-center justify-center rounded-full text-white"
                                                        data-index={index}
                                                        onClick={handleOpenDeleteBuildingModal}
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
                        count={buildings.data.data.length}
                        onPageChange={handlePageChange}
                        onRowsPerPageChange={handleLimitChange}
                        page={page}
                        rowsPerPage={limit}
                        rowsPerPageOptions={[5, 10, 25]}
                    />

                    <ModalContent show={showAddBuildingModal} setShow={setShowAddBuildingModal}>
                        <ModalHeader>
                            <h2>Add new building</h2>
                        </ModalHeader>
                        <ModalBody>
                            <OnChangeInput
                                type="text"
                                label="Name"
                                placeholder="Type the name"
                                name="name"
                                onChange={handleOnChange}
                                value={input.name}
                            />
                            {validateInput('name')}
                            <OnChangeInput
                                type="text"
                                label="Description"
                                placeholder="Type the description"
                                name="description"
                                onChange={handleOnChange}
                                value={input.description}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                bgColor="bg-[#565e64]"
                                tColor="text-white"
                                title="Close"
                                cName="mr-[10px]"
                                onClick={() => setShowAddBuildingModal(false)}
                            />
                            <Button
                                bgColor="bg-[#5c60f5]"
                                tColor="text-white"
                                title="Add"
                                onClick={handleAddBuilding}
                            />
                        </ModalFooter>
                    </ModalContent>

                    <ModalContent show={showEditBuildingModal} setShow={setShowEditBuildingModal}>
                        <ModalHeader>
                            <h2>Edit building</h2>
                        </ModalHeader>
                        <ModalBody>
                            <OnChangeInput
                                type="text"
                                label="Name"
                                placeholder="Type name"
                                name="name"
                                onChange={handleOnChange}
                                value={input.name}
                            />
                            {validateInput('name')}
                            <OnChangeInput
                                type="text"
                                label="Descriiption"
                                placeholder="Type descriiption"
                                name="description"
                                onChange={handleOnChange}
                                value={input.description}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                bgColor="bg-[#565e64]"
                                tColor="text-white"
                                title="Close"
                                cName="mr-[10px]"
                                onClick={() => setShowEditBuildingModal(false)}
                            />
                            <Button
                                bgColor="bg-[#5c60f5]"
                                tColor="text-white"
                                title="Edit"
                                onClick={handleEditBuilding}
                            />
                        </ModalFooter>
                    </ModalContent>

                    <ModalContent
                        show={showDeleteBuildingModal}
                        setShow={setShowDeleteBuildingModal}
                    >
                        <ModalHeader>
                            <h2>Delete building</h2>
                        </ModalHeader>
                        <ModalBody>
                            <h2 className="italic">Do you want to delete this building?</h2>
                            <p className="mt-[10px]">{buildings?.data?.data[target]?.name}</p>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                bgColor="bg-[#565e64]"
                                tColor="text-white"
                                title="Close"
                                cName="mr-[10px]"
                                onClick={() => setShowDeleteBuildingModal(false)}
                            />
                            <Button
                                bgColor="bg-[#5c60f5]"
                                tColor="text-white"
                                title="Delete"
                                onClick={handleDeleteBuilding}
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
