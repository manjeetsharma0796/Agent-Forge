"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Github, Twitter, Linkedin, Mail, Bot, DiscIcon as Discord } from "lucide-react"

export function Footer() {
  return (
    <footer className="py-20 px-4 bg-black/50 backdrop-blur-sm border-t border-pink-500/20">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-5 gap-12 mb-16">
          <div className="col-span-2">
            <motion.div className="flex items-center mb-6" whileHover={{ scale: 1.05 }}>
              <Bot className="w-8 h-8 text-pink-400 mr-3" />
              <div className="text-white font-bold text-2xl">AgentForge</div>
            </motion.div>
            <p className="text-gray-300 mb-8 leading-relaxed max-w-md">
              Empowering creators to build, deploy, and monetize AI agents on the blockchain. Join the future of
              decentralized AI automation.
            </p>
            <div className="flex space-x-4">
              {[Twitter, Github, Discord, Linkedin, Mail].map((Icon, index) => (
                <motion.div key={index} whileHover={{ scale: 1.2, y: -2 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-gray-400 hover:text-pink-400 hover:bg-pink-500/10 rounded-full"
                  >
                    <Icon className="w-5 h-5" />
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>

          {[
            {
              title: "Product",
              links: ["Features", "Pricing", "Templates", "Marketplace", "API"],
            },
            {
              title: "Blockchain",
              links: ["Ethereum", "Polygon", "Solana", "Arbitrum", "Optimism"],
            },
            {
              title: "Resources",
              links: ["Documentation", "Tutorials", "Blog", "Community", "Support"],
            },
            {
              title: "Company",
              links: ["About", "Careers", "Press", "Contact", "Privacy"],
            },
          ].map((section, index) => (
            <div key={index}>
              <h3 className="text-white font-semibold mb-6 text-lg">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <motion.li key={linkIndex} whileHover={{ x: 5 }}>
                    <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors cursor-pointer">
                      {link}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <motion.div
          className="border-t border-pink-500/20 pt-8 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 text-sm">© 2024 AgentForge. All rights reserved. Built on Web3.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {["Terms of Service", "Privacy Policy", "Cookie Policy"].map((link, index) => (
              <motion.a
                key={index}
                href="#"
                className="text-gray-400 hover:text-pink-400 text-sm transition-colors cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                {link}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
