import React, { useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout.jsx'
import { get_all_users } from '../../api/userApi.js';
import { useEffect } from 'react';
import { LuFileSpreadsheet } from 'react-icons/lu';

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

  //download task report
  const handleDownloadReport = async() => {

  }

  useEffect(() => {
    getAllUsers();

    return () => { };
  }, []);



  return (
    <DashboardLayout activeMenu="Team Members">
      <div className='mt-5 mb-10'>
        <div className='flex justify-between
          md:flex-row md:items-center'
        >
          <h2 className='text-xl font-medium'> Team Members </h2>

          <button 
            onClick={handleDownloadReport}
            className='flex items-center gap-3 text-xs md:[text-13px] font-medium text-lime-900 bg-lime-100 px-2 md:px-3 py-2 rounded border border-lime-200 hover:border-lime-400 cursor-pointer'
          > 
            <LuFileSpreadsheet className='text-lg' />
            Download report 
          </button>
        </div>

        <div className=''>

        </div>
      </div>
    </DashboardLayout>
  )
}

export default ManageUsers;