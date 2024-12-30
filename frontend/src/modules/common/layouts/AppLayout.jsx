import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header/Header'

function AppLayout() {
    return (
        <>
            <Header />
            <div className='main-content-wrapper'>
                <Outlet />
            </div>
        </>


    )
}

export default AppLayout