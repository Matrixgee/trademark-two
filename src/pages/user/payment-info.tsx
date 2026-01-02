import React from 'react'
import DashboardLayout from '../Layouts/DashboardLayout'
import DashHomeLayout from '../Layouts/DashHomeLayout'
import PaymentPage from '../(components)/Dashboard/PaymentPage'

const PaymentInfo = () => {
  return (
<DashboardLayout>
      <DashHomeLayout>
      <PaymentPage/>
    </DashHomeLayout>
</DashboardLayout>
  )
}

export default PaymentInfo
