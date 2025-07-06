"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Wallet } from "lucide-react"
import { WalletSelector } from "./WalletSelector"

export function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex justify-center pt-8 px-4"
    >
      <div className="max-w-4xl w-full bg-black/20 backdrop-blur-md rounded-full px-8 py-4 border border-pink-500/20">
        <div className="flex items-center justify-between">
          <motion.div whileHover={{ scale: 1.05 }} className="text-pink-400 font-bold text-xl cursor-pointer">
            AgentForge
          </motion.div>

          <div className="hidden md:flex items-center space-x-8">
            <motion.a
              whileHover={{ scale: 1.05, color: "#ec4899" }}
              href="#how-it-works"
              className="text-white/80 hover:text-pink-400 transition-colors cursor-pointer"
            >
              How it Works
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05, color: "#ec4899" }}
              href="#features"
              className="text-white/80 hover:text-pink-400 transition-colors cursor-pointer"
            >
              Features
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05, color: "#ec4899" }}
              href="#pricing"
              className="text-white/80 hover:text-pink-400 transition-colors cursor-pointer"
            >
              Pricing
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05, color: "#ec4899" }}
              href="#pricing"
              className="text-white/80 hover:text-pink-400 transition-colors cursor-pointer"
            >
              My List 
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05, color: "#ec4899" }}
              href="#pricing"
              className="text-white/80 hover:text-pink-400 transition-colors cursor-pointer"
            >
              Public List
            </motion.a>
          </div>

          <WalletSelector/>
        </div>
      </div>
    </motion.nav>
  )
}
