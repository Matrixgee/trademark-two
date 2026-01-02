import DashboardLayout from '../Layouts/DashboardLayout'
import DashHomeLayout from '../Layouts/DashHomeLayout'
import ProfilePage from '../(components)/Dashboard/ProfilePage'
import InvestmentPage from '../(components)/Dashboard/InvestmentPage'

const invest = () => {
  return (
<DashboardLayout>
      <DashHomeLayout>
      <InvestmentPage/>
    </DashHomeLayout>
</DashboardLayout>
  )
}

export default invest
