"use client"

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/router";

export default function AuthForms() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setFormData({ email: "", password: "", confirmPassword: "", fullName: "" });
    }, 2000);
  };

  const inputVariants = {
    focus: {
      boxShadow: "0 0 0 3px rgba(168, 85, 247, 0.2)",
      borderColor: "rgba(168, 85, 247, 1)",
    },
  };

  const router = useRouter()

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
            <div className="w-full flex items-center justify-center mb-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  src="/logo.png"
                  alt="TradeMark"
                  width={100}
                  height={100}
                  className="cursor-pointer drop-shadow-lg"
                />
              </motion.div>
            </div>
            <motion.p 
              className="text-purple-200 font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {isLogin ? "Welcome back" : "Join our community"}
            </motion.p>
          </motion.div>

          {/* Tab Buttons */}
          <motion.div
            className="flex gap-2 mb-8 bg-purple-900/20 p-1 rounded-lg border border-purple-500/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <motion.button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 rounded-md font-semibold transition-all ${
                isLogin
                  ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg"
                  : "text-purple-300 hover:text-white"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Login
            </motion.button>
            <motion.button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 rounded-md font-semibold transition-all ${
                !isLogin
                  ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg"
                  : "text-purple-300 hover:text-white"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Register
            </motion.button>
          </motion.div>

          {/* Forms */}
          <AnimatePresence mode="wait">
            {isLogin ? (
              <motion.form
                key="login"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
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
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      required
                      className="w-full pl-10 pr-4 py-2.5 bg-purple-900/20 border border-purple-500/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none transition-all"
                      variants={inputVariants}
                      whileFocus="focus"
                    />
                  </div>
                </motion.div>

                {/* Password Field */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <label className="block text-sm font-semibold text-purple-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3.5 w-5 h-5 text-purple-400" />
                    <motion.input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="••••••••"
                      required
                      className="w-full pl-10 pr-10 py-2.5 bg-purple-900/20 border border-purple-500/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none transition-all"
                      variants={inputVariants}
                      whileFocus="focus"
                    />
                    <motion.button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3.5 text-purple-400 hover:text-purple-300 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </motion.button>
                  </div>
                </motion.div>

                {/* Remember & Forgot */}
                <motion.div
                  className="flex justify-between items-center text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded bg-purple-900/30 border border-purple-500/30 cursor-pointer accent-purple-500"
                    />
                    <span className="text-purple-300">Remember me</span>
                  </label>
                  <a href="#" className="text-purple-400 hover:text-purple-300 transition">
                    Forgot password?
                  </a>
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  onClick={()=>router.push("/user")}
                  className="w-full py-3 cursor-pointer bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 text-white font-semibold rounded-lg relative overflow-hidden group"
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
                        Logging in...
                      </>
                    ) : (
                      "Login"
                    )}
                  </span>
                </motion.button>
              </motion.form>
            ) : (
              <motion.form
                key="register"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >
                {/* Full Name Field */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="block text-sm font-semibold text-purple-300 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3.5 w-5 h-5 text-purple-400" />
                    <motion.input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      required
                      className="w-full pl-10 pr-4 py-2.5 bg-purple-900/20 border border-purple-500/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none transition-all"
                      variants={inputVariants}
                      whileFocus="focus"
                    />
                  </div>
                </motion.div>

                {/* Email Field */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <label className="block text-sm font-semibold text-purple-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 w-5 h-5 text-purple-400" />
                    <motion.input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      required
                      className="w-full pl-10 pr-4 py-2.5 bg-purple-900/20 border border-purple-500/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none transition-all"
                      variants={inputVariants}
                      whileFocus="focus"
                    />
                  </div>
                </motion.div>

                {/* Password Field */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <label className="block text-sm font-semibold text-purple-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3.5 w-5 h-5 text-purple-400" />
                    <motion.input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="••••••••"
                      required
                      className="w-full pl-10 pr-10 py-2.5 bg-purple-900/20 border border-purple-500/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none transition-all"
                      variants={inputVariants}
                      whileFocus="focus"
                    />
                    <motion.button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3.5 text-purple-400 hover:text-purple-300 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </motion.button>
                  </div>
                </motion.div>

                {/* Confirm Password Field */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <label className="block text-sm font-semibold text-purple-300 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3.5 w-5 h-5 text-purple-400" />
                    <motion.input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="••••••••"
                      required
                      className="w-full pl-10 pr-10 py-2.5 bg-purple-900/20 border border-purple-500/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none transition-all"
                      variants={inputVariants}
                      whileFocus="focus"
                    />
                    <motion.button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-3.5 text-purple-400 hover:text-purple-300 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </motion.button>
                  </div>
                </motion.div>

                {/* Terms Checkbox */}
                <motion.label
                  className="flex items-center gap-2 cursor-pointer text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                >
                  <input
                    type="checkbox"
                    required
                    className="w-4 h-4 rounded bg-purple-900/30 border border-purple-500/30 cursor-pointer accent-purple-500"
                  />
                  <span className="text-purple-300">
                    I agree to the{" "}
                    <a href="#" className="text-purple-400 hover:text-purple-300 transition">
                      Terms of Service
                    </a>
                  </span>
                </motion.label>

                <motion.button
                  type="submit"
                  disabled={loading}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  onClick={()=>router.push("/user")}
                  className="w-full py-3 cursor-pointer bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 text-white font-semibold rounded-lg relative overflow-hidden group"
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
                  <span className="relative z-10 flex items-center justify-center gap-2" >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Creating account...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </span>
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Success Message */}
          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.8 }}
                className="mt-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-300 text-center font-semibold"
              >
                ✓ {isLogin ? "Logged in successfully!" : "Account created successfully!"}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer Links */}
          <motion.div
            className="mt-8 text-center text-sm text-purple-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            {isLogin ? (
              <p>
                Don't have an account?{" "}
                <motion.button
                  onClick={() => setIsLogin(false)}
                  className="text-purple-400 hover:text-purple-300 font-semibold transition"
                  whileHover={{ scale: 1.05 }}
                >
                  Register here
                </motion.button>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <motion.button
                  onClick={() => setIsLogin(true)}
                  className="text-purple-400 hover:text-purple-300 font-semibold transition"
                  whileHover={{ scale: 1.05 }}
                >
                  Login here
                </motion.button>
              </p>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}