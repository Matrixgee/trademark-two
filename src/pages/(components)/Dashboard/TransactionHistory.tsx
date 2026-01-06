"use client"

import axios from "@/config/axiosconfig";
import { RootState } from "@/Global/store";
import { isAxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


interface Transaction {
  id: string;
  uid: string;
  amount: number;
  method:string
  from: string;
  to: string;

  plan_name: string;
  plan_id: string;
  investment_id: string;

  type: string;
  status: string;

  createdAt: number;
  updatedAt: number;
}
const TransactionHistory = () => {
 const [loading, setLoading] = useState<boolean>(false) 
const [transactions, setTransactions] = useState<Transaction[]>([]);

  const router = useRouter()

  const token = useSelector((state:RootState)=> state?.user?.Token)

  const getAllTransactions = async()=>{
    setLoading(true)
    try {
      const res = await axios.get("/transaction/all", {
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      console.log(res?.data?.data)
      setTransactions(res?.data?.data)
    } catch (error) {
      if(isAxiosError(error)){
        console.log(error)
      }
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    getAllTransactions()
  },[])

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
        <h1 className="text-3xl font-bold">Transaction history</h1>
        <button className="text-purple-600 text-lg cursor-pointer" onClick={()=> router.back()}>← Back</button>
      </div>

      <div className="bg-white rounded-lg overflow-hidden shadow">
        <div className="bg-purple-600 text-white p-4">
          <h2 className="font-bold text-lg">Transactions</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="text-left p-4 font-semibold">Method</th>
                <th className="text-left p-4 font-semibold">Type</th>
                <th className="text-left p-4 font-semibold">Amount</th>
                {/* <th className="text-left p-4 font-semibold">Date</th> */}
                <th className="text-left p-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-semibold">{tx.method}</td>
                  <td className="p-4 text-gray-600">
                    {tx.type === "deposit" ? "Deposit" : tx.type === "withdrawal" ? "Withdrawal" : tx.type}
                    </td>
                  <td className="p-4 font-semibold">${tx.amount}</td>
                  {/* <td className="p-4 text-gray-600">{tx.date}</td> */}
                  <td className="p-4">
                    <span className={`font-semibold ${tx.status === 'approved' ? 'text-green-500' : tx.status === "declined" ? 'text-red-500' : 'text-yellow-500'}`}>
                      {tx.status === "approved" ? "APPROVED" : tx.status === "declined" ? "DECLINED" : tx.status === "pending" ? "PENDING" : tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TransactionHistory
