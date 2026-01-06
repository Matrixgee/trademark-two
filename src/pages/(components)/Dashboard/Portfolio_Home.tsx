"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ChartNoAxesColumn,
  ChevronDown,
  Download,
  Send,
  TrendingUp,
  User,
} from "lucide-react";
import ProfileDropdown from "./ProfileDropdown";
import { useRouter } from "next/router";
import Chartone from "../TV/Chartone";
import Image from "next/image";
import axios from "@/config/axiosconfig";
import { useSelector } from "react-redux";
import { RootState } from "@/Global/store";

const Portfolio_Home = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const user = useSelector((state: RootState) => state?.user);
  const userDetails = user.User?.user?.user;
  const financeDetails = user?.User?.user

  const assets = [
    {
      id: "btc",
      name: "Bitcoin",
      symbol: "BTC",
      balance: `$${userDetails?.btcBal}`,
      icon: "/bitcoin.svg",
      alt: "btc",
    },
    {
      id: "eth",
      name: "Ethereum",
      symbol: "ETH",
      balance: `$${userDetails?.ethBal}`,
      icon: "/ethimage.png",
      alt: "eth",
    },
    {
      id: "sol",
      name: "Solana",
      symbol: "SOL",
      balance: `$${userDetails?.solBal}`,
      icon: "/solimage.png",
      alt: "sol",
    },
  ];

  const router = useRouter();

  return (
    <div className="bg-white p-3">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-start justify-between px-3 py-3 bg-white rounded-lg shadow-sm">
            <div>
              <p className="text-gray-500 text-sm">Total portfolio</p>
              <h2 className="text-xl font-bold text-gray-900">${userDetails?.balance}</h2>
            </div>

            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-end gap-1 cursor-pointer"
              >
                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center border-4 border-white shadow-md">
                  <User size={24} className="text-white" />
                </div>
                <ChevronDown size={15} className="text-gray-500 pb-1" />
              </motion.button>

              <ProfileDropdown
                isOpen={dropdownOpen}
                onClose={() => setDropdownOpen(false)}
              />
            </div>
          </div>
        </motion.div>

        {/* Welcome Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-linear-to-r from-purple-600 to-purple-800 rounded-2xl p-6 sm:p-8 text-white mb-6 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500 rounded-full opacity-20 -mr-16 -mt-16" />

          <div className="text-center relative z-10">
            <h3 className="text-2xl font-bold mb-2">
              Hello, {userDetails?.name}
            </h3>
            <p className="text-purple-200 text-sm mb-6 leading-relaxed">
              Welcome to Trademark Investment <br />
              Crypto Investment Made Easy.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={()=>router.push("user/invest")}
              className="bg-white text-purple-900 font-semibold text-sm py-2 px-6 rounded-lg hover:bg-purple-50 transition inline-flex items-center gap-2"
            >
              <ChartNoAxesColumn className="w-4 h-4" />
              Start Trading
            </motion.button>
          </div>
        </motion.div>

        {/* Chart */}
        <div className="w-full h-[66vh] mb-8 rounded-lg shadow-md overflow-hidden">
          <Chartone />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <Send className="w-4 h-4 text-purple-600 mb-1" />
            <p className="text-gray-600 text-sm">Total Withdraw</p>
            <p className="text-sm font-bold">${financeDetails?.totalWithdrawals}</p>
          </div>

          <div className="bg-white rounded-lg p-3 shadow-sm">
            <Download className="w-4 h-4 text-purple-600 mb-1" />
            <p className="text-gray-600 text-sm">Total Deposit</p>
            <p className="text-sm font-bold">${financeDetails?.totalDeposits}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <button
            onClick={() => router.push("/user/withdrawal")}
            className="border rounded-lg p-3 hover:border-purple-600 cursor-pointer hover:bg-purple-50 transition"
          >
            <Send className="mx-auto w-5 h-5 text-purple-600" />
            <p className="text-sm font-semibold mt-1 text-center">Withdraw</p>
          </button>

          <button
            onClick={() => router.push("/user/deposit")}
            className="border rounded-lg p-3 hover:border-purple-600 cursor-pointer hover:bg-purple-50 transition"
          >
            <Download className="mx-auto w-5 h-5 text-purple-600" />
            <p className="text-sm font-semibold mt-1 text-center">Deposit</p>
          </button>

          <button 
          onClick={() => router.push("/user/invest")}
          className="border rounded-lg p-3 hover:border-purple-600 cursor-pointer hover:bg-purple-50 transition">
            <TrendingUp className="mx-auto w-5 h-5 text-purple-600" />
            <p className="text-sm font-semibold mt-1 text-center">Trade</p>
          </button>
        </div>

        {/* Assets */}
        <h2 className="text-xl font-bold mb-4">My Assets</h2>
        <div className="space-y-3">
          {assets.map((asset) => (
            <div
              key={asset.id}
              className="bg-white rounded-lg p-4 flex items-center justify-between shadow-sm"
            >
              <div className="flex items-center gap-3">
                <Image
                  src={asset.icon}
                  alt={asset.alt}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <p className="font-bold">{asset.name}</p>
                  <p className="text-xs text-gray-500">{asset.symbol}</p>
                </div>
              </div>

              <div className="text-right">
                <p className="font-bold">{asset.balance}</p>
                <p className="text-xs text-gray-500">
                  Total {asset.symbol.toLowerCase()} balance
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio_Home;

// "use client";

// import { useState } from "react";
// import { motion } from "framer-motion";
// import {
//   ChartNoAxesColumn,
//   ChevronDown,
//   Download,
//   Send,
//   TrendingUp,
//   User,
// } from "lucide-react";
// import ProfileDropdown from "./ProfileDropdown";
// import { useRouter } from "next/router";
// import Chartone from "../TV/Chartone";
// import Image from "next/image";

// const Portfolio_Home = () => {
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   const assets = [
//     { id: "btc", name: "Bitcoin", symbol: "BTC", balance: "$54,000.00", icon: "/bitcoin.svg", alt: "btc" },
//     { id: "eth", name: "Ethereum", symbol: "ETH", balance: "$7,000.00", icon: "/ethimage.png", alt: "eth" },
//     { id: "sol", name: "Solana", symbol: "SOL", balance: "$70,000.00", icon: "/solimage.png", alt: "sol" },
//   ];

//   const router = useRouter();

//   return (
//     <div className="bg-gray-50 p-4 min-h-screen">
//       <div className="max-w-7xl mx-auto space-y-6">

//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 15 }}
//           animate={{ opacity: 1, y: 0 }}
//         >
//           <div className="flex justify-between items-center bg-white rounded-xl px-4 py-4 shadow-sm border">
//             <div>
//               <p className="text-gray-400 text-sm">Total portfolio</p>
//               <h2 className="text-2xl font-bold text-gray-900">$15,000.00</h2>
//             </div>

//             <div className="relative">
//               <motion.button
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => setDropdownOpen(!dropdownOpen)}
//                 className="flex items-center gap-2"
//               >
//                 <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center shadow">
//                   <User size={22} className="text-white" />
//                 </div>
//                 <ChevronDown size={16} className="text-gray-500" />
//               </motion.button>

//               <ProfileDropdown
//                 isOpen={dropdownOpen}
//                 onClose={() => setDropdownOpen(false)}
//               />
//             </div>
//           </div>
//         </motion.div>

//         {/* Welcome Card */}
//         <motion.div
//           initial={{ opacity: 0, y: 15 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.1 }}
//           className="relative overflow-hidden rounded-2xl bg-linear-to-br from-purple-600 via-purple-700 to-purple-900 p-7 text-white"
//         >
//           <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full" />

//           <div className="relative z-10 text-center">
//             <h3 className="text-2xl font-semibold mb-2">
//               Hello, Michael Jordan 👋
//             </h3>
//             <p className="text-purple-200 text-sm mb-6">
//               Welcome to Trademark Investment <br />
//               Crypto Investment Made Easy.
//             </p>

//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="inline-flex items-center gap-2 bg-white text-purple-900 px-6 py-2.5 rounded-lg text-sm font-semibold shadow hover:bg-purple-50"
//             >
//               <ChartNoAxesColumn className="w-4 h-4" />
//               Start Trading
//             </motion.button>
//           </div>
//         </motion.div>

//         {/* Chart */}
//         <div className="bg-white rounded-xl p-4 shadow-sm border">
//           <div className="h-[45vh]">
//             <Chartone />
//           </div>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           {[
//             { label: "Total Withdraw", value: "$6,000.00", icon: Send },
//             { label: "Total Deposit", value: "$137,000.00", icon: Download },
//           ].map(({ label, value, icon: Icon }) => (
//             <div
//               key={label}
//               className="bg-white rounded-xl p-4 shadow-sm border flex items-center gap-4"
//             >
//               <div className="p-2 bg-purple-50 rounded-lg">
//                 <Icon className="w-4 h-4 text-purple-600" />
//               </div>
//               <div>
//                 <p className="text-gray-500 text-sm">{label}</p>
//                 <p className="font-bold">{value}</p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Actions */}
//         <div className="grid grid-cols-3 gap-4">
//           {[
//             { label: "Withdraw", icon: Send, action: () => router.push("/user/withdrawal") },
//             { label: "Deposit", icon: Download, action: () => router.push("/user/deposit") },
//             { label: "Trade", icon: TrendingUp },
//           ].map(({ label, icon: Icon, action }) => (
//             <motion.button
//               key={label}
//               whileHover={{ y: -2 }}
//               onClick={action}
//               className="bg-white border rounded-xl p-4 shadow-sm hover:border-purple-600 hover:bg-purple-50 transition text-center"
//             >
//               <Icon className="mx-auto w-5 h-5 text-purple-600 mb-1" />
//               <p className="text-sm font-semibold">{label}</p>
//             </motion.button>
//           ))}
//         </div>

//         {/* Assets */}
//         <div>
//           <h2 className="text-lg font-bold mb-4">My Assets</h2>
//           <div className="space-y-3">
//             {assets.map((asset) => (
//               <motion.div
//                 key={asset.id}
//                 whileHover={{ scale: 1.01 }}
//                 className="bg-white border rounded-xl p-4 flex items-center justify-between shadow-sm"
//               >
//                 <div className="flex items-center gap-3">
//                   <Image
//                     src={asset.icon}
//                     alt={asset.alt}
//                     width={40}
//                     height={40}
//                     className="rounded-full"
//                   />
//                   <div>
//                     <p className="font-semibold">{asset.name}</p>
//                     <p className="text-xs text-gray-500">{asset.symbol}</p>
//                   </div>
//                 </div>

//                 <div className="text-right">
//                   <p className="font-semibold">{asset.balance}</p>
//                   <p className="text-xs text-gray-400">
//                     Total balance
//                   </p>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Portfolio_Home;
