import React, { useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout.jsx'
import { get_all_users } from '../../api/userApi.js';
import { useEffect } from 'react';
import { LuFileSpreadsheet } from 'react-icons/lu';
import UserCard from '../../components/cards/UserCard.jsx';
import { download_report } from '../../api/reportApi.js';
import toast from 'react-hot-toast';

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
    try{
      const response = await download_report()

      const url = window.webkitURL.createObjectURL(new Blob([response]))
      const link = document.createElement("a");

      link.href = url;
      link.setAttribute("download", "user-details.xlsx")

      document.body.appendChild(link);
      
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    }
    catch(err){
      console.log("Error downloading report. error: ", err)
      toast.error("Failed to download expense details. Please try again.")
    }
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

        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-4'>
          {allUsers?.map((user) => (
            <UserCard
              key={user._id}
              userInfo={user}
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default ManageUsers;