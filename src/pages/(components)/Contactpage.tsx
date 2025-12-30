"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const Contactpage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: "", email: "", message: "" });
  };

  const faqs = [
    {
      q: "What is the minimum investment?",
      a: "The minimum investment is $100 for our Starter plan.",
    },
    {
      q: "How long does withdrawal take?",
      a: "Withdrawals are processed within 2-5 business days.",
    },
    {
      q: "Is my money safe?",
      a: "Yes, we use bank-level encryption and insurance protection.",
    },
    {
      q: "What are the fees?",
      a: "We charge a small 2% annual management fee on your portfolio.",
    },
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
        ease: "easeOut",
      },
    },
  };

  const inputVariants = {
    focus: {
      boxShadow: "0 0 0 3px rgba(168, 85, 247, 0.2)",
    },
  };

  return (
    <div className="bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 min-h-screen mt-18 space-y-16 pb-20 pt-12">
      <AnimatePresence>
        <motion.div
          className="max-w-4xl mx-auto px-4 text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.h1 className="text-5xl font-bold mb-4 text-white">
            Get in Touch
          </motion.h1>
          <motion.p
            className="text-xl text-purple-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            We'd love to hear from you. Reach out anytime.
          </motion.p>
        </motion.div>

        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8">
          {/* Form */}
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              className="bg-purple-800/30 backdrop-blur-md rounded-xl shadow-lg p-8 space-y-6 border border-purple-500/50"
              whileHover={{
                boxShadow: "0 20px 40px rgba(168, 85, 247, 0.2)",
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true }}
              >
                <label className="block text-sm font-semibold mb-3 text-purple-300">
                  Name
                </label>
                <motion.input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-purple-500/50 rounded-lg focus:outline-none bg-purple-900/30 text-white placeholder-purple-300/50 transition"
                  placeholder="Your name"
                  variants={inputVariants}
                  whileFocus="focus"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
                viewport={{ once: true }}
              >
                <label className="block text-sm font-semibold mb-3 text-purple-300">
                  Email
                </label>
                <motion.input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-purple-500/50 rounded-lg focus:outline-none bg-purple-900/30 text-white placeholder-purple-300/50 transition"
                  placeholder="your@email.com"
                  variants={inputVariants}
                  whileFocus="focus"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                <label className="block text-sm font-semibold mb-3 text-purple-300">
                  Message
                </label>
                <motion.textarea
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-purple-500/50 rounded-lg focus:outline-none h-32 bg-purple-900/30 text-white placeholder-purple-300/50 transition resize-none"
                  placeholder="Your message"
                  variants={inputVariants}
                  whileFocus="focus"
                />
              </motion.div>

              <motion.button
                onClick={handleSubmit}
                className="w-full py-3 rounded-lg font-bold text-white bg-linear-to-r from-purple-600 to-purple-700 relative overflow-hidden group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
                viewport={{ once: true }}
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
                <span className="relative z-10">Send Message</span>
              </motion.button>

              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -10 }}
                    className="flex items-center gap-2 text-green-400 font-semibold"
                  >
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      ✓
                    </motion.span>
                    Message sent successfully!
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>

          {/* Contact Info Card */}
          <motion.div
            className="bg-purple-800/30 backdrop-blur-md rounded-xl shadow-lg p-8 border border-purple-500/50"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
            whileHover={{
              boxShadow: "0 20px 40px rgba(168, 85, 247, 0.2)",
              y: -5,
            }}
          >
            <motion.h3
              className="text-2xl font-bold mb-6 text-purple-300"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              Contact Info
            </motion.h3>
            <div className="space-y-6">
              {[
                { title: "Email", value: "hello@trademark.com" },
                { title: "Phone", value: "+1 (800) 123-4567" },
                {
                  title: "Address",
                  value: "123 Investment Ave, Financial City, FC 12345",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <p className="font-semibold mb-2 text-purple-300">
                    {item.title}
                  </p>
                  <p className="text-purple-100">{item.value}</p>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
              >
                <p className="font-semibold mb-2 text-purple-300">Hours</p>
                <p className="text-purple-100">Mon - Fri: 9am - 6pm</p>
                <p className="text-purple-100">Sat - Sun: 10am - 4pm</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* FAQ */}
        <motion.section
          className="max-w-4xl mx-auto px-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2
            className="text-4xl font-bold mb-8 text-center text-white"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Frequently Asked Questions
          </motion.h2>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                className="bg-purple-800/30 backdrop-blur-md rounded-lg shadow-md overflow-hidden border border-purple-500/50"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{
                  borderColor: "rgba(168, 85, 247, 1)",
                }}
              >
                <motion.button
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  className="w-full p-4 text-left font-semibold flex justify-between items-center text-white hover:bg-purple-700/20 transition-colors"
                  whileHover={{ paddingLeft: 20 }}
                >
                  {faq.q}
                  <motion.span
                    animate={{ rotate: expandedFaq === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-purple-400 font-bold"
                  >
                    {expandedFaq === i ? "−" : "+"}
                  </motion.span>
                </motion.button>

                <AnimatePresence>
                  {expandedFaq === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-4 pb-4 text-purple-100 bg-purple-900/20 border-t border-purple-500/30"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </AnimatePresence>
    </div>
  );
};
export default Contactpage;
