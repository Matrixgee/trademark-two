"use client"

import { useRouter } from "next/router";

const TransactionHistory = () => {
const transactions = [
    { method: 'BTC', type: 'Deposit', amount: '$60,000', date: '1/4/2025, 4:22:37 PM', status: 'APPROVED' },
    { method: 'BTC', type: 'Deposit', amount: '$50,000', date: '1/6/2025, 11:44:01 PM', status: 'DECLINED' },
    { method: 'SOL', type: 'Deposit', amount: '$70,000', date: '1/7/2025, 2:25:44 AM', status: 'APPROVED' },
    { method: 'SOL', type: 'Withdrawal', amount: '$3,000', date: '1/7/2025, 2:49:35 AM', status: 'APPROVED' },
    { method: 'SOL', type: 'Withdrawal', amount: '$3,000', date: '1/7/2025, 2:50:48 AM', status: 'DECLINED' },
    { method: 'SOL', type: 'Withdrawal', amount: '$3,000', date: '1/7/2025, 2:50:53 AM', status: 'APPROVED' }
  ];

  const router = useRouter()

  return (
    <div className="p-6 w-full">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Transaction history</h1>
        <button className="text-purple-600 text-lg cursor-pointer" onClick={()=> router.back()}>← Back</button>
      </div>

      <div className="bg-white rounded-lg overflow-hidden shadow">
        <div className="bg-purple-600 text-white p-4">
          <h2 className="font-bold text-lg">Transactions</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="text-left p-4 font-semibold">Method</th>
                <th className="text-left p-4 font-semibold">Type</th>
                <th className="text-left p-4 font-semibold">Amount</th>
                <th className="text-left p-4 font-semibold">Date</th>
                <th className="text-left p-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-semibold">{tx.method}</td>
                  <td className="p-4 text-gray-600">{tx.type}</td>
                  <td className="p-4 font-semibold">{tx.amount}</td>
                  <td className="p-4 text-gray-600">{tx.date}</td>
                  <td className="p-4">
                    <span className={`font-semibold ${tx.status === 'APPROVED' ? 'text-green-500' : 'text-red-500'}`}>
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TransactionHistory
