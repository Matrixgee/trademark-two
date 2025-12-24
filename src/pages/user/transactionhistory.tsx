import TransactionHistory from '../(components)/Dashboard/TransactionHistory'
import DashboardLayout from '../Layouts/DashboardLayout'
import DashHomeLayout from '../Layouts/DashHomeLayout'

const transactionhistory = () => {
  return (
<DashboardLayout>
      <DashHomeLayout>
      <TransactionHistory/>
    </DashHomeLayout>
</DashboardLayout>
  )
}

export default transactionhistory
