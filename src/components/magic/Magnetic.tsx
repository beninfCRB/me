import * as React from "react"
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion"
import { cn } from "@/lib/utils"

interface MagneticProps {
  children: React.ReactNode
  className?: string
  /** 0 = no pull, 1 = element tracks the cursor exactly. */
  strength?: number
  /** Rotation tilt added on top of the translate. */
  tilt?: number
}

/**
 * Pulls its children toward the cursor and tilts slightly, then springs back.
 * Reserved for primary actions so the effect stays special.
 */
export function Magnetic({
  children,
  className,
  strength = 0.32,
  tilt = 6,
}: MagneticProps) {
  const reduce = useReducedMotion()
  const ref = React.useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotate = useMotionValue(0)

  const config = { stiffness: 240, damping: 18, mass: 0.45 }
  const sx = useSpring(x, config)
  const sy = useSpring(y, config)
  const sRotate = useSpring(rotate, config)

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduce) return
    const node = ref.current
    if (!node) return
    const rect = node.getBoundingClientRect()
    const offsetX = event.clientX - (rect.left + rect.width / 2)
    const offsetY = event.clientY - (rect.top + rect.height / 2)
    x.set(offsetX * strength)
    y.set(offsetY * strength)
    rotate.set((offsetX / rect.width) * tilt)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
    rotate.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      style={reduce ? undefined : { x: sx, y: sy, rotate: sRotate }}
      className={cn("inline-flex", className)}
    >
      {children}
    </motion.div>
  )
}
