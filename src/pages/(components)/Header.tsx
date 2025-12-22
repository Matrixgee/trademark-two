"use client"

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Menu, TrendingUp, X } from 'lucide-react';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const navItems = [
    { name: 'Home', id: '/' },
    { name: 'About', id: '/about' },
    { name: 'Contact', id: '/contact' },
  ];

  const router = useRouter()
  const currentPage = router.pathname

  console.log(currentPage)
  // return (
  //   <motion.header
  //     className="bg-white shadow-lg sticky top-0 z-50"
  //     initial={{ y: -100 }}
  //     animate={{ y: 0 }}
  //     transition={{ duration: 0.5 }}
  //   >
  //     <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
  //       <motion.div
  //         className="text-2xl font-bold"
  //         style={{ color: '#5a189a' }}
  //         whileHover={{ scale: 1.05 }}
  //       >
  //         <Image
  //       src="/logo.png"
  //       alt="TradeMark"
  //       width={50}
  //       height={50}
  //       onClick={() => router.push('/')}
  //       className="cursor-pointer"
  //     />
  //       </motion.div>

  //       {/* Desktop Menu */}
  //       <div className="hidden md:flex gap-8 items-center">
  //         {navItems.map((item) => (
  //           <motion.button
  //             key={item.id}
  //             onClick={() => router.push(item.id) }
  //             className={`transition-colors cursor-pointer
  //                ${
  //               currentPage === item.id ? 'font-bold' : 'font-semibold'
  //             }`}
  //             style={{
  //               color: currentPage === item.id ? '#5a189a' : '#333',
  //             }}
  //             whileHover={{ scale: 1.1 }}
  //           >
  //             {item.name}
  //           </motion.button>
  //         ))}
  //       </div>
  //       <div className='flex gap-3 '>
  //           <motion.button
  //           onClick={()=>router.push("/auth")}
  //         className="px-6 py-2 rounded-lg font-semibold text-white hidden md:block border border-[#5a189a] cursor-pointer"
  //         style={{ backgroundColor: '#5a189a' }}
  //         whileHover={{ scale: 1.05 }}
  //         whileTap={{ scale: 0.95 }}
  //       >
  //           Login
  //       </motion.button>
  //       <motion.button
  //         onClick={()=>router.push("/auth")}
  //         className="px-6 py-2 rounded-lg font-semibold text-[#5a189a] hidden md:block border cursor-pointer border-[#5a189a]"
  //         whileHover={{ scale: 1.05 }}
  //         whileTap={{ scale: 0.95 }}
  //       >
  //           Register
  //       </motion.button>
  //       </div>

  //       {/* Mobile Menu Button */}
  //       <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
  //         <div className="space-y-1">
  //           <div className="w-6 h-0.5 bg-gray-800"></div>
  //           <div className="w-6 h-0.5 bg-gray-800"></div>
  //           <div className="w-6 h-0.5 bg-gray-800"></div>
  //         </div>
  //       </button>
  //     </div>

  //     {/* Mobile Menu */}
  //     <AnimatePresence>
  //       {mobileMenuOpen && (
  //         <motion.div
  //           initial={{ opacity: 0, height: 0 }}
  //           animate={{ opacity: 1, height: 'auto' }}
  //           exit={{ opacity: 0, height: 0 }}
  //           className="md:hidden bg-gray-50 border-t"
  //         >
  //           <div className="px-4 py-4 space-y-3">
  //             {navItems.map((item) => (
  //               <button
  //                 key={item.id}
  //                 onClick={() => {
  //                   router.push(item.id)
  //                   setMobileMenuOpen(false);
  //                 }}
  //                 className="block w-full text-left py-2"
  //                 style={{
  //                   color: currentPage === item.id ? '#5a189a' : '#333',
  //                 }}
  //               >
  //                 {item.name}
  //               </button>
  //             ))}
  //             <button
  //               onClick={() => setIsLoggedIn(!isLoggedIn)}
  //               className="w-full py-2 px-4 rounded-lg font-semibold text-white"
  //               style={{ backgroundColor: '#5a189a' }}
  //             >
  //               {isLoggedIn ? 'Logout' : 'Login'}
  //             </button>
  //           </div>
  //         </motion.div>
  //       )}
  //     </AnimatePresence>
  //   </motion.header>
  // );
    return (
    <header className="fixed w-full top-0 z-50 bg-gradient-to-r from-slate-900 via-gray-900 to-slate-900 shadow-lg">
      <nav className="w-fullx1 mx-auto px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Image
        src="/logo.png"
        alt="TradeMark"
        width={50}
        height={50}
        onClick={() => router.push('/')}
        className="cursor-pointer"
      />
        </div>
     <div className="hidden md:flex gap-8 items-center">
        {navItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => router.push(item.id) }
              className={`transition-colors cursor-pointer
                 ${
                currentPage === item.id ? 'font-bold text-[#7615d6]' : 'font-semibold text-white'
              }`}
              // style={{
              //   color: currentPage === item.id ? '#e0c0ff' : '#ffffff',
              // }}
              whileHover={{ scale: 1.1 }}
            >
              {item.name}
            </motion.button>
          ))}
        </div>

        <div className="hidden md:flex gap-8 items-center">
          <button onClick={()=>router.push("/auth")} className="bg-purple-800 bg-opacity-40 hover:bg-purple-700 cursor-pointer border border-purple-800 text-white px-6 py-2 rounded-lg font-semibold transition">
           Login
          </button>
          <button onClick={()=>router.push("/auth")} className="bg-transparent hover:bg-purple-800 hover:text-white cursor-pointer border border-purple-800 text-purple-400 px-6 py-2 rounded-lg font-semibold transition">
            Register
          </button>
        </div>

        <button 
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {mobileMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-purple-800 p-4 flex flex-col gap-4 md:hidden">
            <a href="/" className="text-purple-100 hover:text-white">Home</a>
            <a href="/about" className="text-purple-100 hover:text-white">About</a>
            <a href="/contact" className="text-purple-100 hover:text-white">Contact</a>
            <button onClick={()=> router.push("/auth")} className="bg-purple-400 hover:bg-purple-300 text-purple-900 px-6 py-2 rounded-lg font-semibold w-full">
              Get Started
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};


export default Header
