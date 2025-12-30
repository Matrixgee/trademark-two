"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Home = () => {
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);

  return (
    <div className="bg-linear-to-br from-gray-900 via-purple-900 to-gray-900 min-h-screen space-y-20 pb-20">
      <AnimatePresence>
        {/* Hero */}
        <motion.section
          className="pt-20 px-4 text-center max-w-4xl mx-auto relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="absolute inset-0 opacity-10"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-96 h-96 rounded-full border-2 border-white mx-auto"></div>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-6 text-white relative z-10"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
          >
            Invest Smart, Grow Faster
          </motion.h1>
          <motion.p
            className="text-xl text-gray-200 mb-8 relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Your trusted partner in building wealth through strategic
            investments
          </motion.p>

          <motion.button
            className="px-8 py-4 rounded-full font-bold text-lg bg-linear-to-r from-purple-500 to-pink-500 text-white shadow-lg relative z-10"
            whileHover={{
              scale: 1.1,
              boxShadow: "0 10px 30px rgba(168,85,247,0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Start Investing Now
          </motion.button>
        </motion.section>

        {/* Why Choose Us */}
        <motion.section
          className="max-w-6xl mx-auto px-4 py-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-4xl font-bold text-center mb-12 text-white"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Why Choose Us
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {["Secure & Transparent", "Expert Team", "High Returns"].map(
              (item, i) => (
                <motion.div
                  key={i}
                  className="p-6 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg cursor-pointer group"
                  whileHover={{
                    y: -10,
                    backgroundColor: "rgba(255,255,255,0.15)",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="text-5xl mb-4"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ type: "spring" }}
                  >
                    {i === 0 ? "🔒" : i === 1 ? "👥" : "📈"}
                  </motion.div>
                  <h3 className="font-bold text-lg mb-2 text-white">{item}</h3>
                  <p className="text-gray-200">
                    Experience peace of mind with our fully transparent
                    investment process.
                  </p>
                </motion.div>
              )
            )}
          </div>
        </motion.section>

        {/* How It Works */}
        <motion.section
          className="max-w-6xl mx-auto px-4 py-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-4xl font-bold text-center mb-12 text-white"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            How It Works
          </motion.h2>
          <div className="relative">
            <div className="absolute top-8 left-0 right-0 h-1 bg-linear-to-r from-purple-500 via-pink-500 to-purple-500"></div>
            <div className="grid md:grid-cols-4 gap-6 relative z-10">
              {["Sign Up", "Fund Account", "Choose Plan", "Earn Returns"].map(
                (step, i) => (
                  <motion.div
                    key={i}
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.15 }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl bg-linear-to-br from-purple-500 to-pink-500"
                      whileHover={{ scale: 1.2 }}
                    >
                      {i + 1}
                    </motion.div>
                    <p className="font-semibold text-lg text-white">{step}</p>
                  </motion.div>
                )
              )}
            </div>
          </div>
        </motion.section>

        {/* Investment Options */}
        <motion.section
          className="max-w-6xl mx-auto px-4 py-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-4xl font-bold text-center mb-12 text-white"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Investment Options
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Stocks", desc: "Invest in top companies", icon: "📊" },
              { name: "Crypto", desc: "Digital asset trading", icon: "₿" },
              { name: "Bonds", desc: "Secure fixed income", icon: "💰" },
            ].map((option, i) => (
              <motion.div
                key={i}
                className="p-8 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 cursor-pointer group"
                whileHover={{
                  scale: 1.02,
                  backgroundColor: "rgba(255,255,255,0.15)",
                }}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="text-5xl mb-4"
                  whileHover={{ scale: 1.05, rotate: 360 }}
                  transition={{ type: "spring" }}
                >
                  {option.icon}
                </motion.div>
                <h3 className="text-2xl font-bold mb-2 text-white">
                  {option.name}
                </h3>
                <p className="text-gray-200">{option.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Choose Your Plan */}
        <motion.section
          className="max-w-6xl mx-auto px-4 py-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-4xl font-bold text-center mb-12 text-white"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Choose Your Plan
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Starter",
                price: "$100",
                features: ["5% Returns", "24/7 Support"],
              },
              {
                name: "Pro",
                price: "$500",
                features: ["8% Returns", "Premium Support", "Market Alerts"],
              },
              {
                name: "Elite",
                price: "$1000+",
                features: ["12% Returns", "VIP Support", "Personal Manager"],
              },
            ].map((plan, i) => (
              <motion.div
                key={i}
                className="p-8 rounded-lg border-2 text-center bg-white/10 backdrop-blur-sm cursor-pointer relative overflow-hidden group"
                style={{
                  borderColor:
                    selectedPlan === i
                      ? "rgba(168,85,247,0.8)"
                      : "rgba(255,255,255,0.3)",
                }}
                whileHover={{
                  y: -10,
                  backgroundColor: "rgba(255,255,255,0.15)",
                  borderColor: "rgba(168,85,247,0.8)",
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                viewport={{ once: true }}
                onClick={() => setSelectedPlan(i)}
              >
                <motion.div
                  className="absolute inset-0 bg-linear-to-r from-white/0 via-white/10 to-white/0"
                  animate={{ x: 300 }}
                  transition={{ repeat: Infinity, duration: 3 }}
                />
                <h3 className="text-2xl font-bold mb-2 text-white relative z-10">
                  {plan.name}
                </h3>
                <motion.p
                  className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-400 relative z-10"
                  animate={{ scale: selectedPlan === i ? 1.1 : 1 }}
                >
                  {plan.price}
                </motion.p>
                <ul className="space-y-2 mb-8 relative z-10">
                  {plan.features.map((f, j) => (
                    <motion.li
                      key={j}
                      className="text-gray-200"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: j * 0.1 }}
                    >
                      ✓ {f}
                    </motion.li>
                  ))}
                </ul>
                <motion.button
                  className="w-full py-3 rounded-lg font-bold text-white relative z-10 bg-linear-to-r from-purple-500 to-pink-500 border border-white/40"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Choose Plan
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Testimonials */}
        <motion.section
          className="max-w-6xl mx-auto px-4 py-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-4xl font-bold text-center mb-12 text-white"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            What Our Clients Say
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "John Doe",
                text: "Best investment platform! Doubled my portfolio.",
                rating: 5,
              },
              {
                name: "Jane Smith",
                text: "Professional team and excellent support.",
                rating: 5,
              },
              {
                name: "Mike Johnson",
                text: "Transparent, secure, and highly profitable.",
                rating: 5,
              },
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                className="p-6 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 cursor-pointer group"
                whileHover={{
                  y: -5,
                  backgroundColor: "rgba(255,255,255,0.15)",
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="flex gap-1 mb-4"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                >
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <motion.span
                      key={j}
                      className="text-xl"
                      animate={{ rotate: [0, 20, 0] }}
                      transition={{ delay: j * 0.1 }}
                    >
                      ⭐
                    </motion.span>
                  ))}
                </motion.div>
                <p className="text-gray-200 mb-4 italic">
                  "{testimonial.text}"
                </p>
                <p className="font-bold text-white">- {testimonial.name}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section
          className="max-w-4xl mx-auto px-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="bg-linear-to-r from-purple-600 to-pink-600 rounded-2xl p-12 text-center shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-4xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Ready to Start Investing?
            </motion.h2>
            <motion.p
              className="text-xl text-white/90 mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Join thousands of successful investors today
            </motion.p>
            <motion.button
              className="px-8 py-4 rounded-full font-bold text-lg bg-white text-purple-600 shadow-lg"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              Get Started Now
            </motion.button>
          </motion.div>
        </motion.section>
      </AnimatePresence>
    </div>
  );
};

export default Home;
