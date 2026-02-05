/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ChartNoAxesColumn,
  ChevronDown,
  Download,
  Send,
  TrendingUp,
  User,
} from "lucide-react";
import ProfileDropdown from "./ProfileDropdown";
import { useRouter } from "next/router";
import Chartone from "../TV/Chartone";
import Image from "next/image";
import axios from "@/config/axiosconfig";
import { RootState } from "@/Global/store";
import { useSelector } from "react-redux";

const Portfolio_Home = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [userDetails, setUserDetails] = useState<any>(null);
  const [financeDetails, setFinanceDetails] = useState<any>(null);

  const router = useRouter();
  const user = useSelector((state: RootState) => state?.user);

  const getUserInfo = async () => {
    try {
      const res = await axios.get("/user/profile", {
        headers: {
          Authorization: `Bearer ${user?.Token}`,
        },
      });

      setUserDetails(res.data.data);
      setFinanceDetails(res.data.data);
    } catch (error) {
      console.error("Failed to fetch user info", error);
    }
  };

  const assets = [
    {
      id: "btc",
      name: "Bitcoin",
      symbol: "BTC",
      balance: `$${userDetails?.btcBal ?? 0}`,
      icon: "/bitcoin.svg",
      alt: "btc",
    },
    {
      id: "eth",
      name: "Ethereum",
      symbol: "ETH",
      balance: `$${userDetails?.ethBal ?? 0}`,
      icon: "/ethimage.png",
      alt: "eth",
    },
    {
      id: "sol",
      name: "Solana",
      symbol: "SOL",
      balance: `$${userDetails?.solBal ?? 0}`,
      icon: "/solimage.png",
      alt: "sol",
    },
  ];

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div className="bg-white p-3">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-start justify-between px-3 py-3 bg-white rounded-lg shadow-sm">
            <div>
              <p className="text-gray-500 text-sm">Total portfolio</p>
              <h2 className="text-xl font-bold text-gray-900">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 2,
                }).format(userDetails?.balance || 0)}
              </h2>
            </div>

            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-end gap-1 cursor-pointer"
              >
                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center border-4 border-white shadow-md">
                  <User size={24} className="text-white" />
                </div>
                <ChevronDown size={15} className="text-gray-500 pb-1" />
              </motion.button>

              <ProfileDropdown
                isOpen={dropdownOpen}
                onClose={() => setDropdownOpen(false)}
              />
            </div>
          </div>
        </motion.div>

        {/* Welcome Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-linear-to-r from-purple-600 to-purple-800 rounded-2xl p-6 sm:p-8 text-white mb-6 relative overflow-hidden"
        >
          <div className="text-center relative z-10">
            <h3 className="text-2xl font-bold mb-2">
              Hello, {userDetails?.name}
            </h3>
            <p className="text-purple-200 text-sm mb-6">
              Welcome to Trademark Investment <br />
              Crypto Investment Made Easy.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/user/invest")}
              className="bg-white text-purple-900 font-semibold text-sm py-2 px-6 rounded-lg inline-flex items-center gap-2"
            >
              <ChartNoAxesColumn className="w-4 h-4" />
              Start Trading
            </motion.button>
          </div>
        </motion.div>

        {/* Chart */}
        <div className="w-full h-[66vh] mb-8 rounded-lg shadow-md overflow-hidden">
          <Chartone />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <Send className="w-4 h-4 text-purple-600 mb-1" />
            <p className="text-gray-600 text-sm">Total Withdraw</p>
            <p className="text-sm font-bold">
              ${financeDetails?.totalWithdrawals || 0}
            </p>
          </div>

          <div className="bg-white rounded-lg p-3 shadow-sm">
            <Download className="w-4 h-4 text-purple-600 mb-1" />
            <p className="text-gray-600 text-sm">Total Deposit</p>
            <p className="text-sm font-bold">
              ${financeDetails?.totalDeposits || 0}
            </p>
          </div>
        </div>
        {/* Actions */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <button
            onClick={() => router.push("/user/withdrawal")}
            className="border rounded-lg p-3 hover:border-purple-600 cursor-pointer hover:bg-purple-50 transition"
          >
            <Send className="mx-auto w-5 h-5 text-purple-600" />
            <p className="text-sm font-semibold mt-1 text-center">Withdraw</p>
          </button>

          <button
            onClick={() => router.push("/user/deposit")}
            className="border rounded-lg p-3 hover:border-purple-600 cursor-pointer hover:bg-purple-50 transition"
          >
            <Download className="mx-auto w-5 h-5 text-purple-600" />
            <p className="text-sm font-semibold mt-1 text-center">Deposit</p>
          </button>

          <button
            onClick={() => router.push("/user/invest")}
            className="border rounded-lg p-3 hover:border-purple-600 cursor-pointer hover:bg-purple-50 transition"
          >
            <TrendingUp className="mx-auto w-5 h-5 text-purple-600" />
            <p className="text-sm font-semibold mt-1 text-center">Trade</p>
          </button>
        </div>

        {/* Assets */}
        <h2 className="text-xl font-bold mb-4">My Assets</h2>
        <div className="space-y-3">
          {assets.map((asset) => (
            <div
              key={asset.id}
              className="bg-white rounded-lg p-4 flex items-center justify-between shadow-sm"
            >
              <div className="flex items-center gap-3">
                <Image
                  src={asset.icon}
                  alt={asset.alt}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <p className="font-bold">{asset.name}</p>
                  <p className="text-xs text-gray-500">{asset.symbol}</p>
                </div>
              </div>

              <div className="text-right">
                <p className="font-bold">{asset.balance}</p>
                <p className="text-xs text-gray-500">
                  Total {asset.symbol.toLowerCase()} balance
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio_Home;
