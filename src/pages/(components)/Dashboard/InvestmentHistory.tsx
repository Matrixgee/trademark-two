import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Copy, CheckCircle, Clock } from 'lucide-react'
import Image from 'next/image'
import axios from '@/config/axiosconfig'
import { isAxiosError } from 'axios'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { RootState } from '@/Global/store'

interface Investment {
  id: string;
  uid: string;
  name: string;
  email: string;
  plan_name: string;
  plan_id: string;
  duration: string;
  amount: number;
  status: "pending" | "approved" | "declined";
  createdAt: number;
  updatedAt: number;
}
const InvestmentHistory = () => {
  const [searchId, setSearchId] = useState('')
  const [copiedId, setCopiedId] = useState(null)

  const transactions = [
    {
      id: 1,
      transactionId: '677e7d34e6d131a7a1c6e0a5',
      network: 'Blockchain',
      gateway: 'transfer',
      assets: 'BTC',
      amount: '$3,000.00',
      date: 'January 8, 2025',
      status: 'PENDING',
      statusColor: 'orange',
      icon: '₿'
    },
    {
      id: 2,
      transactionId: '782f8e45f7e242b8b2d7f1b6',
      network: 'Blockchain',
      gateway: 'transfer',
      assets: 'ETH',
      amount: '$2,500.00',
      date: 'January 7, 2025',
      status: 'COMPLETED',
      statusColor: 'green',
      icon: 'Ξ'
    },
    {
      id: 3,
      transactionId: '893g9f56g8f353c9c3e8g2c7',
      network: 'Blockchain',
      gateway: 'transfer',
      assets: 'SOL',
      amount: '$1,800.00',
      date: 'January 6, 2025',
      status: 'PENDING',
      statusColor: 'orange',
      icon: '◈'
    },
    {
      id: 4,
      transactionId: '904h0g67h9g464d0d4f9h3d8',
      network: 'Blockchain',
      gateway: 'transfer',
      assets: 'BTC',
      amount: '$5,200.00',
      date: 'January 5, 2025',
      status: 'COMPLETED',
      statusColor: 'green',
      icon: '₿'
    }
  ]

  const getIcon = (assets:any) => {
    switch(assets) {
      case 'BTC': return '/bitcoin.svg'
      case 'ETH': return '/ethimage.png'
      case 'SOL': return '/solimage.png'
    }
  }

  const getStatusIcon = (status:string) => {
    return status === 'COMPLETED' ? (
      <CheckCircle className='w-5 h-5' />
    ) : (
      <Clock className='w-5 h-5' />
    )
  }

  const filteredTransactions = transactions.filter(tx =>
    tx.transactionId.toLowerCase().includes(searchId.toLowerCase())
  )
  const token = useSelector((state: RootState)=> state?.user.Token)

console.log(token)
  const handleCopy = (id:any) => {
    navigator.clipboard.writeText(id)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const [fetching, setFetching] = useState<boolean>(false)
  const [allInvestment, setAllInvestment] = useState<Investment[]>([])
  const getAllInvestments = async()=>{
    setFetching(true)
    const loadingId = toast.loading("Fetching all investments...")
    try {
      const response = await axios.get("/investment/all", {
      headers : {
        Authorization: `Bearer ${token}`
      }})
      console.log(response.data?.data)
      setAllInvestment(response?.data?.data)
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error)
      }
    }finally{
      setFetching(false)
      toast.dismiss(loadingId)
    }
  }
  useEffect(()=>{
    getAllInvestments()
  },[])
  console.log(allInvestment, "theVal")

  return (
    <div className='bg-gradient-to-br from-slate-50 via-white to-slate-50 min-h-screen w-full p-4'>
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl p-8 mb-8"
      >
        <h1 className="text-3xl font-bold text-white mb-6">Investment Log</h1>
        
        {/* Search Bar */}
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Transaction ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="flex-1 px-6 py-4 rounded-2xl bg-white border-0 focus:outline-none placeholder-gray-400 text-gray-900"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-purple-400 hover:bg-purple-300 text-white font-bold py-4 px-8 rounded-2xl transition-all flex items-center gap-2"
          >
            <Search className='w-5 h-5' /> Search
          </motion.button>
        </div>
      </motion.div>

      {/* Transactions List */}
      <div className="space-y-6">
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((transaction, index) => (
            <motion.div
              key={transaction.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
            >
              {/* Transaction Header */}
              <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold text-lg p-6">
                Transaction No: {transaction.id}
              </div>

              {/* Transaction Content */}
              <div className="p-8">
                <div className="flex gap-8 items-start">
                  {/* Icon */}
                  <Image
                              src={getIcon(transaction.assets) ?? ""}
                              alt={transaction.assets}
                              width={70}
                              height={70}
                              className="cursor-pointer rounded-full"
                            />

                  {/* Details */}
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-5">
                      <div>
                        <p className="text-gray-500 text-sm font-semibold mb-1">Transaction ID:</p>
                        <div className="flex items-center gap-2">
                          <p className="text-gray-900 font-bold font-mono text-sm break-all">
                            {transaction.transactionId}
                          </p>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleCopy(transaction.transactionId)}
                            className="text-purple-600 hover:text-purple-700 transition-colors"
                          >
                            <Copy className='w-4 h-4' />
                          </motion.button>
                          {copiedId === transaction.transactionId && (
                            <span className="text-xs text-green-600 font-bold">Copied!</span>
                          )}
                        </div>
                      </div>

                      <div>
                        <p className="text-gray-500 text-sm font-semibold mb-1">Network:</p>
                        <p className="text-gray-900 font-bold">{transaction.network}</p>
                      </div>

                      <div>
                        <p className="text-gray-500 text-sm font-semibold mb-1">Gateway:</p>
                        <p className="text-gray-900 font-bold">{transaction.gateway}</p>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-5">
                      <div>
                        <p className="text-gray-500 text-sm font-semibold mb-1">Assets:</p>
                        <p className="text-gray-900 font-bold">{transaction.assets}</p>
                      </div>

                      <div>
                        <p className="text-gray-500 text-sm font-semibold mb-1">Amount:</p>
                        <p className="text-gray-900 font-bold">{transaction.amount}</p>
                      </div>

                      <div>
                        <p className="text-gray-500 text-sm font-semibold mb-1">Transaction Date:</p>
                        <p className="text-gray-900 font-bold">{transaction.date}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-between">
                  <p className="text-gray-500 text-sm font-semibold">Status:</p>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                      transaction.statusColor === 'green' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-orange-100 text-orange-700'
                    } font-bold`}
                  >
                    {getStatusIcon(transaction.status)}
                    {transaction.status}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-3xl shadow-sm border border-gray-100 p-12 text-center"
          >
            <p className="text-gray-500 font-bold text-lg">No transactions found</p>
            <p className="text-gray-400 text-sm mt-2">Try searching with a different Transaction ID</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default InvestmentHistory