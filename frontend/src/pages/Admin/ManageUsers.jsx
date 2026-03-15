import React, { useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout.jsx'
import { get_all_users } from '../../api/userApi.js';
import { useEffect } from 'react';

const ManageUsers = () => {
  const [allUsers, setAllUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const response = await get_all_users();

      if (response?.length > 0) {
        setAllUsers(response)
      }
    }
    catch (err) {
      console.log("Error fetching users. Errpr: ", err);
    }
  }

  useEffect(() => {
    getAllUsers();

    return () => { };
  }, []);



  return (
    <DashboardLayout activeMenu="Team Members">
      ManageUsers
    </DashboardLayout>
  )
}

export default ManageUsers;