"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Check, Star, Crown, Shield } from "lucide-react"

const plans = [
	{
		name: "Starter",
		price: "Free",
		period: "forever",
		description: "Perfect for exploring Web3 AI agents",
		features: [
			"3 AI agents",
			"Basic blockchain deployment",
			"Community templates",
			"Discord support",
			"Testnet deployment",
		],
		cta: "Start Free",
		popular: false,
		icon: Star,
	},
	{
		name: "Creator",
		price: "0.1 ETH",
		period: "per month",
		description: "For serious Web3 builders",
		features: [
			"Unlimited AI agents",
			"Multi-chain deployment",
			"Premium templates & tools",
			"Priority support",
			"Custom tokenomics",
			"DAO governance tools",
			"NFT marketplace access",
			"Revenue sharing",
			"Advanced analytics",
		],
		cta: "Start Creating",
		popular: true,
		icon: Crown,
	},
	{
		name: "Enterprise",
		price: "Custom",
		period: "contact us",
		description: "For large organizations and DAOs",
		features: [
			"Everything in Creator",
			"White-label solution",
			"Dedicated blockchain nodes",
			"Custom smart contracts",
			"Enterprise security",
			"SLA guarantees",
			"Custom integrations",
			"Institutional support",
			"Compliance tools",
		],
		cta: "Contact Sales",
		popular: false,
		icon: Shield,
	},
]

export function Pricing() {
	return (
		<section id="pricing" className="py-32 px-4 bg-black/30 backdrop-blur-sm">
			<div className="max-w-7xl mx-auto">
				<motion.div
					className="text-center mb-20"
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
				>
					<h2 className="text-5xl md:text-6xl font-bold text-white mb-8 ">
						Choose Your Plan
					</h2>
					<p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
						Start free and scale with crypto payments. All transactions on-chain.
					</p>
				</motion.div>

				<div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto ">
					{plans.map((plan, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 50 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: index * 0.2 }}
							viewport={{ once: true }}
							whileHover={{ y: -10, scale: plan.popular ? 1.02 : 1.01 }}
						>
							<Card
								className={`relative bg-gradient-to-b from-gray-800/90 to-gray-900/95 border-gray-700 shadow-lg transition-all duration-500 h-full overflow-hidden 
                  ${plan.popular ? "ring-2 ring-pink-500/50 scale-105" : ""}`}
							>
								{plan.popular && (
									<motion.div
										className="absolute -top-4 left-1/2 transform -translate-x-1/2"
										initial={{ scale: 0 }}
										animate={{ scale: 1 }}
										transition={{ delay: 0.5, type: "spring" }}
									>
										<div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center">
											<Crown className="w-4 h-4 mr-2" />
											Most Popular
										</div>
									</motion.div>
								)}

								<CardHeader className="text-center pb-8 pt-8 text-white">
									<motion.div
										className="flex justify-center mb-4"
										whileHover={{ rotate: 360 }}
										transition={{ duration: 0.6 }}
									>
										<div className="bg-gradient-to-r from-pink-500/20 to-purple-600/20 rounded-full p-3">
											<plan.icon className="w-6 h-6 text-pink-400" />
										</div>
									</motion.div>
									<CardTitle className="text-white text-2xl mb-2">
										{plan.name}
									</CardTitle>
									<div className="text-white">
										<span className="text-5xl font-bold">{plan.price}</span>
										<span className="text-gray-400 ml-2">
											{plan.period}
										</span>
									</div>
									<p className="text-gray-300 mt-3">
										{plan.description}
									</p>
								</CardHeader>

								<CardContent className="pt-0 text-white">
									<ul className="space-y-4 mb-8">
										{plan.features.map((feature, featureIndex) => (
											<motion.li
												key={featureIndex}
												className="flex items-center text-gray-200"
												initial={{ opacity: 0, x: -20 }}
												whileInView={{ opacity: 1, x: 0 }}
												transition={{ delay: featureIndex * 0.1 }}
												viewport={{ once: true }}
											>
												<Check className="w-5 h-5 text-pink-400 mr-3 flex-shrink-0" />
												{feature}
											</motion.li>
										))}
									</ul>

									<motion.div
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
									>
										<Button
											className={`w-full ${
												plan.popular
													? "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
													: "bg-white/10 border border-pink-500/20 text-white hover:bg-pink-500/20"
											} font-semibold py-3 rounded-full`}
											size="lg"
										>
											{plan.cta}
										</Button>
									</motion.div>
								</CardContent>
							</Card>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	)
}
