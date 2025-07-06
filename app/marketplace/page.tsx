"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  Search,
  Star,
  Zap,
  Brain,
  Shield,
  TrendingUp,
  MessageSquare,
  Code,
  BarChart3,
  Palette,
  Music,
} from "lucide-react"

interface AgentMarketplaceProps {
  onBack: () => void
}

interface Agent {
  id: string
  name: string
  description: string
  category: string
  price: number
  rating: number
  reviews: number
  creator: string
  tags: string[]
  icon: React.ComponentType<any>
  featured: boolean
}

const mockAgents: Agent[] = [
  {
    id: "1",
    name: "CryptoTrader Pro",
    description:
      "Advanced AI agent for cryptocurrency trading with real-time market analysis and automated portfolio management.",
    category: "Finance",
    price: 150,
    rating: 4.8,
    reviews: 342,
    creator: "TradingMaster",
    tags: ["Trading", "DeFi", "Analytics"],
    icon: TrendingUp,
    featured: true,
  },
  {
    id: "2",
    name: "Smart Contract Auditor",
    description: "Comprehensive smart contract security analysis and vulnerability detection for Aptos blockchain.",
    category: "Security",
    price: 200,
    rating: 4.9,
    reviews: 156,
    creator: "SecureCode",
    tags: ["Security", "Audit", "Smart Contracts"],
    icon: Shield,
    featured: true,
  },
  {
    id: "3",
    name: "NFT Creator Assistant",
    description: "AI-powered tool for generating, optimizing, and managing NFT collections with market insights.",
    category: "Creative",
    price: 75,
    rating: 4.6,
    reviews: 289,
    creator: "ArtisticAI",
    tags: ["NFT", "Art", "Generation"],
    icon: Palette,
    featured: false,
  },
  {
    id: "4",
    name: "DeFi Yield Optimizer",
    description: "Maximize your DeFi yields with intelligent strategy recommendations and automated rebalancing.",
    category: "Finance",
    price: 120,
    rating: 4.7,
    reviews: 198,
    creator: "YieldHunter",
    tags: ["DeFi", "Yield", "Optimization"],
    icon: Zap,
    featured: false,
  },
  {
    id: "5",
    name: "Community Manager Bot",
    description: "Automated community engagement and moderation for Discord and Telegram channels.",
    category: "Social",
    price: 50,
    rating: 4.5,
    reviews: 445,
    creator: "SocialBot",
    tags: ["Community", "Moderation", "Engagement"],
    icon: MessageSquare,
    featured: false,
  },
  {
    id: "6",
    name: "Code Review Assistant",
    description: "AI-powered code review and optimization suggestions for Move and other blockchain languages.",
    category: "Development",
    price: 90,
    rating: 4.8,
    reviews: 167,
    creator: "DevHelper",
    tags: ["Code Review", "Move", "Development"],
    icon: Code,
    featured: false,
  },
  {
    id: "7",
    name: "Market Analytics Pro",
    description: "Advanced market research and trend analysis for crypto projects and token launches.",
    category: "Analytics",
    price: 110,
    rating: 4.6,
    reviews: 234,
    creator: "DataInsights",
    tags: ["Analytics", "Research", "Market"],
    icon: BarChart3,
    featured: false,
  },
  {
    id: "8",
    name: "AI Music Composer",
    description: "Generate unique background music and sound effects for your Web3 projects and games.",
    category: "Creative",
    price: 65,
    rating: 4.4,
    reviews: 178,
    creator: "SoundWave",
    tags: ["Music", "Audio", "Generation"],
    icon: Music,
    featured: false,
  },
]

export default function AgentMarketplace({ onBack }: AgentMarketplaceProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("featured")

  const categories = ["all", "Finance", "Security", "Creative", "Social", "Development", "Analytics"]

  const filteredAgents = mockAgents
    .filter((agent) => {
      const matchesSearch =
        agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesCategory = selectedCategory === "all" || agent.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        case "reviews":
          return b.reviews - a.reviews
        default: // featured
          return b.featured ? 1 : -1
      }
    })

  const handlePurchase = (agent: Agent) => {
    // Mock purchase logic
    console.log(`Purchasing ${agent.name} for ${agent.price} AGT`)
    // Here you would integrate with your payment system
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/10">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">AI Agent Marketplace</h1>
          <p className="text-gray-300">Discover and purchase powerful AI agents for your Web3 needs</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search agents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-black/20 border-gray-600 text-white placeholder:text-gray-400"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full md:w-48 bg-black/20 border-gray-600 text-white">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category === "all" ? "All Categories" : category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full md:w-48 bg-black/20 border-gray-600 text-white">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="featured">Featured</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
            <SelectItem value="reviews">Most Reviews</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Agent Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredAgents.map((agent) => {
          const IconComponent = agent.icon
          return (
            <Card
              key={agent.id}
              className="bg-black/40 border-gray-600 hover:bg-black/60 transition-all duration-300 hover:scale-105"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                      <IconComponent className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-white text-lg">{agent.name}</CardTitle>
                      <p className="text-gray-400 text-sm">by {agent.creator}</p>
                    </div>
                  </div>
                  {agent.featured && (
                    <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black">Featured</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pb-4">
                <CardDescription className="text-gray-300 mb-4 line-clamp-3">{agent.description}</CardDescription>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-white text-sm font-medium">{agent.rating}</span>
                  </div>
                  <span className="text-gray-400 text-sm">({agent.reviews} reviews)</span>
                </div>
                <div className="flex flex-wrap gap-1 mb-4">
                  {agent.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs bg-gray-700 text-gray-300">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-white">
                    {agent.price} <span className="text-lg text-purple-400">AGT</span>
                  </div>
                  <Badge variant="outline" className="border-purple-500 text-purple-400">
                    {agent.category}
                  </Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => handlePurchase(agent)}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                >
                  Purchase Agent
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>

      {filteredAgents.length === 0 && (
        <div className="text-center py-12">
          <Brain className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No agents found</h3>
          <p className="text-gray-400">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  )
}
