import axios from "@/config/axiosconfig";
import { useDepositContext } from "@/context/DepositContext";
import { RootState } from "@/Global/store";
import { isAxiosError } from "axios";
import { Check, Copy } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export default function PaymentPage() {
  const [copied, setCopied] = useState(false);
  const token = useSelector((state:RootState)=>state?.user?.Token)
  const {mode, amount, from, setAmount, setFrom, setMode} = useDepositContext()
  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const router = useRouter()
  const handleDeposit = async()=>{
   const formData ={
    amount: amount,
    from: from,
    method: mode.toUpperCase()
   }

   const loadingId = toast.loading("Please wait...")
   try {
    const response = await axios.post("/deposit/", formData, {
      headers:{
        Authorization : `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    })
    console.log(response)

    setAmount(0)
    setFrom("")
    setMode("")
    toast.dismiss(loadingId)
    toast.success('Payment confirmed! Processing transaction...');
    setTimeout(() => {
      router.push("/user")
    }, 2000);
   } catch (error) {
    if (isAxiosError(error)) {
      toast.dismiss(loadingId)
          setAmount(0)
    setFrom("")
    setMode("")
      console.log(error)

    }
    router.back()
   }
}

const MODE_LABEL: Record<string, string> = {
  btc: "Bitcoin",
  eth: "Ethereum",
  sol: "Solana",
  usdt:"Usdt"
};

const WALLET_ADDRESS: Record<string, string> = {
  btc: "bc1qtx7acjjmpeshnvg63f5jpas32g7d4kmj29ywgf",
  eth: "0x7f2D483A5A151cf0F14857090a406d0B0055eCAc",
  sol: "2VbK88Li6MVXeW4KSjABMsDVsDPeLCrh3YGrJ5Wdqsdf",
  usdt: "TQMeKf1vNs2SqRtvvFoXjvkhe7pBgWRDPD",
};
const QR_CODE: Record<string, string> = {
  btc: "/BTC.jpg",
  eth: "/ETH.jpg",
  sol: "/SOL.jpeg",
  usdt: "/USDT.jpg",
};

const walletAddress = WALLET_ADDRESS[mode]; 



  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-6 max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-xl font-bold">Payment Informations</h1>
          <button onClick={()=>router.back()} className="text-purple-600 text-lg cursor-pointer hover:text-purple-700">← Back</button>
        </div>

        {/* QR Code Section */}
        <div className="bg-white rounded-lg p-8 mb-6 text-center shadow-md">

          <div className="inline-block bg-purple-100 rounded-lg px-4 py-2 mb-1">
            <span className="text-purple-600 font-bold text-lg">QR CODE</span>
          </div>
          <h2 className="text-gray-600 text-sm font-semibold mb-4">{mode.charAt(0).toUpperCase().concat(mode.slice(1))}</h2>

          <p className="text-gray-700 font-semibold mb-6">THIS IS YOUR {mode.toUpperCase()}, WALLET QR CODE</p>

          <div className="flex justify-center mb-8">
            <div className="bg-white border-2 border-gray-200 rounded-lg ">
             <Image
                           src={QR_CODE[mode]}
                           alt="TradeMark"
                           width={100}
                           height={100}
                           className="cursor-pointer"
                         />
            </div>
          </div>

          {/* Wallet Address Section */}
          <div className="mb-6">
            <label className="block text-gray-600 text-sm font-semibold mb-3">Wallet Address</label>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={walletAddress}
                readOnly
                className="flex-1 border rounded-lg p-3 bg-gray-50 text-sm text-gray-700 truncate"
              />
              <button
                onClick={handleCopy}
                className="bg-purple-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-purple-700 transition flex items-center gap-2"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span className="hidden sm:inline">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span className="hidden sm:inline">Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Payment Information Section */}
        <div className="bg-white rounded-lg p-8 shadow-md">
          <h2 className="text-xl font-bold mb-6">Payment information</h2>

          <div className="space-y-4 mb-8">
            {/* Gateway Name */}
            <div className="flex justify-between items-center py-3 border-b">
              <span className="text-gray-600 font-semibold">Gateway name:</span>
              <span className="text-gray-900 font-semibold">
                {MODE_LABEL[mode.toLowerCase()] ?? ""}
              </span>
            </div>

            {/* Amount */}
            <div className="flex justify-between items-center py-3 border-b">
              <span className="text-gray-600 font-semibold">Amount:</span>
              <span className="text-gray-900 font-semibold text-lg">{amount} USD</span>
            </div>

            {/* Charge */}
            <div className="flex justify-between items-center py-3 border-b">
              <span className="text-gray-600 font-semibold">Charge:</span>
              <span className="text-gray-900 font-semibold">0.00 USD</span>
            </div>
          </div>

          {/* Requirement Section */}
          <div className="bg-purple-50 rounded-lg p-4 mb-6 border border-purple-200">
            <p className="text-gray-700 text-sm">
              <span className="font-semibold">Requirement:</span> Please send the exact amount to the wallet address above. Transaction will be confirmed once payment is received on the blockchain.
            </p>
          </div>

          {/* Confirm Payment Button */}
          <button
            onClick={handleDeposit}
            className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-purple-700 transition"
          >
            Confirm Payment
          </button>
        </div>
      </div>
    </div>
  );
}