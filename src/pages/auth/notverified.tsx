"use client";

import axios from "@/config/axiosconfig";
import { RootState } from "@/Global/store";
import { easeInOut, motion, spring } from "framer-motion";
import { AlertCircle, ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export default function AccountNotVerified() {
  const router = useRouter();
  const { otp, token } = router.query;
  const [loading, setLoading] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state?.user);
  const userEmail = user.User?.user?.user.email;

  const handleSendVerificationLink = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/auth/resend-verification", {
        email: userEmail,
      });
      console.log(res.data?.message);
      toast.success(res?.data?.message);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        delay: 0.3,
        duration: 0.6,
        type: spring,
        stiffness: 100,
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5 + i * 0.1,
        duration: 0.5,
      },
    }),
  };

  const floatVariants = {
    animate: {
      y: [0, -8, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: easeInOut,
      },
    },
  };

  return (
    <div className="bg-linear-to-br from-gray-950 via-gray-900 to-slate-950 min-h-screen flex items-center justify-center px-4 py-12">
      <motion.div
        className="w-full max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main Container */}
        <motion.div
          className="bg-purple-800/20 backdrop-blur-md border border-purple-500/30 rounded-2xl p-8 shadow-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          whileHover={{
            boxShadow: "0 20px 40px rgba(168, 85, 247, 0.2)",
          }}
        >
          {/* Alert Icon */}
          <motion.div
            className="relative w-24 h-24 mx-auto mb-6"
            variants={iconVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="absolute inset-0 bg-linear-to-br from-amber-500/20 to-orange-500/20 rounded-full border border-amber-500/50"
              animate={floatVariants}
            />
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              variants={iconVariants}
              initial="hidden"
              animate="visible"
              transition={{
                delay: 0.4,
                duration: 0.6,
                type: "spring",
                stiffness: 100,
              }}
            >
              <AlertCircle className="w-12 h-12 text-amber-400" />
            </motion.div>
          </motion.div>

          {/* Header */}
          <motion.div
            className="text-center mb-8"
            custom={0}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-amber-300 to-orange-300 mb-2">
              Account Not Verified
            </h1>
            <p className="text-purple-200 text-sm">
              Your email address needs to be verified to access your account
            </p>
          </motion.div>

          {/* Start Verification Button */}
          <motion.button
            onClick={handleSendVerificationLink}
            className="w-full py-3 bg-linear-to-r from-purple-600 via-purple-700 to-purple-800 text-white font-semibold rounded-lg relative overflow-hidden group mb-4"
            custom={1}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              className="absolute inset-0 bg-linear-to-r from-transparent via-white to-transparent opacity-0"
              initial={{ x: "-100%" }}
              whileHover={{
                x: "100%",
                opacity: 0.2,
              }}
              transition={{ duration: 0.6 }}
            />
            <span className="relative z-10 flex items-center justify-center gap-2">
              Send Verification link
            </span>
          </motion.button>

          {/* Back Button */}
          <motion.button
            onClick={() => router.push("/auth/login")}
            className="w-full flex items-center justify-center gap-2 text-purple-400 hover:text-purple-300 font-semibold transition py-2"
            custom={2}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.02 }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
