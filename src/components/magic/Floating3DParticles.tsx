import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import * as React from "react"
import { cn } from "@/lib/utils"

interface FloatingParticle {
  id: number
  x: number
  y: number
  z: number
  size: number
  depth: number
  duration: number
  delay: number
  color: string
}

const particleColors = [
  "rgba(168, 85, 247, 0.45)",
  "rgba(236, 72, 153, 0.4)",
  "rgba(59, 130, 246, 0.4)",
  "rgba(45, 212, 191, 0.35)",
]

function createParticles(count: number): FloatingParticle[] {
  return Array.from({ length: count }, (_, id) => ({
    id,
    x: Math.random() * 100,
    y: Math.random() * 100,
    z: Math.random() * 80 - 40,
    size: 2 + Math.random() * 4,
    depth: 0.3 + Math.random() * 1.2,
    duration: 12 + Math.random() * 14,
    delay: Math.random() * -15,
    color: particleColors[id % particleColors.length],
  }))
}

export function Floating3DParticles({
  count = 35,
  className,
}: {
  count?: number
  className?: string
}) {
  const [particles, setParticles] = React.useState<FloatingParticle[]>([])
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const smoothX = useSpring(pointerX, { stiffness: 30, damping: 25 })
  const smoothY = useSpring(pointerY, { stiffness: 30, damping: 25 })
  const rotateX = useTransform(smoothY, [-1, 1], [3, -3])
  const rotateY = useTransform(smoothX, [-1, 1], [-4, 4])

  React.useEffect(() => {
    setParticles(createParticles(count))

    let rafId: number
    let lastX = 0
    let lastY = 0

    const handlePointerMove = (event: PointerEvent) => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        const x = (event.clientX / window.innerWidth) * 2 - 1
        const y = (event.clientY / window.innerHeight) * 2 - 1
        if (Math.abs(x - lastX) > 0.001 || Math.abs(y - lastY) > 0.001) {
          pointerX.set(x)
          pointerY.set(y)
          lastX = x
          lastY = y
        }
      })
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true })
    return () => {
      window.removeEventListener("pointermove", handlePointerMove)
      cancelAnimationFrame(rafId)
    }
  }, [count, pointerX, pointerY])

  return (
    <motion.div
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed inset-0 z-0 overflow-hidden [perspective:1200px]",
        className
      )}
      style={{ rotateX, rotateY }}
    >
      <div className="absolute inset-[-15%] [transform-style:preserve-3d]">
        {particles.map((particle) => (
          <motion.span
            key={particle.id}
            className="absolute rounded-full will-change-transform"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
              z: particle.z,
              backgroundColor: particle.color,
              boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
            }}
            animate={{
              x: [0, 20 * particle.depth, -12 * particle.depth, 0],
              y: [0, -30 * particle.depth, 18 * particle.depth, 0],
              z: [particle.z, particle.z + 35 * particle.depth, particle.z - 20 * particle.depth, particle.z],
              rotateZ: [0, 90, 180, 270, 360],
              scale: [0.85, 1.1, 0.95, 0.85],
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

      <div
        className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl"
        style={{ willChange: "transform" }}
      />
    </motion.div>
  )
}