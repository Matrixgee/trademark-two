import DashboardLayout from '../Layouts/DashboardLayout'
import DashHomeLayout from '../Layouts/DashHomeLayout'
import ProfilePage from '../(components)/Dashboard/ProfilePage'

const profile = () => {
  return (
<DashboardLayout>
      <DashHomeLayout>
      <ProfilePage/>
    </DashHomeLayout>
</DashboardLayout>
  )
}

export default profile
