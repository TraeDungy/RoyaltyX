import React, { useEffect, useState } from 'react'
import { getUsers } from '../../admin_panel/api/user';
import { addProjectMember } from '../api/members';
import { toast } from 'react-toastify';
import { Plus } from 'react-bootstrap-icons';
import Modal from 'react-bootstrap/Modal';

function AddMemberModal({ showAddMemberModal, setShowAddMemberModal, projectMembers, setProjectMembers }) {

    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const fetchedUsers = await getUsers();
                setUsers(fetchedUsers);
            } catch (error) {
                console.error('Error fetching :', error);
            }
        };

        fetchContacts();
    }, []);

    const handleCloseAddMemberModal = () => {
        setShowAddMemberModal(false);
    };

    const handleAddMember = async (user) => {
        try {
            const newMember = await addProjectMember(user.id);
            const updatedMembers = [newMember, ...projectMembers];
            setProjectMembers(updatedMembers);
            setShowAddMemberModal(false);
            toast.success('Successfully added a new project member!');
        } catch (error) {
            toast.error('Error while trying to add a member!');
        }
    }

    return (
        <>
            <Modal centered show={showAddMemberModal} onHide={handleCloseAddMemberModal}>
                <Modal.Header closeButton>
                    <Modal.Title className='h5'>Add project member</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='table-responsive'>
                        <table className='table table-hover table-bordered'>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user.id}>
                                        <td className='medium'>{user.name}</td>
                                        <td className='medium'>{user.email}</td>
                                        <td className='text-center'>
                                            <button className='btn btn-basic medium bg-gray shadow-sm' onClick={() => { handleAddMember(user) }}>
                                                <Plus />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default AddMemberModal