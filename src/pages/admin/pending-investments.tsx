import React from 'react'
import AdminDashboard from '../Layouts/AdminDashboard'
import { PendingInvestments } from '../(components)/Admin/PendingInvestments'

const pendingInvestments = () => {
  return (
    <AdminDashboard>
        <PendingInvestments/>
    </AdminDashboard>
  )
}

export default pendingInvestments
