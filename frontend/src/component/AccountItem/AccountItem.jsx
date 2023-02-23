import React from 'react';
import Menu from './Menu/Menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
      faCircleQuestion,
      faCoins,
      faEarthAsia,
      faGear,
      faKeyboard,
      faSignOut,
      faUser,
} from '@fortawesome/free-solid-svg-icons';
const MENU_ITEMS = [
      {
            icon: <FontAwesomeIcon icon={faEarthAsia} />,
            title: 'English',
            children: {
                  title: 'Language',
                  data: [
                        {
                              type: 'language',
                              code: 'en',
                              title: 'English',
                        },
                        {
                              type: 'language',
                              code: 'vi',
                              title: 'Tiếng Việt',
                        },
                  ],
            },
      },
      {
            icon: <FontAwesomeIcon icon={faCircleQuestion} />,
            title: 'Feedback and help',
            to: '/feedback',
      },
      {
            icon: <FontAwesomeIcon icon={faKeyboard} />,
            title: 'Keyboard shortcuts',
      },
];

export default function AccountItem() {
      const userMenu = [
            {
                  icon: <FontAwesomeIcon icon={faUser} />,
                  title: 'View profile',
                  to: '/@hoaa',
            },
            {
                  icon: <FontAwesomeIcon icon={faCoins} />,
                  title: 'Get coins',
                  to: '/coin',
            },
            {
                  icon: <FontAwesomeIcon icon={faGear} />,
                  title: 'Settings',
                  to: '/settings',
            },
            ...MENU_ITEMS,
            {
                  icon: <FontAwesomeIcon icon={faSignOut} />,
                  title: 'Log out',
                  to: '/logout',
                  separate: true,
            },
      ];
      return (
            <>
                  <Menu items={userMenu}>
                        <button>123123</button>
                  </Menu>
            </>
      );
}
