"use client"
import React from "react";
import {
  LayoutGrid,
  Users,
  CreditCard,
  TrendingDown,
  History,
  Zap,
  Plus,
  ChevronRight,
  X,
  ChartBarIncreasing,
  ChartNoAxesCombined,
  ClipboardClock,
  ClipboardCheck,
  Gem,
  Landmark,
} from "lucide-react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { clearAdmin } from "@/Global/AdminSlice";
import toast from "react-hot-toast";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const router = useRouter();

  const menuItems = [
    { id: "/admin", icon: LayoutGrid, label: "Dashboard" },
    { id: "/admin/users", icon: Users, label: "All Users" },
    { id: "/admin/pending-deposit", icon: CreditCard, label: "Pending Deposit" },
    { id: "/admin/deposit-history", icon: History, label: "Deposit History" },
    { id: "/admin/pending-withdraw", icon: TrendingDown, label: "Pending Withdraw" },
    { id: "/admin/withdraw-history", icon: History, label: "Withdraw History" },
    { id: "/admin/all-history", icon: Zap, label: "All History" },
    { id: "/admin/plans", icon: Plus, label: "Plans & Create Plan" },
    { id: "/admin/all-investments", icon: ChartNoAxesCombined, label: "All Investment" },
    { id: "/admin/active-investments", icon: ChartBarIncreasing, label: "Active Investments" },
    { id: "/admin/pending-investments", icon: ClipboardClock, label: "Pending Investments" },
    { id: "/admin/processed-investments", icon: ClipboardCheck, label: "Processed Investments" },
    { id: "/admin/topearnings", icon: Gem , label: "Top Earnings" },
    { id: "/admin/all-earnings", icon: Landmark, label: "Earning History" },
  ];

  const handleNavigate = (path: string) => {
    router.push(path);
    // close sidebar only on mobile
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };
  const dispatch = useDispatch()

  const logOut = ()=>{
    dispatch(clearAdmin())
    setTimeout(()=>{
      toast.success("Logout Successful!")
      router.push("/admin/login")
    }, 2000)
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-screen w-72
          bg-gradient-to-b from-purple-900 via-purple-800 to-purple-900
          text-white flex flex-col
          transform transition-transform duration-300
          lg:translate-x-0 lg:relative
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="p-6 border-b border-purple-700 flex items-center justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => handleNavigate("/")}
          >
            <Image src="/logo.png" alt="TradeMark" width={40} height={40} />
            <h1 className="text-xl font-bold text-purple-300">TradeMark</h1>
          </div>

          {/* Close button (mobile only) */}
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-1 rounded hover:bg-purple-700/50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto scrollbar-thin">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = router.pathname === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg
                  transition-all duration-200
                  ${
                    isActive
                      ? "bg-purple-700 text-white shadow-lg"
                      : "text-purple-200 hover:bg-purple-700/50"
                  }
                `}
              >
                <Icon size={20} />
                <span className="flex-1 text-left font-medium">
                  {item.label}
                </span>
                {isActive && <ChevronRight size={18} />}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-6 border-t border-purple-700" onClick={logOut}>
          <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-purple-500 text-purple-200 hover:bg-purple-700/50 transition">
            <span>🚪</span>
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
