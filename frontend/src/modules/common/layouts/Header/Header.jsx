import React, { useState } from 'react'
import styles from './Header.module.css'
import UserDropdown from './UserDropdown';
import { Bell, BellFill, Chat, Coin, Gear, Question, ThreeDotsVertical } from 'react-bootstrap-icons';
import SettingsModal from '../../components/Settings/SettingsModal';
import NotificationsDropdown from './NotificationsDropdown';

function Header() {

    const [showSettingsModal, setShowSettingsModal] = useState(false);

    return (
        <>
            <nav className={`${styles.navbar}`}>
                <div className='ms-auto d-flex align-items-center pe-2'>
                    <div className='ps-4'>
                        <Gear onClick={() => { setShowSettingsModal(true) }} style={{ fontSize: 19 }} className='pointer txt-lighter' />
                    </div>
                    <NotificationsDropdown />
                    <div className='ps-4 position-relative'>
                        <UserDropdown />
                    </div>

                </div>
            </nav>
            <SettingsModal
                showSettingsModal={showSettingsModal}
                setShowSettingsModal={setShowSettingsModal}
            />
        </>

    )
}

export default Header
