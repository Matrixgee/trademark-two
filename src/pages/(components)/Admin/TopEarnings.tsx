/* eslint-disable react-hooks/exhaustive-deps */
import axios from "@/config/axiosconfig";
import { RootState } from "@/Global/store";
import { isAxiosError } from "axios";
import { Plus, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export interface Earning {
  id: string;
  uid: string;
  name: string;
  email: string;
  plan_name: string;
  method: "BTC" | "ETH" | "SOL";
  duration: string;
  totalEarnings: number;
  plan_id: string;
  amount: number;
  status: "pending" | "approved" | "declined" | "ended";
  createdAt: number;
  updatedAt: number;
}

const TopEarnings = () => {
  const [topEarnings, setTopEarnings] = useState<Earning[]>([]);
  // const [loading, setLoading] = useState(false);
  const adminToken = useSelector((state: RootState) => state?.admin?.token);

  const [showEarningModal, setShowEarningModal] = useState(false);
  const [earningAction, setEarningAction] = useState<
    "credit" | "deduct" | null
  >(null);
  const [selectedEarning, setSelectedEarning] = useState<Earning | null>(null);
  const [earningAmount, setEarningAmount] = useState<number>();
  const [actionLoading, setActionLoading] = useState(false);

  const openEarningModal = (earning: Earning, action: "credit" | "deduct") => {
    setSelectedEarning(earning);
    setEarningAction(action);
    setEarningAmount(earning.totalEarnings); // default value
    setShowEarningModal(true);
  };

  const getAllInvestments = async () => {
    const loadingId = toast.loading("Fetching Investments...");
    try {
      const response = await axios.get("/admin/investments/all", {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      setTopEarnings(response?.data?.data);
    } catch (error) {
      if (isAxiosError(error)) console.log(error);
    } finally {
      toast.dismiss(loadingId);
    }
  };

  useEffect(() => {
    getAllInvestments();
  }, []);

  const totalEarnings = topEarnings.reduce(
    (sum, earning) => sum + earning.totalEarnings,
    0,
  );

  const handleEarningAction = async () => {
    if (!selectedEarning || !earningAction) return;

    const endpoint =
      earningAction === "credit"
        ? `/admin/earnings/${selectedEarning.uid}`
        : `/admin/earnings/deduct/${selectedEarning.uid}`;

    try {
      setActionLoading(true);

      await axios.post(
        endpoint,
        {
          amount: earningAmount,
          plan_id: selectedEarning.plan_id,
          investment_id: selectedEarning.id,
        },
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        },
      );

      toast.success(
        earningAction === "credit"
          ? "User credited successfully"
          : "User deducted successfully",
      );

      setShowEarningModal(false);
      setSelectedEarning(null);
      setEarningAmount(0);
      getAllInvestments();
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Action failed");
      }
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Top Earnings</h1>
        <p className="text-gray-600">Highest earning investments</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">
                Total Earnings
              </p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                ${totalEarnings.toLocaleString()}
              </p>
            </div>
            <TrendingUp className="text-green-600" size={32} />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div>
            <p className="text-gray-600 text-sm font-medium">
              Top Investment Count
            </p>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              {topEarnings.length}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  User
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Plan name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Duration
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Total earnings
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {topEarnings.map((earning) => (
                <tr
                  key={earning.id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">
                        {earning?.name}
                      </p>
                      <p className="text-sm text-gray-500">{earning?.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      {earning?.plan_name}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-gray-900">
                      ${earning?.duration}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-gray-900">
                      ${earning.amount.toLocaleString()}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-green-600">
                      ${earning.totalEarnings}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => openEarningModal(earning, "credit")}
                        className="px-3 py-1 text-sm rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
                      >
                        <Plus />
                      </button>

                      {/* <button
                        onClick={() => openEarningModal(earning, "deduct")}
                        className="px-3 py-1 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                      >
                        Deduct
                      </button> */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {topEarnings.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-gray-500 text-lg">No earnings data available</p>
          </div>
        )}
      </div>
      {showEarningModal && selectedEarning && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-sm w-full p-6">
            <h2 className="text-xl font-bold mb-4 capitalize">
              {earningAction} Earnings
            </h2>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">User</p>
                <p className="font-semibold">
                  {selectedEarning.name} ({selectedEarning.email})
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Plan</p>
                <p className="font-medium">{selectedEarning.plan_name}</p>
              </div>

              <div>
                <label className="text-sm text-gray-600">Amount</label>
                <input
                  // type="number"
                  value={earningAmount}
                  onChange={(e) => setEarningAmount(Number(e.target.value))}
                  className={`w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none ${
                    earningAction === "credit"
                      ? "focus:ring-green-500"
                      : "focus:ring-red-500"
                  }`}
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowEarningModal(false)}
                className="w-full px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                onClick={handleEarningAction}
                disabled={actionLoading}
                className={`w-full px-4 py-2 text-white rounded-lg transition ${
                  earningAction === "credit"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
                } disabled:opacity-50`}
              >
                {actionLoading
                  ? "Processing..."
                  : earningAction === "credit"
                    ? "Confirm Credit"
                    : "Confirm Deduct"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopEarnings;
