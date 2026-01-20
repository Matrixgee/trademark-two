/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import axios from "@/config/axiosconfig";
// import { useDepositContext } from "@/context/DepositContext";
import { RootState } from "@/Global/store";
// import DepositModal from "@/Modals/DepositModal";
import InvestmentModal from "@/Modals/InvestmentModal";
import { isAxiosError } from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export interface InvestmentPlan {
  id: string;
  name: string;
  returns: string;
  minAmount: string;
  maxAmount: string;
  duration: string;
  uid: string;
}
export type PaymentMethod = "BTC" | "ETH" | "SOL";

export interface InvestmentPayload {
  plan_id: string;
  amount: number;
  method: PaymentMethod;
}
const InvestmentPage = () => {
  const [planInfo, setPlanInfo] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const showModal = () => setIsModalVisible(true);

  const user = useSelector((state: RootState) => state?.user);
  const userDetails = user.User?.user?.user;
  const token = useSelector((state: RootState) => state?.user?.Token);
  const assets = [
    {
      id: "btc",
      name: "Bitcoin",
      symbol: "BTC",
      balance: `$${userDetails?.btcBal}`,
      icon: "/bitcoin.svg",
      color: "bg-orange-500",
    },
    {
      id: "eth",
      name: "Ethereum",
      symbol: "ETH",
      balance: `$${userDetails?.ethBal}`,
      icon: "/ethimage.png",
      color: "bg-gray-400",
    },
    {
      id: "sol",
      name: "Solana",
      symbol: "SOL",
      balance: `$${userDetails?.solBal}`,
      icon: "/solimage.png",
      color: "bg-black",
    },
  ];
  const [amount, setAmount] = useState("");
  const [mode, setMode] = useState<string>("");
  const userId = localStorage.getItem("userId");
  if (!userId) {
    toast.error("User ID not found");
    return;
  }

  const router = useRouter();

  const getPlans = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/plan/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const plans = res?.data?.data;

      setPlanInfo(plans);

      localStorage.setItem("InvestmentPlan", JSON.stringify(plans));
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPlans();
  }, []);

  const [selectedCoin, setSelectedCoin] = useState<string>("");
  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedCoin("");
    setAmount("");
    setPlanInfo([]);
  };

  const handleInvestment = async (id: string) => {
    if (!amount || !planInfo) {
      toast.error("Please fill all fields before investing.");
      return;
    }

    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast.error("User ID not found");
      return;
    }

    const requestData = {
      plan_id: id,
      amount: Number(amount),
      method: mode.toUpperCase(),
    };

    const toastLoadingId = toast.loading("Processing investment...");

    try {
      const response = await axios.post(`/investment/`, requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      toast.dismiss(toastLoadingId);
      console.log(response.data.data);

      toast.success("Investment request sent successfully!");
      setTimeout(() => {
        router.replace("/user");
      }, 2000);
    } catch (error: any) {
      toast.dismiss(toastLoadingId);
      console.error("Investment Error:", error.response?.data);
      toast.error(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  return (
    <div className="p-6 w-full">
      <InvestmentModal
        plan={planInfo}
        getPlans={getPlans}
        selectedCoin={selectedCoin}
        amount={amount}
        setAmount={setAmount}
        handleInvestment={handleInvestment}
        setIsModalVisible={setIsModalVisible}
        isModalVisible={isModalVisible}
        showModal={showModal}
        handleCancel={handleCancel}
        loading={loading}
        setLoading={setLoading}
      />
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Invest</h1>
        <button
          className="text-purple-600 text-lg cursor-pointer"
          onClick={() => router.back}
        >
          ← Back
        </button>
      </div>

      <div className="text-center mb-8">
        <p className="text-gray-600 text-sm mb-2">Available Balance</p>
        <p className="text-3xl font-bold">${userDetails?.balance}</p>
      </div>

      <h2 className="text-gray-700 font-semibold mb-4">
        Select Preferred Asset
      </h2>
      <div className="w-full flex flex-col gap-2">
        {assets.map((asset) => (
          <div
            key={asset.id}
            className="w-full rounded-lg px-2 p-4 gap-1 bg-white flex items-center justify-between shadow-md transition"
          >
            <div className="flex items-center gap-1 ">
              <Image
                src={asset.icon}
                alt={asset.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <p className="font-bold text-lg max-sm:text-[16px]">
                  {asset.name}
                </p>
                <p className="text-gray-500 text-sm max-sm:text-xs">
                  {asset.symbol}
                </p>
              </div>
            </div>
            <div className="text-center w-[30%]">
              <p className="font-bold text-lg max-sm:text-[16px]">
                {asset.balance}
              </p>
              <p className="text-gray-500 text-sm max-sm:text-xs">
                Total {asset.symbol.toLowerCase()} Balance
              </p>
            </div>
            <div className="">
              <button
                onClick={() => {
                  showModal();
                  setMode(asset.id);
                  setSelectedCoin(asset.name);
                }}
                className="bg-purple-600 max-sm:p-2 px-6 py-2 cursor-pointer text-white rounded-lg font-semibold hover:bg-purple-700"
              >
                Invest
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvestmentPage;
