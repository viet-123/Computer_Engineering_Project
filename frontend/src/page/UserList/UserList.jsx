import React from 'react';
import UserTable from '../../component/Table/UserTable';

export default function People() {
    return (
        <>
            <h1 className="font-normal text-[36px] mb-[10px]">All User</h1>
            <UserTable />
        </>
    );
}
