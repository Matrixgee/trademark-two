import React from "react";
import { easeOut, motion } from "framer-motion";

const BenefitsSection = () => {
  const benefits = [
    "Zero hidden fees or commissions",
    "24/7 customer support via AI assistant",
    "Fractional shares starting at $1",
    "Tax-loss harvesting built-in",
    "Socially responsible investing options",
  ];

  const benefitVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: any) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.1 + i * 0.1,
        duration: 0.5,
        ease: easeOut,
      },
    }),
  };

  const checkmarkVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.5,
        ease: easeOut,
      },
    },
  };

  const portfolioVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: easeOut,
      },
    },
  };

  const progressVariants = {
    hidden: { scaleX: 0, transformOrigin: "left" },
    visible: (delay: any) => ({
      scaleX: 1,
      transition: {
        delay,
        duration: 0.8,
        ease: easeOut,
      },
    }),
  };

  const counterVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section
      id="benefits"
      className="py-20 px-6 bg-linear-to-b from-purple-900 to-slate-900"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <motion.h2
              className="text-4xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Why Choose Trademark?
            </motion.h2>
            <ul className="space-y-4">
              {benefits.map((benefit, idx) => (
                <motion.li
                  key={idx}
                  custom={idx}
                  variants={benefitVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  className="flex items-center gap-3"
                >
                  <motion.div
                    className="w-6 h-6 bg-purple-400 rounded-full flex items-center justify-center flex-shrink-0"
                    variants={checkmarkVariants}
                  >
                    <span className="text-purple-900 font-bold">✓</span>
                  </motion.div>
                  <span className="text-lg text-purple-100">{benefit}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <motion.div
            className="bg-linear-to-br from-purple-700 to-purple-900 rounded-2xl p-8 border border-purple-500 border-opacity-50"
            variants={portfolioVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{
              y: -8,
              boxShadow: "0 20px 40px rgba(168, 85, 247, 0.3)",
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-purple-800 bg-opacity-50 rounded-lg p-6 mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <p className="text-purple-300 text-sm">Sample Portfolio</p>
              <motion.p
                className="text-4xl font-bold text-white mt-2"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                $24,532
              </motion.p>
              <motion.p
                className="text-green-400 text-sm mt-1 font-semibold"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                +12.5% this month
              </motion.p>
            </motion.div>

            <div className="space-y-4 text-sm">
              {[
                {
                  label: "Stocks",
                  percentage: 45,
                  color: "bg-purple-400",
                  delay: 0.3,
                },
                {
                  label: "ETFs",
                  percentage: 35,
                  color: "bg-purple-300",
                  delay: 0.4,
                },
                {
                  label: "Bonds",
                  percentage: 20,
                  color: "bg-purple-500",
                  delay: 0.5,
                },
              ].map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-purple-100 mb-2">
                    <span>{item.label}</span>
                    <motion.span
                      variants={counterVariants}
                      initial="hidden"
                      whileInView="visible"
                      transition={{ duration: 0.5, delay: item.delay + 0.2 }}
                      viewport={{ once: true }}
                    >
                      {item.percentage}%
                    </motion.span>
                  </div>
                  <div className="w-full bg-purple-900 rounded-full h-2 overflow-hidden">
                    <motion.div
                      custom={item.delay}
                      variants={progressVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className={`${item.color} h-2 rounded-full`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
