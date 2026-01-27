/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from "@/config/axiosconfig";
import { RootState } from "@/Global/store";
import Deposit from "@/pages/user/deposit";
import { isAxiosError } from "axios";
import { Eye, Filter, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export interface Deposit {
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

const DepositHistory = () => {
  const [deposits, setDeposits] = useState<Deposit[]>([]);
  const [showCreditModal, setShowCreditModal] = useState(false);
  const [creditAmount, setCreditAmount] = useState<number>(0);
  const [depositToCredit, setDepositToCredit] = useState<Deposit | null>(null);

  const [selectedDeposit, setSelectedDeposit] = useState<Deposit | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "All" | "Verified" | "Declined" | "Pending"
  >("All");
  const [assetFilter, setAssetFilter] = useState<"All" | "BTC" | "ETH" | "SOL">(
    "All",
  );
  const [creditLoading, setCreditLoading] = useState<string | null>(null);

  const viewDetails = (deposit: Deposit) => {
    setSelectedDeposit(deposit);
    setShowDetailsModal(true);
  };

  const filteredDeposits = deposits.filter((deposit) => {
    const matchesSearch =
      deposit.user?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deposit.user?.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || deposit.status === statusFilter.toLowerCase();
    const matchesAsset =
      assetFilter === "All" || deposit.method === assetFilter;
    return matchesSearch && matchesStatus && matchesAsset;
  });

  // const totalDeposits = filteredDeposits.length;
  // const totalAmount = filteredDeposits.reduce((sum, d) => sum + d.amount, 0);
  // const verifiedCount = filteredDeposits.filter(d => d.status === 'Verified').length;
  const adminToken = useSelector((state: RootState) => state?.admin?.token);
  const [loading, setLoading] = useState<boolean>(false);
  console.log(loading);

  const getAllDeposits = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/admin/deposits/all", {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
      setDeposits(response?.data?.data);
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
    getAllDeposits();
  }, []);
  const totalDeposits = deposits.reduce(
    (sum: number, deposit: { amount: number }) => sum + Number(deposit.amount),
    0,
  );
  const approvedArr = deposits.filter(
    (deposit: Deposit) => deposit.status === "approved",
  );

  const openCreditModal = (deposit: Deposit) => {
    setDepositToCredit(deposit);
    setCreditAmount(deposit.amount); // default to deposit amount
    setShowCreditModal(true);
  };

  const creditUser = async () => {
    if (!depositToCredit) return;

    try {
      setCreditLoading(depositToCredit.id);

      await axios.post(
        `/admin/deposits/${depositToCredit.uid}`,
        { amount: creditAmount },
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        },
      );

      // Optional UI update
      setDeposits((prev) =>
        prev.map((d) =>
          d.id === depositToCredit.id ? { ...d, status: "approved" } : d,
        ),
      );

      setShowCreditModal(false);
      setDepositToCredit(null);
      setCreditAmount(0);
      getAllDeposits();
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error.response?.data || error.message);
      }
    } finally {
      setCreditLoading(null);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Deposit History
        </h1>
        <p className="text-gray-600">
          Complete record of all deposit transactions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-gray-600 text-sm mb-1">Total Deposits</p>
          <p className="text-3xl font-bold text-gray-900">{deposits.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-gray-600 text-sm mb-1">Total Amount</p>
          <p className="text-3xl font-bold text-gray-900">${totalDeposits}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-gray-600 text-sm mb-1">Approved</p>
          <p className="text-3xl font-bold text-green-600">
            {approvedArr.length}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
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
              <Filter
                size={20}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
              >
                <option value="All">All Status</option>
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="declined">Declined</option>
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
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  User
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Asset
                </th>
                {/* <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Submitted</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Processed</th> */}
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Status
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredDeposits.map((deposit) => (
                <tr
                  key={deposit.id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">
                        {deposit?.from}
                      </p>
                      <p className="text-sm text-gray-500">{deposit?.from}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-gray-900">
                      ${deposit?.amount.toLocaleString()}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                      {deposit?.method}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium${
                        deposit.status === "approved"
                          ? "text-green-700 bg-green-100"
                          : deposit.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "text-red-700 bg-red-100"
                      }`}
                    >
                      {deposit.status === "approved"
                        ? "Approved"
                        : deposit.status === "declined"
                          ? "Declined"
                          : deposit.status === "pending"
                            ? "Pending"
                            : deposit.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => viewDetails(deposit)}
                        className="p-2 hover:bg-blue-100 rounded-lg transition"
                        title="View Details"
                      >
                        <Eye size={18} className="text-blue-600" />
                      </button>

                      <button
                        onClick={() => openCreditModal(deposit)}
                        className="px-3 py-1 text-sm font-medium rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
                      >
                        Credit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredDeposits?.length === 0 && (
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
                <span className="font-semibold">
                  {selectedDeposit?.user?.name}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Email:</span>
                <span className="font-semibold">
                  {selectedDeposit?.user?.email}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Amount:</span>
                <span className="font-semibold text-lg">
                  ${selectedDeposit?.amount.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Asset:</span>
                <span className="font-semibold">{selectedDeposit.method}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Submitted:</span>
                <span className="font-semibold">
                  {selectedDeposit?.createdAt}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Processed:</span>
                <span className="font-semibold">
                  {selectedDeposit?.updatedAt || "Not yet processed"}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Status:</span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    selectedDeposit?.status.toLowerCase() === "approved"
                      ? "bg-green-100 text-green-700"
                      : selectedDeposit?.status.toLowerCase() === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                  }`}
                >
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
      {showCreditModal && depositToCredit && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-sm w-full p-6">
            <h2 className="text-xl font-bold mb-4">Credit User</h2>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">User</p>
                <p className="font-semibold">
                  {depositToCredit.user.name} ({depositToCredit.user.email})
                </p>
              </div>

              <div>
                <label className="text-sm text-gray-600">Amount</label>
                <input
                  type="number"
                  value={creditAmount}
                  onChange={(e) => setCreditAmount(Number(e.target.value))}
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowCreditModal(false)}
                className="w-full px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                onClick={creditUser}
                disabled={creditLoading === depositToCredit.id}
                className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {creditLoading ? "Crediting..." : "Confirm Credit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepositHistory;
