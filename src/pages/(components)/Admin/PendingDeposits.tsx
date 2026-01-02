import { CheckCircle, Eye, XCircle } from "lucide-react";
import { useState } from "react";

interface Deposit {
  id: number; user: string; email: string; amount: number; asset: 'BTC' | 'ETH' | 'SOL'; status: 'Pending' | 'Verified'; submittedDate: string; txHash?: string;
}

const PendingDeposits = () => {
  const [deposits, setDeposits] = useState<Deposit[]>([
    { id: 1, user: 'John Doe', email: 'john@example.com', amount: 5000, asset: 'BTC', status: 'Pending', submittedDate: '2024-01-18 10:30', txHash: '0x1234...abcd' },
    { id: 2, user: 'Jane Smith', email: 'jane@example.com', amount: 3500, asset: 'ETH', status: 'Pending', submittedDate: '2024-01-18 11:15', txHash: '0x5678...efgh' },
    { id: 3, user: 'Mike Johnson', email: 'mike@example.com', amount: 7200, asset: 'SOL', status: 'Pending', submittedDate: '2024-01-18 09:45', txHash: '0x9012...ijkl' },
    { id: 4, user: 'Sarah Wilson', email: 'sarah@example.com', amount: 2100, asset: 'BTC', status: 'Verified', submittedDate: '2024-01-17 14:20', txHash: '0x3456...mnop' },
  ]);

  const [selectedDeposit, setSelectedDeposit] = useState<Deposit | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const handleApprove = (id: number) => { setDeposits(deposits.map(d => d.id === id ? { ...d, status: 'Verified' } : d)); };
  const handleDecline = (id: number) => { setDeposits(deposits.filter(d => d.id !== id)); };
  const viewDetails = (deposit: Deposit) => { setSelectedDeposit(deposit); setShowDetailsModal(true); };

  const pendingCount = deposits.filter(d => d.status === 'Pending').length;

  return (
    <div>
      <div className="mb-6"><h1 className="text-3xl font-bold text-gray-900 mb-2">Pending Deposits</h1><p className="text-gray-600">{pendingCount} deposit(s) awaiting approval</p></div>
      {pendingCount > 0 && <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 flex items-start gap-3"><div className="text-yellow-600 text-xl">⚠️</div><div><p className="font-semibold text-yellow-900">Action Required</p><p className="text-sm text-yellow-800">You have {pendingCount} pending deposit request(s) to review</p></div></div>}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">User</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Asset</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Submitted</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {deposits.map((deposit) => (
                <tr key={deposit.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                  <td className="px-6 py-4"><div><p className="font-medium text-gray-900">{deposit.user}</p><p className="text-sm text-gray-500">{deposit.email}</p></div></td>
                  <td className="px-6 py-4"><p className="font-semibold text-gray-900">${deposit.amount.toLocaleString()}</p></td>
                  <td className="px-6 py-4"><span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">{deposit.asset}</span></td>
                  <td className="px-6 py-4"><p className="text-gray-600 text-sm">{deposit.submittedDate}</p></td>
                  <td className="px-6 py-4"><span className={`px-3 py-1 rounded-full text-xs font-medium ${deposit.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>{deposit.status}</span></td>
                  <td className="px-6 py-4"><div className="flex items-center justify-center gap-2"><button onClick={() => viewDetails(deposit)} className="p-2 hover:bg-blue-100 rounded-lg transition" title="View Details"><Eye size={18} className="text-blue-600" /></button>{deposit.status === 'Pending' && (<><button onClick={() => handleApprove(deposit.id)} className="p-2 hover:bg-green-100 rounded-lg transition" title="Approve"><CheckCircle size={18} className="text-green-600" /></button><button onClick={() => handleDecline(deposit.id)} className="p-2 hover:bg-red-100 rounded-lg transition" title="Decline"><XCircle size={18} className="text-red-600" /></button></>)}</div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {deposits.length === 0 && <div className="p-8 text-center"><p className="text-gray-500 text-lg">No pending deposits</p></div>}
      </div>
      {showDetailsModal && selectedDeposit && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-2xl font-bold mb-4">Deposit Details</h2>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between py-2 border-b"><span className="text-gray-600">User:</span><span className="font-semibold">{selectedDeposit.user}</span></div>
              <div className="flex justify-between py-2 border-b"><span className="text-gray-600">Email:</span><span className="font-semibold">{selectedDeposit.email}</span></div>
              <div className="flex justify-between py-2 border-b"><span className="text-gray-600">Amount:</span><span className="font-semibold text-lg">${selectedDeposit.amount.toLocaleString()}</span></div>
              <div className="flex justify-between py-2 border-b"><span className="text-gray-600">Asset:</span><span className="font-semibold">{selectedDeposit.asset}</span></div>
              <div className="flex justify-between py-2 border-b"><span className="text-gray-600">TX Hash:</span><span className="font-mono text-sm">{selectedDeposit.txHash}</span></div>
              <div className="flex justify-between py-2"><span className="text-gray-600">Submitted:</span><span className="font-semibold">{selectedDeposit.submittedDate}</span></div>
            </div>
            {selectedDeposit.status === 'Pending' && (
              <div className="flex gap-3">
                <button onClick={() => { handleApprove(selectedDeposit.id); setShowDetailsModal(false); }} className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition">Approve</button>
                <button onClick={() => { handleDecline(selectedDeposit.id); setShowDetailsModal(false); }} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition">Decline</button>
              </div>
            )}
            <button onClick={() => setShowDetailsModal(false)} className="w-full mt-3 px-4 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingDeposits