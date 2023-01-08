import React, { useState, useEffect } from 'react';
import { SearchIcon } from '../Icon/Icon';
import Modal from '../Modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { getallturn } from '../../redux/Action/TurnAction';
import Loading from '../Loading/Loading';
import { TablePagination } from '@mui/material';
export default function Table() {
      const dispatch = useDispatch();
      const [showModal, setShowModal] = useState(false);
      const [value, setValue] = useState('');
      const turnList = useSelector((state) => state.turnList);
      const { turn, loading } = turnList;

      useEffect(() => {
            dispatch(getallturn());
      }, [dispatch]);
      if (turn) {
            console.log(turn.data.data.length);
      }
      const [limit, setLimit] = useState(10);
      const [page, setPage] = useState(0);

      const handleLimitChange = (event) => {
            setLimit(event.target.value);
      };

      const handlePageChange = (event, newPage) => {
            setPage(newPage);
      };

      const FormatTime = (time) => {
            let date = new Date(Date.parse(time));
            const weekday = [
                  'Sunday',
                  'Monday',
                  'Tuesday',
                  'Wednesday',
                  'Thursday',
                  'Friday',
                  'Saturday',
            ];
            const month = [
                  'January',
                  'February',
                  'March',
                  'April',
                  'May',
                  'June',
                  'July',
                  'August',
                  'September',
                  'October',
                  'November',
                  'December',
            ];
            let day =
                  weekday[date.getDay()] +
                  ', ' +
                  month[date.getMonth()] +
                  ' ' +
                  date.getDate() +
                  ', ' +
                  date.getFullYear() +
                  ' ' +
                  date.toLocaleTimeString();

            return day;
      };

      return (
            <>
                  {loading ? (
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
                                          {turn.data.data
                                                .slice(limit * page, limit * page + limit)
                                                .map((user, index) => {
                                                      if (index % 2 === 0) {
                                                            return (
                                                                  <tr
                                                                        className="bg-white"
                                                                        key={index}
                                                                  >
                                                                        <td className="w-[20%] border text-center py-[15px] px-2  text-sm">
                                                                              {index + 1}
                                                                        </td>
                                                                        <td className="w-[10%] border text-center py-[15px] px-2 text-sm">
                                                                              {user.person
                                                                                    .firstName ===
                                                                              undefined
                                                                                    ? 'undefined'
                                                                                    : user.person
                                                                                            .firstName}
                                                                        </td>
                                                                        <td className="w-[10%] border text-center py-[15px] px-2 text-sm">
                                                                              {user.person
                                                                                    .lastName ===
                                                                              undefined
                                                                                    ? 'undefined'
                                                                                    : user.person
                                                                                            .lastName}
                                                                        </td>
                                                                        <td className="w-[10%] border text-center py-[15px] px-2 text-sm">
                                                                              {user.isMasked ===
                                                                              true
                                                                                    ? 'Accept'
                                                                                    : 'Invalid'}
                                                                        </td>
                                                                        <td className="w-[30%] border text-center py-[15px] px-2 text-sm">
                                                                              {FormatTime(
                                                                                    user.time,
                                                                              )}
                                                                        </td>
                                                                        <td className="w-[20%] border  text-center items-center py-[15px] px-2 text-sm">
                                                                              <div className="w-full flex justify-center ">
                                                                                    <div
                                                                                          className="bg-[#4a4fb0] cursor-pointer w-[50px] h-[36px] flex items-center justify-center rounded-full "
                                                                                          onClick={() => {
                                                                                                setValue(
                                                                                                      user.timeaccess,
                                                                                                );
                                                                                                setShowModal(
                                                                                                      true,
                                                                                                );
                                                                                          }}
                                                                                    >
                                                                                          <SearchIcon
                                                                                                fill={
                                                                                                      'white'
                                                                                                }
                                                                                                width={
                                                                                                      '16px'
                                                                                                }
                                                                                                height={
                                                                                                      '16px'
                                                                                                }
                                                                                          />
                                                                                    </div>
                                                                              </div>
                                                                        </td>
                                                                  </tr>
                                                            );
                                                      } else {
                                                            return (
                                                                  <tr
                                                                        className="bg-[#f5f6ff]"
                                                                        key={index}
                                                                  >
                                                                        <td className="w-[20%] border text-center py-[15px] px-2  text-sm">
                                                                              {index + 1}
                                                                        </td>
                                                                        <td className="w-[10%] border text-center py-[15px] px-2 text-sm">
                                                                              {user.person
                                                                                    .firstName ===
                                                                              undefined
                                                                                    ? 'undefined'
                                                                                    : user.person
                                                                                            .firstName}
                                                                        </td>
                                                                        <td className="w-[10%] border text-center py-[15px] px-2 text-sm">
                                                                              {user.person
                                                                                    .lastName ===
                                                                              undefined
                                                                                    ? 'undefined'
                                                                                    : user.person
                                                                                            .lastName}
                                                                        </td>
                                                                        <td className="w-[10%] border text-center py-[15px] px-2 text-sm">
                                                                              {user.isMasked ===
                                                                              true
                                                                                    ? 'Accept'
                                                                                    : 'Invalid'}
                                                                        </td>
                                                                        <td className="w-[30%] border text-center py-[15px] px-2 text-sm">
                                                                              {FormatTime(
                                                                                    user.time,
                                                                              )}
                                                                        </td>
                                                                        <td className="w-[20%] border text-center py-[15px] px-2 text-sm">
                                                                              <div className="w-full flex justify-center ">
                                                                                    <div
                                                                                          className="bg-[#4a4fb0] cursor-pointer w-[50px] h-[36px] flex items-center justify-center rounded-full "
                                                                                          onClick={() => {
                                                                                                setValue(
                                                                                                      user.timeaccess,
                                                                                                );
                                                                                                setShowModal(
                                                                                                      true,
                                                                                                );
                                                                                          }}
                                                                                    >
                                                                                          <SearchIcon
                                                                                                fill={
                                                                                                      'white'
                                                                                                }
                                                                                                width={
                                                                                                      '16px'
                                                                                                }
                                                                                                height={
                                                                                                      '16px'
                                                                                                }
                                                                                          />
                                                                                    </div>
                                                                              </div>
                                                                        </td>
                                                                  </tr>
                                                            );
                                                      }
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
                              <Modal value={value} show={showModal} setShow={setShowModal} />
                        </div>
                  ) : (
                        <Loading></Loading>
                  )}
            </>
      );
}
