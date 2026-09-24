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
  "rgba(168, 85, 247, 0.9)",
  "rgba(236, 72, 153, 0.85)",
  "rgba(59, 130, 246, 0.85)",
  "rgba(45, 212, 191, 0.8)",
  "rgba(250, 204, 21, 0.8)",
]

function createParticles(count: number): FloatingParticle[] {
  return Array.from({ length: count }, (_, id) => ({
    id,
    x: Math.random() * 100,
    y: Math.random() * 100,
    z: Math.random() * 100 - 50,
    size: 2 + Math.random() * 6,
    depth: 0.25 + Math.random() * 1.75,
    duration: 10 + Math.random() * 12,
    delay: Math.random() * -15,
    color: particleColors[id % particleColors.length],
  }))
}

export function Floating3DParticles({
  count = 50,
  className,
}: {
  count?: number
  className?: string
}) {
  const [particles, setParticles] = React.useState<FloatingParticle[]>([])
  const [ripples, setRipples] = React.useState<{ id: number; x: number; y: number }[]>([])
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const smoothX = useSpring(pointerX, { stiffness: 40, damping: 18 })
  const smoothY = useSpring(pointerY, { stiffness: 40, damping: 18 })
  const rotateX = useTransform(smoothY, [-1, 1], [6, -6])
  const rotateY = useTransform(smoothX, [-1, 1], [-8, 8])
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    setParticles(createParticles(count))

    const handlePointerMove = (event: PointerEvent) => {
      pointerX.set((event.clientX / window.innerWidth) * 2 - 1)
      pointerY.set((event.clientY / window.innerHeight) * 2 - 1)
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true })
    return () => window.removeEventListener("pointermove", handlePointerMove)
  }, [count, pointerX, pointerY])

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100
    const newRipple = { id: Date.now(), x, y }
    setRipples((prev) => [...prev, newRipple])
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id))
    }, 1200)
  }

  return (
    <motion.div
      ref={containerRef}
      aria-hidden="true"
      onClick={handleClick}
      className={cn(
        "fixed inset-0 z-0 overflow-hidden [perspective:1200px] cursor-crosshair",
        className
      )}
      style={{ rotateX, rotateY }}
    >
      <div className="absolute inset-[-15%] [transform-style:preserve-3d]">
        {particles.map((particle) => (
          <motion.span
            key={particle.id}
            className="absolute rounded-full [transform-style:preserve-3d]"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
              z: particle.z,
              backgroundColor: particle.color,
              boxShadow: `0 0 ${particle.size * 4}px ${particle.color}, 0 0 ${particle.size * 6}px ${particle.color}`,
            }}
            animate={{
              x: [0, 30 * particle.depth, -20 * particle.depth, 0],
              y: [0, -60 * particle.depth, 25 * particle.depth, 0],
              z: [particle.z, particle.z + 60 * particle.depth, particle.z - 40 * particle.depth, particle.z],
              rotateZ: [0, 180, 360],
              scale: [0.6, 1.3, 0.9, 0.6],
              opacity: [0.1, 1, 0.35, 0.1],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Connection lines */}
        <svg className="absolute inset-0 h-full w-full opacity-20">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(168, 85, 247, 0.4)" />
              <stop offset="100%" stopColor="rgba(236, 72, 153, 0.2)" />
            </linearGradient>
          </defs>
          {particles.slice(0, 12).map((p1, i) =>
            particles.slice(i + 1, i + 4).map((p2, j) => (
              <motion.line
                key={`${p1.id}-${p2.id}-${j}`}
                x1={`${p1.x}%`}
                y1={`${p1.y}%`}
                x2={`${p2.x}%`}
                y2={`${p2.y}%`}
                stroke="url(#lineGradient)"
                strokeWidth="0.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: [0.1, 0.4, 0.1] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.2,
                }}
              />
            ))
          )}
        </svg>
      </div>

      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className="absolute rounded-full border border-primary/30 pointer-events-none"
          style={{
            left: `${ripple.x}%`,
            top: `${ripple.y}%`,
          }}
          initial={{ width: 0, height: 0, x: 0, y: 0, opacity: 1 }}
          animate={{ width: 300, height: 300, x: -150, y: -150, opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      ))}

      {/* Center glow */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]"
        style={{
          background: "radial-gradient(circle, rgba(168,85,247,0.25), transparent 70%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  )
}