import React from 'react'
import DashboardHeader from '../(components)/Dashboard/DashboardHeader'
import TradingSide from '../(components)/Dashboard/TradingSide'
import DashboardHome from '../(components)/Dashboard/DashboardHome'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen w-full relative">
      <div className="w-full h-full fixed">
        <DashboardHeader />

        <div className="bg-red-300 flex flex-row h-[calc(100%-3.5rem)]">
          <TradingSide />

          <main className="border-l border-gray-300 w-[42%] bg-red-600 h-full">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};


export default DashboardLayout
