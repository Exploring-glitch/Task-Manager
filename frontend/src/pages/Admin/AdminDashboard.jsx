import React, { useContext } from 'react'
import { useUserAuth } from '../../hooks/useUserAuth.jsx';
import { UserContext } from '../../context/userContext.jsx';
import DashboardLayout from '../../components/DashboardLayout.jsx';

const AdminDashboard = () => {
  useUserAuth();
  const { user } = useContext(UserContext);


  return (
    <DashboardLayout>
      Admin Dashboard
    </DashboardLayout>
  )
}

export default AdminDashboard