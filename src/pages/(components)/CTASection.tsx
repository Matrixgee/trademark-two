"use client"
import { easeOut, motion } from 'framer-motion';
import { useRouter } from 'next/router';

const CTASection = () => {
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

  const router = useRouter()

  return (
    <section className="py-20 px-6 bg-gradient-to-r from-purple-900 via-purple-800 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute top-10 left-10 w-32 h-32 bg-purple-500 rounded-full opacity-10 blur-3xl"
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-40 h-40 bg-purple-400 rounded-full opacity-10 blur-3xl"
        animate={{
          y: [0, 30, 0],
          x: [0, -30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div 
        className="max-w-4xl mx-auto text-center relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-white mb-6"
          variants={itemVariants}
        >
          Ready to Start Your Investment Journey?
        </motion.h2>

        <motion.p 
          className="text-xl text-purple-200 mb-8 max-w-2xl mx-auto"
          variants={itemVariants}
        >
          Join thousands of investors who are already building wealth with Trademark. Get started in minutes.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center"
          variants={itemVariants}
        >
          <motion.button 
            className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition relative overflow-hidden group"
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
          >
            {/* Shimmer effect */}
            <motion.div
              onClick={()=> router.push("/auth")}
              className="absolute inset-0 cursor-pointer bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
              initial={{ x: "-100%" }}
              whileHover={{
                x: "100%",
                opacity: 0.3,
              }}
              transition={{
                duration: 0.6,
              }}
            />
            <span className="relative z-10 flex items-center justify-center">
              Create An Account
            </span>
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CTASection