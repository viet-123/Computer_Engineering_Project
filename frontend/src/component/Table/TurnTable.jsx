import React, { useState, useEffect, useRef } from 'react';
import { SearchIcon } from '../Icon/Icon';
import ImgModal from '../Modal/ImgModal';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTurns } from '../../redux/Action/TurnAction';
import Loading from '../Loading/Loading';
import date from 'date-and-time';
import Select from 'react-select';
import { TablePagination } from '@mui/material';
import { getAllBuildings } from '../../redux/Action/buildingAction';
export default function TurnTable() {
    const dispatch = useDispatch();
    const [target, setTarget] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState();
    const [buildingOptions, setBuildingOptions] = useState([{ value: '', label: 'All Buildings' }]);
    const [building, setBuilding] = useState({ value: '', label: 'All Buildings' });
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);

    const { turns, loading } = useSelector((state) => state.turnList);
    const { buildings } = useSelector((state) => state.buildingList);

    useEffect(() => {
        dispatch(getAllTurns());
        dispatch(getAllBuildings());
    }, [dispatch]);

    useEffect(() => {
        if (loading) {
            setData(turns.data.data);
        }
    }, [loading]);

    useEffect(() => {
        if (buildings) {
            setBuildingOptions([{ value: '', label: 'All Buildings' }]);
            buildings.data.data.forEach((building) =>
                setBuildingOptions((prev) => [
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

    const FormatTime = (time) => {
        let now = new Date(Date.parse(time));
        return date.format(now, 'YYYY/MM/DD HH:mm:ss', true);
    };

    const handleOnChangeBuilding = (choice) => {
        setBuilding(choice);
        setPage(0);
        if (choice.value) {
            setData(turns.data.data.filter((turn) => turn.building === choice.value));
        } else {
            setData(turns.data.data);
        }
    };

    return (
        <>
            {loading && data !== undefined ? (
                <div className="shadow-3xl px-[10px] py-[20px] rounded-xl bg-white">
                    <div className="mb-[20px]" style={{ width: '300px' }}>
                        <Select
                            options={buildingOptions}
                            value={building}
                            onChange={handleOnChangeBuilding}
                        />
                    </div>

                    <table className="min-w-full bg-white ">
                        <thead className="border-collapse border">
                            <tr>
                                <th className="w-[20%] border text-center py-[15px] px-2  font-semibold text-sm">
                                    Ordinal number
                                </th>
                                <th className="w-[10%] border text-center py-[15px] px-2 font-semibold text-sm">
                                    First Name
                                </th>
                                <th className="w-[10%] border text-center py-[15px] px-2 font-semibold text-sm">
                                    Last Name
                                </th>
                                <th className="w-[10%] border text-center py-[15px] px-2 font-semibold text-sm">
                                    IsMask
                                </th>
                                <th className="w-[30%] border text-center py-[15px] px-2 font-semibold text-sm">
                                    Time Access
                                </th>
                                <th className="w-[20%] border text-center py-[15px] px-2 font-semibold text-sm">
                                    Image details
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
                                        <td className="w-[20%] border text-center py-[15px] px-2  text-sm">
                                            {index + 1}
                                        </td>
                                        <td className="w-[10%] border text-center py-[15px] px-2 text-sm">
                                            {user.person === null
                                                ? 'Unknown'
                                                : user.person.firstName}
                                        </td>
                                        <td className="w-[10%] border text-center py-[15px] px-2 text-sm">
                                            {user.person === null
                                                ? 'Unknown'
                                                : user.person.lastName}
                                        </td>
                                        <td className="w-[10%] border text-center py-[15px] px-2 text-sm">
                                            {user.isMasked === true ? 'Mask' : 'No Mask'}
                                        </td>
                                        <td className="w-[30%] border text-center py-[15px] px-2 text-sm">
                                            {FormatTime(user.time)}
                                        </td>
                                        <td className="w-[20%] border  text-center items-center py-[15px] px-2 text-sm">
                                            <div className="w-full flex justify-center ">
                                                <div
                                                    className="bg-[#4a4fb0] cursor-pointer w-[50px] h-[36px] flex items-center justify-center rounded-full "
                                                    data-index={index}
                                                    onClick={(e) => {
                                                        setTarget(e.currentTarget.dataset.index);
                                                        setShowModal(true);
                                                    }}
                                                >
                                                    <SearchIcon
                                                        fill={'white'}
                                                        width={'16px'}
                                                        height={'16px'}
                                                    />
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
                        count={data.length}
                        onPageChange={handlePageChange}
                        onRowsPerPageChange={handleLimitChange}
                        page={page}
                        rowsPerPage={limit}
                        rowsPerPageOptions={[5, 10, 25]}
                    />
                    <ImgModal
                        show={showModal}
                        setShow={setShowModal}
                        image={data[target]?.images ? data[target].images : []}
                    />
                </div>
            ) : (
                <Loading></Loading>
            )}
        </>
    );
}
