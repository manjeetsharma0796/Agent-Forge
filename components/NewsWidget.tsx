"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { Newspaper, ExternalLink, ChevronUp, ChevronDown, Minimize2 } from "lucide-react"
import { useState, useEffect } from "react"

interface NewsItem {
  title: string
  url: string
  card_text: string
}

interface NewsResponse {
  code: number
  msg: string
  data: {
    infos: NewsItem[]
  }
}

export function NewsWidget() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    try {
      setLoading(true)

      // Mock response - replace with actual API call
      const mockResponse: NewsResponse = {
        code: 0,
        msg: "Success",
        data: {
          infos: [
            {
              title: "Why is XRP price up today?",
              url: "https://cointelegraph.com/why-is-xrp-price-up-today",
              card_text:
                "XRP price is up 3% on Feb. 11, responding to Ripple's partnership with Unicâmbio and increasing chances of XRP ETF approval.",
            },
            {
              title: "New Bitcoin miner 'capitulation' hints at sub-$100K BTC price bottom",
              url: "https://cointelegraph.com/new-bitcoin-miner-capitulation-sub-100k-btc-price-bottom",
              card_text: "Bitcoin miners may be pointing the way to a major long-term BTC price rebound.",
            },
            {
              title: "How a simple browser extension prevented an $80K transfer to a malicious wallet",
              url: "https://cointelegraph.com/how-a-simple-browser-extension-prevented-an-80k-transfer-to-a-malicious-wallet",
              card_text:
                "A last-minute alert stops an $80,000 transfer to a terrorist-linked wallet, underscoring the growing need for onchain security.",
            },
            {
              title: "SEC and Binance seek 60-day pause in crypto case",
              url: "https://cointelegraph.com/binance-sec-case-halt-60-days-crypto-task-force",
              card_text:
                "The SEC and Binance filed a joint motion to pause their legal case for 60 days, citing the newly formed SEC Crypto Task Force's potential impact on regulations.",
            },
            {
              title: "Why is Cardano (ADA) price up today?",
              url: "https://cointelegraph.com/why-is-cardano-ada-price-up-today",
              card_text:
                "ADA price is up 15% on Feb. 11, responding to Grayscale's application for a spot Cardano ETF in the United States.",
            },
            {
              title: "Solana revenues outpace Ethereum, L2s despite market dip",
              url: "https://cointelegraph.com/solana-outpaces-ethereum-l2s-despite-trading-dip",
              card_text: "Solana-based app revenues beat Ethereum apps by 10x, according to crypto researcher Aylo.",
            },
            {
              title: "Bitcoin price rallies above $97K as institutional and retail traders' appetites shrink",
              url: "https://cointelegraph.com/bitcoin-price-rallies-above-97-k-as-institutional-and-retail-traders-appetites-shrink",
              card_text:
                "Bitcoin traders are not slamming the buy button, but most of their concerns are connected to macroeconomic conditions.",
            },
            {
              title: "Tesla Q4 Bitcoin profit highlights BTC collateral opportunity",
              url: "https://cointelegraph.com/tesla-q4-bitcoin-profit-btc-collateral-opportunity-execs",
              card_text:
                "Mark-to-market gains, Tesla could use its Bitcoin as collateral to unlock liquidity and hedge against market downturns.",
            },
          ],
        },
      }

      setNews(mockResponse.data.infos)
    } catch (err) {
      console.error("Error fetching news:", err)
    } finally {
      setLoading(false)
    }
  }

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text
  }

  if (isMinimized) {
    return (
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="fixed bottom-4 left-4 z-50">
        <Button
          onClick={() => setIsMinimized(false)}
          className="w-12 h-12 rounded-full bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white shadow-lg hover:shadow-red-500/25 transition-all duration-300"
        >
          <Newspaper className="w-5 h-5" />
        </Button>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ x: -400, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed bottom-4 left-4 z-50"
    >
      <Card
        className={`bg-black/90 backdrop-blur-md border border-red-500/30 shadow-2xl shadow-red-500/20 transition-all duration-300 ${
          isExpanded ? "w-96 h-96" : "w-80 h-64"
        }`}
      >
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center">
                <Newspaper className="w-4 h-4 text-white" />
              </div>
              <CardTitle className="text-white text-sm font-semibold">Crypto News</CardTitle>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-gray-400 hover:text-white hover:bg-white/10 p-1 h-6 w-6"
              >
                {isExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(true)}
                className="text-gray-400 hover:text-white hover:bg-white/10 p-1 h-6 w-6"
              >
                <Minimize2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-3 pt-0">
          <div
            className={`overflow-y-auto scrollbar-thin scrollbar-thumb-red-500/50 scrollbar-track-transparent ${
              isExpanded ? "h-80" : "h-44"
            }`}
          >
            <AnimatePresence>
              {loading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-3 bg-gray-700 rounded mb-2"></div>
                      <div className="h-2 bg-gray-700 rounded w-3/4"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {news.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="group cursor-pointer"
                      onClick={() => window.open(item.url, "_blank")}
                    >
                      <div className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 rounded-lg p-3 border border-slate-700/30 hover:border-red-500/50 hover:bg-slate-800/70 transition-all duration-300">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="text-white text-xs font-medium leading-tight group-hover:text-red-300 transition-colors">
                            {truncateText(item.title, isExpanded ? 80 : 60)}
                          </h4>
                          <ExternalLink className="w-3 h-3 text-gray-500 group-hover:text-red-400 transition-colors flex-shrink-0 ml-2" />
                        </div>
                        <p className="text-gray-400 text-xs leading-relaxed">
                          {truncateText(item.card_text, isExpanded ? 120 : 80)}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Refresh Button */}
          <div className="mt-3 pt-2 border-t border-gray-700/50">
            <Button
              onClick={fetchNews}
              disabled={loading}
              size="sm"
              className="w-full bg-gradient-to-r from-red-500/20 to-pink-500/20 hover:from-red-500/30 hover:to-pink-500/30 text-white border border-red-500/30 text-xs h-7"
            >
              {loading ? "Refreshing..." : "Refresh News"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Floating indicator */}
      <motion.div
        className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        <div className="w-2 h-2 bg-white rounded-full"></div>
      </motion.div>
    </motion.div>
  )
}
