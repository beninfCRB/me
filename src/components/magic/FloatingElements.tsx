import { motion } from "framer-motion"
import * as React from "react"
import { cn } from "@/lib/utils"

interface FloatingElementProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  x?: number
  y?: number
}

export function FloatingElement({
  children,
  className,
  style,
  x = 20,
  y = 20,
}: FloatingElementProps) {
  return (
    <motion.div
      className={cn("", className)}
      style={style}
      animate={{
        y: [0, -y, 0],
        x: [0, x, 0],
      }}
      transition={{
        duration: 4,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse",
      }}
    >
      {children}
    </motion.div>
  )
}

export function FloatingCards() {
  const cards = [
    {
      icon: "💻",
      title: "Web Development",
      color: "from-blue-500 to-cyan-500",
      delay: 0,
      x: 30,
      y: 40,
    },
    {
      icon: "🚀",
      title: "Performance",
      color: "from-purple-500 to-pink-500",
      delay: 1,
      x: -40,
      y: 30,
    },
    {
      icon: "✨",
      title: "Modern UI",
      color: "from-orange-500 to-yellow-500",
      delay: 2,
      x: 20,
      y: 50,
    },
  ]

  return (
    <div className="relative hidden md:block">
      {cards.map((card, index) => (
        <FloatingElement
          key={index}
          x={card.x}
          y={card.y}
          className="absolute"
          style={{
            top: `${index * 120 + 60}px`,
            left: index % 2 === 0 ? "60px" : "auto",
            right: index % 2 === 1 ? "60px" : "auto",
          }}
        >
          <div
            className={cn(
              "flex items-center gap-3 rounded-xl bg-card/80 backdrop-blur-sm border border-border p-4 shadow-lg",
              "min-w-[200px]"
            )}
          >
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br text-lg",
                card.color
              )}
            >
              {card.icon}
            </div>
            <span className="font-medium text-sm">{card.title}</span>
          </div>
        </FloatingElement>
      ))}
    </div>
  )
}

export function GradientBlob({
  className,
  color = "primary",
  size = "md",
}: {
  className?: string
  color?: "primary" | "purple" | "pink" | "blue"
  size?: "sm" | "md" | "lg"
}) {
  const colors = {
    primary: "from-primary/30",
    purple: "from-purple-500/30",
    pink: "from-pink-500/30",
    blue: "from-blue-500/30",
  }
  const sizes = {
    sm: "w-64 h-64",
    md: "w-96 h-96",
    lg: "w-[500px] h-[500px]",
  }

  return (
    <motion.div
      className={cn(
        "rounded-full blur-3xl bg-gradient-to-r to-transparent animate-blob",
        colors[color],
        sizes[size],
        className
      )}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  )
}