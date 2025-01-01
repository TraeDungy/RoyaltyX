import React from 'react'
import styles from './Header.module.css'
import UserDropdown from './UserDropdown';
import { Bell, BellFill, Coin, ThreeDotsVertical } from 'react-bootstrap-icons';

function Header() {
    return (
        <nav className={`${styles.navbar}`}>
            <div className='ms-auto d-flex align-items-center pe-2'>
                <div className='ps-3'>
                    <BellFill style={{ fontSize: 20 }} className='txt-lighter' />
                </div>
                <div className='ps-3'>
                    <UserDropdown />
                </div>

            </div>
        </nav>
    )
}

export default Header
