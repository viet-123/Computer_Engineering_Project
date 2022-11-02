import React from 'react';
import Tippy from '@tippyjs/react/headless';
import MenuItem from './MenuItem';

export default function Menu({ children, items = [] }) {
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
                        <div
                              tabIndex="-1"
                              {...attrs}
                              className="rounded-xl px-[10px] py-[20px] flex flex-col shadow-4xl bg-white"
                        >
                              {renderItems()}
                        </div>
                  )}
            >
                  {children}
            </Tippy>
      );
}
