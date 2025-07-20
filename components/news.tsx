"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, ExternalLink, Newspaper, Clock } from "lucide-react"
import { useState, useEffect } from "react"

interface NewsProps {
  onBack: () => void
}

interface NewsItem {
  id: string
  title: string
  content: string
  publishedAt: string
  source: string
  url?: string
  category?: string
}

export function News({ onBack }: NewsProps) {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    try {
      setLoading(true)
      const response = await fetch("https://interface.carv.io/ai-agent-backend/news", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "209c6d2a-3a12-4d62-9287-0b28809b285a",
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      // Transform the data to match our NewsItem interface
      // Adjust this based on the actual API response structure
      const transformedNews = Array.isArray(data)
        ? data.map((item: any, index: number) => ({
            id: item.id || `news-${index}`,
            title: item.title || item.headline || "Untitled",
            content: item.content || item.description || item.summary || "No content available",
            publishedAt: item.publishedAt || item.published_at || item.date || new Date().toISOString(),
            source: item.source || item.publisher || "CARV",
            url: item.url || item.link,
            category: item.category || item.tag || "General",
          }))
        : []

      setNews(transformedNews)
    } catch (err) {
      console.error("Error fetching news:", err)
      setError(err instanceof Error ? err.message : "Failed to fetch news")

      // Fallback mock data for demonstration
      setNews([
        {
          id: "1",
          title: "CARV Protocol Launches New AI Agent Framework",
          content:
            "CARV Protocol has announced the launch of their revolutionary AI agent framework, enabling developers to create sophisticated blockchain-integrated AI agents with unprecedented ease.",
          publishedAt: "2024-01-20T10:00:00Z",
          source: "CARV Protocol",
          category: "Technology",
        },
        {
          id: "2",
          title: "Blockchain AI Integration Reaches New Milestone",
          content:
            "The integration of artificial intelligence with blockchain technology has reached a significant milestone, with over 10,000 AI agents now deployed across various networks.",
          publishedAt: "2024-01-19T15:30:00Z",
          source: "Crypto News",
          category: "Industry",
        },
        {
          id: "3",
          title: "DeFi Agents Show 300% Performance Improvement",
          content:
            "Recent studies show that AI-powered DeFi agents are outperforming traditional trading strategies by up to 300%, marking a new era in automated finance.",
          publishedAt: "2024-01-18T08:45:00Z",
          source: "DeFi Analytics",
          category: "Finance",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    } catch {
      return "Unknown date"
    }
  }

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      Technology: "from-blue-500/20 to-cyan-500/20 border-blue-500/40 text-blue-300",
      Industry: "from-purple-500/20 to-pink-500/20 border-purple-500/40 text-purple-300",
      Finance: "from-green-500/20 to-emerald-500/20 border-green-500/40 text-green-300",
      General: "from-gray-500/20 to-slate-500/20 border-gray-500/40 text-gray-300",
    }
    return colors[category] || colors["General"]
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

          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center mr-4">
              <Newspaper className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white">AI Agent News</h1>
              <p className="text-xl text-gray-300">Stay updated with the latest in AI and blockchain</p>
            </div>
          </div>

          <Button
            onClick={fetchNews}
            disabled={loading}
            className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white"
          >
            {loading ? "Refreshing..." : "Refresh News"}
          </Button>
        </motion.div>

        {/* Error State */}
        {error && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <Card className="bg-red-900/20 border-red-500/40">
              <CardContent className="p-6">
                <p className="text-red-300">Error loading news: {error}</p>
                <p className="text-red-400 text-sm mt-2">Showing demo content instead.</p>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="grid gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-black/40 border-gray-600 animate-pulse">
                <CardContent className="p-6">
                  <div className="h-4 bg-gray-700 rounded mb-4"></div>
                  <div className="h-3 bg-gray-700 rounded mb-2"></div>
                  <div className="h-3 bg-gray-700 rounded w-3/4"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* News Grid */}
        {!loading && (
          <div className="grid gap-6">
            {news.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.01 }}
              >
                <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-md border border-slate-700/50 hover:border-red-500/70 hover:shadow-xl hover:shadow-red-500/20 transition-all duration-500">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <CardTitle className="text-white text-xl mb-2 leading-tight">{item.title}</CardTitle>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {formatDate(item.publishedAt)}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {item.source}
                          </div>
                        </div>
                      </div>
                      {item.category && (
                        <div
                          className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r border ${getCategoryColor(item.category)}`}
                        >
                          {item.category}
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 leading-relaxed mb-6">{item.content}</p>
                    {item.url && (
                      <Button
                        variant="outline"
                        className="border-gray-600 text-white hover:bg-white/10 hover:border-red-500/50 bg-transparent"
                        onClick={() => window.open(item.url, "_blank")}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Read More
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && news.length === 0 && !error && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
            <Newspaper className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No News Available</h3>
            <p className="text-gray-400">Check back later for the latest updates.</p>
          </motion.div>
        )}
      </div>
    </section>
  )
}
