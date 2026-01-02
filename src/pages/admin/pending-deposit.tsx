import React from 'react'
import AdminDashboard from '../Layouts/AdminDashboard'
import PendingDeposits from '../(components)/Admin/PendingDeposits'

const pendingDeposit = () => {
  return (
    <AdminDashboard>
        <PendingDeposits/>
    </AdminDashboard>
  )
}

export default pendingDeposit
