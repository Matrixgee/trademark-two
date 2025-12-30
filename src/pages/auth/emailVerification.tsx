/* eslint-disable react-hooks/exhaustive-deps */
// EmailVerificationSuccess.tsx
"use client";

import { easeOut, motion, spring } from "framer-motion";
import { useEffect, useState } from "react";
import { Check, ArrowRight } from "lucide-react";
import { useRouter } from "next/router";
import axios from "@/config/axiosconfig";
// import { useSelector } from "react-redux";
// import type { RootState } from "../../Global/store";

export default function EmailVerificationSuccess() {
  const router = useRouter();

  const [verificationSuccessful, setVerificationSuccessful] =
    useState<boolean>(false);
  // const user = useSelector((state: RootState) => state?.user);
  // console.log(user);

  //   const userEmail = user.User?.user?.user.email;

  useEffect(() => {
    if (!router.isReady) return;

    const { otp, token } = router.query;

    let timer: NodeJS.Timeout;

    const verifyEmail = async () => {
      try {
        if (!otp || !token) return;

        const res = await axios.post("/auth/verify-email", {
          otp,
          token,
        });

        console.log("Email verified:", res.data);
        setVerificationSuccessful(true);

        timer = setTimeout(() => {
          router.replace("/auth/login");
        }, 5000);
      } catch (error) {
        console.error("Verification error:", error);
        setVerificationSuccessful(false);

        timer = setTimeout(() => {
          router.replace("/auth/notverified");
        }, 5000);
      }
    };

    verifyEmail();

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [router.isReady, router.query]);

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: easeOut,
      },
    },
  };

  const checkmarkVariants = {
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

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5 + i * 0.1,
        duration: 0.5,
      },
    }),
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
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
        {/* Success Container */}
        <motion.div
          className="bg-purple-800/20 backdrop-blur-md border border-purple-500/30 rounded-2xl p-8 shadow-2xl text-center"
          whileHover={{
            boxShadow: "0 20px 40px rgba(168, 85, 247, 0.2)",
          }}
        >
          {/* Animated Checkmark Circle */}
          <motion.div
            className="relative w-24 h-24 mx-auto mb-8"
            variants={pulseVariants}
            animate="animate"
          >
            <motion.div
              className="absolute inset-0 bg-linear-to-br from-green-500/20 to-green-600/20 rounded-full border border-green-500/50"
              variants={checkmarkVariants}
              initial="hidden"
              animate="visible"
            />
            <motion.div
              className="absolute inset-2 bg-linear-to-br from-green-500/10 to-green-600/10 rounded-full flex items-center justify-center"
              variants={checkmarkVariants}
              initial="hidden"
              animate="visible"
              transition={{
                delay: 0.4,
                duration: 0.6,
                type: spring,
                stiffness: 100,
              }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: 0.6,
                  duration: 0.4,
                  type: spring,
                  stiffness: 200,
                }}
              >
                <Check className="w-12 h-12 text-green-400" />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Success Message */}
          <motion.h1
            className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-300 to-green-300 mb-3"
            custom={0}
            variants={textVariants}
            initial="hidden"
            animate="visible"
          >
            {verificationSuccessful ? "Email Verified!" : "Verification Failed"}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-purple-200 text-lg mb-2"
            custom={1}
            variants={textVariants}
            initial="hidden"
            animate="visible"
          >
            {verificationSuccessful
              ? "Your email address has been successfully verified."
              : "Your email address has not been verified."}
          </motion.p>

          {/* Email Display */}
          {/* <motion.div
            className="inline-flex items-center gap-2 mt-4 mb-8 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-lg"
            custom={2}
            variants={textVariants}
            initial="hidden"
            animate="visible"
          >
            <Mail className="w-4 h-4 text-green-400" />
            <p className="text-green-300 text-sm font-semibold">
              {userEmail || "Email verified"}
            </p>
          </motion.div> */}

          {/* Description */}
          <motion.p
            className="text-purple-300/70 text-sm mb-8"
            custom={3}
            variants={textVariants}
            initial="hidden"
            animate="visible"
          >
            {verificationSuccessful
              ? "Your account is now fully activated. You can now access all features and enjoy our platform."
              : ""}
          </motion.p>

          {/* Progress Bar */}
          <motion.div
            className="w-full h-1 bg-purple-900/30 rounded-full overflow-hidden mb-6"
            custom={4}
            variants={textVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="h-full bg-linear-to-r from-green-500 to-green-600"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ delay: 1.5, duration: 3.5, ease: "linear" }}
            />
          </motion.div>

          {/* Redirect Info */}
          <motion.p
            className="text-purple-300/50 text-xs mb-6"
            custom={5}
            variants={textVariants}
            initial="hidden"
            animate="visible"
          >
            {verificationSuccessful
              ? "Redirecting to login in 5 seconds..."
              : "Redirecting to in 5 seconds..."}
          </motion.p>

          {verificationSuccessful ? (
            <motion.button
              onClick={() => router.push("/user")}
              className="w-full py-3 bg-linear-to-r from-green-600 via-green-700 to-green-800 text-white font-semibold rounded-lg relative overflow-hidden group"
              custom={6}
              variants={textVariants}
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
                Go to Login
                <ArrowRight className="w-5 h-5" />
              </span>
            </motion.button>
          ) : null}
        </motion.div>
      </motion.div>
    </div>
  );
}
