import React, { useEffect, useState, useRef } from 'react';
import Date from './Date';
import Radio from '../Radio/Radio';
import useClickOutside from '../../hooks/useClickOutside';
export default function ProfileInfo(props) {
      const { user } = props;
      // const temp = { ...user };
      // const [sex, setSex] = useState('temp.sex');
      // const tempBirth = user.dateofbirth.split('/');
      // const [birth, setBirth] = useState([tempBirth[0], tempBirth[1], tempBirth[2]]);
      const [birth, setBirth] = useState(['9', '9', '2001']);
      const handelSex = (e) => {
            // setSex(e);
      };

      //   const handelUpdate = (e) => {
      //         e.preventDefault();
      //         const newUser = {
      //               name: 'Hung09092001',
      //               email: 'admin@gmail.com',
      //               password: 'admin',
      //               phone: '123456789',
      //               sex: 'Nam',
      //               // dateofbirth: `${birth[0]}/${birth[1]}/${birth[2]}}`,
      //               dateofbirth: '9/9/2001',
      //         };
      //         updateCall(newUser, dispatch);
      //   };
      const DateRef = useRef();
      const DateWrapperRef = useRef();
      const ConvertStringEmail = (email) => {
            const index = email.indexOf('@');
            const tempString = '*'.repeat(index - 2);
            return email.substring(0, 2) + tempString + email.substring(index, email.length);
      };

      const ConvertPhoneNumber = (phone) => {
            const index = phone.length - 2;
            const tempString = '*'.repeat(index);
            return tempString + phone.substring(index, phone.length);
      };
      const [showitem, setShowitem] = useState([
            {
                  id: 0,
                  isShow: false,
            },
            { id: 1, isShow: false },
            { id: 2, isShow: false },
      ]);
      const [selected, setSelected] = useState('first');

      useClickOutside(DateRef, DateWrapperRef, () => {
            let tempArr = [...showitem];
            tempArr.map((item) => {
                  item.isShow = false;
                  return tempArr;
            });
            setShowitem(tempArr);
      });

      useEffect(() => {
            if (user.sex === 'Nam') {
                  setSelected('first');
            } else if (user.sex === 'Nữ') {
                  setSelected('second');
            } else {
                  setSelected('third');
            }
      }, [user.sex]);

      return (
            <div className="pt-[30px] rounded-xl flex items-start ">
                  <div className="pr-[50px] w-full">
                        <form action="" method="post" className="w-full">
                              <div className="mb-[30px] ">
                                    <div className="flex items-center">
                                          <div className="w-[20%] capitalize text-right text-additional-black overflow-hidden text-[14px]">
                                                <label>User name</label>
                                          </div>
                                          <div className="w-[80%] pl-[20px]">
                                                <div className="flex items-center">
                                                      <div className="text-[#333] text-[14px] ">
                                                            {user.name}
                                                      </div>
                                                </div>
                                          </div>
                                    </div>
                              </div>
                              <div className="mb-[30px] ">
                                    <div className="flex items-center">
                                          <div className="w-[20%] capitalize text-right text-additional-black overflow-hidden text-[14px]">
                                                <label>Name</label>
                                          </div>
                                          <div className="w-[80%] pl-[20px]">
                                                <div className="flex items-center bg-white rounded-sm border text-[#222] h-[40px] px-[10px] py-[10px]">
                                                      <input
                                                            type="text"
                                                            className="flex-1 text-[14px] bg-transparent focus:outline-none"
                                                      />
                                                </div>
                                          </div>
                                    </div>
                              </div>
                              <div className="mb-[30px] ">
                                    <div className="flex items-center">
                                          <div className="w-[20%] capitalize text-right text-additional-black overflow-hidden text-[14px]">
                                                <label>Email</label>
                                          </div>
                                          <div className="w-[80%] pl-[20px]">
                                                <div className="flex items-center">
                                                      <div className="text-[#333] text-[14px] ">
                                                            {ConvertStringEmail(user.email)}
                                                      </div>
                                                </div>
                                          </div>
                                    </div>
                              </div>
                              <div className="mb-[30px] ">
                                    <div className="flex items-center">
                                          <div className="w-[20%] capitalize text-right text-additional-black overflow-hidden text-[14px]">
                                                <label>Phone</label>
                                          </div>
                                          <div className="w-[80%] pl-[20px]">
                                                <div className="flex items-center">
                                                      <div className="text-[#333] text-[14px] ">
                                                            {ConvertPhoneNumber(user.phone)}
                                                      </div>
                                                </div>
                                          </div>
                                    </div>
                              </div>

                              <div className="mb-[30px] ">
                                    <div className="flex items-center">
                                          <div className="w-[20%] capitalize text-right text-additional-black overflow-hidden text-[14px]">
                                                <label>Sex</label>
                                          </div>
                                          <div className="w-[80%] pl-[20px]">
                                                <div className="flex items-center bg-white text-[#222] h-[40px] px-[10px] py-[10px]">
                                                      <div
                                                            className=""
                                                            onClick={() => {
                                                                  handelSex('Male');
                                                            }}
                                                      >
                                                            <Radio
                                                                  value="first"
                                                                  selected={selected}
                                                                  text="Male"
                                                                  onChange={setSelected}
                                                                  className="mr-[20px]"
                                                            />
                                                      </div>
                                                      <div
                                                            className=""
                                                            onClick={() => {
                                                                  handelSex('Female');
                                                            }}
                                                      >
                                                            <Radio
                                                                  value="second"
                                                                  selected={selected}
                                                                  text="Female"
                                                                  onChange={setSelected}
                                                                  className="mr-[20px]"
                                                            />
                                                      </div>
                                                      <div
                                                            className=""
                                                            onClick={() => {
                                                                  handelSex('Other');
                                                            }}
                                                      >
                                                            <Radio
                                                                  value="third"
                                                                  selected={selected}
                                                                  text="Other"
                                                                  onChange={setSelected}
                                                                  className="mr-[20px]"
                                                            />
                                                      </div>
                                                </div>
                                          </div>
                                    </div>
                              </div>
                              <div className="mb-[30px] ">
                                    <div className="flex items-center">
                                          <div className="w-[20%] capitalize text-right text-additional-black overflow-hidden text-[14px]">
                                                <label>Date of Birth</label>
                                          </div>
                                          <div className="w-[80%] pl-[20px]">
                                                <div className="flex items-center bg-white text-[#222] h-[40px] py-[10px]">
                                                      <div
                                                            className="flex w-full justify-between"
                                                            ref={DateWrapperRef}
                                                      >
                                                            <Date
                                                                  DateRef={DateRef}
                                                                  showitem={showitem}
                                                                  onChange={setShowitem}
                                                                  birth={birth}
                                                                  onCheck={setBirth}
                                                            />
                                                      </div>
                                                </div>
                                          </div>
                                    </div>
                              </div>
                              <div className="mb-[60px]">
                                    <div className="flex items-center">
                                          <div className="w-[20%] capitalize text-right text-additional-black overflow-hidden text-[14px]"></div>
                                          <div className="w-[80%] pl-[20px]">
                                                <button
                                                      type="submit"
                                                      className="text-white h-[40px] min-w-[70px] max-w-[220px] bg-[#4a4fb0] rounded-md"
                                                >
                                                      Save
                                                </button>
                                          </div>
                                    </div>
                              </div>
                        </form>
                  </div>
                  <div className="w-[320px] border-l flex justify-center">
                        <div className="flex flex-col items-center">
                              <div className="h-[100px] w-[100px] my-[20px] flex justify-center relative">
                                    <div className="rounded-full w-full h-full bg-center bg-no-repeat"></div>
                              </div>
                              <input type="file" className="hidden" />
                              <button className="text-[#555] border bg-white shadow-min min-w-[70px] px-[20px] h-[40px] max-w-[220px] relative hover:bg-blur-grey">
                                    Choose image
                              </button>
                              <div className="mt-[14px] ">
                                    <div className="text-[#999] text-[14px] leading-5">
                                          Maximum file size: 1 MB
                                    </div>
                                    <div className="text-[#999] text-[14px] leading-5">
                                          Format: .JPEG, .PNG
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      );
}
