"use client"

import axios from "@/config/axiosconfig";
import { RootState } from "@/Global/store";
import { isAxiosError } from "axios";
import { Eye, Loader2, Lock, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export interface User {
  id: string;
  name: string;
  username: string;
  uid: string;
  email: string;
  password: string;
  balance: number;
  activeInvestments: number;
  pendingWithdrawals: number;
  totalWithdrawals: number;
  totalDeposits: number;
  earnings: number;
  verified: boolean;
  referralId: string;
  bitcoin: string;
  sol: string;
  ethereum: string;
  type: "user" | "admin"; 
  createdAt: number;
  updatedAt: number;
}


const AllUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<"All" | "Verified" | "NotVerified">('All');
  const [loading, setLoading] = useState<boolean>(false)
  const adminToken = useSelector((state:RootState)=> state?.admin?.token)
  const [users, setUsers] = useState<User[]>();

  const getAllUsers =async()=>{
    setLoading(true)
    try {
      const response = await axios.get("/admin/users", {
        headers:{
          Authorization: `Bearer ${adminToken}`
        }
      })
      setUsers(response?.data?.data)
      console.log(response?.data?.data)
    }catch(error){
      if (isAxiosError(error)) {
        console.log(error)
      }
    }finally{
      setLoading(false)
    }
  }
  useEffect(()=>{
    getAllUsers()
  },[])

  const filteredUsers = users?.filter((user:User) => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase()) || user.username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
    filterStatus === "Verified"
      ? user.verified
      : filterStatus === "NotVerified"
      ? !user.verified
      : true;
    return matchesSearch && matchesStatus;
  });


  const handleDeleteUser = async (uid: string) => {
    const loadingId = toast.loading("Deleting, Please wait...")
    try {
      const response = await axios.delete(`/admin/users/${uid}`, {
        headers: {
          Authorization: `Bearer ${adminToken}`
        }
      })
      toast.success(response?.data?.message || "User deleted successfully")
      console.log(response)
      setTimeout(() => {
        getAllUsers()
      }, 1000);
    } catch (error) {
      console.log(error)
    } finally {
      toast.dismiss(loadingId)
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">All Users</h1>
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input type="text" placeholder="Search by name, email, or username..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
          </div>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value as any)} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
            <option value="All">All Status</option>
            <option value="Verified">Verified</option>
            <option value="NotVerified">Not Verified</option>
          </select>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            {
                loading ?
                <div className="min-h-[300px] w-full flex items-center  justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-purple-700" />
      </div> :
            <>
              <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Username</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Password</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Balance</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Joined</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
               {filteredUsers?.map((user) => (
                <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                  <td className="px-6 py-4"><p className="font-medium text-gray-900 text-sm">{user?.name}</p></td>
                  <td className="px-6 py-4"><p className="text-gray-600 text-sm">{user?.email}</p></td>
                  <td className="px-6 py-4"><p className="text-gray-600 text-sm">@{user?.username}</p></td>
                  <td className="px-6 py-4"><p className="text-gray-600 text-sm">{user?.password}</p></td>
                  <td className="px-6 py-4"><p className="font-semibold text-gray-900 text-sm">${user.balance.toLocaleString()}</p></td>
                  <td className="px-6 py-4"><span className={`px-3 py-1 rounded-full text-xs font-medium ${user?.verified === false ? "bg-gray-100 text-gray-700" : "bg-green-100 text-green-700"} `}>{user?.verified === false ? "Not Verified" : "Verified"}</span></td>
                  <td className="px-6 py-4"><p className="text-gray-600 text-sm">25-09-2025</p></td>
                  <td className="px-6 py-4"><div className="flex items-center justify-center gap-2"><button className="p-2 hover:bg-blue-100 rounded-lg transition" title="View"><Eye size={18} className="text-blue-600" /></button><button onClick={()=>handleDeleteUser(user?.uid)} className="p-2 hover:bg-red-100 rounded-lg transition" title="Delete"><Trash2 size={18} className="text-red-600" /></button></div></td>
                </tr>
              ))}
                 
            </tbody>
            </>
}
          </table>
        </div>
        {filteredUsers?.length === 0 && <div className="p-8 text-center"><p className="text-gray-500 text-lg">No users found</p></div>}
      </div>
      {/* <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-gray-600">Showing {filteredUsers?.length} of {users?.length} users</p>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Previous</button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Next</button>
        </div>
      </div> */}
    </div>
  );
};

export default AllUsers