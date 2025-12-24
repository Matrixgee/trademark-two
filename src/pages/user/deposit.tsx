import DepositPage from '../(components)/Dashboard/DepositPage'
import DashboardLayout from '../Layouts/DashboardLayout'
import DashHomeLayout from '../Layouts/DashHomeLayout'

const Deposit = () => {
  return (
<DashboardLayout>
      <DashHomeLayout>
      <DepositPage/>
    </DashHomeLayout>
</DashboardLayout>
  )
}

export default Deposit
