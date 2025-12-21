"use client"

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react'

const Contactpage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const handleSubmit = (e:any) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', message: '' });
  };

  const faqs = [
    { q: 'What is the minimum investment?', a: 'The minimum investment is $100 for our Starter plan.' },
    { q: 'How long does withdrawal take?', a: 'Withdrawals are processed within 2-5 business days.' },
    { q: 'Is my money safe?', a: 'Yes, we use bank-level encryption and insurance protection.' },
    { q: 'What are the fees?', a: 'We charge a small 2% annual management fee on your portfolio.' },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 min-h-screen space-y-16 pb-20 pt-12">
        <AnimatePresence>
      <motion.div
        className="max-w-4xl mx-auto px-4 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-5xl font-bold mb-4 text-white" style={{ color: '#5a189a' }}>
          Get in Touch
        </h1>
        <p className="text-xl text-gray-300">We'd love to hear from you. Reach out anytime.</p>
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8">
        {/* Form */}
        <motion.div
          className="md:col-span-2"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div
            className="bg-white/10 backdrop-blur-sm rounded-lg shadow-lg p-8 space-y-6 border border-white/20"
          >
            <div>
              <label className="block text-sm font-semibold mb-2 text-white">Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none bg-white/5 text-white placeholder-gray-400"
                style={{ borderColor: '#5a189a' }}
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-white">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none bg-white/5 text-white placeholder-gray-400"
                style={{ borderColor: '#5a189a' }}
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-white">Message</label>
              <textarea
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none h-32 bg-white/5 text-white placeholder-gray-400"
                style={{ borderColor: '#5a189a' }}
                placeholder="Your message"
              />
            </div>
            <motion.button
              onClick={handleSubmit}
              className="w-full py-3 rounded-lg font-bold text-white"
              style={{ backgroundColor: '#5a189a' }}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.02 }}
            >
              Send Message
            </motion.button>
            {submitted && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-green-400 font-semibold"
              >
                ✓ Message sent successfully!
              </motion.p>
            )}
          </div>
        </motion.div>

        {/* Contact Info Card */}
        <motion.div
          className="bg-white/10 backdrop-blur-sm rounded-lg shadow-lg p-8 border border-white/20"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-6 text-[#a143ff]" >
            Contact Info
          </h3>
          <div className="space-y-6">
            <div>
              <p className="font-semibold mb-2 text-white">Email</p>
              <p className="text-gray-300">hello@trademark.com</p>
            </div>
            <div>
              <p className="font-semibold mb-2 text-white">Phone</p>
              <p className="text-gray-300">+1 (800) 123-4567</p>
            </div>
            <div>
              <p className="font-semibold mb-2 text-white">Address</p>
              <p className="text-gray-300">123 Investment Ave, Financial City, FC 12345</p>
            </div>
            <div>
              <p className="font-semibold mb-2 text-white">Hours</p>
              <p className="text-gray-300">Mon - Fri: 9am - 6pm</p>
              <p className="text-gray-300">Sat - Sun: 10am - 4pm</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* FAQ */}
      <motion.section
        className="max-w-4xl mx-auto px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-[#a143ff]">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              className="bg-white/10 backdrop-blur-sm rounded-lg shadow-md overflow-hidden border border-white/20"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <button
                onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                className="w-full p-4 text-left font-semibold flex justify-between items-center text-white hover:bg-white/5 transition-colors"
              >
                {faq.q}
                <span>{expandedFaq === i ? '−' : '+'}</span>
              </button>
                {expandedFaq === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-4 pb-4 text-gray-300 bg-white/5"
                  >
                    {faq.a}
                  </motion.div>
                )}
              
            </motion.div>
          ))}
        </div>
      </motion.section>
      </AnimatePresence>
    </div>
  );
};
export default Contactpage