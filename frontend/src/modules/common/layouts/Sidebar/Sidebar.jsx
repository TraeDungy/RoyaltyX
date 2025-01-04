import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { PersonCircle, UiChecksGrid, QuestionCircle, Chat, Stripe, People, Wallet2, ArrowLeft, List, ChevronDown, Gear, Speedometer, Folder, Files, FileEarmarkPdf, Journals } from 'react-bootstrap-icons';
import SettingsModal from '../../components/Settings/SettingsModal';
import { getUserInfo } from '../../../account/api/user';
import { getMyProjects, switchProject } from '../../../projects/api/project';

function Sidebar() {

    const [sidebarActive, setSidebarActive] = useState(true);
    const [currentPage, setCurrentPage] = useState(window.location.pathname);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [myProjects, setMyProjects] = useState([]);
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

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const fetchedUserInfo = await getUserInfo();
                setUserInfo(fetchedUserInfo);
            } catch (error) {
                console.error('Error fetching :', error);
            }

            try {
                const fetchedMyProjects = await getMyProjects();
                setMyProjects(fetchedMyProjects);
            } catch (error) {
                console.error('Error fetching :', error);
            }

        };

        fetchUserInfo();

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

    const handleSwitchProject = async (project_id) => {
        try {
            await switchProject(project_id);
            window.location.reload();

        } catch (error) {
            console.error('Error fetching :', error);
        }
    }

    return (

        <>

            <nav id="sidebar" className={!sidebarActive ? 'active' : ''}>
                <ul className="list-unstyled">

                    <div className='sidebar-link-group'>

                        <div className='d-flex justify-content-between align-items-center'>
                            <div className="dropdown show">
                                <div className="dropdown-toggle rounded-lg p-1 pe-2 bgc-light-contrast hover-lg d-flex align-items-center" type="button" id="projectsDropdown" onClick={toggleDropdown}
                                    aria-haspopup="true" aria-expanded={isDropdownOpen ? "true" : "false"}>
                                    <div className='d-flex justify-content-center align-items-center px-1'>
                                        <Folder className='me-2' /> <span className='fw-500'>{userInfo?.project?.name}</span>
                                        <p className='m-0 pe-2'>{userInfo?.currently_selected_project?.name}</p>
                                    </div>
                                    <ChevronDown className='ms-auto' />
                                </div>
                                <div className={"dropdown-menu border-0 shadow pt-2 pb-3" + (isDropdownOpen ? " show" : "")}
                                    aria-labelledby="projectsDropdown"
                                    style={{ width: 230 }}
                                >
                                    {myProjects.map(myProject => (
                                        <span className="dropdown-item py-2 pointer" key={myProject.id} onClick={() => { handleSwitchProject(myProject.id) }}>
                                            {myProject?.name}
                                        </span>
                                    ))}
                                    <hr />
                                    <Link to="/my-projects" className="dropdown-item medium txt-primary pointer">
                                        View all
                                    </Link>
                                </div>
                            </div>

                            <span className={`d-flex justify-content-end align-items-center rounded`}>
                                <div className='w-fit pointer rounded-lg' onClick={toggleSidebar}>
                                    <List className='h5 mb-0' />
                                </div>
                            </span>
                        </div>


                    </div>

                    <div className='sidebar-link-group'>
                        <span className='txt-lighter small ps-2'>PROJECT</span>
                        <li className={`nav-item px-2 rounded my-1 ${currentPage === '/' ? 'active' : ''}`}>
                            <Link to="/" className='nav-link' onClick={() => handlePageChange('/')}>
                                <UiChecksGrid />
                                <span className='ps-3 medium'>Dashboard</span>
                            </Link>
                        </li>
                        <li className={`nav-item px-2 rounded my-1 ${currentPage === '/members' ? 'active' : ''}`}>
                            <Link to="/members" className='nav-link' onClick={() => handlePageChange('/members')}>
                                <People />
                                <span className='ps-3 medium'>Members</span>
                            </Link>
                        </li>
                        <li className={`nav-item px-2 rounded my-1 ${currentPage === '/analytics' ? 'active' : ''}`}>
                            <Link to="/analytics" className='nav-link' onClick={() => handlePageChange('/analytics')}>
                                <Speedometer />
                                <span className='ps-3 medium'>Analytics</span>
                            </Link>
                        </li>
                        <li className={`nav-item px-2 rounded my-1 ${currentPage === '/content' ? 'active' : ''}`}>
                            <Link to="/content" className='nav-link' onClick={() => handlePageChange('/content')}>
                                <Journals />
                                <span className='ps-3 medium'>Content</span>
                            </Link>
                        </li>
                        <li className={`nav-item px-2 rounded my-1 ${currentPage === '/reports' ? 'active' : ''}`}>
                            <Link to="/reports" className='nav-link' onClick={() => handlePageChange('/reports')}>
                                <FileEarmarkPdf />
                                <span className='ps-3 medium'>Reports</span>
                            </Link>
                        </li>
                    </div>

                    <div className='sidebar-link-group'>
                        <span className='txt-lighter small ps-2'>PRIVATE</span>
                        <li className={`nav-item px-2 rounded my-1 ${currentPage === '/account' ? 'active' : ''}`}>
                            <Link to="/account" className='nav-link' onClick={() => handlePageChange('/account')}>
                                <PersonCircle />
                                <span className='ps-3 medium'>My Account</span>
                            </Link>
                        </li>
                        <li className={`nav-item px-2 rounded my-1 ${currentPage === '/my-projects' ? 'active' : ''}`}>
                            <Link to="/my-projects" className='nav-link' onClick={() => handlePageChange('/my-projects')}>
                                <Folder />
                                <span className='ps-3 medium'>My Projects</span>
                            </Link>
                        </li>
                        <li className="nav-item px-2 rounded my-1">
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