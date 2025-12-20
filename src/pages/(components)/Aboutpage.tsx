"use client"

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Aboutpage = () => {

  const router = useRouter()
  return (
    <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 min-h-screen space-y-16 pb-20 pt-12">
<AnimatePresence>
          <motion.div
        className="max-w-4xl mx-auto px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-5xl font-bold mb-12 text-center text-white">
          About TradeMark
        </h1>
      </motion.div>

      {/* Mission */}
      <motion.section
        className="max-w-7xl mx-auto px-4 flex justify-between"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="bg-white/10 w-[49%] backdrop-blur-sm rounded-lg shadow-lg p-8 border-l-4 border-white/20" style={{ borderLeftColor: '#5a189a' }}>
          <h2 className="text-4xl font-bold mb-4 text-white">
            Our Mission
          </h2>
          <p className="text-gray-200  text-[18px] leading-relaxed">
            At TradeMark, our mission is to democratize investment opportunities for everyone. We believe
            that financial growth should be accessible, transparent, and secure for all individuals,
            regardless of their experience level. We're committed to providing innovative investment
            solutions that empower our clients to build lasting wealth and achieve their financial goals.
          </p>
        </div>
        
        <div className="w-[49%] h-[300px] bg-gray-300 rounded-lg relative overflow-hidden">
  <Image
    src="/vision.jpg"
    alt="TradeMark"
    fill
    onClick={() => router.push('/')}
    className="cursor-pointer object-cover rounded-lg"
  />
</div>
      </motion.section>

      {/* Vision */}
      <motion.section
        className="max-w-7xl mx-auto px-4 flex justify-between"
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="w-[49%] h-[300px] bg-gray-300 rounded-lg relative overflow-hidden">
  <Image
    src="/mission.jpg"
    alt="TradeMark"
    fill
    onClick={() => router.push('/')}
    className="cursor-pointer object-cover rounded-lg"
  />
</div>
        <div className="bg-white w-[49%] rounded-lg shadow-lg p-8 border-r-4" style={{ borderColor: '#5a189a' }}>
          <h2 className="text-3xl font-bold mb-4" style={{ color: '#5a189a' }}>
            Our Vision
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            We envision a world where every individual has the knowledge, tools, and confidence to make
            informed investment decisions. By combining cutting-edge technology with expert financial
            guidance, we aim to be the most trusted and innovative investment platform globally. Our vision
            extends to creating a community of financially literate and successful investors.
          </p>
        </div>
      </motion.section>

      {/* Core Values */}
      <motion.section
        className="max-w-6xl mx-auto px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-white">
          Core Values
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            { title: 'Integrity', desc: 'We operate with honesty and transparency in all our dealings.' },
            { title: 'Innovation', desc: 'We constantly evolve to provide the best investment solutions.' },
            { title: 'Security', desc: 'Your financial safety and data protection is our top priority.' },
            { title: 'Customer First', desc: 'Every decision we make is guided by our clients\' best interests.' },
          ].map((value, i) => (
            <motion.div
              key={i}
              className="p-6 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-2 text-[#d1abf7]">
                {value.title}
              </h3>
              <p className="text-gray-300">{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
</AnimatePresence>
    </div>
  );
};

export default Aboutpage