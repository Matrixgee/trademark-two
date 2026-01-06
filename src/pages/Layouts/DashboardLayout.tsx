import React from 'react'
import DashboardHeader from '../(components)/Dashboard/DashboardHeader'
import TradingSide from '../(components)/Dashboard/TradingSide'
import DashboardHome from '../(components)/Dashboard/DashboardHome'
import TradingHeader from '../(components)/TV/TradingHeader';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen w-full relative">
      <div className="w-full h-full fixed">
        <div className='flex m-0 flex-col max-md:hidden'>
          <div className='w-full  h-[11vh] pb-5'>
              <TradingHeader/> 
          </div>
     
        <DashboardHeader />
        </div>

        <div className="flex flex-row max-md:h-full h-[calc(100%-5rem)]">
          <TradingSide />

          <main className="border-l border-gray-300 max-md:w-full md:w-[42%]  h-full">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};


export default DashboardLayout
