// ForgotPassword.tsx
"use client"

import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, ArrowLeft } from "lucide-react";
import { useRouter } from "next/router";

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setEmail("");
    }, 2000);
  };

  const inputVariants = {
    focus: {
      boxShadow: "0 0 0 3px rgba(168, 85, 247, 0.2)",
      borderColor: "rgba(168, 85, 247, 1)",
    },
  };

  return (
    <div className="bg-gradient-to-br from-gray-950 via-gray-900 to-slate-950 min-h-screen flex items-center justify-center px-4 py-12">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Form Container */}
        <motion.div
          className="bg-purple-800/20 backdrop-blur-md border border-purple-500/30 rounded-2xl p-8 shadow-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          whileHover={{
            boxShadow: "0 20px 40px rgba(168, 85, 247, 0.2)",
          }}
        >
          {/* Header */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.p
              className="text-purple-200 font-semibold text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Forgot Password?
            </motion.p>
            <p className="text-purple-300/60 text-sm mt-2">
              Enter your email to receive reset instructions
            </p>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-5"
          >
            {/* Email Field */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label className="block text-sm font-semibold text-purple-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 w-5 h-5 text-purple-400" />
                <motion.input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-purple-900/20 border border-purple-500/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none transition-all"
                  variants={inputVariants}
                  whileFocus="focus"
                />
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="w-full py-3 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 text-white font-semibold rounded-lg relative overflow-hidden group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
                initial={{ x: "-100%" }}
                whileHover={{
                  x: "100%",
                  opacity: 0.2,
                }}
                transition={{ duration: 0.6 }}
              />
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </span>
            </motion.button>
          </motion.form>

          {/* Success Message */}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.8 }}
              className="mt-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-300 text-center font-semibold"
            >
              ✓ Reset link sent successfully!
            </motion.div>
          )}

          {/* Back Button */}
          <motion.button
            onClick={() => router.push("/auth/login")}
            className="mt-6 w-full flex items-center justify-center gap-2 text-purple-400 hover:text-purple-300 font-semibold transition"
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