import React, { useContext } from 'react'
import { UserContext } from '../context/userContext.jsx';
import SideMenu from './SideMenu.jsx';
import NavBar from './NavBar.jsx';


const DashboardLayout = ({ children, activeMenu }) => {
    const { user } = useContext(UserContext);

    return (
        <div>
            <NavBar activeMenu={activeMenu} />
            {user && (
                <div className='flex'>
                    <div className='max-[1080px]:hidden'>
                        <SideMenu activeMenu={activeMenu}></SideMenu>
                    </div>
                    <div className='h-[calc(100vh-52px)] w-screen overflow-x-hidden'>
                        {children}
                    </div>
                </div>
            )}
        </div>
    )
}

export default DashboardLayout;