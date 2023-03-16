import React, { useState, useEffect, useRef } from 'react';
import { SearchIcon } from '../Icon/Icon';
import ImgModal from '../Modal/ImgModal';
import { useDispatch, useSelector } from 'react-redux';
import { getallturn } from '../../redux/Action/TurnAction';
import { io } from 'socket.io-client';
import Loading from '../Loading/Loading';
import date from 'date-and-time';
import { TablePagination } from '@mui/material';
export default function TurnTable() {
    const dispatch = useDispatch();
    const [target, setTarget] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const turnList = useSelector((state) => state.turnList);
    const { turn, loading } = turnList;
    const [data, setData] = useState();

    useEffect(() => {
        dispatch(getallturn());
    }, [dispatch]);

    useEffect(() => {
        if (loading) {
            setData(turn.data.data);
        }
    }, [loading]);

    const socket = useRef();

    useEffect(() => {
        console.log(789);
        socket.current = io('http://localhost:8000/api/socket');
        socket.current.on('newTurn', (turn) => {
            setData((data) => [...data, turn]);
        });
    }, []);

    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);

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

    return (
        <>
            {loading && data !== undefined ? (
                <div className="shadow-3xl px-[10px] py-[20px] rounded-xl bg-white">
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
                        count={turn.data.data.length}
                        onPageChange={handlePageChange}
                        onRowsPerPageChange={handleLimitChange}
                        page={page}
                        rowsPerPage={limit}
                        rowsPerPageOptions={[5, 10, 25]}
                    />
                    <ImgModal
                        show={showModal}
                        setShow={setShowModal}
                        image={turn.data.data[target].images}
                    />
                </div>
            ) : (
                <Loading></Loading>
            )}
        </>
    );
}
