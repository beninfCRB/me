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
      {/* Animated gradient mesh */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full blur-[150px] opacity-30"
        style={{
          background: "radial-gradient(circle, rgba(168,85,247,0.35), transparent 70%)",
          top: "-25%",
          left: "-15%",
        }}
        animate={{
          x: [0, 150, 80, 0],
          y: [0, 80, 150, 0],
          scale: [1, 1.3, 0.85, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute w-[700px] h-[700px] rounded-full blur-[130px] opacity-25"
        style={{
          background: "radial-gradient(circle, rgba(236,72,153,0.35), transparent 70%)",
          top: "35%",
          right: "-20%",
        }}
        animate={{
          x: [0, -120, -50, 0],
          y: [0, 90, -60, 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.35), transparent 70%)",
          bottom: "-15%",
          left: "25%",
        }}
        animate={{
          x: [0, 90, -50, 0],
          y: [0, -70, 40, 0],
          scale: [1, 1.25, 0.85, 1],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />

      {/* Animated Grid */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      <motion.div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
        animate={{
          backgroundPosition: ["0 0", "80px 80px"],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Ambient particles */}
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
            y: [0, -120, 0],
            x: [0, 60, 0],
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
          background: "radial-gradient(circle at 50% 50%, transparent 0%, rgba(0,0,0,0.4) 100%)",
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
      <Floating3DParticles count={60} />
      {children}
    </div>
  )
}