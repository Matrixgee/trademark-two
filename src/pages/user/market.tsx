import DashboardLayout from '../Layouts/DashboardLayout'
import DashHomeLayout from '../Layouts/DashHomeLayout'
import Market from '../(components)/Dashboard/Market'

const market = () => {
  return (
<DashboardLayout>
      <DashHomeLayout>
        <Market/>
    </DashHomeLayout>
</DashboardLayout>
  )
}

export default market
