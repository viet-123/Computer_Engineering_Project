import Header from '../Navbar/Header';
import LeftSide from '../LeftSide/LeftSide';
import { useState } from 'react';

function DefaultLayout({ children }) {
      const [list, setList] = useState(true);
      return (
            <>
                  <Header onChange={setList} list={list} />
                  <div className="min-h-[calc(100vh_-_0px)] flex pt-[69px]">
                        <LeftSide list={list} />
                        <div className="bg-[#f5f6ff] flex flex-col flex-auto px-[50px] py-[10px]">
                              {children}
                        </div>
                  </div>
            </>
      );
}

export default DefaultLayout;
