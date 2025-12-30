import React from "react";
import { AnimatePresence, easeOut, motion, spring } from "framer-motion";
import { Star } from "lucide-react";

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      title: "Entrepreneur",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      quote:
        "I've tripled my investment returns in just 8 months. The AI strategies are incredibly smart and easy to understand.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      title: "Software Engineer",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      quote:
        "The platform is so intuitive. I love how I can monitor everything from my phone and the insights are always on point.",
      rating: 5,
    },
    {
      name: "Emma Rodriguez",
      title: "Marketing Manager",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      quote:
        "Finally, an investment app that doesn't feel intimidating. The zero-fee structure saved me hundreds already.",
      rating: 5,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: easeOut },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: -10,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.7,
        ease: easeOut,
      },
    },
  };

  const imageVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: spring,
        stiffness: 100,
        damping: 15,
        delay: 0.3,
      },
    },
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

  const starsVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.45,
      },
    },
  };

  const starVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: spring,
        stiffness: 120,
        damping: 12,
      },
    },
  };

  const quoteVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easeOut,
        delay: 0.55,
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      <section
        id="testimonials"
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
              What Our Users Say
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
              Join thousands of investors who are already growing their wealth
            </motion.p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={idx}
                variants={cardVariants}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="bg-linear-to-br from-purple-800 to-slate-800 p-6 rounded-xl border border-purple-600 border-opacity-50 hover:border-opacity-100 transition"
                style={{ perspective: 1000 }}
              >
                <motion.div
                  className="flex items-center gap-4 mb-6"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    visible: { transition: { staggerChildren: 0.1 } },
                  }}
                >
                  <motion.img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-purple-500"
                    variants={imageVariants}
                    whileHover={{ scale: 1.15, transition: { duration: 0.3 } }}
                  />
                  <motion.div variants={textVariants}>
                    <h3 className="text-white font-bold text-lg">
                      {testimonial.name}
                    </h3>
                    <p className="text-purple-300 text-sm">
                      {testimonial.title}
                    </p>
                  </motion.div>
                </motion.div>

                <motion.div
                  className="flex gap-1 mb-4"
                  variants={starsVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div key={i} variants={starVariants}>
                      <Star
                        size={18}
                        className="fill-yellow-400 text-yellow-400"
                      />
                    </motion.div>
                  ))}
                </motion.div>

                <motion.p
                  className="text-purple-100 italic"
                  variants={quoteVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {testimonial.quote}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </AnimatePresence>
  );
};

export default TestimonialsSection;
