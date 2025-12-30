import React from "react";
import { AnimatePresence, easeOut, motion, spring } from "framer-motion";
import { CheckCircle, Lock, Shield, Eye } from "lucide-react";

const SecuritySection = () => {
  const features = [
    {
      icon: Shield,
      title: "Bank-Level Encryption",
      description:
        "Military-grade AES-256 encryption protects all your data and transactions.",
    },
    {
      icon: Lock,
      title: "Two-Factor Authentication",
      description:
        "Extra layer of security with optional biometric and SMS verification.",
    },
    {
      icon: Eye,
      title: "Real-Time Monitoring",
      description:
        "Our security team monitors all activity 24/7 to detect unusual patterns.",
    },
    {
      icon: CheckCircle,
      title: "FDIC Insured",
      description:
        "Your deposits are protected up to $250,000 by FDIC insurance.",
    },
  ];

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: easeOut },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const featureVariants = {
    hidden: {
      opacity: 0,
      x: -50,
      rotateY: -20,
    },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: {
        duration: 0.7,
        ease: easeOut,
      },
    },
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: spring,
        stiffness: 100,
        damping: 15,
        delay: 0.3,
      },
    },
    hover: { scale: 1.15, rotate: 10 },
  };

  const textVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: easeOut,
        delay: 0.35,
      },
    },
  };

  const complianceVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: easeOut,
        delay: 0.6,
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      <section
        id="security"
        className="py-20 px-6 bg-linear-to-b from-purple-900 to-slate-900"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={titleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-16"
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-white mb-4"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              Your Security is Our Priority
            </motion.h2>
            <motion.p
              className="text-center text-purple-200 text-lg max-w-2xl mx-auto"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, delay: 0.1 },
                },
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              Enterprise-grade security to keep your investments safe
            </motion.p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-8 mb-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={idx}
                  variants={featureVariants}
                  whileHover={{
                    y: -8,
                    borderColor: "rgba(168, 85, 247, 1)",
                    transition: { duration: 0.3 },
                  }}
                  className="bg-linear-to-br from-purple-800 to-slate-800 p-8 rounded-xl border border-purple-600 border-opacity-50 hover:border-opacity-100 transition flex gap-6"
                  style={{ perspective: 1000 }}
                >
                  <motion.div
                    className="shrink-0"
                    variants={iconVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    whileHover="hover"
                  >
                    <motion.div
                      className="w-14 h-14 bg-linear-to-br from-purple-600 to-purple-800 rounded-lg flex items-center justify-center"
                      whileHover={{
                        boxShadow: "0 0 20px rgba(168, 85, 247, 0.6)",
                      }}
                    >
                      <Icon size={28} className="text-purple-200" />
                    </motion.div>
                  </motion.div>

                  <motion.div
                    variants={textVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <h3 className="text-xl font-bold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-purple-100">{feature.description}</p>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            variants={complianceVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            whileHover={{
              boxShadow: "0 0 30px rgba(168, 85, 247, 0.3)",
              transition: { duration: 0.3 },
            }}
            className="bg-linear-to-r from-purple-800 to-slate-800 p-8 rounded-xl border border-purple-600 border-opacity-50 text-center"
          >
            <motion.p
              className="text-purple-100 text-lg mb-4"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { delay: 0.7, duration: 0.6 },
                },
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              We&lsquo;re compliant with SOC 2 Type II, ISO 27001, and follow
              all regulatory standards including SEC and FINRA requirements.
            </motion.p>
            <motion.p
              className="text-purple-300 text-sm"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { delay: 0.85, duration: 0.6 },
                },
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              Your trust is our most valuable asset. That&lsquo;s why we never
              compromise on security.
            </motion.p>
          </motion.div>
        </div>
      </section>
    </AnimatePresence>
  );
};

export default SecuritySection;
