import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Download,
  TrendingUp,
  Menu,
  BarChart3,
  Home,
  Clock,
  Wallet,
  Coins,
} from "lucide-react";
import { useRouter } from "next/router";
import Image from "next/image";

const DashboardHeader = () => {
  const router = useRouter();
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-linear-to-r from-slate-950 via-purple-800 to-purple-900 sticky top-0 z-40"
    >
      <div className="px-6 py-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="TradeMark"
              width={48}
              height={48}
              onClick={() => router.push("/")}
              className="cursor-pointer"
            />
          </div>
          <div className="flex items-center gap-16 w-[42%] justify-between">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/user/withdrawal")}
              className="flex items-center flex-col hover:text-purple-400 cursor-pointer text-xs gap-2 px-4 py-2 rounded-lg text-white font-semibold transition"
            >
              <Send size={23} />
              Withdraw
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/user/deposit")}
              className="flex cursor-pointer items-center hover:text-purple-400 flex-col text-xs gap-2 px-4 py-2 rounded-lg text-white font-semibold transition"
            >
              <Download size={23} />
              Deposit
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/user/invest")}
              className="flex items-center cursor-pointer hover:text-purple-400 flex-col text-xs gap-2 px-4 py-2 rounded-lg text-white font-semibold transition"
            >
              <Coins size={23}  />
              Trade
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default DashboardHeader;
