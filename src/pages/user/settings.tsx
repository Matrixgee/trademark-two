import React from 'react'
import DashboardLayout from '../Layouts/DashboardLayout'
import DashHomeLayout from '../Layouts/DashHomeLayout'
import SettingsPage from '../(components)/Dashboard/SettingsPage'

const settings = () => {
  return (
<DashboardLayout>
      <DashHomeLayout>
      <SettingsPage/>
    </DashHomeLayout>
</DashboardLayout>
  )
}
export default settings
