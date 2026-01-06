import axios from "@/config/axiosconfig";
import { RootState } from "@/Global/store";
import { isAxiosError } from "axios";
import { TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface Earning {
  id: string;
  user?: {
    name: string;
    email: string;
  };
  amount: number;
  asset: string;
  returnPercentage: number;
  earnings: number;
  date: string;
  investmentId?: string;
}

const TopEarnings = () => {
  const [topEarnings, setTopEarnings] = useState<Earning[]>([]);
  const [loading, setLoading] = useState(false);
  const adminToken = useSelector((state: RootState) => state?.admin?.token);
  const mockTopEarnings: Earning[] = [
  {
    id: "1",
    user: { name: "Ella Doe", email: "ella@mailinator.com" },
    amount: 1000,
    asset: "Bitcoin",
    returnPercentage: 15,
    earnings: 150,
    date: "2026-01-05",
    investmentId: "inv1",
  },
  {
    id: "2",
    user: { name: "John Smith", email: "john@mailinator.com" },
    amount: 500,
    asset: "Ethereum",
    returnPercentage: 12,
    earnings: 60,
    date: "2026-01-04",
    investmentId: "inv2",
  },
  {
    id: "3",
    user: { name: "Jane Doe", email: "jane@mailinator.com" },
    amount: 2000,
    asset: "Solana",
    returnPercentage: 10,
    earnings: 200,
    date: "2026-01-03",
    investmentId: "inv3",
  },
];

  const getTopEarnings = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/admin/earnings/top", {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      setTopEarnings(response?.data?.data || mockTopEarnings);
    } catch (error) {
      if (isAxiosError(error)) console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTopEarnings();
  }, []);

  const totalEarnings = topEarnings.reduce((sum, earning) => sum + earning.earnings, 0);

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
              <p className="text-gray-600 text-sm font-medium">Total Earnings</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">${totalEarnings.toLocaleString()}</p>
            </div>
            <TrendingUp className="text-green-600" size={32} />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div>
            <p className="text-gray-600 text-sm font-medium">Top Investment Count</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{topEarnings.length}</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div>
            <p className="text-gray-600 text-sm font-medium">Average Return</p>
            <p className="text-3xl font-bold text-green-600 mt-2">
              {topEarnings.length > 0
                ? (topEarnings.reduce((sum, e) => sum + e.returnPercentage, 0) / topEarnings.length).toFixed(1)
                : 0}
              %
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">User</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Asset</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Investment</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Return %</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Earnings</th>
              </tr>
            </thead>
            <tbody>
              {topEarnings.map((earning) => (
                <tr key={earning.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
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
                  <td className="px-6 py-4">
                    <p className="font-semibold text-gray-900">${earning.amount.toLocaleString()}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-green-600">{earning.returnPercentage}%</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-green-600">${earning.earnings.toLocaleString()}</p>
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
    </div>
  );
};

export default TopEarnings