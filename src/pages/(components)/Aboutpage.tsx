"use client";

import { motion, AnimatePresence, easeOut } from "framer-motion";
import Image from "next/image";

const Aboutpage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
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
        ease: easeOut,
      },
    },
  };

  const sectionLeftVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: easeOut },
    },
  };

  const sectionRightVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: easeOut },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.7, ease: easeOut },
    },
  };

  return (
    <div className="bg-linear-to-br from-slate-900 mt-18 via-purple-900 to-slate-900 min-h-screen space-y-16 pb-20 pt-12">
      <AnimatePresence>
        <motion.div
          className="max-w-4xl mx-auto px-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.h1 className="text-5xl font-bold mb-12 text-center text-white">
            About TradeMark
          </motion.h1>
        </motion.div>

        {/* Mission */}
        <motion.section
          className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row justify-between gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div
            className="bg-purple-800/30 backdrop-blur-md w-full lg:w-[49%] rounded-xl shadow-lg p-8 border-l-4 border-purple-400"
            variants={sectionLeftVariants}
            whileHover={{
              boxShadow: "0 20px 40px rgba(168, 85, 247, 0.3)",
              y: -5,
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.h2
              className="text-4xl font-bold mb-4 text-white"
              variants={itemVariants}
            >
              Our Mission
            </motion.h2>
            <motion.p
              className="text-purple-100 text-[18px] leading-relaxed"
              variants={itemVariants}
            >
              At TradeMark, our mission is to democratize investment
              opportunities for everyone. We believe that financial growth
              should be accessible, transparent, and secure for all individuals,
              regardless of their experience level. We're committed to providing
              innovative investment solutions that empower our clients to build
              lasting wealth and achieve their financial goals.
            </motion.p>
          </motion.div>

          <motion.div
            className="w-full lg:w-[49%] h-[300px] bg-gray-600 rounded-xl relative overflow-hidden"
            variants={imageVariants}
            whileHover={{ scale: 1.02 }}
          >
            <Image
              src="/vision.jpg"
              alt="TradeMark Vision"
              fill
              className="object-cover rounded-xl cursor-pointer hover:opacity-80 transition"
            />
          </motion.div>
        </motion.section>

        {/* Vision */}
        <motion.section
          className="max-w-7xl mx-auto px-4 flex flex-col-reverse lg:flex-row justify-between gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div
            className="w-full lg:w-[49%] h-[300px] bg-gray-600 rounded-xl relative overflow-hidden"
            variants={imageVariants}
            whileHover={{ scale: 1.02 }}
          >
            <Image
              src="/mission.jpg"
              alt="TradeMark Mission"
              fill
              className="object-cover rounded-xl cursor-pointer hover:opacity-80 transition"
            />
          </motion.div>

          <motion.div
            className="bg-purple-700/40 backdrop-blur-md w-full lg:w-[49%] rounded-xl shadow-lg p-8 border-r-4 border-purple-400"
            variants={sectionRightVariants}
            whileHover={{
              boxShadow: "0 20px 40px rgba(168, 85, 247, 0.3)",
              y: -5,
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.h2
              className="text-4xl font-bold mb-4 text-white"
              variants={itemVariants}
            >
              Our Vision
            </motion.h2>
            <motion.p
              className="text-purple-100 text-lg leading-relaxed"
              variants={itemVariants}
            >
              We envision a world where every individual has the knowledge,
              tools, and confidence to make informed investment decisions. By
              combining cutting-edge technology with expert financial guidance,
              we aim to be the most trusted and innovative investment platform
              globally. Our vision extends to creating a community of
              financially literate and successful investors.
            </motion.p>
          </motion.div>
        </motion.section>

        {/* Core Values */}
        <motion.section
          className="max-w-6xl mx-auto px-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.h2
            className="text-4xl font-bold mb-12 text-center text-white"
            variants={itemVariants}
          >
            Core Values
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Integrity",
                desc: "We operate with honesty and transparency in all our dealings.",
              },
              {
                title: "Innovation",
                desc: "We constantly evolve to provide the best investment solutions.",
              },
              {
                title: "Security",
                desc: "Your financial safety and data protection is our top priority.",
              },
              {
                title: "Customer First",
                desc: "Every decision we make is guided by our clients' best interests.",
              },
            ].map((value, i) => (
              <motion.div
                key={i}
                className="p-6 rounded-lg bg-purple-800/30 backdrop-blur-md border border-purple-500/50"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      delay: i * 0.15,
                      duration: 0.6,
                      ease: "easeOut",
                    },
                  },
                }}
                whileHover={{
                  y: -8,
                  boxShadow: "0 15px 30px rgba(168, 85, 247, 0.2)",
                  borderColor: "rgba(168, 85, 247, 1)",
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.h3
                  className="text-2xl font-bold mb-3 text-purple-300"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: i * 0.15 + 0.3, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  {value.title}
                </motion.h3>
                <motion.p
                  className="text-purple-100"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: i * 0.15 + 0.4, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  {value.desc}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </AnimatePresence>
    </div>
  );
};

export default Aboutpage;
