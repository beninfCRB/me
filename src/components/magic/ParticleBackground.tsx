import { motion } from "framer-motion"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Floating3DParticles } from "@/components/magic/Floating3DParticles"

interface Particle {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  color: string
}

const generateParticles = (count: number): Particle[] => {
  const colors = [
    "rgba(168, 85, 247, 0.4)",
    "rgba(192, 132, 252, 0.3)",
    "rgba(236, 72, 153, 0.3)",
    "rgba(59, 130, 246, 0.3)",
    "rgba(16, 185, 129, 0.3)",
  ]
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 5,
    color: colors[Math.floor(Math.random() * colors.length)],
  }))
}

export function ParticleBackground({
  particleCount = 30,
  className,
}: {
  particleCount?: number
  className?: string
}) {
  const [particles, setParticles] = React.useState<Particle[]>([])

  React.useEffect(() => {
    setParticles(generateParticles(particleCount))
  }, [particleCount])

  return (
    <div
      className={cn(
        "fixed inset-0 -z-10 overflow-hidden pointer-events-none",
        className
      )}
    >
      {/* Gradient Orbs */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-40"
        style={{
          background: "radial-gradient(circle, rgba(168,85,247,0.4), transparent 70%)",
          top: "-15%",
          left: "-10%",
        }}
        animate={{
          x: [0, 100, 50, 0],
          y: [0, 50, 100, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-30"
        style={{
          background: "radial-gradient(circle, rgba(236,72,153,0.4), transparent 70%)",
          top: "40%",
          right: "-10%",
        }}
        animate={{
          x: [0, -80, -30, 0],
          y: [0, 60, -40, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      <motion.div
        className="absolute w-[450px] h-[450px] rounded-full blur-[100px] opacity-25"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.4), transparent 70%)",
          bottom: "-10%",
          left: "30%",
        }}
        animate={{
          x: [0, 60, -40, 0],
          y: [0, -50, 30, 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />

      {/* Animated Grid */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Moving Grid Overlay */}
      <motion.div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
        animate={{
          backgroundPosition: ["0 0", "60px 60px"],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, 50, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle at 50% 50%, transparent 0%, rgba(0,0,0,0.3) 100%)",
        }}
      />
    </div>
  )
}

export function AnimatedBackground({
  children,
  particleCount = 30,
  className,
}: {
  children: React.ReactNode
  particleCount?: number
  className?: string
}) {
  return (
    <div className={cn("relative min-h-screen", className)}>
      <ParticleBackground particleCount={particleCount} />
      <Floating3DParticles count={36} />
      {children}
    </div>
  )
}
