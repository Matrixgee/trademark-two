"use client"

import DepositModal from "@/Modals/DepositModal";
import { useRouter } from "next/router";
import { useState } from "react";

const DepositPage = () => {
const assets = [
    { id: 'btc', name: 'Bitcoin', symbol: 'BTC', balance: '$54,000.00', icon: '₿', color: 'bg-orange-500' },
    { id: 'eth', name: 'Ethereum', symbol: 'ETH', balance: '$7,000.00', icon: '⟠', color: 'bg-gray-400' },
    { id: 'sol', name: 'Solana', symbol: 'SOL', balance: '$70,000.00', icon: '◎', color: 'bg-black' }
  ];

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
  
    const showModal = () => setIsModalVisible(true);
    const handleCancel = () => setIsModalVisible(false);

  const router = useRouter()
  return (
    <div className="p-6 w-full">
        <DepositModal setIsModalVisible={setIsModalVisible} isModalVisible={isModalVisible} showModal={showModal} handleCancel={handleCancel} loading={loading} setLoading={setLoading}/>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Deposit</h1>
        <button className="text-purple-600 text-lg cursor-pointer" onClick={()=>router.back}>← Back</button>
      </div>

      <div className="text-center mb-8">
        <p className="text-gray-600 text-sm mb-2">Available Balance</p>
        <p className="text-4xl font-bold">$15,000.00</p>
      </div>

      <h2 className="text-gray-700 font-semibold mb-4">Select Preferred Asset</h2>
      <div className="space-y-3">
        {assets.map(asset => (
          <div key={asset.id} className="border rounded-lg p-4 bg-white flex items-center justify-between hover:shadow-md transition">
            <div className="flex items-center gap-4">
              <div className={`${asset.color} w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-bold`}>
                {asset.icon}
              </div>
              <div>
                <p className="font-bold text-lg">{asset.name}</p>
                <p className="text-gray-500 text-sm">{asset.symbol}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-lg">{asset.balance}</p>
              <p className="text-gray-500 text-sm">Total {asset.symbol.toLowerCase()} Balance</p>
            </div>
            <button onClick={showModal} className="bg-purple-600 cursor-pointer text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700">
              Fund
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DepositPage
