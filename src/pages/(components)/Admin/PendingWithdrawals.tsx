import axios from "@/config/axiosconfig";
import { RootState } from "@/Global/store";
import { isAxiosError } from "axios";
import { CheckCircle, Eye, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Withdrawal } from "./WithdrawHistory";
import toast from "react-hot-toast";

const PendingWithdrawals = () => {
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);

  const [selectedWithdrawal, setSelectedWithdrawal] = useState<Withdrawal | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

    const getAllWitdrawals = async () => {
    setLoading(true)
    try {
      const response = await axios.get("/admin/withdrawals/all", {
        headers: {
          Authorization: `Bearer ${adminToken}`
        }
      })
      setWithdrawals(response?.data?.data.filter(
        (withdrawal: Withdrawal) => withdrawal.status === "pending"
      )
      );
      console.log(response?.data?.data)
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error)
      }
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getAllWitdrawals()
  }, [])

const handleApprove = async (id: string) => {
    const loadingId = toast.loading("Approving, Please wait...")
    try {
      const response = await axios.patch(`/admin/withdrawals/${id}/approve`, {}, {
        headers: {
          Authorization: `Bearer ${adminToken}`
        }
      })
      toast.success(response?.data?.message || "Deposit approve successfully")
      getAllWitdrawals()
      console.log(response)
    } catch (error) {
      if (isAxiosError(error)) {
      console.log(error)
      toast.error(error?.response?.data?.message)
      }
    } finally {
      toast.dismiss(loadingId)
    }
  }
  const handleDecline = async (id: string) => {
    const loadingId = toast.loading("Declining, Please wait...")
    try {
      const response = await axios.patch(`/admin/withdrawals/${id}/decline`, {}, {
        headers: {
          Authorization: `Bearer ${adminToken}`
        }
      })
      getAllWitdrawals()
      toast.success(response?.data?.message || "Deposit Declined successfully")
      console.log(response)
    } catch (error) {
      if (isAxiosError(error)) {
      console.log(error)
      toast.error(error?.response?.data?.message)
      }
    } finally {
      toast.dismiss(loadingId)
    }
  }
  const viewDetails = (withdrawal: Withdrawal) => {
    setSelectedWithdrawal(withdrawal);
    setShowDetailsModal(true);
  };


  const adminToken = useSelector((state: RootState) => state?.admin?.token)
  const [loading, setLoading] = useState<boolean>(false)



  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Pending Withdrawals</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">User</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Asset</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {withdrawals.map((withdrawal) => (
                <tr key={withdrawal.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{withdrawal?.user?.name}</p>
                      <p className="text-sm text-gray-500">{withdrawal?.user?.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-gray-900">${withdrawal.amount.toLocaleString()}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                      {withdrawal?.method}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${withdrawal.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                      {
                        withdrawal.status === 'pending' ? "Pending" :
                      withdrawal.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => viewDetails(withdrawal)}
                        className="p-2 hover:bg-blue-100 rounded-lg transition"
                        title="View Details"
                      >
                        <Eye size={18} className="text-blue-600" />
                      </button>
                      {withdrawal.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleApprove(withdrawal?.id)}
                            className="p-2 hover:bg-green-100 rounded-lg transition"
                            title="Approve"
                          >
                            <CheckCircle size={18} className="text-green-600" />
                          </button>
                          <button
                            onClick={() => handleDecline(withdrawal?.id)}
                            className="p-2 hover:bg-red-100 rounded-lg transition"
                            title="Decline"
                          >
                            <XCircle size={18} className="text-red-600" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {withdrawals.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-gray-500 text-lg">No pending withdrawals</p>
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
                <span className="font-semibold">{selectedWithdrawal.user?.name}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Email:</span>
                <span className="font-semibold">{selectedWithdrawal?.user?.email}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Amount:</span>
                <span className="font-semibold text-lg">${selectedWithdrawal.amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Asset:</span>
                <span className="font-semibold">{selectedWithdrawal?.method}</span>
              </div>
            </div>
            {selectedWithdrawal.status === 'pending' && (
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    handleApprove(selectedWithdrawal.id);
                    setShowDetailsModal(false);
                  }}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition"
                >
                  Approve
                </button>
                <button
                  onClick={() => {
                    handleDecline(selectedWithdrawal.id);
                    setShowDetailsModal(false);
                  }}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition"
                >
                  Decline
                </button>
              </div>
            )}
            <button
              onClick={() => setShowDetailsModal(false)}
              className="w-full mt-3 px-4 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingWithdrawals;