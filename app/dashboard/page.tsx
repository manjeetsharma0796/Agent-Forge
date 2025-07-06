"use client"
import { DashboardNavbar } from "@/components/dashboard-navbar"
import { DashboardHero } from "@/components/dashboard-hero"
import { AgentOptions } from "@/components/agent-options"
import { CreateAgent } from "@/components/create-agent"
import { MyAgents } from "@/components/my-agents"
import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { useWallet } from "@aptos-labs/wallet-adapter-react"
import { add } from "date-fns"
import axios from "axios"
import { useRouter } from "next/navigation"

export default function Dashboard() {

  const [activeView, setActiveView] = useState<"home" | "create" | "my-agents">("home")

  const router = useRouter()

  useEffect(() => {
    const user_id = localStorage.getItem('user_id')
    const wallet_address = localStorage.getItem('wallet_address')

    if (!user_id || !wallet_address) {
      router.push('/')
      return
    }

    async function connectToAgent(userId: string) {
      const { data } = await axios.post('https://aptos-agent.onrender.com/query', {
        user_id: userId,
        input: `my wallet address is ${wallet_address}`
      })

      console.log(data)
    }

    connectToAgent(user_id)

  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/cyberpunk-grid.jpg')",
        }}
      />

      {/* Animated overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />

      {/* Content */}
      <div className="relative z-10">
        <Navbar />

        {activeView === "home" && (
          <>
            <DashboardHero />
            <AgentOptions onViewChange={setActiveView} />
          </>
        )}

        {activeView === "create" && <CreateAgent onBack={() => setActiveView("home")} />}
        {activeView === "my-agents" && <MyAgents onBack={() => setActiveView("home")} />}
      </div>
    </div>
  )
}
