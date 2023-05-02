import React from 'react';
import Tippy from '@tippyjs/react/headless';
import MenuItem from './MenuItem';

export default function Menu({ title, children, items = [] }) {
    const renderItems = () => {
        return items.map((item, index) => <MenuItem key={index} data={item} />);
    };
    return (
        <Tippy
            interactive
            delay={[0, 700]}
            offset={[0, 12]}
            placement="bottom-end"
            theme="light-border"
            trigger="click"
            render={(attrs) => (
                <div className="rounded-xl px-[10px] py-[20px] flex flex-col shadow-4xl bg-white">
                    <div className="flex">
                        <img className="rounded-full h-[30px]" src="/images/user-img.png" alt="" />
                        <div className="font-semibold italic text-[18px] ml-[10px]">{title}</div>
                    </div>
                    <hr className="mt-[15px]" />
                    <div tabIndex="-1" {...attrs}>
                        {renderItems()}
                    </div>
                </div>
            )}
        >
            {children}
        </Tippy>
    );
}
