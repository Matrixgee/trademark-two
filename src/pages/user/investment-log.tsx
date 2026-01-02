import React from 'react'
import DashboardLayout from '../Layouts/DashboardLayout'
import InvestmentHistory from '../(components)/Dashboard/InvestmentHistory'
import DashHomeLayout from '../Layouts/DashHomeLayout'

const InvestmentLog = () => {
  return (
    <div>
      <DashboardLayout>
        <DashHomeLayout>
            <InvestmentHistory/>
        </DashHomeLayout>
      </DashboardLayout>
    </div>
  )
}

export default InvestmentLog
