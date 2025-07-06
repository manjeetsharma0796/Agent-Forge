"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, Bot, Play, Zap } from "lucide-react"
import { MiniScreen } from "@/components/mini-screen"

export function Hero() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-8 md:px-16 lg:px-24 text-center relative">
      <div className="max-w-7xl mx-auto w-full">
        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-red-400 to-pink-500 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, Math.random() * 30 - 15, 0],
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: Math.random() * 4 + 4,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Enhanced Icon */}
        <motion.div
          initial={{ scale: 0, rotateY: -180 }}
          animate={{ scale: 1, rotateY: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="flex items-center justify-center mb-12"
        >
          <motion.div
            className="bg-gradient-to-r from-red-500/20 to-pink-600/20 backdrop-blur-md rounded-full p-6 border border-red-500/30 relative"
            whileHover={{
              scale: 1.1,
              boxShadow: "0 0 60px rgba(239, 68, 68, 0.4)",
            }}
            transition={{ duration: 0.3 }}
          >
            <Bot className="w-12 h-12 text-red-400" />
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-red-400/20"
              animate={{ rotateZ: 360 }}
              transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
          </motion.div>
        </motion.div>

        {/* Enhanced Main Heading */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-16"
        >
          <motion.h1
            className="text-7xl md:text-9xl lg:text-[10rem] font-black mb-8 leading-tight tracking-tight"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #f3f4f6 50%, #e5e7eb 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
              filter: "drop-shadow(0 0 30px rgba(239, 68, 68, 0.2))",
            }}
          >
            <span className="block text-xxl">Build AI Agents</span>
          </motion.h1>
        </motion.div>

        {/* Enhanced Description */}
        <motion.div
          className="mb-20"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <p className="text-2xl md:text-3xl lg:text-4xl text-gray-300 max-w-5xl mx-auto leading-relaxed font-light tracking-wide">
            Create, deploy, and monetize intelligent AI agents on the blockchain.{" "}
            <span className="text-red-400 font-medium">Transform your ideas</span> into NFT-powered automation tools
            with built-in tokenomics.
          </p>
        </motion.div>

        {/* Mini Screen */}
        <motion.div
          initial={{ y: 100, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mb-20"
        >
          <MiniScreen />
        </motion.div>

        {/* Enhanced CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-20"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-12 py-6 text-xl font-bold rounded-full shadow-2xl"
              style={{
                boxShadow: "0 20px 40px rgba(239, 68, 68, 0.3)",
              }}
              onClick={() => (window.location.href = "/dashboard")}
            >
              <Zap className="mr-3 w-6 h-6" />
              Launch Agent
              <ArrowRight className="ml-3 w-6 h-6" />
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 border-2 border-red-500/40 text-white hover:bg-red-500/20 px-12 py-6 text-xl backdrop-blur-sm rounded-full"
            >
              <Play className="mr-3 w-6 h-6" />
              Watch Demo
            </Button>
          </motion.div>
        </motion.div>

        {/* Enhanced Trust Indicators */}
        
      </div>
    </section>
  )
}
