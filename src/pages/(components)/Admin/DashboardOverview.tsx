"use client"

import axios from "@/config/axiosconfig";
import { RootState } from "@/Global/store";
import { isAxiosError } from "axios";
import { CreditCard, Eye, TrendingDown, TrendingUp, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const DashboardOverview = () => {
  const [stats, setStats] = useState({ 
    totalUsers: 0,
    totalDeposits: 0,
    totalWithdrawals: 0,
    pendingDeposits: 0,
    pendingWithdrawals: 0,
    activeInvestments: 0 
  });

  const adminToken = useSelector((state: RootState) => state?.admin?.token);

  const statCards = [
    { title: 'Total Users', value: stats.totalUsers.toLocaleString(), icon: Users, bgColor: 'bg-blue-100', iconColor: 'text-blue-600' },
    { title: 'Total Deposits', value: `$${(stats.totalDeposits).toFixed(0)}`, icon: CreditCard, bgColor: 'bg-green-100', iconColor: 'text-green-600' },
    { title: 'Total Withdrawals', value: `$${(stats.totalWithdrawals ).toFixed(0)}`, icon: TrendingDown, bgColor: 'bg-red-100', iconColor: 'text-red-600' },
    { title: 'Pending Deposits', value: stats.pendingDeposits, icon: Eye, bgColor: 'bg-yellow-100', iconColor: 'text-yellow-600', alert: true },
  ];

    const getAllWithdrawals = async () => {
      try {
        const response = await axios.get("/admin/withdrawals/all", {
          headers: {
            Authorization: `Bearer ${adminToken}`
          }
        });
      const totalWithdrawals = response.data.data.reduce(
        (sum: number, withdrawal: { amount: number }) => sum + Number(withdrawal.amount),
        0
      );

      const pendingWithdrawals = response.data.data.filter(
        (withdrawal: { status: string }) => withdrawal.status === "pending"
      ).length;
        setStats(prev => ({ ...prev, totalWithdrawals, pendingWithdrawals }));

        console.log(response?.data?.data);
      } catch (error) {
        if (isAxiosError(error)) {
          console.log(error);
        }
      } finally {

      }
    };

  const getAllUsers = async () => {
    try {
      const response = await axios.get("/admin/users", {
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      setStats(prev => ({ ...prev, totalUsers: response.data.data.length }));
    } catch (error) {
      if (isAxiosError(error)) console.error(error);
    }
  };

  const getAllDeposits = async () => {
    try {
      const response = await axios.get("/admin/deposits/all", {
        headers: { Authorization: `Bearer ${adminToken}` }
      });

      const totalDeposits = response.data.data.reduce(
        (sum: number, deposit: { amount: number }) => sum + Number(deposit.amount),
        0
      );

      const pendingDeposits = response.data.data.filter(
        (deposit: { status: string }) => deposit.status === "pending"
      ).length;

      setStats(prev => ({ ...prev, totalDeposits, pendingDeposits }));
    } catch (error) {
      if (isAxiosError(error)) console.error(error);
    }
  };
  useEffect(() => {
    if (adminToken) {
      getAllUsers();
      getAllDeposits();
      getAllWithdrawals()
    }
  }, [adminToken]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's your platform overview.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className={`${stat.bgColor} rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-700 font-medium text-sm">{stat.title}</h3>
                <div className="p-3 rounded-lg bg-white">
                  <Icon size={24} className={stat.iconColor} />
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              {stat.alert && <p className="text-xs text-red-600 mt-2 font-semibold">⚠️ Needs attention</p>}
            </div>
          );
        })}
      </div>

      {/* Quick Stats & Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Transactions</h2>
          {/* Replace with your real data */}
          <div className="space-y-4">
            {[{ type: 'Deposit', user: 'John Doe', amount: '$5,000', status: 'Completed', time: '2 hours ago' }].map((tx, idx) => (
              <div key={idx} className="flex items-center justify-between py-3 border-b last:border-0">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{tx.user}</p>
                  <p className="text-sm text-gray-500">{tx.type} • {tx.time}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{tx.amount}</p>
                  <p className={`text-xs font-medium ${tx.status === 'Pending' ? 'text-yellow-600' : 'text-green-600'}`}>{tx.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Stats</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Active Investments</p>
                <p className="text-2xl font-bold text-purple-600">{stats.activeInvestments}</p>
              </div>
              <TrendingUp size={32} className="text-purple-600" />
            </div>
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Pending Withdrawals</p>
                <p className="text-2xl font-bold text-orange-600">{stats.pendingWithdrawals}</p>
              </div>
              <TrendingDown size={32} className="text-orange-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;