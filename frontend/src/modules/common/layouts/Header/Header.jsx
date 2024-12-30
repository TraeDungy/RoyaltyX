import React from 'react'
import styles from './Header.module.css'
import UserDropdown from './UserDropdown';
import { Coin } from 'react-bootstrap-icons';

function Header() {
    return (
        <nav className={`${styles.navbar} shadow-sm`}>
            <span className='d-flex align-items-center txt-lighter medium'><Coin className='me-2' /> 550/550</span>
            <div className='ms-auto'>
                <UserDropdown />
            </div>
        </nav>
    )
}

export default Header
