import React from 'react'
import { useUserAuth } from '../../hooks/useUserAuth.jsx';
import DashboardLayout from '../../components/DashboardLayout.jsx';

const UserDashboard = () => {
  useUserAuth();

  return (
    <DashboardLayout>
      UserDashboard
    </DashboardLayout>
  )
}

export default UserDashboard