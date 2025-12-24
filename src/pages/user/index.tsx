import React from 'react'
import DashboardLayout from '../Layouts/DashboardLayout';
import DashHomeLayout from '../Layouts/DashHomeLayout';
import Portfolio_Home from '../(components)/Dashboard/Portfolio_Home';

const UserDashboard = () => {
  return (
<DashboardLayout>
      <DashHomeLayout>
      <Portfolio_Home/>
    </DashHomeLayout>
</DashboardLayout>
  )
}

export default UserDashboard;
