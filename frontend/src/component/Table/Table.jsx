import React, { useState } from 'react';
import { SearchIcon } from '../Icon/Icon';
import Modal from '../Modal/Modal';
export default function Table() {
      const [showModal, setShowModal] = useState(false);
      const [value, setValue] = useState('');

      const userData = [
            {
                  firstname: undefined,
                  lastname: undefined,
                  respone: 'Accept',
                  timeaccess: 'Thurday, December 30, 2021 8:46 PM',
            },
            {
                  firstname: 'Nguyen Quoc',
                  lastname: 'Hung',
                  respone: 'Accept',
                  timeaccess: 'Thurday, December 30, 2022 9:46 PM',
            },
      ];

      return (
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
                                          Respone
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
                              {userData.map((user, index) => {
                                    if (index % 2 === 0) {
                                          return (
                                                <tr className="bg-white" key={index}>
                                                      <td className="w-[20%] border text-center py-[15px] px-2  text-sm">
                                                            {index + 1}
                                                      </td>
                                                      <td className="w-[10%] border text-center py-[15px] px-2 text-sm">
                                                            {user.firstname === undefined
                                                                  ? 'undefined'
                                                                  : user.firstname}
                                                      </td>
                                                      <td className="w-[10%] border text-center py-[15px] px-2 text-sm">
                                                            {user.lastname === undefined
                                                                  ? 'undefined'
                                                                  : user.lastname}
                                                      </td>
                                                      <td className="w-[10%] border text-center py-[15px] px-2 text-sm">
                                                            {user.respone}
                                                      </td>
                                                      <td className="w-[30%] border text-center py-[15px] px-2 text-sm">
                                                            {user.timeaccess}
                                                      </td>
                                                      <td className="w-[20%] border  text-center items-center py-[15px] px-2 text-sm">
                                                            <div className="w-full flex justify-center ">
                                                                  <div
                                                                        className="bg-[#4a4fb0] cursor-pointer w-[50px] h-[36px] flex items-center justify-center rounded-full "
                                                                        onClick={() => {
                                                                              setValue(
                                                                                    user.timeaccess,
                                                                              );
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
                                    } else {
                                          return (
                                                <tr className="bg-[#f5f6ff]" key={index}>
                                                      <td className="w-[20%] border text-center py-[15px] px-2  text-sm">
                                                            {index + 1}
                                                      </td>
                                                      <td className="w-[10%] border text-center py-[15px] px-2 text-sm">
                                                            {user.firstname === undefined
                                                                  ? 'undefined'
                                                                  : user.firstname}
                                                      </td>
                                                      <td className="w-[10%] border text-center py-[15px] px-2 text-sm">
                                                            {user.lastname === undefined
                                                                  ? 'undefined'
                                                                  : user.lastname}
                                                      </td>
                                                      <td className="w-[10%] border text-center py-[15px] px-2 text-sm">
                                                            {user.respone}
                                                      </td>
                                                      <td className="w-[30%] border text-center py-[15px] px-2 text-sm">
                                                            {user.timeaccess}
                                                      </td>
                                                      <td className="w-[20%] border text-center py-[15px] px-2 text-sm">
                                                            <div className="w-full flex justify-center ">
                                                                  <div
                                                                        className="bg-[#4a4fb0] cursor-pointer w-[50px] h-[36px] flex items-center justify-center rounded-full "
                                                                        onClick={() => {
                                                                              setValue(
                                                                                    user.timeaccess,
                                                                              );
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
                                    }
                              })}
                        </tbody>
                  </table>
                  <Modal value={value} show={showModal} setShow={setShowModal} />
            </div>
      );
}
