"use client"
import { useRouter } from 'next/router';
import { useState } from 'react'

const WithdrawPage = () => {
const [withdrawMethod, setWithdrawMethod] = useState('Bitcoin');
  const [walletAddress, setWalletAddress] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');

  const handleWithdraw = () => {
    if (walletAddress && withdrawAmount) {
      alert(`Withdrawal initiated: ${withdrawAmount} ${withdrawMethod} to ${walletAddress}`);
      setWalletAddress('');
      setWithdrawAmount('');
    }
  };

  const router = useRouter()

  return (
    <div className="p-6 w-full">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Withdraw</h1>
        <button className="text-purple-600 text-lg cursor-pointer" onClick={()=> router.back()}>← Back</button>
      </div>

      <div className="text-center mb-8">
        <p className="text-gray-600 text-sm mb-2">Available Balance</p>
        <p className="text-4xl font-bold">$146,000</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block font-semibold mb-2">Withdraw Method</label>
          <select value={withdrawMethod} onChange={(e) => setWithdrawMethod(e.target.value)} 
            className="w-full border rounded-lg p-3 text-lg">
            <option>Bitcoin</option>
            <option>Ethereum</option>
            <option>Solana</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-2">Wallet Address</label>
          <input type="text" placeholder="Enter your wallet address" 
            value={walletAddress} onChange={(e) => setWalletAddress(e.target.value)}
            className="w-full border rounded-lg p-3 text-lg" />
        </div>

        <div>
          <label className="block font-semibold mb-2">Amount to Withdraw</label>
          <input type="number" placeholder="Amount e.g. 2000" 
            value={withdrawAmount} onChange={(e) => setWithdrawAmount(e.target.value)}
            className="w-full border rounded-lg p-3 text-lg" />
          <p className="text-gray-500 text-sm mt-1">Max: 146000</p>
        </div>

        <div>
          <label className="block font-semibold mb-2">Withdraw Charge</label>
          <div className="flex gap-2">
            <input type="text" value="$0.00" disabled className="flex-1 border rounded-lg p-3 bg-gray-100" />
            <button onClick={() => {}} className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700">
              Fixed
            </button>
          </div>
        </div>

        <button onClick={handleWithdraw} className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700">
          Withdraw
        </button>
      </div>
    </div>
  );
}

export default WithdrawPage
