import axios from "@/config/axiosconfig";
import { RootState } from "@/Global/store";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Investment } from "./AllInvestments";
import { isAxiosError } from "axios";
import { CheckCircle, Eye, XCircle } from "lucide-react";

export const PendingInvestments = () => {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [selectedInvestment, setSelectedInvestment] = useState<Investment | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const adminToken = useSelector((state: RootState) => state?.admin?.token);

  const getAllInvestments = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/admin/investments/all", {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      setInvestments(
        response?.data?.data.filter((inv: Investment) => inv.status === "pending")
      );
    } catch (error) {
      if (isAxiosError(error)) console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllInvestments();
  }, []);

  const handleApprove = async (id: string) => {
    const loadingId = toast.loading("Approving investment...");
    try {
      const response = await axios.patch(
        `/admin/investments/${id}/approve`,
        {},
        { headers: { Authorization: `Bearer ${adminToken}` } }
      );
      toast.success(response?.data?.message || "Investment approved successfully");
      getAllInvestments();
    } catch (error) {
      if (isAxiosError(error)) toast.error(error?.response?.data?.message);
    } finally {
      toast.dismiss(loadingId);
    }
  };

  const handleReject = async (id: string) => {
    const loadingId = toast.loading("Rejecting investment...");
    try {
      const response = await axios.patch(
        `/admin/investments/${id}/decline`,
        {},
        { headers: { Authorization: `Bearer ${adminToken}` } }
      );
      toast.success(response?.data?.message || "Investment rejected successfully");
      getAllInvestments();
    } catch (error) {
      if (isAxiosError(error)) toast.error(error?.response?.data?.message);
    } finally {
      toast.dismiss(loadingId);
    }
  };

  const viewDetails = (investment: Investment) => {
    setSelectedInvestment(investment);
    setShowDetailsModal(true);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Pending Investments</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">User</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">PlanName</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">status</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {investments.map((inv) => (
                <tr key={inv.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{inv?.name}</p>
                      <p className="text-sm text-gray-500">{inv?.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      {inv?.plan_name}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-gray-900">${inv?.amount.toLocaleString()}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-yellow-600 bg-yellow-100 px-3 py-1 text-sm w-max rounded-full">{inv?.status}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => viewDetails(inv)}
                        className="p-2 hover:bg-blue-100 rounded-lg transition"
                        title="View Details"
                      >
                        <Eye size={18} className="text-blue-600" />
                      </button>
                      {inv.status === "pending" && (
                                              <>
                                                <button
                                                  onClick={() => handleApprove(inv.id)}
                                                  className="p-2 hover:bg-green-100 rounded-lg transition"
                                                  title="Approve"
                                                >
                                                  <CheckCircle size={18} className="text-green-600" />
                                                </button>
                      
                                                <button
                                                  onClick={() => handleReject(inv.id)}
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
        {investments.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-gray-500 text-lg">No pending investments</p>
          </div>
        )}
      </div>

      {showDetailsModal && selectedInvestment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-2xl font-bold mb-4">Investment Details</h2>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">User:</span>
                <span className="font-semibold">{selectedInvestment?.name}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Amount:</span>
                <span className="font-semibold">${selectedInvestment.amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Plan name:</span>
                <span className="font-semibold">{selectedInvestment.plan_name}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Status:</span>
                <span className="font-semibold text-green-600">{selectedInvestment.status}</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  handleApprove(selectedInvestment.id);
                  setShowDetailsModal(false);
                }}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition"
              >
                Approve
              </button>
              <button
                onClick={() => {
                  handleReject(selectedInvestment.id);
                  setShowDetailsModal(false);
                }}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition"
              >
                Decline
              </button>
            </div>
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
