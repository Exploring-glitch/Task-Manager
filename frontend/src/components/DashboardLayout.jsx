import React, { useContext } from 'react'
import { UserContext } from '../context/userContext.jsx';
import SideMenu from './SideMenu.jsx';


const DashboardLayout = ({children, activeMenu}) => {
    const { user } = useContext(UserContext);
  return (
    <div>
        {user && (
            <div>
                <div>
                    <SideMenu></SideMenu>
                </div>
                <div className='grow mx-5'>
                    {children}
                </div>
            </div>
        )}
    </div>
  )
}

export default DashboardLayout