import { BarChart3, Shield, TrendingUp, Zap } from 'lucide-react';
import React from 'react'
import { easeInOut, motion } from 'framer-motion';

const FeaturesSection = () => {
  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description: "Execute trades in milliseconds with our optimized platform infrastructure."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Bank-Level Security",
      description: "Your investments are protected with military-grade encryption and insurance."
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Real-Time Analytics",
      description: "Make informed decisions with live market data and AI-powered insights."
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Portfolio Growth",
      description: "Watch your wealth grow with personalized investment strategies."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easeInOut,
      },
    },
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -20 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.5,
        ease: easeInOut,
      },
    },
    hover: {
      scale: 1.1,
      rotate: 10,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <section id="features" className="py-20 px-6 bg-gradient-to-b from-slate-900 to-purple-900">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-center text-white mb-4"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Powerful Features
        </motion.h2>
        <motion.p 
          className="text-center text-purple-200 mb-16 text-lg max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Everything you need to invest like a professional
        </motion.p>

        <motion.div 
          className="grid md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, idx) => (
            <motion.div 
              key={idx}
              variants={itemVariants}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3 }
              }}
              className="bg-gradient-to-br from-purple-800 to-slate-800 p-8 rounded-xl border border-purple-600 border-opacity-50 hover:border-opacity-100 transition hover:shadow-2xl hover:shadow-purple-500/20 cursor-pointer"
            >
              <motion.div 
                className="text-purple-400 mb-4"
                variants={iconVariants}
                whileHover="hover"
              >
                {feature.icon}
              </motion.div>
              <motion.h3 
                className="text-xl font-bold text-white mb-3"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {feature.title}
              </motion.h3>
              <motion.p 
                className="text-purple-100"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {feature.description}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection