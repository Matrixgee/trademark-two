import React from 'react'
import AdminDashboard from '../Layouts/AdminDashboard'
import { EarningsHistory } from '../(components)/Admin/EarningsHistory'

const allEarnings = () => {
  return (
    <AdminDashboard>
        <EarningsHistory/>
    </AdminDashboard>
  )
}

export default allEarnings
