import { ChartCandlestick, ChartPie, Home, Wallet } from 'lucide-react'
import { useRouter } from 'next/router';
import React from 'react'

const Navbar = () => {
const router = useRouter();

  return (
    <div  className='z-50 shadow-[0_-6px_20px_rgba(0,0,0,0.12)] pt-3 max-md:px-3 md:px-15 p-1 bg-white w-full flex justify-between text-black'>
        {
            [
    {
      icon: <Home size={20} />,
      label: "Home",
      path: "/user",
    },
    {
      icon: <ChartPie size={20} />,
      label: "Trade",
      path: "",
    },
    {
      icon: <Wallet size={20} />,
      label: "Transaction",
      path: "/user/transactionhistory",
    },
    {
      icon: <ChartCandlestick size={20} />,
      label: "Market",
      path: "/user/market",
    },
  ].map((item)=>{
          const isActive = router.pathname === item.path;

          return (
            <button
              key={item.label}
              onClick={() => router.push(item.path)}
              className={`flex flex-col items-center gap-3 text-xs transition cursor-pointer
                ${isActive ? "text-purple-700 font-medium" : "text-gray-500"}
              `}
            >
              {item.icon}
              <span className='text-sm'>{item.label}</span>
            </button>
          );
        })}
    </div>
  )
}

export default Navbar
