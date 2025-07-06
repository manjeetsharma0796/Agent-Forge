"use client"
import { motion, AnimatePresence } from "framer-motion"
import { Wallet, ChevronDown } from "lucide-react"
import { WalletSelector } from "./WalletSelector"
import { useState, useEffect, useRef } from "react"
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk"
import { useWallet } from "@aptos-labs/wallet-adapter-react"

export function Navbar() {
  const { account, connected } = useWallet()
  const [balance, setBalance] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [showBalanceDropdown, setShowBalanceDropdown] = useState(false)
  const [claiming, setClaiming] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Initialize Aptos client
  const config = new AptosConfig({ network: Network.TESTNET })
  const aptos = new Aptos(config)

  const fetchBalance = async (address: string) => {
    try {
      setLoading(true)
      const coinType = "0x1::aptos_coin::AptosCoin"

      const [balanceStr] = await aptos.view<[string]>({
        payload: {
          function: "0x1::coin::balance",
          typeArguments: [coinType],
          functionArguments: [address],
        },
      })

      // Convert from octas to APT (1 APT = 100,000,000 octas)
      const balanceInOctas = Number.parseInt(balanceStr, 10)
      const balanceInApt = balanceInOctas / 100_000_000

      setBalance(balanceInApt)
    } catch (error) {
      console.error("Error fetching balance:", error)
      setBalance(null)
    } finally {
      setLoading(false)
    }
  }

  const claimTokens = async () => {
    if (!account?.address) return

    try {
      setClaiming(true)
      // Simulate claiming 10 APT tokens
      // In a real implementation, this would call a smart contract function
      await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate API call

      // Refresh balance after claiming
      await fetchBalance(account.address.toString())
      setShowBalanceDropdown(false)
    } catch (error) {
      console.error("Error claiming tokens:", error)
    } finally {
      setClaiming(false)
    }
  }

  // Effect to fetch balance when wallet connection changes
  useEffect(() => {
    if (connected && account?.address) {
      fetchBalance(account.address.toString())
    } else {
      setBalance(null)
    }
  }, [connected, account?.address])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowBalanceDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex justify-center pt-8 px-4"
    >
      <div className="max-w-7xl w-full bg-black/20 backdrop-blur-md rounded-full px-12 py-4 border border-pink-500/20">
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-pink-400 font-bold text-xl cursor-pointer flex-shrink-0"
          >
            AgentForge
          </motion.div>

          {/* Navigation Links - Now visible on smaller screens too */}
          <div className="flex items-center space-x-8 flex-1 justify-center">
            <motion.a
              whileHover={{ scale: 1.05, color: "#ec4899" }}
              href="#how-it-works"
              className="text-white/80 hover:text-pink-400 transition-colors cursor-pointer whitespace-nowrap"
            >
              How it Works
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05, color: "#ec4899" }}
              href="#features"
              className="text-white/80 hover:text-pink-400 transition-colors cursor-pointer whitespace-nowrap"
            >
              Features
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05, color: "#ec4899" }}
              href="#pricing"
              className="text-white/80 hover:text-pink-400 transition-colors cursor-pointer whitespace-nowrap"
            >
              Pricing
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05, color: "#ec4899" }}
              href="#my-list"
              className="text-white/80 hover:text-pink-400 transition-colors cursor-pointer whitespace-nowrap"
            >
              My List
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05, color: "#ec4899" }}
              href="#public-list"
              className="text-white/80 hover:text-pink-400 transition-colors cursor-pointer whitespace-nowrap"
            >
              Public List
            </motion.a>
          </div>

          {/* Wallet Section */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            {/* Balance Display with Dropdown */}
            {connected && account?.address && (
              <div className="relative" ref={dropdownRef}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setShowBalanceDropdown(!showBalanceDropdown)}
                  className="bg-pink-500/10 backdrop-blur-sm rounded-full px-4 py-2 border border-pink-500/20 cursor-pointer hover:bg-pink-500/20 transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <Wallet className="w-4 h-4 text-pink-400" />
                    <span className="text-white/90 text-sm whitespace-nowrap">
                      {loading ? (
                        <span className="animate-pulse">Loading...</span>
                      ) : balance !== null ? (
                        `${balance.toFixed(4)} APT`
                      ) : (
                        <span className="text-red-400">Error</span>
                      )}
                    </span>
                    <ChevronDown
                      className={`w-3 h-3 text-pink-400 transition-transform ${showBalanceDropdown ? "rotate-180" : ""}`}
                    />
                  </div>
                </motion.div>

                {/* Balance Dropdown */}
                <AnimatePresence>
                  {showBalanceDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full mt-2 right-0 bg-black/90 backdrop-blur-md rounded-lg border border-pink-500/20 p-4 min-w-[200px] z-50"
                    >
                      <div className="space-y-3">
                        <div className="text-white/60 text-xs uppercase tracking-wide">Wallet Actions</div>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={claimTokens}
                          disabled={claiming}
                          className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {claiming ? (
                            <span className="flex items-center justify-center space-x-2">
                              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              <span>Claiming...</span>
                            </span>
                          ) : (
                            "Claim 10 AGT"
                          )}
                        </motion.button>

                        <div className="text-white/40 text-xs text-center">Free testnet tokens for development</div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Refresh Balance Button - only shown when connected */}
            {connected && account?.address && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => fetchBalance(account.address.toString())}
                disabled={loading}
                className="bg-pink-500/10 backdrop-blur-sm rounded-full p-2 border border-pink-500/20 text-pink-400 hover:bg-pink-500/20 transition-colors disabled:opacity-50"
                title="Refresh balance"
              >
                <svg
                  className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </motion.button>
            )}

            <WalletSelector />
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
