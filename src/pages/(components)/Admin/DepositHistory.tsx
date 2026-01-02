import { Eye, Filter, Search } from "lucide-react";
import { useState } from "react";

interface Deposit {
  id: number;
  user: string;
  email: string;
  amount: number;
  asset: 'BTC' | 'ETH' | 'SOL';
  status: 'Verified' | 'Declined' | 'Pending';
  submittedDate: string;
  processedDate?: string;
  txHash?: string;
}

const DepositHistory = () => {
  const [deposits] = useState<Deposit[]>([
    { id: 1, user: 'John Doe', email: 'john@example.com', amount: 5000, asset: 'BTC', status: 'Verified', submittedDate: '2024-01-18 10:30', processedDate: '2024-01-18 11:00', txHash: '0x1234...abcd' },
    { id: 2, user: 'Jane Smith', email: 'jane@example.com', amount: 3500, asset: 'ETH', status: 'Verified', submittedDate: '2024-01-18 11:15', processedDate: '2024-01-18 12:30', txHash: '0x5678...efgh' },
    { id: 3, user: 'Mike Johnson', email: 'mike@example.com', amount: 7200, asset: 'SOL', status: 'Declined', submittedDate: '2024-01-18 09:45', processedDate: '2024-01-18 10:15', txHash: '0x9012...ijkl' },
    { id: 4, user: 'Sarah Wilson', email: 'sarah@example.com', amount: 2100, asset: 'BTC', status: 'Verified', submittedDate: '2024-01-17 14:20', processedDate: '2024-01-17 15:00', txHash: '0x3456...mnop' },
    { id: 5, user: 'Tom Brown', email: 'tom@example.com', amount: 4800, asset: 'ETH', status: 'Verified', submittedDate: '2024-01-17 10:30', processedDate: '2024-01-17 11:45', txHash: '0x7890...qrst' },
    { id: 6, user: 'Lisa Anderson', email: 'lisa@example.com', amount: 1500, asset: 'SOL', status: 'Declined', submittedDate: '2024-01-17 08:15', processedDate: '2024-01-17 09:00', txHash: '0xabcd...uvwx' },
    { id: 7, user: 'David Lee', email: 'david@example.com', amount: 6300, asset: 'BTC', status: 'Verified', submittedDate: '2024-01-16 16:45', processedDate: '2024-01-16 17:30', txHash: '0xefgh...yzab' },
    { id: 8, user: 'Emma Davis', email: 'emma@example.com', amount: 2900, asset: 'ETH', status: 'Pending', submittedDate: '2024-01-16 14:00', txHash: '0xijkl...cdef' },
  ]);

  const [selectedDeposit, setSelectedDeposit] = useState<Deposit | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Verified' | 'Declined' | 'Pending'>('All');
  const [assetFilter, setAssetFilter] = useState<'All' | 'BTC' | 'ETH' | 'SOL'>('All');

  const viewDetails = (deposit: Deposit) => {
    setSelectedDeposit(deposit);
    setShowDetailsModal(true);
  };

  const filteredDeposits = deposits.filter(deposit => {
    const matchesSearch = deposit.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         deposit.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || deposit.status === statusFilter;
    const matchesAsset = assetFilter === 'All' || deposit.asset === assetFilter;
    return matchesSearch && matchesStatus && matchesAsset;
  });

  const totalDeposits = filteredDeposits.length;
  const totalAmount = filteredDeposits.reduce((sum, d) => sum + d.amount, 0);
  const verifiedCount = filteredDeposits.filter(d => d.status === 'Verified').length;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Deposit History</h1>
        <p className="text-gray-600">Complete record of all deposit transactions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-gray-600 text-sm mb-1">Total Deposits</p>
          <p className="text-3xl font-bold text-gray-900">{totalDeposits}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-gray-600 text-sm mb-1">Total Amount</p>
          <p className="text-3xl font-bold text-gray-900">${totalAmount.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-gray-600 text-sm mb-1">Verified</p>
          <p className="text-3xl font-bold text-green-600">{verifiedCount}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by user or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <Filter size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
              >
                <option value="All">All Status</option>
                <option value="Verified">Verified</option>
                <option value="Pending">Pending</option>
                <option value="Declined">Declined</option>
              </select>
            </div>
            <select
              value={assetFilter}
              onChange={(e) => setAssetFilter(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
            >
              <option value="All">All Assets</option>
              <option value="BTC">BTC</option>
              <option value="ETH">ETH</option>
              <option value="SOL">SOL</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">User</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Asset</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Submitted</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Processed</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDeposits.map((deposit) => (
                <tr key={deposit.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{deposit.user}</p>
                      <p className="text-sm text-gray-500">{deposit.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-gray-900">${deposit.amount.toLocaleString()}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                      {deposit.asset}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-600 text-sm">{deposit.submittedDate}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-600 text-sm">{deposit.processedDate || '-'}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      deposit.status === 'Verified' ? 'bg-green-100 text-green-700' :
                      deposit.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {deposit.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center">
                      <button
                        onClick={() => viewDetails(deposit)}
                        className="p-2 hover:bg-blue-100 rounded-lg transition"
                        title="View Details"
                      >
                        <Eye size={18} className="text-blue-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredDeposits.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-gray-500 text-lg">No deposits found</p>
          </div>
        )}
      </div>

      {showDetailsModal && selectedDeposit && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-2xl font-bold mb-4">Deposit Details</h2>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">User:</span>
                <span className="font-semibold">{selectedDeposit.user}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Email:</span>
                <span className="font-semibold">{selectedDeposit.email}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Amount:</span>
                <span className="font-semibold text-lg">${selectedDeposit.amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Asset:</span>
                <span className="font-semibold">{selectedDeposit.asset}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">TX Hash:</span>
                <span className="font-mono text-sm">{selectedDeposit.txHash}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Submitted:</span>
                <span className="font-semibold">{selectedDeposit.submittedDate}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Processed:</span>
                <span className="font-semibold">{selectedDeposit.processedDate || 'Not yet processed'}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Status:</span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  selectedDeposit.status === 'Verified' ? 'bg-green-100 text-green-700' :
                  selectedDeposit.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {selectedDeposit.status}
                </span>
              </div>
            </div>
            <button
              onClick={() => setShowDetailsModal(false)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepositHistory;