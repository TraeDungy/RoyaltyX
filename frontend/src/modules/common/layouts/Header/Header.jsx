import React from 'react'
import styles from './Header.module.css'
import UserDropdown from './UserDropdown';
import { Bell, BellFill, Chat, Coin, Question, ThreeDotsVertical } from 'react-bootstrap-icons';

function Header() {
    return (
        <nav className={`${styles.navbar}`}>
            <div className='ms-auto d-flex align-items-center pe-2'>
                <div className='ps-3 position-relative'>
                    <Chat style={{ fontSize: 18 }} className='txt-lighter' />
                    <span className='badge badge-primary bg-danger position-absolute' style={{ right: 0, bottom: 0, transform: 'translate(50%, 50%)', fontSize: 9 }}>3</span>
                </div>
                <div className='ps-4 position-relative'>
                    <Bell style={{ fontSize: 19 }} className='txt-lighter' />
                    <span className='badge badge-primary bg-danger position-absolute' style={{ right: 0, bottom: 0, transform: 'translate(50%, 50%)', fontSize: 9 }}>7</span>
                </div>
                <div className='ps-4 position-relative'>
                    <UserDropdown />
                </div>

            </div>
        </nav>
    )
}

export default Header
