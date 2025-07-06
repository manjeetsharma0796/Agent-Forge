"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Plus, Bot } from "lucide-react"

interface AgentOptionsProps {
  onViewChange: (view: "create" | "my-agents") => void
}

export function AgentOptions({ onViewChange }: AgentOptionsProps) {
  const options = [
    {
      icon: Plus,
      title: "Create New Agent",
      description: "Build a new AI agent from scratch using our intuitive builder",
      action: "Get Started",
      color: "from-red-500 to-pink-500",
      onClick: () => onViewChange("create"),
    },
    {
      icon: Bot,
      title: "My Agents",
      description: "View and manage your existing AI agents and their performance",
      action: "View Agents",
      color: "from-pink-500 to-purple-500",
      onClick: () => onViewChange("my-agents"),
    },
  ]

  return (
    <section className="py-16 px-8 md:px-16 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What would you like to do?</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Choose an option below to start building or managing your AI agents
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {options.map((option, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group cursor-pointer"
              onClick={option.onClick}
            >
              <Card className="relative bg-gradient-to-br from-gray-700/80 to-gray-900/90 border border-red-400/60 shadow-lg hover:shadow-2xl transition-all duration-500 h-full overflow-hidden">
                {/* Shining effect overlay */}
                <div className="pointer-events-none absolute inset-0 z-10">
                  <div className="absolute -left-1/3 top-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-60 animate-[shine_1.5s_linear_infinite]" />
                </div>
                <CardContent className="p-8 text-center relative z-20 text-white">
                  <motion.div
                    className={`bg-gradient-to-r ${option.color} rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <option.icon className="w-10 h-10 text-white" />
                  </motion.div>

                  <h3 className="text-2xl font-bold text-white mb-4">{option.title}</h3>
                  <p className="text-gray-200 mb-8 leading-relaxed">{option.description}</p>

                  <Button
                    className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-8 py-3 rounded-full font-semibold"
                    size="lg"
                  >
                    {option.action}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
