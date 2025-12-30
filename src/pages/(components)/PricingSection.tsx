"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Starter",
      description: "Perfect for beginners",
      price: { monthly: 0, annual: 0 },
      features: [
        "Up to $10,000 in investments",
        "Basic portfolio analytics",
        "Email support",
        "Limited AI insights",
        "Mobile app access",
      ],
      cta: "Start Free",
      highlighted: false,
    },
    {
      name: "Pro",
      description: "For active investors",
      price: { monthly: 9.99, annual: 99.99 },
      features: [
        "Unlimited investments",
        "Advanced analytics & reports",
        "Priority email & chat support",
        "AI-powered recommendations",
        "Tax-loss harvesting",
        "Automated rebalancing",
      ],
      cta: "Start 7-Day Trial",
      highlighted: true,
    },
    {
      name: "Elite",
      description: "For serious traders",
      price: { monthly: 29.99, annual: 299.99 },
      features: [
        "Everything in Pro",
        "24/7 dedicated support",
        "Advanced charting tools",
        "API access",
        "Custom portfolios",
        "Exclusive market insights",
        "VIP events & webinars",
      ],
      cta: "Start 7-Day Trial",
      highlighted: false,
    },
  ];

  return (
    <AnimatePresence>
      <section
        id="pricing"
        className="py-20 px-6 bg-linear-to-b from-purple-900 to-slate-900"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-center text-purple-200 text-lg max-w-2xl mx-auto mb-8">
              Choose the perfect plan for your investing needs
            </p>

            {/* Toggle Switch */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex justify-center items-center gap-4"
            >
              <span
                className={`text-lg font-semibold ${
                  !isAnnual ? "text-white" : "text-purple-300"
                }`}
              >
                Monthly
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className="relative w-16 h-8 bg-purple-600 rounded-full transition focus:outline-none"
              >
                <motion.div
                  layout
                  className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full"
                  animate={{ x: isAnnual ? 32 : 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </button>
              <span
                className={`text-lg font-semibold ${
                  isAnnual ? "text-white" : "text-purple-300"
                }`}
              >
                Annual
              </span>
              {isAnnual && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-green-400 font-bold ml-2 text-sm"
                >
                  Save 17%
                </motion.span>
              )}
            </motion.div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 + idx * 0.15 }}
                whileHover={
                  plan.highlighted ? { scale: 1.05 } : { scale: 1.02 }
                }
                className={`relative rounded-2xl p-8 border transition ${
                  plan.highlighted
                    ? "bg-linear-to-br from-purple-600 to-purple-800 border-purple-400 shadow-2xl shadow-purple-500/50"
                    : "bg-linear-to-br from-purple-800 to-slate-800 border-purple-600 border-opacity-50"
                }`}
              >
                {plan.highlighted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-linear-to-r from-purple-400 to-pink-400 text-slate-900 px-4 py-1 rounded-full text-sm font-bold"
                  >
                    MOST POPULAR
                  </motion.div>
                )}

                <h3 className="text-2xl font-bold text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-purple-200 text-sm mb-6">
                  {plan.description}
                </p>

                <motion.div layout className="mb-6">
                  <span className="text-5xl font-bold text-white">
                    $
                    {isAnnual
                      ? (plan.price.annual / 12).toFixed(2)
                      : plan.price.monthly}
                  </span>
                  <span className="text-purple-300 text-sm">/month</span>
                  {isAnnual && plan.price.annual > 0 && (
                    <p className="text-purple-200 text-xs mt-2">
                      Billed ${plan.price.annual} annually
                    </p>
                  )}
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-3 rounded-lg font-bold mb-8 transition ${
                    plan.highlighted
                      ? "bg-white text-purple-600 hover:bg-purple-100"
                      : "bg-purple-500 text-white hover:bg-purple-400"
                  }`}
                >
                  {plan.cta}
                </motion.button>

                <div className="space-y-4">
                  {plan.features.map((feature, featureIdx) => (
                    <motion.div
                      key={featureIdx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.2 + featureIdx * 0.05,
                      }}
                      className="flex items-start gap-3"
                    >
                      <motion.span
                        className="text-green-400 font-bold mt-1"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: featureIdx * 0.1,
                        }}
                      >
                        ✓
                      </motion.span>
                      <span className="text-purple-100 text-sm">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="text-center mt-16 text-purple-200"
          >
            <p>
              All plans include 7-day free trial. No credit card required.
              Cancel anytime.
            </p>
          </motion.div>
        </div>
      </section>
    </AnimatePresence>
  );
};

export default PricingSection;
