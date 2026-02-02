/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import axios from "@/config/axiosconfig";
import { RootState } from "@/Global/store";
import { isAxiosError } from "axios";
import { Bitcoin, DollarSign, Loader2, Wallet } from "lucide-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export interface UserProfile {
  name: string;
  username: string;
  uid: string;
  email: string;
  balance: number;
  activeInvestments: number;
  pendingWithdrawals: number;
  totalWithdrawals: number;
  totalDeposits: number;
  earnings: number;
  btcBal: number;
  ethBal: number;
  solBal: number;
  verified: boolean;
  referralId: string;
  bitcoin: string;
  sol: string;
  ethereum: string;
  type: "user" | "admin";
  profilePic: string;
  phoneNumber: string;
  dob: string;
  state: string;
  city: string;
  bankName: string;
  accountNumber: string;
  routingNumber: string;
  createdAt: number;
  updatedAt: number;
}
type PaymentMethod = "btc" | "eth" | "usdt" | "bank" | "paypal" | "";

const WithdrawPage = () => {
  const [amount, setAmount] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("");
  const [isProcessing, setIsProcessing] = useState(false);
  console.log(isProcessing);

  const [loading, setLoading] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<Partial<UserProfile> | null>(null);
  const paymentMethods = [
    {
      id: "btc",
      name: "Bitcoin",
      icon: <Bitcoin className="w-5 h-5" />,
      color: "from-orange-400 to-orange-600",
      minAmount: 50,
      fee: "0.0005 BTC",
      processingTime: "5-30 min",
      addressLabel: "BTC Wallet Address",
    },
    {
      id: "eth",
      name: "Ethereum",
      icon: <Wallet className="w-5 h-5" />,
      color: "from-blue-400 to-blue-600",
      minAmount: 30,
      fee: "0.005 ETH",
      processingTime: "2-15 min",
      addressLabel: "ETH Wallet Address",
    },
    {
      id: "sol",
      name: "Solana",
      icon: <DollarSign className="w-5 h-5" />,
      color: "from-green-400 to-green-600",
      minAmount: 20,
      fee: "1 USDT",
      processingTime: "1-10 min",
      addressLabel: "USDT Wallet Address (TRC20)",
    },
  ];

  const selectedPaymentMethod = paymentMethods.find(
    (m) => m.id === paymentMethod,
  );
  const user = useSelector((state: RootState) => state?.user);
  const token = useSelector((state: RootState) => state?.user?.Token);
  const userDetails = user.User?.user?.user;

  const getUserInfo = async () => {
    setLoading(true);
    try {
      const res = await axios.get("user/profile", {
        headers: {
          Authorization: `Bearer ${user?.Token}`,
        },
      });
      setUserInfo(res?.data?.data);
      console.log(res?.data?.data, "tht");
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      getUserInfo();
    }
  }, [token]);
  const isValidAmount = () => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) return false;
    if (selectedPaymentMethod && numAmount < selectedPaymentMethod.minAmount)
      return false;

    if (userInfo?.balance !== undefined && numAmount > userInfo.balance)
      return false;

    return true;
  };

  console.log(amount, walletAddress, paymentMethod);
  const handleWithdraw = async () => {
    if (!amount || !walletAddress || !paymentMethod) {
      toast.error("Please fill all fields before withdrawing.");
      return;
    }

    if (!isValidAmount()) {
      toast.error(`Insuficient funds`);
      return;
    }

    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast.error("User ID not found");
      return;
    }

    const requestData = {
      amount: parseFloat(amount),
      to: walletAddress,
      method: paymentMethod,
    };

    const toastLoadingId = toast.loading("Processing withdrawal...");
    setIsProcessing(true);

    try {
      const response = await axios.post(`/withdrawal`, requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setPaymentMethod("btc");
      setAmount("");
      setWalletAddress("");
      toast.dismiss(toastLoadingId);
      toast.success(
        response.data.message || "Withdrawal request sent successfully!",
      );
      setTimeout(() => {
        router.replace("/user");
      }, 2000);
    } catch (error: any) {
      toast.dismiss(toastLoadingId);
      console.error("Withdrawal Error:", error.response?.data);
      toast.error(
        error.response?.data?.message || "An error occurred. Please try again.",
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const router = useRouter();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-purple-700" />
      </div>
    );
  }

  return (
    <div className="p-6 w-full">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Withdraw</h1>
        <button
          className="text-purple-600 text-lg cursor-pointer"
          onClick={() => router.back()}
        >
          ← Back
        </button>
      </div>

      <div className="text-center mb-8">
        <p className="text-gray-600 text-sm mb-2">Available Balance</p>
        <p className="text-4xl font-bold">
          {" "}
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(userDetails?.balance || 0)}
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block font-semibold mb-2">Withdraw Method</label>
          <select
            value={paymentMethod}
            onChange={(e) => {
              const val = e.target.value as PaymentMethod;
              setPaymentMethod(val);
            }}
            className="w-full border rounded-lg p-3 text-lg"
          >
            <option value="">--Select a method--</option>
            <option value="bank">Withdraw to bank</option>
            <option value="Bitcoin">Bitcoin</option>
            <option value="Ethereum">Ethereum</option>
            <option value="Solana">Solana</option>
            <option value="Usdt">Solana</option>
          </select>
        </div>

        {paymentMethod === "" ? null : (
          <>
            {paymentMethod === "bank" ? null : (
              <div>
                <label className="block font-semibold mb-2">
                  Wallet Address
                </label>
                <input
                  type="text"
                  placeholder="Enter your wallet address"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  className="w-full border rounded-lg p-3 text-lg"
                />
              </div>
            )}

            <div>
              <label className="block font-semibold mb-2">
                Amount to Withdraw
              </label>
              <input
                type="text"
                placeholder="Amount e.g. 2000"
                value={Number(amount).toLocaleString()}
                onChange={(e) => {
                  const raw = e.target.value.replace(/,/g, "");
                  if (!/^\d*$/.test(raw)) return;

                  setAmount(raw);
                }}
                className="w-full border rounded-lg p-3 text-lg"
              />
              <p className="text-gray-500 text-sm mt-1">Max: 146000</p>
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Withdraw Charge
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value="$0.00"
                  disabled
                  className="flex-1 border rounded-lg p-3 bg-gray-100"
                />
                <button
                  onClick={() => {}}
                  className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700"
                >
                  Fixed
                </button>
              </div>
            </div>

            <button
              onClick={handleWithdraw}
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700"
            >
              Withdraw
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default WithdrawPage;
