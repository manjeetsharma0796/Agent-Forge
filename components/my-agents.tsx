"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowLeft, Bot, Send, MessageCircle, User, X } from "lucide-react"
import { useState } from "react"

interface MyAgentsProps {
  onBack: () => void
}

export function MyAgents({ onBack }: MyAgentsProps) {
  type Agent = {
    id: number
    name: string
    type: string
    status: string
    blockchain: string
    interactions: string
    deployedAt: string
    performance: string
  }
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', content: 'Hello! I\'m your On Chain Explorer agent. How can I help you explore blockchain data today?' },
  ])
  const [inputMessage, setInputMessage] = useState('')

  // Single agent data
  const agent = {
    id: 1,
    name: "On Chain Explorer",
    type: "Blockchain Explorer",
    status: "active",
    blockchain: "Ethereum",
    interactions: "1,247",
    deployedAt: "2024-01-15",
    performance: "+23.5%",
  }

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    const newMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage
    }

    setMessages(prev => [...prev, newMessage])

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        type: 'bot',
        content: 'I\'m analyzing the blockchain data you requested. Let me fetch the latest information for you...'
      }
      setMessages(prev => [...prev, botResponse])
    }, 1000)

    setInputMessage('')
  }

  const handleKeyPress = (e: { key: string }) => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }

  if (selectedAgent) {
    function handleQuickAction(label: string): void {
      setMessages(prev => [
      ...prev,
      {
        id: prev.length + 1,
        type: 'user',
        content: label,
      },
      {
        id: prev.length + 2,
        type: 'bot',
        content: `You selected "${label}". This feature will be available soon!`,
      },
      ]);
    }
    return (
      <section className="py-8 px-4 md:px-8 min-h-screen">
        <div className="max-w-7xl mx-auto h-[calc(100vh-4rem)]">
          <div className="flex h-full gap-4">
            {/* Left Sidebar */}
            <div className="w-80 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-2xl p-6 flex flex-col">
              {/* Header */}
              <div className="mb-6">
                <Button 
                  variant="ghost" 
                  onClick={() => setSelectedAgent(null)} 
                  className="text-white hover:text-pink-400 mb-4 p-0"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Agents
                </Button>
                
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{agent.name}</h3>
                    <p className="text-slate-400 text-sm">{agent.status}</p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mb-6">
                <h4 className="text-white font-medium mb-3">Quick Actions</h4>
                <div className="space-y-2">
                  {[
                    { icon: "💰", label: "Check My Balance", desc: "View wallet balance" },
                    { icon: "📤", label: "Send Amount", desc: "Transfer tokens" },
                    { icon: "🌉", label: "Bridge Amount", desc: "Cross-chain transfer" },
                    { icon: "⛽", label: "Gas Estimate", desc: "Calculate fees" },
                    { icon: "⚙️", label: "Manage", desc: "Wallet management" },
                    { icon: "📊", label: "Portfolio", desc: "View holdings" }
                  ].map((action, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickAction(action.label)}
                      className="w-full text-left p-3 rounded-lg bg-slate-700/40 hover:bg-slate-700/60 border border-slate-600/30 hover:border-slate-500/50 transition-all duration-200 group"
                    >
                      <div className="flex items-center">
                        <span className="text-lg mr-3">{action.icon}</span>
                        <div>
                          <div className="text-white text-sm font-medium group-hover:text-pink-400 transition-colors">
                            {action.label}
                          </div>
                          <div className="text-slate-400 text-xs">{action.desc}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Agent Stats */}
              <div className="mt-auto">
                <h4 className="text-white font-medium mb-3">Agent Stats</h4>
                <div className="space-y-3">
                  <div className="bg-slate-700/40 rounded-lg p-3 border border-slate-600/30">
                    <div className="text-xl font-bold text-white">{agent.interactions}</div>
                    <div className="text-slate-400 text-sm">Total Interactions</div>
                  </div>
                  <div className="bg-emerald-900/40 rounded-lg p-3 border border-green-700/40">
                    <div className="text-xl font-bold text-green-400">{agent.performance}</div>
                    <div className="text-slate-400 text-sm">Performance</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-2xl flex flex-col">
              {/* Chat Header */}
              <div className="p-6 border-b border-slate-700/50">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-white">
                      {agent.name}
                    </h1>
                    <p className="text-slate-400">
                      {agent.interactions} interactions • Ready to help with blockchain operations
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-400 text-sm font-medium">Online</span>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start space-x-3 max-w-3xl ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      {/* Avatar */}
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.type === 'user' 
                          ? 'bg-gradient-to-br from-red-500 to-pink-600' 
                          : 'bg-gradient-to-br from-blue-500 to-purple-600'
                      }`}>
                        {message.type === 'user' ? (
                          <User className="w-4 h-4 text-white" />
                        ) : (
                          <Bot className="w-4 h-4 text-white" />
                        )}
                      </div>
                      
                      {/* Message Content */}
                      <div className={`px-4 py-3 rounded-2xl ${
                        message.type === 'user'
                          ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white'
                          : 'bg-slate-700/60 text-white border border-slate-600/40'
                      }`}>
                        <p className="text-sm leading-relaxed">{message.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input Area */}
              <div className="p-6 border-t border-slate-700/50">
                <div className="flex space-x-4">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about blockchain operations, balances, transactions..."
                    className="flex-1 bg-slate-700/40 border border-slate-600/40 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 transition-all"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim()}
                    className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-6 py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-red-500/25 transition-all duration-300"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 px-8 md:px-16 lg:px-24 min-h-screen">
      <div className="max-w-6xl mx-auto">
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

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">My Agents</h1>
          <p className="text-xl text-gray-300">Manage and monitor your deployed AI agents</p>
        </motion.div>

        {/* Single Agent Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          whileHover={{ y: -5, scale: 1.02 }}
          className="max-w-md mx-auto"
        >
          <Card 
            className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-md border-2 border-slate-700/50 hover:border-red-500/70 hover:shadow-xl hover:shadow-red-500/20 transition-all duration-500 cursor-pointer"
            onClick={() => setSelectedAgent(agent)}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white text-xl">{agent.name}</CardTitle>
                <div className="px-4 py-2 rounded-full text-xs font-semibold bg-gradient-to-r from-green-500/30 to-emerald-500/30 text-green-300 border border-green-500/40">
                  {agent.status}
                </div>
              </div>
              <p className="text-slate-300 font-medium">
                {agent.type} • {agent.blockchain}
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-slate-700/60 to-slate-800/60 border border-slate-600/40 rounded-lg p-4 hover:bg-slate-700/70 transition-colors">
                  <div className="text-2xl font-bold text-white">{agent.interactions}</div>
                  <div className="text-slate-300 text-sm">Interactions</div>
                </div>
                <div className="bg-gradient-to-br from-emerald-900/40 to-green-900/40 border border-green-700/40 rounded-lg p-4 hover:bg-green-900/50 transition-colors">
                  <div className="text-2xl font-bold text-green-400">{agent.performance}</div>
                  <div className="text-slate-300 text-sm">Performance</div>
                </div>
              </div>

              {/* Chat Button */}
              <Button
                className="w-full bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white shadow-lg hover:shadow-red-500/25 transition-all duration-300"
                onClick={() => setSelectedAgent(agent)}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Open Chat
              </Button>

              {/* Deployment Info */}
              <div className="text-sm text-slate-300 pt-4 border-t border-slate-600/50">
                Deployed on {agent.deployedAt}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}