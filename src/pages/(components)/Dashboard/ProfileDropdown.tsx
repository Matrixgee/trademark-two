import { clearUser, userInfo } from '@/Global/UserSlice';
import { AnimatePresence, motion } from 'framer-motion';
import { LogOut, Settings, User } from 'lucide-react';
import { useRouter } from 'next/router';
import React from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';

interface DropdownProps {
    isOpen: boolean
    onClose: ()=>void
}
const ProfileDropdown:React.FC<DropdownProps> = ({ isOpen, onClose }) => {

  const router = useRouter()
  const dispatch = useDispatch()

  const logOut = ()=>{
    dispatch(clearUser())
    setTimeout(()=>{
      toast.success("Logout Successful!")
      router.push("/auth/login")
    }, 2000)
  }
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute right-0 mt-2 w-50 rounded-t-2xl z-50 bg-white rounded-lg shadow-lg border border-gray-200"
        >
          <div className="p-4 border-b border-gray-200 bg-purple-500 flex flex-col justify-center items-center rounded-t-2xl ">
            <div className='p-2 rounded-full border w-max border-white bg-black'>
                <User className='text-white'/>
            </div>
            <p className=" text-sm font-semibold text-white">Michael Jordan</p>
            <p className="text-xs text-white">mike@mailinator.com</p>
          </div>
          <button onClick={()=>router.push("/user/profile")} className="w-full cursor-pointer flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition text-gray-700">
            <User size={18} />
            Profile
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition text-gray-700">
            <Settings size={18} />
            Settings
          </button>
          <button onClick={logOut} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition text-red-600 border-t border-gray-200">
            <LogOut size={18} />
            Logout
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default ProfileDropdown
