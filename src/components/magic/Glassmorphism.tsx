import { motion } from "framer-motion"
import * as React from "react"
import { cn } from "@/lib/utils"

interface GlassmorphismProps {
  children: React.ReactNode
  className?: string
  blur?: "sm" | "md" | "lg" | "xl"
  opacity?: number
}

export function Glassmorphism({
  children,
  className,
  blur = "md",
  opacity = 0.7,
}: GlassmorphismProps) {
  const blurs = {
    sm: "backdrop-blur-sm",
    md: "backdrop-blur-md",
    lg: "backdrop-blur-lg",
    xl: "backdrop-blur-xl",
  }

  return (
    <div
      className={cn(
        "border border-white/20 dark:border-white/10 shadow-lg",
        blurs[blur],
        className
      )}
      style={{ background: `rgba(255, 255, 255, ${opacity})` }}
    >
      {children}
    </div>
  )
}

export function GlassCard({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      className={cn(
        "relative overflow-hidden rounded-xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm",
        "shadow-lg transition-all duration-300 hover:shadow-xl hover:border-primary/30",
        "before:absolute before:inset-0 before:rounded-xl before:p-[1px] before:content-['']",
        "before:bg-gradient-to-br before:from-primary/20 before:to-transparent before:opacity-0 before:transition-opacity before:hover:opacity-100",
        className
      )}
    >
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}

export function Marquee({
  children,
  speed = 40,
  className,
}: {
  children: React.ReactNode
  speed?: number
  className?: string
}) {
  return (
    <div className={cn("relative overflow-hidden w-full", className)}>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-background to-transparent" />
      <div
        className="flex w-max animate-marquee"
        style={{ animationDuration: `${speed}s` }}
      >
        {children}
        {children}
      </div>
    </div>
  )
}

export function MarqueeReverse({
  children,
  speed = 40,
  className,
}: {
  children: React.ReactNode
  speed?: number
  className?: string
}) {
  return (
    <div className={cn("relative overflow-hidden w-full", className)}>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-background to-transparent" />
      <div
        className="flex w-max animate-marquee2"
        style={{ animationDuration: `${speed}s` }}
      >
        {children}
        {children}
      </div>
    </div>
  )
}