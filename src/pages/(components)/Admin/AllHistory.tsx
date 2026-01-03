import axios from "@/config/axiosconfig";
import { RootState } from "@/Global/store";
import { isAxiosError } from "axios";
import { Eye, Filter, Search, TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface Transaction {
  id: number;
  user: string;
  email: string;
  amount: number;
  asset: 'BTC' | 'ETH' | 'SOL';
  type: 'Deposit' | 'Withdrawal' | 'Investment';
  status: 'Verified' | 'Processed' | 'Declined' | 'Pending' | 'Active' | 'Completed';
  submittedDate: string;
  processedDate?: string;
  txHash?: string;
  walletAddress?: string;
  investmentPlan?: string;
  roi?: number;
}

const AllHistory = () => {
  const [transactions] = useState<Transaction[]>([
    { id: 1, user: 'John Doe', email: 'john@example.com', amount: 5000, asset: 'BTC', type: 'Deposit', status: 'Verified', submittedDate: '2024-01-18 10:30', processedDate: '2024-01-18 11:00', txHash: '0x1234...abcd' },
    { id: 2, user: 'Jane Smith', email: 'jane@example.com', amount: 2000, asset: 'ETH', type: 'Withdrawal', status: 'Processed', submittedDate: '2024-01-18 11:15', processedDate: '2024-01-18 12:30', txHash: '0x5678...efgh', walletAddress: '0x742d...' },
    { id: 3, user: 'Mike Johnson', email: 'mike@example.com', amount: 10000, asset: 'BTC', type: 'Investment', status: 'Active', submittedDate: '2024-01-18 09:45', processedDate: '2024-01-18 10:15', investmentPlan: 'Premium Plan', roi: 15 },
    { id: 4, user: 'Sarah Wilson', email: 'sarah@example.com', amount: 3500, asset: 'ETH', type: 'Deposit', status: 'Verified', submittedDate: '2024-01-17 14:20', processedDate: '2024-01-17 15:00', txHash: '0x3456...mnop' },
    { id: 5, user: 'Tom Brown', email: 'tom@example.com', amount: 1500, asset: 'SOL', type: 'Withdrawal', status: 'Processed', submittedDate: '2024-01-17 10:30', processedDate: '2024-01-17 11:45', txHash: '0x7890...qrst', walletAddress: 'So11P...' },
    { id: 6, user: 'Lisa Anderson', email: 'lisa@example.com', amount: 8000, asset: 'BTC', type: 'Investment', status: 'Completed', submittedDate: '2024-01-16 08:15', processedDate: '2024-01-16 09:00', investmentPlan: 'Standard Plan', roi: 12 },
    { id: 7, user: 'David Lee', email: 'david@example.com', amount: 4200, asset: 'ETH', type: 'Deposit', status: 'Declined', submittedDate: '2024-01-16 16:45', processedDate: '2024-01-16 17:30', txHash: '0xefgh...yzab' },
    { id: 8, user: 'Emma Davis', email: 'emma@example.com', amount: 2800, asset: 'SOL', type: 'Withdrawal', status: 'Pending', submittedDate: '2024-01-16 14:00', walletAddress: '3J98t...' },
    { id: 9, user: 'Chris Martin', email: 'chris@example.com', amount: 15000, asset: 'BTC', type: 'Investment', status: 'Active', submittedDate: '2024-01-15 12:30', processedDate: '2024-01-15 13:00', investmentPlan: 'Elite Plan', roi: 20 },
    { id: 10, user: 'Anna White', email: 'anna@example.com', amount: 3000, asset: 'ETH', type: 'Deposit', status: 'Verified', submittedDate: '2024-01-15 09:20', processedDate: '2024-01-15 10:00', txHash: '0xijkl...cdef' },
  ]);

  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'All' | 'Deposit' | 'Withdrawal' | 'Investment'>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Verified' | 'Processed' | 'Declined' | 'Pending' | 'Active' | 'Completed'>('All');
  const [assetFilter, setAssetFilter] = useState<'All' | 'BTC' | 'ETH' | 'SOL'>('All');

  const viewDetails = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setShowDetailsModal(true);
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         transaction.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'All' || transaction.type === typeFilter;
    const matchesStatus = statusFilter === 'All' || transaction.status === statusFilter;
    const matchesAsset = assetFilter === 'All' || transaction.asset === assetFilter;
    return matchesSearch && matchesType && matchesStatus && matchesAsset;
  });

  const totalTransactions = filteredTransactions.length;
  const totalAmount = filteredTransactions.reduce((sum, t) => sum + t.amount, 0);
  const depositsCount = filteredTransactions.filter(t => t.type === 'Deposit').length;
  const withdrawalsCount = filteredTransactions.filter(t => t.type === 'Withdrawal').length;
  const investmentsCount = filteredTransactions.filter(t => t.type === 'Investment').length;

    const adminToken = useSelector((state: RootState) => state?.admin?.token);
    const [loading, setLoading] = useState<boolean>(false);
  
    const getAllTransactions = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/transaction/all", {
          headers: {
            Authorization: `Bearer ${adminToken}`
          }
        });
        console.log(response?.data?.data);
      } catch (error) {
        if (isAxiosError(error)) {
          console.log(error);
        }
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      getAllTransactions();
    }, []);
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Deposit':
        return <TrendingUp size={16} className="text-green-600" />;
      case 'Withdrawal':
        return <TrendingDown size={16} className="text-red-600" />;
      case 'Investment':
        return <Wallet size={16} className="text-blue-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Verified':
      case 'Processed':
      case 'Completed':
        return 'bg-green-100 text-green-700';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'Active':
        return 'bg-blue-100 text-blue-700';
      case 'Declined':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">All Transaction History</h1>
        <p className="text-gray-600">Complete record of deposits, withdrawals, and investments</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-gray-600 text-sm mb-1">Total Transactions</p>
          <p className="text-3xl font-bold text-gray-900">{totalTransactions}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-gray-600 text-sm mb-1">Total Amount</p>
          <p className="text-3xl font-bold text-gray-900">${totalAmount.toLocaleString()}</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp size={18} className="text-green-600" />
            <p className="text-gray-600 text-sm">Deposits</p>
          </div>
          <p className="text-3xl font-bold text-green-700">{depositsCount}</p>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-2 mb-1">
            <TrendingDown size={18} className="text-red-600" />
            <p className="text-gray-600 text-sm">Withdrawals</p>
          </div>
          <p className="text-3xl font-bold text-red-700">{withdrawalsCount}</p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Wallet size={20} className="text-blue-600" />
          <p className="text-gray-700 font-semibold">Investment Activity</p>
        </div>
        <div className="flex items-baseline gap-2">
          <p className="text-4xl font-bold text-blue-700">{investmentsCount}</p>
          <p className="text-gray-600">active and completed investments</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
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
          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <Filter size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as any)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
              >
                <option value="All">All Types</option>
                <option value="Deposit">Deposit</option>
                <option value="Withdrawal">Withdrawal</option>
                <option value="Investment">Investment</option>
              </select>
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
            >
              <option value="All">All Status</option>
              <option value="Verified">Verified</option>
              <option value="Processed">Processed</option>
              <option value="Pending">Pending</option>
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
              <option value="Declined">Declined</option>
            </select>
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
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Asset</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Submitted</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{transaction.user}</p>
                      <p className="text-sm text-gray-500">{transaction.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(transaction.type)}
                      <span className={`font-medium ${
                        transaction.type === 'Deposit' ? 'text-green-700' :
                        transaction.type === 'Withdrawal' ? 'text-red-700' :
                        'text-blue-700'
                      }`}>
                        {transaction.type}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-gray-900">${transaction.amount.toLocaleString()}</p>
                    {transaction.roi && (
                      <p className="text-xs text-green-600">ROI: {transaction.roi}%</p>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                      {transaction.asset}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-600 text-sm">{transaction.submittedDate}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center">
                      <button
                        onClick={() => viewDetails(transaction)}
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
        {filteredTransactions.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-gray-500 text-lg">No transactions found</p>
          </div>
        )}
      </div>

      {showDetailsModal && selectedTransaction && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              {getTypeIcon(selectedTransaction.type)}
              <h2 className="text-2xl font-bold">{selectedTransaction.type} Details</h2>
            </div>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">User:</span>
                <span className="font-semibold">{selectedTransaction.user}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Email:</span>
                <span className="font-semibold">{selectedTransaction.email}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Amount:</span>
                <span className="font-semibold text-lg">${selectedTransaction.amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Asset:</span>
                <span className="font-semibold">{selectedTransaction.asset}</span>
              </div>
              {selectedTransaction.txHash && (
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">TX Hash:</span>
                  <span className="font-mono text-sm">{selectedTransaction.txHash}</span>
                </div>
              )}
              {selectedTransaction.walletAddress && (
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Wallet Address:</span>
                  <span className="font-mono text-sm">{selectedTransaction.walletAddress}</span>
                </div>
              )}
              {selectedTransaction.investmentPlan && (
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Investment Plan:</span>
                  <span className="font-semibold">{selectedTransaction.investmentPlan}</span>
                </div>
              )}
              {selectedTransaction.roi && (
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">ROI:</span>
                  <span className="font-semibold text-green-600">{selectedTransaction.roi}%</span>
                </div>
              )}
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Submitted:</span>
                <span className="font-semibold">{selectedTransaction.submittedDate}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Processed:</span>
                <span className="font-semibold">{selectedTransaction.processedDate || 'Not yet processed'}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Status:</span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedTransaction.status)}`}>
                  {selectedTransaction.status}
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

export default AllHistory;