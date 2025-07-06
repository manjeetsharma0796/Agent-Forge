"use client"
import { motion, AnimatePresence } from "framer-motion"
import { Wallet, ChevronDown, RefreshCw, Sparkles, Zap } from "lucide-react"
import { WalletSelector } from "./WalletSelector"
import { useState, useEffect, useRef } from "react"
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk"
import { useWallet } from "@aptos-labs/wallet-adapter-react"
import { aptosClient } from "@/app/utils/aptosClient"
import { ForgeABI } from "@/app/utils/ai"
import { toast } from "../components/ui/use-toast"
import { useWalletClient } from "@thalalabs/surf/hooks";
import { min } from "date-fns"

export function Navbar() {
  const { account, connected } = useWallet()
  const [balance, setBalance] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [showBalanceDropdown, setShowBalanceDropdown] = useState(false)
  const [claiming, setClaiming] = useState(false)
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Initialize Aptos client
  const config = new AptosConfig({ network: Network.TESTNET })
  const aptos = new Aptos(config)

  const { client } = useWalletClient();
  const address = "0x5a5d125b5d1c3b57cc8b0901196139bff53c53d7d27dc8c27edea4190fa7f381";

  const mintInititate = async () => {
    console.log("Minting initiated for address:", address);

    if (!client) {
      return;
    }

    try {
      setClaiming(true)
      const committedTransaction = await client.useABI(ForgeABI).mint({
        type_arguments: [],
        arguments: [account?.address.toString(), 10000000000],
      });
      const executedTransaction = await aptosClient().waitForTransaction({
        transactionHash: committedTransaction.hash,
      });
      toast({
        title: "Success",
        description: `Transaction succeeded, hash: ${executedTransaction.hash}`,
      });
      // Refresh balance after successful mint
      if (account?.address) {
        await fetchBalance(account.address.toString())
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to mint tokens. Please try again.",
      });
    } finally {
      setClaiming(false)
    }
  };

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

  const navLinks = [
    { name: "How it Works", href: "#how-it-works" },
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "My List", href: "#my-list" },
    { name: "Public List", href: "/marketplace" },
  ]

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="flex justify-center pt-8 px-4 relative"
    >
      {/* Animated background glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="max-w-7xl w-full relative">
        {/* Main navbar container with enhanced glass effect */}
        <motion.div
          className="bg-black/30 backdrop-blur-xl rounded-2xl px-8 py-5 border border-pink-500/30 shadow-2xl shadow-pink-500/10"
          style={{
            background: "linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(20,20,20,0.4) 100%)",
          }}
          whileHover={{
            borderColor: "rgba(236, 72, 153, 0.4)",
            boxShadow: "0 25px 50px -12px rgba(236, 72, 153, 0.15)",
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between w-full">
            {/* Enhanced Logo */}
            <motion.div
              whileHover={{ 
                scale: 1.05,
                textShadow: "0 0 20px rgba(236, 72, 153, 0.8)",
              }}
              className="text-pink-400 font-bold text-2xl cursor-pointer flex-shrink-0 relative"
            >
              <motion.div
                className="flex items-center space-x-2"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <Sparkles className="w-6 h-6 text-pink-400" />
                <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  AgentForge
                </span>
              </motion.div>
            </motion.div>

            {/* Enhanced Navigation Links */}
            <div className="flex items-center space-x-1 flex-1 justify-center">
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="relative px-4 py-2 text-white/80 hover:text-pink-400 transition-colors cursor-pointer whitespace-nowrap rounded-lg"
                  onMouseEnter={() => setHoveredLink(link.name)}
                  onMouseLeave={() => setHoveredLink(null)}
                  whileHover={{ 
                    scale: 1.05,
                    y: -2,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {hoveredLink === link.name && (
                    <motion.div
                      layoutId="navbar-highlight"
                      className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-lg border border-pink-500/20"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </motion.a>
              ))}
            </div>

            {/* Enhanced Wallet Section */}
            <div className="flex items-center space-x-3 flex-shrink-0">
              {/* Enhanced Balance Display */}
              {connected && account?.address && (
                <div className="relative" ref={dropdownRef}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: "0 10px 25px -5px rgba(236, 72, 153, 0.3)",
                    }}
                    onClick={() => setShowBalanceDropdown(!showBalanceDropdown)}
                    className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-sm rounded-xl px-5 py-3 border border-pink-500/30 cursor-pointer hover:from-pink-500/30 hover:to-purple-500/30 transition-all duration-300 shadow-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <motion.div
                        animate={{ rotate: loading ? 360 : 0 }}
                        transition={{ duration: 1, repeat: loading ? Infinity : 0, ease: "linear" }}
                      >
                        <Wallet className="w-5 h-5 text-pink-400" />
                      </motion.div>
                      <span className="text-white/90 text-sm font-medium whitespace-nowrap">
                        {loading ? (
                          <motion.span 
                            className="flex items-center space-x-1"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <span>Loading</span>
                            <motion.span
                              animate={{ opacity: [0, 1, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                            >
                              ...
                            </motion.span>
                          </motion.span>
                        ) : balance !== null ? (
                          <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent font-semibold">
                            {balance.toFixed(4)} APT
                          </span>
                        ) : (
                          <span className="text-red-400">Error</span>
                        )}
                      </span>
                      <motion.div
                        animate={{ rotate: showBalanceDropdown ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-4 h-4 text-pink-400" />
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Enhanced Claim Button */}
                  <motion.button
                    onClick={mintInititate}
                    disabled={claiming}
                    className="mt-2 w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: claiming ? 1 : 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      {claiming ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          >
                            <RefreshCw className="w-4 h-4" />
                          </motion.div>
                          <span>Claiming...</span>
                        </>
                      ) : (
                        <>
                          <Zap className="w-4 h-4" />
                          <span>Claim 10 AGT</span>
                        </>
                      )}
                    </div>
                  </motion.button>
                </div>
              )}

              {/* Enhanced Refresh Button */}
              {connected && account?.address && (
                <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 25px -5px rgba(236, 72, 153, 0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => fetchBalance(account.address.toString())}
                  disabled={loading}
                  className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-sm rounded-xl p-3 border border-pink-500/30 text-pink-400 hover:from-pink-500/30 hover:to-purple-500/30 transition-all duration-300 disabled:opacity-50 shadow-lg"
                  title="Refresh balance"
                >
                  <motion.div
                    animate={{ rotate: loading ? 360 : 0 }}
                    transition={{ duration: 1, repeat: loading ? Infinity : 0, ease: "linear" }}
                  >
                    <RefreshCw className="w-5 h-5" />
                  </motion.div>
                </motion.button>
              )}

              {/* Enhanced Wallet Selector */}
              <div className="relative">
                <WalletSelector />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Floating particles effect */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-pink-400/30 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 2) * 40}%`,
              }}
              animate={{
                y: [-10, 10, -10],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
            />
          ))}
        </div>
      </div>
    </motion.nav>
  )
}