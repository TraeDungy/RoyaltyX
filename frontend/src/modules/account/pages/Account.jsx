import React, { useState, useEffect, useRef } from 'react'
import { getUserInfo } from '../api/user';

function Account() {

    const [userInfo, setUserInfo] = useState([]);
    const inputRef = useRef(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const fetchedUserInfo = await getUserInfo();
                setUserInfo(fetchedUserInfo);
            } catch (error) {
                console.error('Error fetching :', error);
            }
        };

        fetchUserInfo();
    }, []);

    return (
        <div className='container p-5'>

            <h2 className='bold mb-4'>Account</h2>

            <p className="text-muted">Name: {userInfo.name}</p>
            <p className="text-muted">Email: {userInfo.email}</p>
            <p className="text-muted">
                Profile Created At: {userInfo.created_at}
            </p>
            <p className="text-muted">
                Email Verified:{" "}
                <span className="badge bagde-primary bg-danger">No</span>
            </p>
            <p className="text-muted m-0">
                Role:{" "}
                <span className="badge bagde-primary bgc-success">
                    {userInfo.role ? userInfo.role.name : ""}
                </span>
            </p>

        </div>
    )
}

export default Account