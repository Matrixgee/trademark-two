import DashboardLayout from "../Layouts/DashboardLayout";
import DashHomeLayout from "../Layouts/DashHomeLayout";

import InvestmentPage from "../(components)/Dashboard/InvestmentPage";

const invest = () => {
  return (
    <DashboardLayout>
      <DashHomeLayout>
        <InvestmentPage />
      </DashHomeLayout>
    </DashboardLayout>
  );
};

export default invest;
