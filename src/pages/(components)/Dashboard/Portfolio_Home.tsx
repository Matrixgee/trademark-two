"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion';
import { ChevronDown, Download, Router, Send, TrendingUp, User } from 'lucide-react';
import ProfileDropdown from './ProfileDropdown';
import { useRouter } from 'next/router';

const Portfolio_Home = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const assets = [
    { id: 'btc', name: 'Bitcoin', symbol: 'BTC', balance: '$54,000.00', icon: '₿', color: 'bg-orange-500' },
    { id: 'eth', name: 'Ethereum', symbol: 'ETH', balance: '$7,000.00', icon: '⟠', color: 'bg-gray-400' },
    { id: 'sol', name: 'Solana', symbol: 'SOL', balance: '$70,000.00', icon: '◎', color: 'bg-black' }
  ];
  const router = useRouter()
  return (
    <div className='bg-white p-3'>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <div className="flex items-start justify-between mb-4 px-3 bg-white">
        <div>
          <p className="text-gray-500 text-sm">Total portfolio</p>
          <h2 className="text-xl font-bold text-gray-900">$15,000.00</h2>
        </div>
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="relative cursor-pointer"
          >
            <div className='flex items-end cursor-pointer'>
              <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center border-4 border-white shadow-lg">
              <User size={32} className="text-white" />
            </div>
            <ChevronDown size={15} className='text-gray-500 pb-1' />
            </div>
          </motion.button>
          <ProfileDropdown isOpen={dropdownOpen} onClose={() => setDropdownOpen(false)} />
        </div>
      </div>
    </motion.div>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-8 text-white mb-6 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500 rounded-full opacity-20 -mr-16 -mt-16"></div>
      
      <div className="flex items-center justify-center">
        <div className="relative z-10 text-center">
          <h3 className="text-2xl font-bold mb-2">Hello, Michael Jordan</h3>
          <p className="text-purple-200 text-sm leading-relaxed mb-6">
            Welcome to Block Crypto Investment<br/>
            Crypto Investment Made Easy.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-purple-900 font-semibold py-2 px-6 rounded-lg hover:bg-purple-50 transition inline-flex items-center gap-2"
          >
            📊 Start Trading
          </motion.button>
        </div>
      </div>
    </motion.div>
    <div className="p-6 w-full">
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white flex flex-col h-max items-start rounded-lg p-2 shadow-md">
          <div className="flex flex-col items-start gap-1">
            <div className="rounded-lg flex items-start justify-start">
              <Send className="w-4 h-4 text-purple-600" />
            </div>
            <p className="text-gray-600 text-sm">Total Withdraw</p>
          </div>
          <p className="text-sm font-bold">$6,000.00</p>
        </div>

        <div className="bg-white flex flex-col items-start rounded-lg p-2 shadow-md">
          <div className="flex flex-col items-start gap-1">
            <div className="rounded-lg flex items-start justify-start">
              <Download className="w-4 h-4 text-purple-600" />
            </div>
            <p className="text-gray-600 text-sm">Total Deposit</p>
          </div>
          <p className="text-sm font-bold">$137,000.00</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <button 
          onClick={() => router.push("/user/withdrawal")}
          className="border-2 border-gray-300 rounded-lg cursor-pointer h-max p-3 hover:border-purple-600 hover:bg-purple-50 transition">
          <div className="flex flex-col items-center gap-2">
            <Send className="w-5 h-5 text-purple-600" />
            <span className="font-semibold">Withdraw</span>
          </div>
        </button>

        <button 
          onClick={() => router.push("/user/deposit")}
          className="border-2 border-gray-300 rounded-lg cursor-pointer p-3 h-max hover:border-purple-600 hover:bg-purple-50 transition">
          <div className="flex flex-col items-center gap-2">
            <Download className="w-5 h-5 text-purple-600" />
            <span className="font-semibold">Deposit</span>
          </div>
        </button>

        <button className="border-2 border-gray-300 rounded-lg cursor-pointer p-3 h-max hover:border-purple-600 hover:bg-purple-50 transition">
          <div className="flex flex-col items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            <span className="font-semibold">Trade</span>
          </div>
        </button>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">My Assets</h2>
        <div className="space-y-3">
          {assets.map(asset => (
            <div key={asset.id} className="bg-white border rounded-lg p-4 flex items-center justify-between hover:shadow-md transition">
              <div className="flex items-center gap-4">
                <div className={`${asset.color} w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-bold`}>
                  {asset.icon}
                </div>
                <div>
                  <p className="font-bold text-[16px]">{asset.name}</p>
                  <p className="text-gray-500 text-xs">{asset.symbol}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-[16px]">{asset.balance}</p>
                <p className="text-gray-500 text-sm">Total {asset.symbol.toLowerCase()} Balance</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  )
}

export default Portfolio_Home
