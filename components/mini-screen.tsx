"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

export function MiniScreen() {
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    { title: "Describe Agent", code: "// AI Travel Planner\nfunction planTrip(budget, location) {" },
    { title: "Generate Logic", code: "// Auto-generated logic\nconst flights = await searchFlights();" },
    { title: "Deploy to Web3", code: "// Deploy as NFT\nconst agent = await deployAgent();" },
    { title: "Earn Revenue", code: "// Monetize usage\nconst earnings = calculateRevenue();" },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className="bg-black/40 backdrop-blur-md rounded-2xl border border-pink-500/20 p-12 max-w-4xl mx-auto"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <div className="text-pink-400 text-sm font-mono">AgentForge IDE</div>
      </div>

      <div className="bg-black/60 rounded-lg p-8 min-h-[200px]">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-pink-400 text-sm mb-2">{steps[currentStep].title}</div>
          <pre className="text-green-400 text-xs font-mono leading-relaxed">{steps[currentStep].code}</pre>
        </motion.div>
      </div>

      <div className="flex justify-center mt-4 space-x-2 text-8xl">
        {steps.map((_, index) => (
          <motion.div
            key={index}
            className={`w-2 h-2 rounded-full ${index === currentStep ? "bg-pink-400" : "bg-gray-600"}`}
            animate={{ scale: index === currentStep ? 1.2 : 1 }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
    </motion.div>
  )
}
