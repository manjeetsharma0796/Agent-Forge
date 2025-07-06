"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Users, ShoppingBag } from "lucide-react"

interface AgentOptionsProps {
  onViewChange: (view: "home" | "create" | "my-agents" | "marketplace") => void
}

export function AgentOptions({ onViewChange }: AgentOptionsProps) {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Create Agent */}
        <Card className="bg-black/40 border-gray-600 hover:bg-black/60 transition-all duration-300 hover:scale-105 cursor-pointer group">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto mb-4 p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Plus className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-white">Create Agent</CardTitle>
            <CardDescription className="text-gray-300">
              Build your own AI agent with custom capabilities
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button
              onClick={() => onViewChange("create")}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              Get Started
            </Button>
          </CardContent>
        </Card>

        {/* My Agents */}
        <Card className="bg-black/40 border-gray-600 hover:bg-black/60 transition-all duration-300 hover:scale-105 cursor-pointer group">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto mb-4 p-4 bg-gradient-to-r from-green-500 to-teal-600 rounded-full w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-white">My Agents</CardTitle>
            <CardDescription className="text-gray-300">Manage and deploy your existing AI agents</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button
              onClick={() => onViewChange("my-agents")}
              className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white"
            >
              View Agents
            </Button>
          </CardContent>
        </Card>

        {/* Marketplace */}
        <Card className="bg-black/40 border-gray-600 hover:bg-black/60 transition-all duration-300 hover:scale-105 cursor-pointer group">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto mb-4 p-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform">
              <ShoppingBag className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-white">Marketplace</CardTitle>
            <CardDescription className="text-gray-300">
              Discover and purchase AI agents from the community
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button
              onClick={() => onViewChange("marketplace")}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            >
              Browse Agents
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
