
import { ArrowRight, DollarSign, TrendingUp, Users } from 'lucide-react';
import { easeInOut, easeOut, motion } from 'framer-motion';
import { useRouter } from 'next/router';

const HeroSection = () => {
  const statVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i:any) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5 + i * 0.1,
        duration: 0.6,
        ease: easeInOut,
      },
    }),
  };

  const numberVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: easeOut,
      },
    },
  };

  const router = useRouter()

  return (
    <section style={{backgroundImage: `url("/geometrybg.jpg")` ,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',}} className="min-h-screen  pt-20 px-6 flex items-center justify-center">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div 
          className="mb-8 mt-4 inline-block px-4 py-2 bg-purple-800 rounded-full border border-purple-600"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-purple-300 text-sm font-semibold">Welcome to Smart Investing</span>
        </motion.div>

        <motion.h1 
          className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Grow Your Wealth with <span className="text-purple-400">Confidence</span>
        </motion.h1>

        <motion.p 
          className="sm:text-xl text-[16px] text-purple-100 mb-8 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Intelligent investment strategies powered by AI. Start with as little as $10 and watch your portfolio flourish with real-time insights and expert guidance.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.button 
          onClick={()=> router.push("/auth/register")}
            className="bg-purple-600 hover:bg-purple-500 flex gap-1.5 items-center justify-center cursor-pointer text-white px-8 py-4 rounded-lg font-bold text-lg transition"
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(168, 85, 247, 0.5)" }}
            whileTap={{ scale: 0.95 }}
          >
            Start Investing Today
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </motion.button>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 text-left"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {[
            { icon: Users, label: "Total Users", value: "250K+" },
            { icon: DollarSign, label: "Assets Managed", value: "$2.5B" },
            { icon: TrendingUp, label: "Avg. Return", value: "18.5%" }
          ].map((stat, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={statVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ 
                y: -8,
                boxShadow: "0 20px 30px rgba(168, 85, 247, 0.2)",
                transition: { duration: 0.3 }
              }}
              className="bg-purple-800 bg-opacity-40 backdrop-blur-md p-4 flex flex-col items-center justify-center gap-1 rounded-lg border border-purple-600 border-opacity-30 cursor-pointer"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
              >
                <stat.icon className='text-purple-200 w-6 h-6' />
              </motion.div>
              <p className="text-purple-300 text-sm">{stat.label}</p>
              <motion.p 
                className="text-3xl font-bold text-white"
                variants={numberVariants}
              >
                {stat.value}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection