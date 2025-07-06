"use client"

import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Brain, Zap, Shield, Users, Coins, Globe, CheckCircle, TrendingUp } from "lucide-react"
import SpotlightCard from "./spotlight-card"

const features = [
  {
    icon: Brain,
    title: "AI-Powered Creation",
    subtitle: "Advanced Natural Language Processing",
    description:
      "Transform complex business requirements into sophisticated agent logic using cutting-edge AI that understands context, nuance, and industry-specific workflows.",
    benefits: [
      "99% accuracy in requirement interpretation",
      "Supports 50+ programming languages",
      "Industry-specific templates",
    ],
    value: "Save 80% development time",
    color: "from-red-500 to-pink-500",
  },
  {
    icon: Zap,
    title: "Lightning Deployment",
    subtitle: "Multi-Chain Infrastructure",
    description:
      "Deploy to Ethereum, Polygon, Solana, and 15+ other blockchains instantly. Our optimized infrastructure ensures 99.9% uptime with sub-second response times.",
    benefits: ["Deploy to 15+ blockchains", "99.9% uptime guarantee", "Global CDN distribution"],
    value: "Launch in under 5 minutes",
    color: "from-pink-500 to-purple-500",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    subtitle: "Bank-Grade Protection",
    description:
      "Built on zero-trust architecture with end-to-end encryption, multi-sig wallets, and smart contract audits by leading security firms. SOC 2 Type II compliant.",
    benefits: ["Zero-trust architecture", "Multi-sig wallet integration", "Smart contract audits"],
    value: "Enterprise-grade security",
    color: "from-purple-500 to-blue-500",
  },
  {
    icon: Users,
    title: "DAO Governance",
    subtitle: "Decentralized Decision Making",
    description:
      "Enable community-driven governance with token-weighted voting, proposal systems, and automated execution. Build truly decentralized autonomous organizations.",
    benefits: ["Token-weighted voting", "Automated proposal execution", "Community treasury management"],
    value: "True decentralization",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Coins,
    title: "DeFi Integration",
    subtitle: "Automated Revenue Streams",
    description:
      "Built-in yield farming, staking protocols, and automated market makers. Generate passive income through liquidity provision and token appreciation.",
    benefits: ["Automated yield farming", "Staking rewards up to 15% APY", "AMM integration"],
    value: "Earn while you sleep",
    color: "from-cyan-500 to-green-500",
  },
  {
    icon: Globe,
    title: "Global Marketplace",
    subtitle: "Monetize Your Creations",
    description:
      "Access a curated marketplace with millions of users. List your agents, set pricing models, and earn royalties on every transaction with built-in analytics.",
    benefits: ["Access to 2M+ users", "Automated royalty distribution", "Advanced analytics dashboard"],
    value: "Unlimited earning potential",
    color: "from-green-500 to-yellow-500",
  },
]

export function Features() {
  return (
    <section id="features" className="py-32 px-8 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
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
            Web3 Features
          </motion.h2>
          <p className="text-2xl md:text-3xl text-gray-300 max-w-5xl mx-auto leading-relaxed font-light">
            Everything you need to build, deploy, and{" "}
            <span className="text-red-400 font-semibold">monetize AI agents</span> on the blockchain
          </p>
        </motion.div>

        {/* Enhanced Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -15, scale: 1.02 }}
              className="group"
            >
              <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 229, 255, 0.2)">
                <CardContent className="p-8">
                  {/* Icon and Value Proposition */}
                  <div className="flex items-start justify-between mb-6">
                    <motion.div
                      className={`bg-gradient-to-r ${feature.color} rounded-xl w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <feature.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <div className="text-right">
                      <div className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm font-semibold">
                        {feature.value}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{feature.title}</h3>
                      <p className="text-red-400 font-semibold">{feature.subtitle}</p>
                    </div>

                    <p className="text-gray-300 leading-relaxed">{feature.description}</p>

                    {/* Benefits List */}
                    <div className="space-y-3">
                      {feature.benefits.map((benefit, benefitIndex) => (
                        <motion.div
                          key={benefitIndex}
                          className="flex items-center text-gray-400"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * benefitIndex }}
                          viewport={{ once: true }}
                        >
                          <CheckCircle className="w-4 h-4 text-green-400 mr-3 flex-shrink-0" />
                          <span className="text-sm">{benefit}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Performance Indicator */}
                    <div className="flex items-center text-green-400 pt-4 border-t border-white/10">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      <span className="text-sm font-semibold">Proven Results</span>
                    </div>
                  </div>
                </CardContent>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

        {/* Enhanced CTA Section */}
        <motion.div
          className="text-center mt-24 p-12 bg-gradient-to-r from-red-500/10 to-pink-600/10 rounded-3xl border border-red-500/20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="text-4xl font-bold text-white mb-4">Ready to revolutionize your workflow?</h3>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of creators already building the future of AI automation on Web3
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-12 py-4 rounded-full font-bold text-lg shadow-2xl"
          >
            Start Building Today
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
