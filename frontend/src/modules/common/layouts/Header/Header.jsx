import React from 'react'
import styles from './Header.module.css'
import UserDropdown from './UserDropdown';
import { Bell, BellFill, Coin, Question, ThreeDotsVertical } from 'react-bootstrap-icons';

function Header() {
    return (
        <nav className={`${styles.navbar}`}>
            <div className='ms-auto d-flex align-items-center pe-2'>
                <div className='ps-3'>
                    <Question style={{ fontSize: 25 }} className='txt-lighter' />
                </div>
                <div className='ps-2'>
                    <Bell style={{ fontSize: 18 }} className='txt-lighter' />
                </div>
                <div className='ps-3'>
                    <UserDropdown />
                </div>

            </div>
        </nav>
    )
}

export default Header
