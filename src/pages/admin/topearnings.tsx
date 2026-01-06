import React from 'react'
import AdminDashboard from '../Layouts/AdminDashboard'
import { TopEarnings } from '../(components)/Admin/TopEarnings'

const topearnings = () => {
  return (
    <AdminDashboard>
        <TopEarnings/>
    </AdminDashboard>
  )
}

export default topearnings
