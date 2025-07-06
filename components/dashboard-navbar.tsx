"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Bot, Home, User, Settings } from "lucide-react"

export function DashboardNavbar() {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex justify-center pt-8 px-4"
    >
      <div className="max-w-6xl w-full bg-black/20 backdrop-blur-md rounded-full px-8 py-4 border border-pink-500/20">
        <div className="flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-pink-400 font-bold text-xl cursor-pointer flex items-center"
            onClick={() => (window.location.href = "/")}
          >
            <Bot className="w-6 h-6 mr-2" />
            AgentForge
          </motion.div>

          <div className="hidden md:flex items-center space-x-8">
            <motion.button
              whileHover={{ scale: 1.05, color: "#ec4899" }}
              className="text-white/80 hover:text-pink-400 transition-colors cursor-pointer flex items-center"
            >
              <Home className="w-4 h-4 mr-2" />
              Dashboard
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, color: "#ec4899" }}
              className="text-white/80 hover:text-pink-400 transition-colors cursor-pointer flex items-center"
            >
              <User className="w-4 h-4 mr-2" />
              Profile
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, color: "#ec4899" }}
              className="text-white/80 hover:text-pink-400 transition-colors cursor-pointer flex items-center"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </motion.button>
          </div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white border-0 rounded-full px-6 py-2">
              0x1234...5678
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  )
}
