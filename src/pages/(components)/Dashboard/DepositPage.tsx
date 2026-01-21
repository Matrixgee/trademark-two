"use client";

import { useDepositContext } from "@/context/DepositContext";
import { RootState } from "@/Global/store";
import DepositModal from "@/Modals/DepositModal";
import { isAxiosError } from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSelector } from "react-redux";

const DepositPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);
  const user = useSelector((state: RootState) => state?.user);
  const userDetails = user.User?.user?.user;
  // const financeDetails = user?.User?.user
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
    // {
    //   id: "usdt",
    //   name: "USDT",
    //   symbol: "USDT",
    //   balance: `$100`,
    //   icon: "/usdtimage.png",
    //   color: "bg-black",
    // },
  ];

  const { setMode, setFrom } = useDepositContext();

  const router = useRouter();

  return (
    <div className="p-6 w-full">
      <DepositModal
        setIsModalVisible={setIsModalVisible}
        isModalVisible={isModalVisible}
        showModal={showModal}
        handleCancel={handleCancel}
        loading={loading}
        setLoading={setLoading}
      />
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Deposit</h1>
        <button
          className="text-purple-600 text-lg cursor-pointer"
          onClick={() => router.back()}
        >
          ← Back
        </button>
      </div>

      <div className="text-center mb-8">
        <p className="text-gray-600 text-sm mb-2">Available Balance</p>
        <p className="text-3xl font-bold">
          {" "}
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(userDetails?.balance || 0)}
        </p>
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
                  setFrom(userDetails?.username);
                }}
                className="bg-purple-600 max-sm:p-2 px-6 py-2 cursor-pointer text-white rounded-lg font-semibold hover:bg-purple-700"
              >
                Fund
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepositPage;
