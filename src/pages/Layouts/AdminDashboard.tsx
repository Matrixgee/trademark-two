"use client";

import React, { ReactNode, useEffect, useRef, useState } from "react";
import { ChevronDown, LogOut, Menu, X } from "lucide-react";
import Sidebar from "../(components)/Admin/Sidebar";
import { useDispatch } from "react-redux";
import { clearAdmin } from "@/Global/AdminSlice";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

const AdminDashboard = ({ children }: { children: ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const logOut = () => {
    dispatch(clearAdmin());
    setTimeout(() => {
      toast.success("Logout Successful!");
      router.push("/admin/login");
    }, 2000);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen((prev) => !prev)}
              className="p-2 hover:bg-gray-100 rounded-lg lg:hidden"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <h2 className="max-md:hidden text-2xl font-bold text-gray-900">
              Trademark Admin
            </h2>
          </div>

          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex items-center gap-3 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
            >
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                A
              </div>

              <div className="hidden md:flex flex-col items-start">
                <p className="text-sm font-semibold text-gray-900">
                  Hello, Admin
                </p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>

              <ChevronDown size={18} />
            </button>

            {/* Dropdown */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    setShowLogoutModal(true);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-gray-100"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-6">{children}</div>
      </div>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-[90%] max-w-sm">
            <h3 className="text-lg font-bold text-gray-900">Confirm Logout</h3>
            <p className="text-sm text-gray-600 mt-2">
              Are you sure you want to logout?
            </p>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 text-sm rounded-lg bg-gray-100 hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={logOut}
                className="px-4 py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
