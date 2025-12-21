import React, { ReactNode } from 'react'
import Header from '../(components)/Header'
import Footer from '../(components)/Footer'

interface MainLayoutsProps {
    children: ReactNode
}
const HomeLayouts:React.FC<MainLayoutsProps> = ({children}) => {
  return (
    <div className=''>
        <Header/>
             <div className="w-full">{children}</div>
        <Footer/>
    </div>
  )
}

export default HomeLayouts
