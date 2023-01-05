import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getallturn } from '../../redux/Action/TurnAction';
import Loading from '../../component/Loading/Loading';
export default function Home() {
      const dispatch = useDispatch();
      const turnList = useSelector((state) => state.turnList);
      const { turn, loading, error } = turnList;

      useEffect(() => {
            dispatch(getallturn());
      }, [dispatch]);
      if (loading && !error && turn !== null) {
            console.log(turn.data.data);
            console.log(turn.data.data[0]);
      }

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
                        <>
                              <h1 className="font-normal text-[36px] mb-[10px]">Home</h1>
                              <div className="rounded-xl shadow-3xl px-[20px] bg-white py-[20px] h-[90%] flex flex-wrap">
                                    <div className="w-[50%] h-[400px] bg-white">
                                          <div className="w-full h-full bg-slate-500"></div>
                                    </div>
                                    <div className="w-[50%] px-[20px]">
                                          <h1 className="text-[28px] font-normal">
                                                Current Access
                                          </h1>
                                          <p className="text-[24px]">
                                                First Name: {turn.data.data[0].person.firstName}
                                          </p>
                                          <p className="text-[24px]">
                                                Last Name: {turn.data.data[0].person.lastName}
                                          </p>
                                          <p className="text-[24px]">
                                                Access Time: {FormatTime(turn.data.data[0].time)}
                                          </p>
                                    </div>
                              </div>
                        </>
                  ) : (
                        <Loading></Loading>
                  )}
            </>
      );
}
