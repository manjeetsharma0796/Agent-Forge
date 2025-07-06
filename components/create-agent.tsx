"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"
import { ArrowLeft, Bot, Zap, Settings, Rocket } from "lucide-react"
import { useState } from "react"

interface CreateAgentProps {
  onBack: () => void
}

export function CreateAgent({ onBack }: CreateAgentProps) {
  const [step, setStep] = useState(1)
  const [agentData, setAgentData] = useState({
    name: "",
    description: "",
    type: "",
    blockchain: "ethereum",
  })

  const steps = [
    { number: 1, title: "Basic Info", icon: Bot },
    { number: 2, title: "Configuration", icon: Settings },
    { number: 3, title: "Deploy", icon: Rocket },
  ]

  return (
    <section className="py-16 px-8 md:px-16 lg:px-24 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <Button variant="ghost" onClick={onBack} className="text-white hover:text-pink-400 mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Create New Agent</h1>
          <p className="text-xl text-gray-300">Build your AI agent in just a few simple steps</p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="flex items-center space-x-8">
            {steps.map((stepItem, index) => (
              <div key={index} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                    step >= stepItem.number ? "bg-red-500 border-red-500 text-white" : "border-gray-600 text-gray-400"
                  }`}
                >
                  <stepItem.icon className="w-5 h-5" />
                </div>
                <div className="ml-3">
                  <div className="text-sm text-gray-400">Step {stepItem.number}</div>
                  <div className="text-white font-semibold">{stepItem.title}</div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 ml-8 ${step > stepItem.number ? "bg-red-500" : "bg-gray-600"}`} />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Step Content */}
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-gradient-to-br from-gray-800/90 to-gray-900/95 border border-gray-700 shadow-lg h-full overflow-hidden">
            <CardHeader>
              <CardTitle className="text-white text-2xl">
                {step === 1 && "Agent Basic Information"}
                {step === 2 && "Agent Configuration"}
                {step === 3 && "Deploy Your Agent"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-white">
              {step === 1 && (
                <>
                  <div>
                    <label className="block text-white mb-2">Agent Name</label>
                    <Input
                      placeholder="Enter your agent name"
                      value={agentData.name}
                      onChange={(e) => setAgentData({ ...agentData, name: e.target.value })}
                      className="bg-black/20 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-white mb-2">System Information</label>
                    <Textarea
                      placeholder="Describe what your agent will do"
                      value={agentData.description}
                      onChange={(e) => setAgentData({ ...agentData, description: e.target.value })}
                      className="bg-black/20 border-gray-600 text-white min-h-[120px]"
                    />
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div>
                    <label className="block text-white mb-2">Agent Type</label>
                    <div className="grid grid-cols-2 gap-4">
                      {["Trading Bot", "Data Analyzer", "Content Creator", "Custom"].map((type) => (
                        <Button
                          key={type}
                          variant={agentData.type === type ? "default" : "outline"}
                          onClick={() => setAgentData({ ...agentData, type })}
                          className={
                            agentData.type === type
                              ? "bg-red-500 hover:bg-red-600"
                              : "border-gray-600 text-black hover:bg-white/10"
                          }
                        >
                          {type}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-white mb-2">Personalities</label>
                    <div className="grid grid-cols-3 gap-4">
                      {["Helpfull", "Friendly", "Instructor"].map((blockchain) => (
                        <Button
                          key={blockchain}
                          variant={agentData.blockchain === blockchain ? "default" : "outline"}
                          onClick={() => setAgentData({ ...agentData, blockchain })}
                          className={
                            agentData.blockchain === blockchain
                              ? "bg-red-500 hover:bg-red-600"
                              : "border-gray-600 text-black hover:bg-white/10"
                          }
                        >
                          {blockchain.charAt(0).toUpperCase() + blockchain.slice(1)}
                        </Button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {step === 3 && (
                <div className="text-center py-8">
                  <div className="bg-gradient-to-r from-red-500/20 to-pink-600/20 rounded-2xl p-8 mb-6">
                    <Rocket className="w-16 h-16 text-red-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-white mb-2">Ready to Deploy!</h3>
                    <p className="text-gray-300">
                      Your agent "{agentData.name}" is ready to be deployed to {agentData.blockchain}
                    </p>
                  </div>
                  <div className="bg-black/20 rounded-lg p-4 mb-6">
                    <div className="text-left space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Name:</span>
                        <span className="text-white">{agentData.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Type:</span>
                        <span className="text-white">{agentData.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Personality:</span>
                        <span className="text-white">{agentData.blockchain}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Deployment Cost:</span>
                        <span className="text-white">0.05 AGT</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between pt-6">
                {step > 1 && (
                  <Button
                    variant="outline"
                    onClick={() => setStep(step - 1)}
                    className="border-gray-600 text-black hover:bg-white/10"
                  >
                    Previous
                  </Button>
                )}
                <Button
                  onClick={() => {
                    if (step < 3) {
                      setStep(step + 1)
                    } else {
                      // Deploy agent logic here
                      alert("Agent deployed successfully!")
                      onBack()
                    }
                  }}
                  className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white ml-auto"
                >
                  {step === 3 ? (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Deploy Agent
                    </>
                  ) : (
                    "Next Step"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
