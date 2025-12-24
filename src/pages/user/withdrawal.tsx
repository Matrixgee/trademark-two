import React from 'react'
import WithdrawPage from '../(components)/Dashboard/WithdrawPage'
import Navbar from '../(components)/Dashboard/Navbar'
import DashHomeLayout from '../Layouts/DashHomeLayout'
import DashboardLayout from '../Layouts/DashboardLayout'

const withdrawal = () => {
  return (
<DashboardLayout>
      <DashHomeLayout>
      <WithdrawPage/>
    </DashHomeLayout>
</DashboardLayout>
  )
}

export default withdrawal
