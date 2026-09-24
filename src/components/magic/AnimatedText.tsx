import * as React from "react"
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion"
import { cn } from "@/lib/utils"
import { SILK } from "@/lib/motion"

/**
 * Animated gradient wordmark. Sweeps a sky → blue → indigo ramp.
 */
export function GradientText({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span className={cn("text-gradient-art", className)}>{children}</span>
  )
}

interface MaskedLinesProps {
  lines: string[]
  className?: string
  lineClassName?: string
  delay?: number
  stagger?: number
}

/**
 * Line-by-line mask reveal with a 3D hinge. Used for the hero wordmark.
 * Animates on mount, so it plays as the page opens.
 */
export function MaskedLines({
  lines,
  className,
  lineClassName,
  delay = 0,
  stagger = 0.12,
}: MaskedLinesProps) {
  const reduce = useReducedMotion()

  return (
    <span className={cn("block", className)}>
      {lines.map((line, index) => (
        <span
          key={`${line}-${index}`}
          className="block overflow-hidden pb-[0.12em] [perspective:900px]"
        >
          <motion.span
            className={cn("block will-change-transform", lineClassName)}
            initial={reduce ? undefined : { y: "118%", rotateX: 52, opacity: 0 }}
            animate={reduce ? undefined : { y: "0%", rotateX: 0, opacity: 1 }}
            transition={{
              duration: 1.05,
              delay: delay + index * stagger,
              ease: SILK,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

const letterVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.04, duration: 0.5, ease: SILK },
  }),
}

interface AnimatedTextProps {
  text: string
  className?: string
  as?: "h1" | "h2" | "h3" | "p" | "span"
  delay?: number
}

/**
 * Per-character stagger. Best kept to short labels — it gets noisy on
 * long strings, use {@link MaskedLines} for those.
 */
export function AnimatedText({
  text,
  className,
  as: Tag = "h1",
  delay = 0,
}: AnimatedTextProps) {
  return (
    <Tag className={className}>
      {text.split("").map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          variants={letterVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={index + delay}
          style={{ display: char === " " ? "inline" : "inline-block" }}
        >
          {char}
        </motion.span>
      ))}
    </Tag>
  )
}

const wordContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
}

const wordChild: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: SILK },
  },
}

export function WordFadeUp({
  words,
  className,
}: {
  words: string
  className?: string
}) {
  const reduce = useReducedMotion()
  const wordArray = words.split(" ")

  if (reduce) {
    return <div className={className}>{words}</div>
  }

  return (
    <motion.div
      variants={wordContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={cn("flex flex-wrap gap-x-[0.3em]", className)}
    >
      {wordArray.map((word, index) => (
        <motion.span key={`${word}-${index}`} variants={wordChild} className="inline-block">
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}

interface RotatingWordsProps {
  words: string[]
  interval?: number
  className?: string
}

/**
 * Cycles through role titles, sized to the longest entry so the layout
 * never reflows mid-transition.
 */
export function RotatingWords({
  words,
  interval = 2800,
  className,
}: RotatingWordsProps) {
  const reduce = useReducedMotion()
  const [index, setIndex] = React.useState(0)
  const longest = React.useMemo(
    () => words.reduce((a, b) => (a.length >= b.length ? a : b), ""),
    [words]
  )

  React.useEffect(() => {
    if (reduce || words.length < 2) return
    const id = window.setInterval(
      () => setIndex((current) => (current + 1) % words.length),
      interval
    )
    return () => window.clearInterval(id)
  }, [interval, reduce, words.length])

  return (
    <span className={cn("relative inline-grid overflow-hidden", className)}>
      <span aria-hidden="true" className="invisible">
        {longest}
      </span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={words[index]}
          className="absolute inset-0"
          initial={reduce ? undefined : { opacity: 0, y: "0.7em", filter: "blur(10px)" }}
          animate={reduce ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={reduce ? undefined : { opacity: 0, y: "-0.7em", filter: "blur(10px)" }}
          transition={{ duration: 0.6, ease: SILK }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
