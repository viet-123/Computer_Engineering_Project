import React, { useState, useEffect } from 'react';
import ImgModal from '../Modal/ImgModal';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTurns } from '../../redux/Action/TurnAction';
import Loading from '../Loading/Loading';
import date from 'date-and-time';
import Select from 'react-select';
import { TablePagination } from '@mui/material';
import { getManagedBuildings } from '../../redux/Action/buildingAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

export default function TurnTable() {
    const dispatch = useDispatch();
    const [target, setTarget] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState();
    const [initialData, setInitialData] = useState();
    const [buildingOptions, setBuildingOptions] = useState([
        { value: '', label: 'All managed buildings' },
    ]);
    const [building, setBuilding] = useState({ value: '', label: 'All managed buildings' });
    const [unknownFilter, setUnknownFilter] = useState({
        value: '',
        label: 'Both unknown and known',
    });
    const [maskedFilter, setMaskedFilter] = useState({
        value: '',
        label: 'Both masked and no masked',
    });
    const [searchString, setSearchString] = useState('');
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);

    const managedBuildings = useSelector((state) => state.userLogin).user.data.user.buildings;
    const role = useSelector((state) => state.userLogin).user.data.user.role;

    const { turns, loading } = useSelector((state) => state.turnList);
    const { buildings } = useSelector((state) => state.buildingManaged);

    useEffect(() => {
        dispatch(getAllTurns());
        dispatch(getManagedBuildings());
    }, [dispatch]);

    useEffect(() => {
        if (loading) {
            if (role === 'admin') {
                setData(turns.data.data);
                setInitialData(turns.data.data);
            } else {
                setData(
                    turns.data.data.filter((turn) => managedBuildings.includes(turn.building._id)),
                );
                setInitialData(
                    turns.data.data.filter((turn) => managedBuildings.includes(turn.building._id)),
                );
            }
        }
    }, [loading]);

    useEffect(() => {
        if (buildings) {
            const options = [];
            buildings.data.data.forEach((building) =>
                options.push({ value: building._id, label: building.name }),
            );
            setBuildingOptions([{ value: '', label: 'All managed building' }, ...options]);
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

    useEffect(() => {
        if (initialData) {
            var result = initialData;
            if (building.value)
                result = result.filter((turn) => turn.building?._id === building.value);
            if (maskedFilter.value) {
                if (maskedFilter.value === 'Masked')
                    result = result.filter((turn) => turn.isMasked);
                else result = result.filter((turn) => !turn.isMasked);
            }
            if (unknownFilter.value) {
                if (unknownFilter.value === 'Unknown')
                    result = result.filter((turn) => !turn.person);
                else result = result.filter((turn) => turn.person);
            }
            result = result.filter((turn) => {
                return (turn.person?.firstName + ' ' + turn.person?.lastName)
                    .toLowerCase()
                    .includes(searchString.toLowerCase());
            });
            setData(result);
        }
        setPage(0);
    }, [building, maskedFilter, unknownFilter, searchString]);

    return (
        <>
            {loading && data !== undefined ? (
                <div className="shadow-3xl px-[10px] py-[20px] rounded-xl bg-white">
                    <div className="mb-[20px] grid grid-cols-4 gap-4">
                        <div>
                            <Select
                                options={buildingOptions}
                                value={building}
                                onChange={(choice) => setBuilding(choice)}
                            />
                        </div>
                        <div>
                            <Select
                                options={[
                                    { value: '', label: 'Both unknown and known' },
                                    { value: 'Known', label: 'Known' },
                                    { value: 'Unknown', label: 'Unknow' },
                                ]}
                                value={unknownFilter}
                                onChange={(choice) => setUnknownFilter(choice)}
                            />
                        </div>
                        <div>
                            <Select
                                options={[
                                    { value: '', label: 'Both masked and no masked' },
                                    { value: 'Masked', label: 'Masked' },
                                    { value: 'No masked', label: 'No masked' },
                                ]}
                                value={maskedFilter}
                                onChange={(choice) => setMaskedFilter(choice)}
                            />
                        </div>
                        <div>
                            <input
                                className="w-full py-[6px] px-[20px] text-[16px] font-normal text-[#16192c] bg-white border-solid border border-[#e7eaf0] rounded-md
          shadow-blue-blur focus:shadow-blue-focus focus:outline-none"
                                placeholder="Search by name"
                                value={searchString}
                                onChange={(e) => setSearchString(e.target.value)}
                            />
                        </div>
                    </div>

                    <table className="min-w-full bg-white ">
                        <thead className="border-collapse border">
                            <tr>
                                <th className="w-[10%] border text-center py-[15px] px-2  font-semibold text-sm">
                                    #
                                </th>
                                <th className="w-[20%] border text-center py-[15px] px-2 font-semibold text-sm">
                                    First Name
                                </th>
                                <th className="w-[20%] border text-center py-[15px] px-2 font-semibold text-sm">
                                    Last Name
                                </th>
                                <th className="w-[10%] border text-center py-[15px] px-2 font-semibold text-sm">
                                    IsMask
                                </th>
                                <th className="w-[10%] border text-center py-[15px] px-2 font-semibold text-sm">
                                    Building
                                </th>
                                <th className="w-[20%] border text-center py-[15px] px-2 font-semibold text-sm">
                                    Time Access
                                </th>
                                <th className="w-[10%] border text-center py-[15px] px-2 font-semibold text-sm">
                                    Image details
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.slice(limit * page, limit * page + limit).map((turn, index) => {
                                return (
                                    <tr
                                        className={index % 2 ? 'bg-white' : 'bg-[#f5f6ff]'}
                                        key={index}
                                    >
                                        <td className="w-[10%] border text-center py-[15px] px-2  text-sm">
                                            {index + 1}
                                        </td>
                                        <td className="w-[20%] border text-center py-[15px] px-2 text-sm">
                                            {turn.person === null
                                                ? 'Unknown'
                                                : turn.person.firstName}
                                        </td>
                                        <td className="w-[20%] border text-center py-[15px] px-2 text-sm">
                                            {turn.person === null
                                                ? 'Unknown'
                                                : turn.person.lastName}
                                        </td>
                                        <td className="w-[10%] border text-center py-[15px] px-2 text-sm">
                                            {turn.isMasked === true ? 'Mask' : 'No Mask'}
                                        </td>
                                        <td className="w-[10%] border text-center py-[15px] px-2 text-sm">
                                            {turn.building?.name}
                                        </td>
                                        <td className="w-[20%] border text-center py-[15px] px-2 text-sm">
                                            {FormatTime(turn.time)}
                                        </td>
                                        <td className="w-[10%] border  text-center items-center py-[15px] px-2 text-sm">
                                            <div className="w-full flex justify-center ">
                                                <div
                                                    className="bg-lime-500 cursor-pointer w-[50px] h-[36px] flex items-center justify-center rounded-full text-white"
                                                    data-index={index}
                                                    onClick={(e) => {
                                                        setTarget(e.currentTarget.dataset.index);
                                                        setShowModal(true);
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faEye} />
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
