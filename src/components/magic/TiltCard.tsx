import * as React from "react"
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion"
import { cn } from "@/lib/utils"
import { SILK } from "@/lib/motion"

interface TiltCardProps {
  children: React.ReactNode
  /** Applied to the rotating surface — put the radius here so overlays inherit it. */
  className?: string
  wrapperClassName?: string
  /** Maximum rotation in degrees at the extremes. */
  max?: number
  hoverScale?: number
  glare?: boolean
  spotlight?: boolean
  /** Extra translateZ so inner layers can pop toward the viewer. */
  depth?: number
}

/**
 * Pointer-driven 3D tilt with a moving specular glare and a coloured
 * spotlight. Springs keep the motion from feeling like a raw mousemove.
 */
export function TiltCard({
  children,
  className,
  wrapperClassName,
  max = 9,
  hoverScale = 1.015,
  glare = true,
  spotlight = true,
  depth = 0,
}: TiltCardProps) {
  const reduce = useReducedMotion()
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const config = { stiffness: 190, damping: 22, mass: 0.5 }
  const sx = useSpring(px, config)
  const sy = useSpring(py, config)

  const rotateY = useTransform(sx, [0, 1], [-max, max])
  const rotateX = useTransform(sy, [0, 1], [max, -max])

  const posX = useTransform(sx, (value) => `${value * 100}%`)
  const posY = useTransform(sy, (value) => `${value * 100}%`)
  const glareBg = useMotionTemplate`radial-gradient(300px circle at ${posX} ${posY}, rgba(255,255,255,0.16), transparent 62%)`
  const spotBg = useMotionTemplate`radial-gradient(360px circle at ${posX} ${posY}, hsl(var(--primary) / 0.18), transparent 68%)`

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduce) return
    const rect = event.currentTarget.getBoundingClientRect()
    px.set((event.clientX - rect.left) / rect.width)
    py.set((event.clientY - rect.top) / rect.height)
  }

  const handlePointerLeave = () => {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <div
      className={cn("relative [perspective:1100px]", wrapperClassName)}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <motion.div
        className={cn("group relative h-full w-full", className)}
        style={
          reduce
            ? undefined
            : {
                rotateX,
                rotateY,
                z: depth,
                transformStyle: "preserve-3d",
              }
        }
        whileHover={reduce ? undefined : { scale: hoverScale }}
        transition={{ duration: 0.45, ease: SILK }}
      >
        {children}
        {spotlight ? (
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: spotBg }}
          />
        ) : null}
        {glare ? (
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 mix-blend-soft-light transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: glareBg }}
          />
        ) : null}
      </motion.div>
    </div>
  )
}

interface SpotlightCardProps {
  children: React.ReactNode
  className?: string
}

/**
 * Cheaper cousin of TiltCard: only the cursor spotlight moves, no rotation.
 * Good for dense grids where tilting everything gets noisy.
 */
export function SpotlightCard({ children, className }: SpotlightCardProps) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const background = useMotionTemplate`radial-gradient(420px circle at ${x}px ${y}px, hsl(var(--primary) / 0.14), transparent 70%)`

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    x.set(event.clientX - rect.left)
    y.set(event.clientY - rect.top)
  }

  return (
    <div
      onPointerMove={handlePointerMove}
      className={cn("group relative overflow-hidden", className)}
    >
      <motion.span
        aria-hidden="true"
        style={{ background }}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  )
}
