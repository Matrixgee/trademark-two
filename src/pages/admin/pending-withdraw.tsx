import React from 'react'
import AdminDashboard from '../Layouts/AdminDashboard'
import PendingWithdrawals from '../(components)/Admin/PendingWithdrawals'

const pendingWithdraw = () => {
  return (
    <AdminDashboard>
        <PendingWithdrawals/>
    </AdminDashboard>
  )
}

export default pendingWithdraw
