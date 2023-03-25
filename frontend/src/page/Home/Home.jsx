import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTurns } from '../../redux/Action/TurnAction';
import { getAllBuildings } from '../../redux/Action/buildingAction';
import { io } from 'socket.io-client';
import Loading from '../../component/Loading/Loading';
import date from 'date-and-time';
import Webcam from 'react-webcam';
import Select from 'react-select';
import FadeLoader from 'react-spinners/FadeLoader';
import { TablePagination } from '@mui/material';
export default function Home() {
    const dispatch = useDispatch();

    const [buildingOptions, setBuildingOptions] = useState([]);
    const [cameraOptions, setCameraOptions] = useState([]);
    const [building, setBuilding] = useState('');
    const [camera, setCamera] = useState('');
    const [disableCameraSelect, setDisableCameraSelect] = useState(true);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [showCamera, setShowCamera] = useState(false);

    const turnList = useSelector((state) => state.turnList);
    const turns = turnList.turns;
    const turnLoading = turnList.loading;
    const { buildings, loading } = useSelector((state) => state.buildingList);
    const socket = useRef();

    useEffect(() => {
        dispatch(getAllBuildings());
    }, [dispatch]);

    useEffect(() => {
        if (turns) {
            setData(turns.data.data);
        }
    }, [turns, loading]);

    useEffect(() => {
        socket.current = io('/api/socket');
    }, []);

    useEffect(() => {
        console.log(789);
        socket.current.on('newTurn', (turn) => {
            console.log(turn.building);
            console.log(building);
            if (turn.building === building?.value) {
                setData((data) => [turn, ...data]);
            }
        });
    }, [building]);

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
        if (camera) setShowCamera(true);
        else setShowCamera(false);
    }, [camera]);

    const FormatTime = (time) => {
        let now = new Date(Date.parse(time));
        return date.format(now, 'YYYY/MM/DD HH:mm:ss', true);
    };

    const handleOnChangeBuilding = (choice) => {
        setBuilding(choice);
        setCamera('');
        if (choice) {
            dispatch(getAllTurns(choice.value));
            setDisableCameraSelect(false);
            setCameraOptions([]);
            buildings.data.data
                .find((building) => choice.value === building._id)
                .cameras.forEach((camera) =>
                    setCameraOptions((prev) => [...prev, { value: camera.ip, label: camera.ip }]),
                );
        }
    };

    const handleOnChangeCamera = (choice) => {
        setCamera(choice);
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };
    console.log(data);
    return (
        <>
            {loading ? (
                <>
                    <h1 className="font-normal text-[36px] mb-[10px]">Home</h1>
                    <div className="rounded-xl shadow-3xl px-[20px] bg-white py-[20px] h-[90%] flex flex-wrap">
                        <div className="w-[60%] border-r-2 pr-[20px]">
                            <div className="mb-[20px] flex">
                                <div className="w-[50%] pr-[10px]">
                                    <p className="font-medium mb-[10px]">Building</p>
                                    <Select
                                        options={buildingOptions}
                                        value={building}
                                        onChange={handleOnChangeBuilding}
                                    />
                                </div>
                                <div className="w-[50%] pl-[10px]">
                                    <p className="font-medium mb-[10px]">Camera</p>
                                    <Select
                                        isDisabled={disableCameraSelect}
                                        options={cameraOptions}
                                        value={camera}
                                        onChange={handleOnChangeCamera}
                                    />
                                </div>
                            </div>
                            {showCamera ? (
                                <div className="flex justify-center">
                                    <div className="w-[90%] text-center">
                                        <Webcam />
                                    </div>
                                </div>
                            ) : (
                                <div className="flex justify-center">
                                    <div
                                        className="w-[90%] text-center border-2 grid content-center"
                                        style={{ height: '400px' }}
                                    >
                                        No camera
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="w-[40%] pl-[20px]">
                            <h1 className="text-[28px] font-normal mb-[10px]"> Arrivals</h1>
                            {turnLoading || !building ? (
                                <>
                                    {data.slice(5 * page, 5 * page + 5).map((turn, index) =>
                                        index === 0 && page === 0 ? (
                                            <div
                                                className="rounded-lg border-2 w-100 flex bg-cyan-100 p-[5px] my-[5px]"
                                                key={index}
                                            >
                                                <div className="w-[30%]"></div>
                                                <div className="w-[70%]">
                                                    <p>
                                                        {data[0].person
                                                            ? data[0].person.firstName +
                                                              ' ' +
                                                              data[0].person.lastName
                                                            : 'Unknown'}
                                                    </p>
                                                    {data[0].isMasked ? (
                                                        <b className="text-lime-500">Masked</b>
                                                    ) : (
                                                        <b className="text-red-500">No Masked</b>
                                                    )}
                                                    <p>{FormatTime(data[0].time)}</p>
                                                </div>
                                            </div>
                                        ) : (
                                            <div
                                                className="rounded-lg border-2 w-100 flex p-[5px] my-[5px] mx-[5px]"
                                                key={index}
                                            >
                                                <div className="w-[30%]">
                                                    {/* <img
                                                        src={data.images[0]}
                                                        alt="#"
                                                        className="w-100"
                                                    /> */}
                                                </div>
                                                <div className="w-[70%]">
                                                    <p>
                                                        {turn.person
                                                            ? turn.person.firstName +
                                                              ' ' +
                                                              turn.person.lastName
                                                            : 'Unknown'}
                                                    </p>
                                                    {turn.isMasked ? (
                                                        <b className="text-lime-500">Masked</b>
                                                    ) : (
                                                        <b className="text-red-500">No Masked</b>
                                                    )}
                                                    <p>{FormatTime(turn.time)}</p>
                                                </div>
                                            </div>
                                        ),
                                    )}
                                    <TablePagination
                                        component="div"
                                        count={data.length}
                                        onPageChange={handlePageChange}
                                        page={page}
                                        rowsPerPage={5}
                                        rowsPerPageOptions={[5]}
                                    />{' '}
                                </>
                            ) : (
                                <FadeLoader
                                    color="#36d7b7"
                                    cssOverride={{ display: 'block', margin: '0 auto' }}
                                    loading={loading}
                                    size={150}
                                />
                            )}
                        </div>
                    </div>
                </>
            ) : (
                <Loading></Loading>
            )}
        </>
    );
}
