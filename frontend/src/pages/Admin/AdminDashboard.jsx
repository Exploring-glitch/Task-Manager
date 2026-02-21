import React, { useContext, useEffect, useState } from 'react'
import { useUserAuth } from '../../hooks/useUserAuth.jsx';
import { UserContext } from '../../context/userContext.jsx';
import DashboardLayout from '../../components/DashboardLayout.jsx';
import { useNavigate } from 'react-router-dom';
import { dashboard_data } from '../../api/tasksApi.js';
import moment from 'moment';
import InfoCard from '../../components/cards/InfoCard.jsx';
import { addThousandsSeperator } from '../../util/helper.jsx';





const AdminDashboard = () => {
  useUserAuth();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [dashBoardData, setDashBoardData] = useState(null);
  const [pieChartData, setPieChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);

  const getDashboardData = async () => {
    try {
      const response = await dashboard_data();
    
      if (response) {
        setDashBoardData(response);
      }
      
    }
    catch (e) {
      console.error('Failed to fetch Dashboard data: ', e);
    }
  }

  useEffect(() => {
    getDashboardData();

    return () => {};
  }, []);



  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className='p-6 my-3 rounded-2xl shadow-md shadow-gray-200 border border-gray-200/50'>
        <div>
          <div className='col-span-3'>
            <h2 className='text-xl
             md:text-2xl'
            > 
              Good Morning! {user.user?.name} 
            </h2>
            <p className='text-gray-400 mt-1.5 text-xs
              md:text-[13px]'> {moment().format("dddd Do MMM YYY")} </p>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-3
          md:grid-cols-4 md:gap-6
        '>
          <InfoCard 
            label="Total Card"
            value={addThousandsSeperator(
              dashBoardData?.charts?.taskDistribution?.All || 0
            )}
            color="bg-primary"
          />  
        </div>
      </div>
    </DashboardLayout>
  )
}

export default AdminDashboard