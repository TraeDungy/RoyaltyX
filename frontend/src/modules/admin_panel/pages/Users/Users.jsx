import React, { useState, useEffect } from 'react'
import { getUsers, deleteUser } from '../../api/user'
import { Plus, Trash } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom'

function Users() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await getUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Error fetching :', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (user_id) => {
    try {
      await deleteUser(user_id);
      const updatedUsers = users.filter(user => user.id !== user_id);
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (

    <div className='container'>

      <div className='mt-4 mb-3 ps-2 d-flex align-items-center justify-content-between w-100'>
        <h3>Users</h3>
        <Link to='/admin/users/add' className='btn btn-danger text-white d-flex align-items-center'>
          Add user
        </Link>
      </div>

      <div className='m-auto d-block w-100 mt-4' style={{ maxWidth: 1500, overflowX: 'auto' }}>
        <div className='table-responsive'>
          <table className='table table-hover'>
            <thead>
              <tr>
                <th className='medium fw-400'>ID</th>
                <th className='medium fw-400'>Name</th>
                <th className='medium fw-400'>Email</th>
                <th className='medium fw-400'>Role</th>
                <th className='medium fw-400 text-center'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td className='medium'>{user.id}</td>
                  <td className='medium'>{user.name}</td>
                  <td className='medium'>{user.email}</td>
                  <td className='medium'>
                    <span className='badge badge-primary bgc-primary'>
                      admin
                    </span>
                  </td>
                  <td className='medium'>
                    <div className="h-100 d-flex align-items-center justify-content-center">
                      <div className='px-1'>
                        <button className='btn btn-basic bg-gray-light text-danger' onClick={() => handleDeleteUser(user.id)}>
                          <Trash />
                        </button>
                      </div>

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}

export default Users