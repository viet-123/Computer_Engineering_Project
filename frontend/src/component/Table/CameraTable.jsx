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
    getAllCameras,
    deleteCamera,
    addCamera,
    editCamera,
} from '../../redux/Action/cameraAction';
import { getAllBuildings } from '../../redux/Action/buildingAction';
import Loading from '../Loading/Loading';
import Warning from '../../component/Warning/Warning';
import Select from 'react-select';
import { CancelIcon } from '../../component/Icon/Icon';
import { TablePagination } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
export default function CameraTable() {
    const dispatch = useDispatch();
    const [target, setTarget] = useState(0);
    const [showAddCameraModal, setShowAddCameraModal] = useState(false);
    const [showEditCameraModal, setShowEditCameraModal] = useState(false);
    const [showDeleteCameraModal, setShowDeleteCameraModal] = useState(false);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);
    const [input, setInput] = useState({
        ip: '',
        building: '',
        description: '',
    });
    const [showError, setShowError] = useState(false);
    const [selectOptions, setSelectOptions] = useState([]);

    const { role } = useSelector((state) => state.userLogin).user.data.user;
    const { cameras, loading } = useSelector((state) => state.cameraList);
    const { buildings } = useSelector((state) => state.buildingList);

    const cameraDeleted = useSelector((state) => state.cameraDeleted);
    const deletedError = cameraDeleted.error;
    const deletedIsFetching = cameraDeleted.isfetching;

    const cameraAdded = useSelector((state) => state.cameraAdded);
    const addedError = cameraAdded.error;
    const addedIsFetching = cameraAdded.isfetching;
    const addedData = cameraAdded.camera;

    const cameraEdited = useSelector((state) => state.cameraEdited);
    const editedError = cameraEdited.error;
    const editedIsFetching = cameraEdited.isfetching;
    const editedData = cameraEdited.camera;

    useEffect(() => {
        dispatch(getAllCameras());
        dispatch(getAllBuildings());
    }, [dispatch]);

    useEffect(() => {
        if (buildings) {
            setSelectOptions([]);
            buildings.data.data.forEach((building) =>
                setSelectOptions((prev) => [
                    ...prev,
                    { value: building._id, label: building.name },
                ]),
            );
        }
    }, [buildings]);

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

    const handleOnChangeSelect = (choice) => {
        setInput({ ...input, building: choice });
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
        setInput({
            ip: '',
            building: '',
            description: '',
        });
        setShowError(false);
        setShowAddCameraModal(true);
    };

    const handleAddCamera = () => {
        if (!input.ip || !input.building) {
            setShowError(true);
        } else {
            dispatch(addCamera(input.ip, input.building.value, input.description));
        }
    };

    useEffect(() => {
        if (addedIsFetching) {
            if (!addedError) {
                cameras.data.data.push(addedData.data.data);
                notify('success', 'Add camera successfully!');
                setShowAddCameraModal(false);
            } else {
                notify('error', 'Add camera unsuccessfully!');
                setShowAddCameraModal(false);
            }
        }
    }, [addedError, addedIsFetching]);

    const handleOpenEditCameraModal = (e) => {
        setShowError(false);
        setTarget(e.currentTarget.dataset.index);
        setInput({
            ip: cameras.data.data[e.currentTarget.dataset.index].ip,
            building: selectOptions.find(
                (el) => el.value === cameras.data.data[e.currentTarget.dataset.index].building,
            ),
            description: cameras.data.data[e.currentTarget.dataset.index].description,
        });
        setShowEditCameraModal(true);
    };

    const handleEditCamera = () => {
        if (!input.ip) {
            setShowError(true);
        } else {
            dispatch(
                editCamera(
                    cameras.data.data[target]._id,
                    input.ip,
                    input.building.value,
                    input.description,
                ),
            );
        }
    };

    useEffect(() => {
        if (editedIsFetching) {
            if (!editedError) {
                cameras.data.data[target] = editedData.data.data;
                notify('success', 'Edit camera successfully!');
                setShowEditCameraModal(false);
            } else {
                notify('error', 'Edit camera unsuccessfully!');
                setShowEditCameraModal(false);
            }
        }
    }, [editedError, editedIsFetching]);

    const handleOpenDeleteCameraModal = (e) => {
        setTarget(e.currentTarget.dataset.index);
        setShowDeleteCameraModal(true);
    };

    const handleDeleteCamera = () => {
        dispatch(deleteCamera(cameras.data.data[target]._id));
    };

    useEffect(() => {
        if (deletedIsFetching) {
            if (!deletedError) {
                cameras.data.data.splice(target, 1);
                notify('success', 'Delete camera successfully!');
                setShowDeleteCameraModal(false);
            } else {
                notify('error', 'Delete camera unsuccessfully!');
                setShowDeleteCameraModal(false);
            }
        }
    }, [deletedError, deletedIsFetching]);

    return (
        <>
            {loading ? (
                <div className="shadow-3xl px-[10px] py-[20px] rounded-xl bg-white">
                    {role === 'admin' ? (
                        <div className="flex justify-end">
                            <Button
                                bgColor="bg-[#5c60f5]"
                                tColor="text-white"
                                title="Add new camera"
                                onClick={handleOpenAddUserModal}
                            />
                        </div>
                    ) : (
                        <></>
                    )}

                    <table className="min-w-full bg-white mt-[20px] ">
                        <thead className="border-collapse border">
                            <tr>
                                <th className="w-[10%] border text-center py-[15px] px-2  font-semibold text-sm">
                                    #
                                </th>
                                <th className="w-[20%] border text-center py-[15px] px-2 font-semibold text-sm">
                                    IP address
                                </th>
                                <th className="w-[20%] border text-center py-[15px] px-2 font-semibold text-sm">
                                    Building
                                </th>
                                <th className="w-[20%] border text-center py-[15px] px-2 font-semibold text-sm">
                                    Description
                                </th>
                                {role === 'admin' ? (
                                    <>
                                        {' '}
                                        <th className="w-[10%] border text-center py-[15px] px-2 font-semibold text-sm">
                                            Edit camera
                                        </th>
                                        <th className="w-[10%] border text-center py-[15px] px-2 font-semibold text-sm">
                                            Delete camera
                                        </th>
                                    </>
                                ) : (
                                    <></>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {cameras.data.data
                                .slice(limit * page, limit * page + limit)
                                .map((camera, index) => {
                                    return (
                                        <tr
                                            className={index % 2 ? 'bg-white' : 'bg-[#f5f6ff]'}
                                            key={index}
                                        >
                                            <td className="w-[10%] border text-center py-[15px] px-2  text-sm">
                                                {index + 1}
                                            </td>
                                            <td className="w-[20%] border text-center py-[15px] px-2 text-sm">
                                                {camera.ip}
                                            </td>
                                            <td className="w-[20%] border text-center py-[15px] px-2 text-sm">
                                                {
                                                    buildings?.data?.data.find(
                                                        (building) =>
                                                            camera.building === building._id,
                                                    ).name
                                                }
                                            </td>
                                            <td className="w-[20%] border text-center py-[15px] px-2 text-sm">
                                                {camera.description}
                                            </td>
                                            {role === 'admin' ? (
                                                <>
                                                    {' '}
                                                    <td className="w-[10%] border text-center items-center py-[15px] px-2 text-sm">
                                                        <div className="w-full flex justify-center ">
                                                            <div
                                                                className="bg-sky-500 cursor-pointer w-[50px] h-[36px] flex items-center justify-center rounded-full text-white"
                                                                data-index={index}
                                                                onClick={handleOpenEditCameraModal}
                                                            >
                                                                <FontAwesomeIcon
                                                                    icon={faPenToSquare}
                                                                />
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="w-[1 0%] border text-center items-center py-[15px] px-2 text-sm">
                                                        <div className="w-full flex justify-center ">
                                                            <div
                                                                className="bg-[#fa0000] cursor-pointer w-[50px] h-[36px] flex items-center justify-center rounded-full text-white"
                                                                data-index={index}
                                                                onClick={
                                                                    handleOpenDeleteCameraModal
                                                                }
                                                            >
                                                                <FontAwesomeIcon
                                                                    icon={faTrashCan}
                                                                />
                                                            </div>
                                                        </div>
                                                    </td>
                                                </>
                                            ) : (
                                                <></>
                                            )}
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                    <TablePagination
                        component="div"
                        count={cameras.data.data.length}
                        onPageChange={handlePageChange}
                        onRowsPerPageChange={handleLimitChange}
                        page={page}
                        rowsPerPage={limit}
                        rowsPerPageOptions={[5, 10, 25]}
                    />

                    <ModalContent show={showAddCameraModal} setShow={setShowAddCameraModal}>
                        <ModalHeader>
                            <h2>Add new camera</h2>
                        </ModalHeader>
                        <ModalBody>
                            <OnChangeInput
                                type="text"
                                label="IP address"
                                placeholder="Type the IP address"
                                name="ip"
                                onChange={handleOnChange}
                                value={input.ip}
                            />
                            {validateInput('name')}
                            <div className="mb-[20px]">
                                <label className="text-[14px] font-medium text-[#16192c]">
                                    Building
                                </label>
                                <Select
                                    className="mt-[8px]"
                                    options={selectOptions}
                                    value={selectOptions.find((el) => el.value === input.building)}
                                    onChange={handleOnChangeSelect}
                                />
                            </div>
                            {validateInput('building')}
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
                                onClick={() => setShowAddCameraModal(false)}
                            />
                            <Button
                                bgColor="bg-[#5c60f5]"
                                tColor="text-white"
                                title="Add"
                                onClick={handleAddCamera}
                            />
                        </ModalFooter>
                    </ModalContent>

                    <ModalContent show={showEditCameraModal} setShow={setShowEditCameraModal}>
                        <ModalHeader>
                            <h2>Edit camera</h2>
                        </ModalHeader>
                        <ModalBody>
                            <OnChangeInput
                                type="text"
                                label="IP address"
                                placeholder="Type the IP address"
                                name="ip"
                                onChange={handleOnChange}
                                value={input.ip}
                            />
                            {validateInput('name')}
                            <div className="mb-[20px]">
                                <label className="text-[14px] font-medium text-[#16192c]">
                                    Building
                                </label>
                                <Select
                                    className="mt-[8px]"
                                    options={selectOptions}
                                    value={input.building}
                                    onChange={handleOnChangeSelect}
                                />
                            </div>
                            {validateInput('building')}
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
                                onClick={() => setShowEditCameraModal(false)}
                            />
                            <Button
                                bgColor="bg-[#5c60f5]"
                                tColor="text-white"
                                title="Edit"
                                onClick={handleEditCamera}
                            />
                        </ModalFooter>
                    </ModalContent>

                    <ModalContent show={showDeleteCameraModal} setShow={setShowDeleteCameraModal}>
                        <ModalHeader>
                            <h2>Delete camera</h2>
                        </ModalHeader>
                        <ModalBody>
                            <h2 className="italic">Do you want to delete this camera?</h2>
                            <p className="mt-[10px]">{cameras?.data?.data[target]?.ip}</p>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                bgColor="bg-[#565e64]"
                                tColor="text-white"
                                title="Close"
                                cName="mr-[10px]"
                                onClick={() => setShowDeleteCameraModal(false)}
                            />
                            <Button
                                bgColor="bg-[#5c60f5]"
                                tColor="text-white"
                                title="Delete"
                                onClick={handleDeleteCamera}
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
