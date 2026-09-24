import * as React from "react"
import { motion, useReducedMotion, type Variants } from "framer-motion"
import { cn } from "@/lib/utils"
import { SILK } from "@/lib/motion"

export type RevealDirection =
  | "up"
  | "down"
  | "left"
  | "right"
  | "scale"
  | "blur"

interface RevealProps {
  children: React.ReactNode
  className?: string
  direction?: RevealDirection
  delay?: number
  duration?: number
  distance?: number
  amount?: number
  once?: boolean
}

function hiddenState(direction: RevealDirection, distance: number) {
  switch (direction) {
    case "up":
      return { opacity: 0, y: distance, filter: "blur(6px)" }
    case "down":
      return { opacity: 0, y: -distance, filter: "blur(6px)" }
    case "left":
      return { opacity: 0, x: distance, filter: "blur(6px)" }
    case "right":
      return { opacity: 0, x: -distance, filter: "blur(6px)" }
    case "scale":
      return { opacity: 0, scale: 0.9, filter: "blur(8px)" }
    case "blur":
      return { opacity: 0, filter: "blur(14px)" }
    default:
      return { opacity: 0, y: distance }
  }
}

const RESTING = { opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" }

/**
 * Single-element scroll reveal. Blurs out of focus as it rises, which reads
 * far more cinematic than a plain opacity fade.
 */
export function Reveal({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 0.85,
  distance = 34,
  amount = 0.25,
  once = true,
}: RevealProps) {
  const reduce = useReducedMotion()

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={hiddenState(direction, distance)}
      whileInView={RESTING}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: SILK }}
    >
      {children}
    </motion.div>
  )
}

interface RevealGroupProps {
  children: React.ReactNode
  className?: string
  stagger?: number
  delayChildren?: number
  amount?: number
  once?: boolean
}

const containerVariants = (
  stagger: number,
  delayChildren: number
): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: stagger, delayChildren },
  },
})

const childVariants: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: SILK },
  },
}

/**
 * Reveals children one after another. Pair with `RevealItem`.
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.09,
  delayChildren = 0.05,
  amount = 0.2,
  once = true,
}: RevealGroupProps) {
  const reduce = useReducedMotion()

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      variants={containerVariants(stagger, delayChildren)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  )
}

export function RevealItem({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.div variants={childVariants} className={cn(className)}>
      {children}
    </motion.div>
  )
}
