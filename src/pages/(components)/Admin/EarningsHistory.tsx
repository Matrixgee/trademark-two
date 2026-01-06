import axios from "@/config/axiosconfig";
import { RootState } from "@/Global/store";
import { isAxiosError } from "axios";
import { Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export interface Earning{
  user:{
    name:string
    email:string
  }
  earnings:string
  asset:string
  date:string
  amount: number
  id:string
}
const EarningsHistory = () => {
  const [earnings, setEarnings] = useState<Earning[]>([]);
  const [selectedEarning, setSelectedEarning] = useState<Earning | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filterAsset, setFilterAsset] = useState<string>("all");
  const adminToken = useSelector((state: RootState) => state?.admin?.token);

  const getEarningsHistory = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/admin/earnings/all", {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      // setEarnings(response?.data?.data || []);
      console.log(response)
    } catch (error) {
      if (isAxiosError(error)) console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEarningsHistory();
  }, []);

  const filteredEarnings = filterAsset === "all" 
    ? earnings 
    : earnings.filter((e) => e.asset === filterAsset);

  const uniqueAssets = Array.from(new Set(earnings.map((e) => e.asset)));

  const viewDetails = (earning: Earning) => {
    setSelectedEarning(earning);
    setShowDetailsModal(true);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Earnings History</h1>
        <p className="text-gray-600">Complete record of all earnings</p>
      </div>

      <div className="mb-6 flex gap-4">
        <select
          value={filterAsset}
          onChange={(e) => setFilterAsset(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:border-gray-400 transition"
        >
          <option value="all">All Assets</option>
          {uniqueAssets.map((asset) => (
            <option key={asset} value={asset}>
              {asset}
            </option>
          ))}
        </select>
        <div className="flex-1 text-right text-gray-600">
          <p className="text-sm">Total Records: <span className="font-semibold">{filteredEarnings.length}</span></p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">User</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Asset</th>
                {/* <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Return %</th> */}
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Earnings</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEarnings.map((earning) => (
                <tr key={earning.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900 font-medium">
                      {new Date(earning.date).toLocaleDateString()}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{earning.user?.name}</p>
                      <p className="text-sm text-gray-500">{earning.user?.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      {earning.asset}
                    </span>
                  </td>
                  {/* <td className="px-6 py-4">
                    <p className="font-semibold text-green-600">{earning.returnPercentage}%</p>
                  </td> */}
                  <td className="px-6 py-4">
                    <p className="font-bold text-green-600">${earning.earnings.toLocaleString()}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center">
                      <button
                        onClick={() => viewDetails(earning)}
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
        {filteredEarnings.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-gray-500 text-lg">No earnings history available</p>
          </div>
        )}
      </div>

      {showDetailsModal && selectedEarning && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-2xl font-bold mb-4">Earning Details</h2>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">User:</span>
                <span className="font-semibold">{selectedEarning.user?.name}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Asset:</span>
                <span className="font-semibold">{selectedEarning.asset}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Investment Amount:</span>
                <span className="font-semibold">${selectedEarning.amount.toLocaleString()}</span>
              </div>
              {/* <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Return %:</span>
                <span className="font-semibold text-green-600">{selectedEarning.returnPercentage}%</span>
              </div> */}
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Earnings:</span>
                <span className="font-bold text-green-600">${selectedEarning.earnings.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Date:</span>
                <span className="font-semibold">{new Date(selectedEarning.date).toLocaleDateString()}</span>
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

export default EarningsHistory