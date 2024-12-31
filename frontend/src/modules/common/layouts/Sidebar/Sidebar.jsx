import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { PersonCircle, UiChecksGrid, QuestionCircle, Chat, Stripe, People, Wallet2, ArrowLeft, List, ChevronDown, Gear } from 'react-bootstrap-icons';
import SettingsModal from '../../components/Settings/SettingsModal';


function Sidebar() {

    const [sidebarActive, setSidebarActive] = useState(true);
    const [currentPage, setCurrentPage] = useState(window.location.pathname);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [showSettingsModal, setShowSettingsModal] = useState(false);

    useEffect(() => {

        function handleResize() {
            if (window.innerWidth < 855) {
                const sidebar = document.getElementById('sidebar');
                if (!sidebar.classList.contains('active')) {
                    sidebar.classList.toggle('active');
                }
                document.documentElement.style.setProperty('--sidebar-width', '0');
            }
        }


        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
        };

    }, []);


    const toggleModal = () => {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('active');
        if (sidebar.classList.contains('active')) {
            document.documentElement.style.setProperty('--sidebar-width', '0');
        } else {
            document.documentElement.style.setProperty('--sidebar-width', '236px');
        }
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };


    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const toggleSidebar = () => {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('active');
        if (sidebar.classList.contains('active')) {
            document.documentElement.style.setProperty('--sidebar-width', '0');
        } else {
            document.documentElement.style.setProperty('--sidebar-width', '236px');
        }
    };

    return (

        <>

            <nav id="sidebar" className={!sidebarActive ? 'active' : ''}>

                <ul className="list-unstyled py-2">

                    <div className='sidebar-link-group'>
                        <li className={`d-flex justify-content-between align-items-center rounded`}>
                            <a href='/' className='px-2'>
                                <h5 className='bold mb-0'>Royalty X</h5>
                            </a>
                            <div className='w-fit pointer hover-lg rounded-lg' id='toggleSidebarButton' onClick={toggleSidebar}>
                                <List className='h5 mb-0' />
                            </div>
                        </li>
                    </div>

                    <div className='sidebar-link-group'>

                        <li className={`nav-item px-2 rounded ${currentPage === '/dashboard' ? 'active' : ''}`}>
                            <Link to="/dashboard" className='nav-link' onClick={() => handlePageChange('/dashboard')}>
                                <UiChecksGrid />
                                <span className='ps-3 medium'>Dashboard</span>
                            </Link>
                        </li>
                        <li className={`nav-item px-2 rounded ${currentPage === '/deposits' ? 'active' : ''}`}>
                            <Link to="/deposits" className='nav-link' onClick={() => handlePageChange('/deposits')}>
                                <People />
                                <span className='ps-3 medium'>Deposits</span>
                            </Link>
                        </li>
                        <li className="nav-item px-2 rounded">
                            <Link onClick={() => { setShowSettingsModal(true) }} className='nav-link d-flex align-items-center'>
                                <Gear />
                                <span className='ps-3 medium'>Settings</span>
                            </Link>
                        </li>
                    </div>

                </ul>

            </nav>

            <SettingsModal
                showSettingsModal={showSettingsModal}
                setShowSettingsModal={setShowSettingsModal}
            />
        </>
    )
}

export default Sidebar