import React from 'react'
import Navbar from './Navbar'
import Portfolio_Home from './Portfolio_Home'

const DashboardHome = () => {
  return (
    <div className='w-full h-full flex flex-col justify-between'>
      <div className=''>
        <Portfolio_Home/>
      </div>
      <div className='w-full bg-white pt-3 px-15 pb-5 z-40'>
        <Navbar/>
      </div>
    </div>
  )
}

export default DashboardHome
