import React, { useContext, useState } from 'react'
import { UserContext } from '../context/userContext.jsx'
import { useNavigate } from 'react-router-dom';

const SideMenu = () => {
    const { user, clearUser } = useContext(UserContext);
    const [sideMenuData, setSideMenuData] = useState([]);

    const navigate = useNavigate();

    const handleLogout = () => {
        
    }
    const handleClick = (route) => {
        if(route == "/logout"){
            handleLogout();
            return;
        }
        navigate(route);
    }



  return (
    <div>SideMenu</div>
  )
}

export default SideMenu