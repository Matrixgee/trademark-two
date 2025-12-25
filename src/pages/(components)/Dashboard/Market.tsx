import React from 'react'
import TradingViewWidget from '../TV/TradingViewWidget'
import { useRouter } from 'next/router'

const Market = () => {

    const router = useRouter()
  return (
    <div className="p-6 w-full overflow-y-auto ">
    <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Market</h1>
        <button className="text-purple-600 text-lg cursor-pointer" onClick={()=>router.back}>← Back</button>
      </div>
      <div className='h-[80vh] w-full'>
        <TradingViewWidget/>
      </div>
    </div>
  )
}

export default Market
