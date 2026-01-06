import axios from "@/config/axiosconfig";
import { RootState } from "@/Global/store";
import { isAxiosError } from "axios";
import { Eye, Filter, Search, TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export interface User {
  _id: string;
  uid: string;
  name: string;
  username: string;
  email: string;

  phoneNumber: string;

  verified: boolean;
  type: "user" | "admin";

  // balances
  balance: number;
  btcBal: number;
  ethBal: number;
  solBal: number;
  usdtBal: number;

  // wallet addresses
  bitcoin: string;
  ethereum: string;
  sol: string;

  // optional profile / meta
  profilePic: string;
  dob: string;
  state: string;
  city: string;

  // bank details
  bankName: string;
  accountNumber: string;
  routingNumber: string;

  referralId: string;

  createdAt: string;
  updatedAt: string;
}
export interface Transaction {
  id: string;
  uid: string;
  amount: number;

  type: "deposit" | "withdrawal";
  status: "pending" | "approved" | "declined";

  source: string;

  createdAt: number;
  updatedAt: number;

  user: User;
}


const AllHistory = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'All' | 'deposit' | 'withdrawal'>('All');
  const [statusFilter, setStatusFilter] = useState<"All" | "pending" | "approved" | "declined">('All');

  const viewDetails = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setShowDetailsModal(true);
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.user?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         transaction.user?.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'All' || transaction.type === typeFilter;
    const matchesStatus = statusFilter === 'All' || transaction.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const totalTransactions = filteredTransactions.length;
  const totalAmount = filteredTransactions.reduce((sum, t) => sum + t.amount, 0);
  const depositsCount = filteredTransactions.filter(t => t.type === 'deposit').length;
  const withdrawalsCount = filteredTransactions.filter(t => t.type === 'withdrawal').length;
  // const investmentsCount = filteredTransactions.filter(t => t.type === 'Investment').length;

    const adminToken = useSelector((state: RootState) => state?.admin?.token);
    const [loading, setLoading] = useState<boolean>(false);
  
    const getAllTransactions = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/admin/all-transactions", {
          headers: {
            Authorization: `Bearer ${adminToken}`
          }
        });
        setTransactions(response?.data?.data)
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
      case 'deposit':
        return <TrendingUp size={16} className="text-green-600" />;
      case 'withdrawal':
        return <TrendingDown size={16} className="text-red-600" />;
      case 'Investment':
        return <Wallet size={16} className="text-blue-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'declined':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const filterDeposit = transactions.filter((t)=> t.type === "deposit")
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

      {/* <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Wallet size={20} className="text-blue-600" />
          <p className="text-gray-700 font-semibold">Investment Activity</p>
        </div>
        <div className="flex items-baseline gap-2">
          <p className="text-4xl font-bold text-blue-700">{investmentsCount}</p>
          <p className="text-gray-600">active and completed investments</p>
        </div>
      </div> */}

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
                <option value="deposit">Deposit</option>
                <option value="withdrawal">Withdrawal</option>
                <option value="Investment">Investment</option>
              </select>
            </div>
            {/* <select
              value={assetFilter}
              onChange={(e) => setAssetFilter(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
            >
              <option value="All">All Assets</option>
              <option value="BTC">BTC</option>
              <option value="ETH">ETH</option>
              <option value="SOL">SOL</option>
            </select> */}
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
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{transaction?.user?.name}</p>
                      <p className="text-sm text-gray-500">{transaction?.user?.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(transaction.type)}
                      <span className={`font-medium ${
                        transaction.type === 'deposit' ? 'text-green-700' :
                        transaction.type === 'withdrawal' ? 'text-red-700' :
                        'text-blue-700'
                      }`}>
                        {transaction?.type === "deposit" ? "Deposit" : selectedTransaction?.type === "withdrawal" ? "Withdrawal" : selectedTransaction?.type}

                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 text-purple-700 rounded-full text-sm font-medium">
                      ${transaction?.amount}
                    </span>
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
                <span className="font-semibold">{selectedTransaction?.user?.name}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Email:</span>
                <span className="font-semibold">{selectedTransaction?.user.email}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Type:</span>
                <span className="font-semibold">
                  {selectedTransaction?.type === "deposit" ? "Deposit" : selectedTransaction ?.type === "withdrawal" ? "Withdrawal" : selectedTransaction?.type}
                  </span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Amount:</span>
                <span className="font-semibold text-lg">${selectedTransaction.amount.toLocaleString()}</span>
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