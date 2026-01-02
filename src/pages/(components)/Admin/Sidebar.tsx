// components/admin/Sidebar.tsx

import React from 'react';
import { 
  LayoutGrid, 
  Users, 
  CreditCard, 
  TrendingDown, 
  History, 
  Zap, 
  Plus,
  ChevronRight
} from 'lucide-react';
import { useRouter } from 'next/router';
import Image from 'next/image';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const menuItems = [
    { id: '/admin', icon: LayoutGrid, label: 'Dashboard' },
    { id: '/admin/users', icon: Users, label: 'All Users' },
    { id: '/admin/pending-deposit', icon: CreditCard, label: 'Pending Deposit' },
    { id: '/admin/deposit-history', icon: History, label: 'Deposit History' },
    { id: '/admin/pending-withdraw', icon: TrendingDown, label: 'Pending Withdraw' },
    { id: '/admin/withdraw-history', icon: History, label: 'Withdraw History' },
    { id: '/admin/all-history', icon: Zap, label: 'All History' },
    { id: '/admin/plans', icon: Plus, label: 'Plans & Create Plan' },
  ];
  const router = useRouter()

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:relative w-72 h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-purple-900 text-white flex flex-col transition-transform duration-300 z-40 lg:z-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        
        <div className="p-6 border-b border-purple-700">
          <div className="flex items-center gap-2">
                      <Image
                        src="/logo.png"
                        alt="TradeMark"
                        width={50}
                        height={50}
                        onClick={() => router.push("/")}
                        className="cursor-pointer"
                      />
            <h1 className="text-2xl font-bold">
              <span className="text-purple-300">TradeMark</span>
            </h1>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = router.pathname === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  router.push(item.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-purple-700 text-white shadow-lg'
                    : 'text-purple-200 hover:bg-purple-700/50'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium flex-1 text-left">{item.label}</span>
                {isActive && <ChevronRight size={18} />}
              </button>
            );
          })}
        </nav>

        {/* Logout Section */}
        <div className="p-6 border-t border-purple-700">
          <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-purple-500 text-purple-200 hover:bg-purple-700/50 transition-all duration-200">
            <span>🚪</span>
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;