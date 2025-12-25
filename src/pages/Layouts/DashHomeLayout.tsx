import React from 'react'
import Navbar from '../(components)/Dashboard/Navbar'

const DashHomeLayout =({ children }: { children: React.ReactNode }) => {
return (
    <div className='bg-white w-full h-full flex flex-col justify-between'>
      <div className='overflow-y-auto max-md:pb-10 pb-20'>
        {children}
      </div>
      <div className='w-full sticky bottom-0'>
        <Navbar/>
      </div>
    </div>
  )
}

export default DashHomeLayout
