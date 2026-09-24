import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import * as React from "react"
import { cn } from "@/lib/utils"

interface FloatingParticle {
  id: number
  left: number
  top: number
  size: number
  depth: number
  duration: number
  delay: number
  color: string
}

const particleColors = [
  "rgba(168, 85, 247, 0.9)",
  "rgba(236, 72, 153, 0.85)",
  "rgba(59, 130, 246, 0.85)",
  "rgba(45, 212, 191, 0.8)",
]

function createParticles(count: number): FloatingParticle[] {
  return Array.from({ length: count }, (_, id) => ({
    id,
    left: 4 + Math.random() * 92,
    top: 4 + Math.random() * 92,
    size: 2 + Math.random() * 7,
    depth: 0.35 + Math.random() * 1.4,
    duration: 8 + Math.random() * 10,
    delay: Math.random() * -12,
    color: particleColors[id % particleColors.length],
  }))
}

export function Floating3DParticles({
  count = 32,
  className,
}: {
  count?: number
  className?: string
}) {
  const [particles, setParticles] = React.useState<FloatingParticle[]>([])
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const smoothX = useSpring(pointerX, { stiffness: 35, damping: 20 })
  const smoothY = useSpring(pointerY, { stiffness: 35, damping: 20 })
  const rotateX = useTransform(smoothY, [-1, 1], [5, -5])
  const rotateY = useTransform(smoothX, [-1, 1], [-7, 7])

  React.useEffect(() => {
    setParticles(createParticles(count))

    const handlePointerMove = (event: PointerEvent) => {
      pointerX.set((event.clientX / window.innerWidth) * 2 - 1)
      pointerY.set((event.clientY / window.innerHeight) * 2 - 1)
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true })
    return () => window.removeEventListener("pointermove", handlePointerMove)
  }, [count, pointerX, pointerY])

  return (
    <motion.div
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed inset-0 z-0 overflow-hidden [perspective:1000px]",
        className
      )}
      style={{ rotateX, rotateY }}
    >
      <div className="absolute inset-[-12%] [transform-style:preserve-3d]">
        {particles.map((particle) => (
          <motion.span
            key={particle.id}
            className="absolute rounded-full [transform-style:preserve-3d]"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              width: particle.size,
              height: particle.size,
              zIndex: Math.round(particle.depth * 10),
              backgroundColor: particle.color,
              boxShadow: `0 0 ${particle.size * 3}px ${particle.color}`,
            }}
            animate={{
              x: [0, 24 * particle.depth, -16 * particle.depth, 0],
              y: [0, -48 * particle.depth, 20 * particle.depth, 0],
              z: [0, 80 * particle.depth, -30 * particle.depth, 0],
              scale: [0.7, 1.2, 0.85, 0.7],
              opacity: [0.15, 0.9, 0.3, 0.15],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
    </motion.div>
  )
}
