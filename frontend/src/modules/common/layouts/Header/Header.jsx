import React, { useState } from 'react'
import styles from './Header.module.css'
import UserDropdown from './UserDropdown';
import { Bell, BellFill, Chat, Coin, Gear, Question, ThreeDotsVertical } from 'react-bootstrap-icons';
import SettingsModal from '../../components/Settings/SettingsModal';
import NotificationsDropdown from './NotificationsDropdown';
import { Link } from 'react-router-dom';

function Header() {

    const [showSettingsModal, setShowSettingsModal] = useState(false);

    return (
        <>
            <nav className={`${styles.navbar}`}>
                <div className='ms-auto d-flex align-items-center pe-2'>
                    <div className='ps-4'>
                        <Gear onClick={() => { setShowSettingsModal(true) }} style={{ fontSize: 19 }} className='pointer txt-lighter' />
                    </div>
                    <Link to="/inbox" className='ps-4 position-relative'>
                        <Chat style={{ fontSize: 19 }} className='pointer txt-lighter' />
                        <span
                            className='badge badge-primary bg-danger position-absolute'
                            style={{
                                right: 0,
                                bottom: 0,
                                transform: 'translate(50%, 50%)',
                                fontSize: 9,
                            }}
                        >
                            7
                        </span>
                    </Link>
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
