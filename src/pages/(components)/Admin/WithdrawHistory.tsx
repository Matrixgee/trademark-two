import axios from "@/config/axiosconfig";
import { RootState } from "@/Global/store";
import { isAxiosError } from "axios";
import { Eye, Filter, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export interface Withdrawal {
  id: string;
  uid: string;
  amount: number;
  from: string;
  to: string;
  method: string;
  status: "pending" | "approved" | "declined";
  createdAt: number;
  updatedAt: number;
  user: {
    name: string;
    email: string;
  };
}

const WithdrawHistory = () => {
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  const [selectedWithdrawal, setSelectedWithdrawal] = useState<Withdrawal | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Approved' | 'Declined' | 'Pending'>('All');
  const [assetFilter, setAssetFilter] = useState<'All' | 'BTC' | 'ETH' | 'SOL'>('All');

  const viewDetails = (withdrawal: Withdrawal) => {
    setSelectedWithdrawal(withdrawal);
    setShowDetailsModal(true);
  };

  const adminToken = useSelector((state: RootState) => state?.admin?.token);
  const [loading, setLoading] = useState<boolean>(false);

  const getAllWithdrawals = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/admin/withdrawals/all", {
        headers: {
          Authorization: `Bearer ${adminToken}`
        }
      });
      setWithdrawals(response?.data?.data);
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
    getAllWithdrawals();
  }, []);

  const filteredWithdrawals = withdrawals.filter(withdrawal => {
    const matchesSearch = 
      withdrawal.user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      withdrawal.user?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      withdrawal.to?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || withdrawal.status === statusFilter.toLowerCase();
    const matchesAsset = assetFilter === 'All' || withdrawal.method === assetFilter;
    return matchesSearch && matchesStatus && matchesAsset;
  });

  const totalWithdrawals = filteredWithdrawals.length;
  const totalAmount = filteredWithdrawals.reduce((sum, w) => sum + w.amount, 0);
  const approvedCount = filteredWithdrawals.filter(w => w.status === 'approved').length;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Withdrawal History</h1>
        <p className="text-gray-600">Complete record of all withdrawal transactions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-gray-600 text-sm mb-1">Total Withdrawals</p>
          <p className="text-3xl font-bold text-gray-900">{totalWithdrawals}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-gray-600 text-sm mb-1">Total Amount</p>
          <p className="text-3xl font-bold text-gray-900">${totalAmount.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-gray-600 text-sm mb-1">Approved</p>
          <p className="text-3xl font-bold text-green-600">{approvedCount}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by user, email or address..."
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
                <option value="Approved">Approved</option>
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
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Destination</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredWithdrawals.map((withdrawal) => (
                <tr key={withdrawal.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{withdrawal?.user?.name}</p>
                      <p className="text-sm text-gray-500">{withdrawal?.user?.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-gray-900">${withdrawal?.amount.toLocaleString()}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      {withdrawal?.method}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-700 truncate">{withdrawal?.to}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      withdrawal.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : withdrawal.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}>
                      {withdrawal.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center">
                      <button
                        onClick={() => viewDetails(withdrawal)}
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
        {filteredWithdrawals?.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-gray-500 text-lg">No withdrawals found</p>
          </div>
        )}
      </div>

      {showDetailsModal && selectedWithdrawal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-2xl font-bold mb-4">Withdrawal Details</h2>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">User:</span>
                <span className="font-semibold">{selectedWithdrawal?.user?.name}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Email:</span>
                <span className="font-semibold">{selectedWithdrawal?.user?.email}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Amount:</span>
                <span className="font-semibold text-lg">${selectedWithdrawal?.amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Asset:</span>
                <span className="font-semibold">{selectedWithdrawal.method}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Destination Address:</span>
                <span className="font-semibold text-xs truncate">{selectedWithdrawal?.to}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Requested:</span>
                <span className="font-semibold">{new Date(selectedWithdrawal?.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Processed:</span>
                <span className="font-semibold">
                  {selectedWithdrawal?.updatedAt 
                    ? new Date(selectedWithdrawal?.updatedAt).toLocaleDateString()
                    : 'Not yet processed'}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Status:</span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  selectedWithdrawal?.status === 'approved' ? 'bg-green-100 text-green-700' :
                  selectedWithdrawal?.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {selectedWithdrawal.status}
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

export default WithdrawHistory;