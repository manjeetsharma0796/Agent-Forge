"use client"

import { CustomCursor } from "@/components/custom-cursor"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { HowItWorks } from "@/components/how-it-works"
import { Features } from "@/components/features"
import { Pricing } from "@/components/pricing"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <CustomCursor />

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
        <Hero />
        <HowItWorks />
        <Features />
        <Pricing />
        <Footer />
      </div>
    </div>
  )
}
