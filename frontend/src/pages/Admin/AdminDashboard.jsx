import React, { useContext, useEffect, useState } from 'react'
import { useUserAuth } from '../../hooks/useUserAuth.jsx';
import { UserContext } from '../../context/userContext.jsx';
import DashboardLayout from '../../components/DashboardLayout.jsx';
import { useNavigate } from 'react-router-dom';
import { dashboard_data } from '../../api/tasksApi.js';

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
        setDashBoardData(response.data);
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
      Admin Dashboard
      {JSON.stringify(dashBoardData)}
    </DashboardLayout>
  )
}

export default AdminDashboard