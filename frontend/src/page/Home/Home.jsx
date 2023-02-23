import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getallturn } from '../../redux/Action/TurnAction';
import Loading from '../../component/Loading/Loading';
import date from 'date-and-time';
import Webcam from 'react-webcam';
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
            let now = new Date(Date.parse(time));
            return date.format(now, 'YYYY/MM/DD HH:mm:ss', true);
      };

      return (
            <>
                  {loading ? (
                        <>
                              <h1 className="font-normal text-[36px] mb-[10px]">Home</h1>
                              <div className="rounded-xl shadow-3xl px-[20px] bg-white py-[20px] h-[90%] flex flex-wrap">
                                    <div className="w-[50%] h-[400px] bg-white">
                                          <Webcam />
                                    </div>

                                    <div className="w-[50%] px-[20px]">
                                          <h1 className="text-[28px] font-normal mb-5">
                                                Latest Access
                                          </h1>
                                          <p className="text-[20px]">
                                                <b>First Name: </b>
                                                {turn.data.data[0].person.firstName}
                                          </p>
                                          <p className="text-[20px]">
                                                <b>Last Name: </b>
                                                {turn.data.data[0].person.lastName}
                                          </p>
                                          {turn.data.data[0].person.masked ? (
                                                <b className="text-[20px] text-lime-500">Masked</b>
                                          ) : (
                                                <b className="text-[20px] text-red-500">
                                                      No Masked
                                                </b>
                                          )}
                                          <p className="text-[20px]">
                                                <b>Access Time: </b>
                                                {FormatTime(turn.data.data[0].time)}
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
