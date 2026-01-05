import { AnimatePresence, motion } from "framer-motion";
import { ChartNoAxesCombined, Goal, KeyRound, Wallet } from "lucide-react";

const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: "01",
      title: "Create Your Account",
      description:
        "Sign up in minutes with just your email and basic information. Secure and verified instantly.",
      icon: <KeyRound className="w-9 h-9 text-purple-400" />,
    },
    {
      number: "02",
      title: "Fund Your Wallet",
      description:
        "Link your bank account or deposit funds. We support all major payment methods with zero fees.",
      icon: <Wallet className="w-9 h-9 text-purple-400" />,
    },
    {
      number: "03",
      title: "Choose Your Strategy",
      description:
        "Select from AI-powered portfolios or create your own investment mix. Customize to your goals.",
      icon: <Goal className="w-9 h-9 text-purple-400" />,
    },
    {
      number: "04",
      title: "Watch It Grow",
      description:
        "Monitor your investments in real-time with detailed analytics and get smart notifications.",
      icon: <ChartNoAxesCombined className="w-9 h-9 text-purple-400" />,
    },
  ];

  return (
    <AnimatePresence>
      <section
        id="howItWorks"
        className="py-20 px-6 bg-linear-to-b from-slate-900 to-purple-900"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-center text-purple-200 text-lg max-w-2xl mx-auto">
              Get started in 4 simple steps
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 + idx * 0.15 }}
                className="relative"
              >
                {/* Connecting Line */}
                {idx < steps.length - 1 && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 + idx * 0.15 }}
                    className="hidden md:block absolute top-16 left-1/2 w-full h-1 bg-linear-to-r from-purple-500 to-transparent origin-left"
                    style={{ width: "100%", marginLeft: "50%" }}
                  />
                )}

                <motion.div
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="bg-linear-to-br from-purple-800 to-slate-800 p-6 rounded-xl border border-purple-600 border-opacity-50 hover:border-opacity-100 transition relative z-10"
                >
                  <motion.div
                    className="text-5xl mb-4"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {step.icon}
                  </motion.div>

                  <div className="absolute -top-6 right-6 bg-linear-to-r from-purple-500 to-purple-600 w-12 h-12 rounded-full flex items-center justify-center border-4 border-slate-900">
                    <span className="text-white font-bold text-lg">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-purple-100">{step.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </AnimatePresence>
  );
};

export default HowItWorks;
