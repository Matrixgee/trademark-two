/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import axios from "@/config/axiosconfig";
import { useDepositContext } from "@/context/DepositContext";
import { RootState } from "@/Global/store";
import DepositModal from "@/Modals/DepositModal";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface UserDetails {
  username: string;
  balance: number;
  btcBal: number;
  ethBal: number;
  solBal: number;
}

const DepositPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [fetching, setFetching] = useState(true);
  const user = useSelector((state: RootState) => state?.user);

  const { setMode, setFrom } = useDepositContext();
  const router = useRouter();

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  const getProfile = async () => {
    try {
      setFetching(true);
      const res = await axios.get("/user/profile", {
        headers: {
          Authorization: `Bearer ${user?.Token}`,
        },
      });
      setUserDetails(res.data?.user);
    } catch (error) {
      console.error("Failed to fetch profile", error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const assets = [
    {
      id: "btc",
      name: "Bitcoin",
      symbol: "BTC",
      balance: `$${userDetails?.btcBal || 0}`,
      icon: "/bitcoin.svg",
    },
    {
      id: "eth",
      name: "Ethereum",
      symbol: "ETH",
      balance: `$${userDetails?.ethBal || 0}`,
      icon: "/ethimage.png",
    },
    {
      id: "sol",
      name: "Solana",
      symbol: "SOL",
      balance: `$${userDetails?.solBal || 0}`,
      icon: "/solimage.png",
    },
  ];

  if (fetching) {
    return <div className="p-6">Loading...</div>;
  }

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
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
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
            className="w-full rounded-lg px-2 p-4 bg-white flex items-center justify-between shadow-md"
          >
            <div className="flex items-center gap-2">
              <Image
                src={asset.icon}
                alt={asset.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <p className="font-bold">{asset.name}</p>
                <p className="text-gray-500 text-sm">{asset.symbol}</p>
              </div>
            </div>

            <div className="text-center w-[30%]">
              <p className="font-bold">{asset.balance}</p>
              <p className="text-gray-500 text-sm">
                Total {asset.symbol} Balance
              </p>
            </div>

            <button
              onClick={() => {
                showModal();
                setMode(asset.id);
                setFrom(userDetails?.username);
              }}
              className="bg-purple-600 px-6 py-2 text-white rounded-lg font-semibold hover:bg-purple-700"
            >
              Fund
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepositPage;
