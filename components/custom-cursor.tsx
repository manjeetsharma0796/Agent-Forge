"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)
    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    window.addEventListener("mousemove", updateMousePosition)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)

    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll("button, a, [role='button'], input, textarea")
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter)
      el.addEventListener("mouseleave", handleMouseLeave)
    })

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter)
        el.removeEventListener("mouseleave", handleMouseLeave)
      })
    }
  }, [])

  return (
    <>
      {/* Main Cursor - Large and Red */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 28,
        }}
      >
        <motion.div
          className="w-10 h-10 bg-red-500 rounded-full relative"
          animate={{
            scale: isClicking ? 0.7 : isHovering ? 1.4 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
        >
          {/* Inner dot */}
          <div className="absolute inset-3 bg-red-600 rounded-full" />

          {/* Outer glow */}
          <motion.div
            className="absolute inset-0 bg-red-500 rounded-full blur-md opacity-60"
            animate={{
              scale: isHovering ? 1.5 : 1,
              opacity: isHovering ? 0.8 : 0.6,
            }}
          />
        </motion.div>
      </motion.div>

      {/* Hover Ring */}
      {isHovering && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-40"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
            x: mousePosition.x - 30,
            y: mousePosition.y - 30,
          }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
        >
          <div className="w-16 h-16 border-2 border-red-400/50 rounded-full animate-pulse" />
        </motion.div>
      )}
    </>
  )
}
