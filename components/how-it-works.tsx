"use client"

import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { MessageSquare, Cog, Rocket, TrendingUp, ArrowRight } from "lucide-react"

const steps = [
  {
    icon: MessageSquare,
    title: "Describe Your Vision",
    subtitle: "Natural Language Input",
    description:
      "Simply describe what you want your AI agent to accomplish using everyday language. Our advanced AI interpreter understands complex business logic, user workflows, and automation requirements.",
    features: ["Natural language processing", "Complex requirement analysis", "Automatic logic generation"],
    step: "01",
    color: "from-red-500 to-pink-500",
  },
  {
    icon: Cog,
    title: "Visual Flow Builder",
    subtitle: "Drag & Drop Interface",
    description:
      "Watch your agent come to life in our intuitive visual editor. Customize decision trees, add integrations, and fine-tune behavior with our no-code interface that's powerful enough for experts.",
    features: ["Visual workflow editor", "Pre-built integrations", "Real-time testing"],
    step: "02",
    color: "from-pink-500 to-purple-500",
  },
  {
    icon: Rocket,
    title: "Deploy to Blockchain",
    subtitle: "One-Click Deployment",
    description:
      "Launch your agent as a smart contract NFT with built-in tokenomics. Choose your blockchain, set pricing models, and enable decentralized governance - all with enterprise-grade security.",
    features: ["Multi-chain deployment", "Smart contract generation", "Tokenomics configuration"],
    step: "03",
    color: "from-purple-500 to-blue-500",
  },
  {
    icon: TrendingUp,
    title: "Earn & Scale",
    subtitle: "Automated Revenue",
    description:
      "Monitor performance with real-time analytics and earn automatically from usage fees, staking rewards, and marketplace transactions. Scale your agent empire with data-driven insights.",
    features: ["Real-time analytics", "Automated payments", "Performance optimization"],
    step: "04",
    color: "from-blue-500 to-cyan-500",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-32 px-8 md:px-16 lg:px-24 bg-black/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto relative">
        {/* Professional background overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-pink-500/5 rounded-3xl" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-3xl" />

        {/* Content wrapper with enhanced styling */}
        <div className="relative z-10 p-8 md:p-12 lg:p-16">
          {/* Enhanced Section Header */}
          <motion.div
            className="text-center mb-24"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-6xl md:text-7xl lg:text-8xl font-black text-white mb-8 tracking-tight"
              style={{
                background: "linear-gradient(135deg, #ffffff 0%, #f3f4f6 50%, #e5e7eb 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
                filter: "drop-shadow(0 0 30px rgba(239, 68, 68, 0.2))",
              }}
            >
              How It Works
            </motion.h2>
            <p className="text-2xl md:text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
              From concept to deployed Web3 AI agent in{" "}
              <span className="text-red-400 font-semibold">four simple steps</span>
            </p>
          </motion.div>

          {/* Enhanced Steps Grid */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Card className="bg-black/30 backdrop-blur-md border border-white/10 hover:border-red-500/30 transition-all duration-500 h-full overflow-hidden shine-effect">
                  <CardContent className="p-10">
                    {/* Step Number and Icon */}
                    <div className="flex items-center justify-between mb-8">
                      <motion.div
                        className={`bg-gradient-to-r ${step.color} rounded-2xl w-20 h-20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 backdrop-blur-md`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <step.icon className="w-10 h-10 text-white" />
                      </motion.div>
                      <div className="text-right">
                        <div className="text-6xl font-black text-white/30 leading-none">{step.step}</div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-3xl font-bold text-white mb-2">{step.title}</h3>
                        <p className="text-red-400 font-semibold text-lg">{step.subtitle}</p>
                      </div>

                      <p className="text-white text-lg leading-relaxed">{step.description}</p>

                      {/* Features List */}
                      <div className="space-y-3">
                        {step.features.map((feature, featureIndex) => (
                          <motion.div
                            key={featureIndex}
                            className="flex items-center text-white/80"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * featureIndex }}
                            viewport={{ once: true }}
                          >
                            <ArrowRight className="w-4 h-4 text-red-400 mr-3 flex-shrink-0" />
                            <span className="text-base">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            className="text-center mt-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-xl text-white mb-8">Ready to build your first AI agent?</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-10 py-4 rounded-full font-bold text-lg shadow-2xl"
            >
              Get Started Now
              <ArrowRight className="inline-block ml-2 w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
