"use client"
import { DashboardNavbar } from "@/components/dashboard-navbar"
import { DashboardHero } from "@/components/dashboard-hero"
import { AgentOptions } from "@/components/agent-options"
import { CreateAgent } from "@/components/create-agent"
import { MyAgents } from "@/components/my-agents"
import { useState } from "react"
import { Navbar } from "@/components/navbar"

export default function Dashboard() {
  const [activeView, setActiveView] = useState<"home" | "create" | "my-agents">("home")

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
