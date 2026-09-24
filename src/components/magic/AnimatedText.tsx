import { motion, type Variants } from "framer-motion"
import * as React from "react"
import { cn } from "@/lib/utils"

interface AnimatedTextProps {
  text: string
  className?: string
  as?: "h1" | "h2" | "h3" | "p" | "span"
  delay?: number
  duration?: number
}

const letterVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.5, ease: "easeOut" },
  }),
}

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
          key={index}
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

export function GradientText({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        "bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent bg-size-200 animate-gradient-shift",
        className
      )}
    >
      {children}
    </span>
  )
}

const wordContainer: Variants = {
  hidden: { opacity: 0 },
  visible: (i: number = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.12 * i },
  }),
}

const wordChild: Variants = {
  visible: {
    opacity: 1,
    y: 0,
    transition: { ease: "easeOut", duration: 0.6 },
  },
  hidden: {
    opacity: 0,
    y: 20,
    transition: { ease: "easeIn", duration: 0.6 },
  },
}

export function WordFadeUp({
  words,
  className,
}: {
  words: string
  className?: string
}) {
  const wordArray = words.split(" ")

  return (
    <motion.div
      variants={wordContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={cn("flex flex-wrap gap-x-2", className)}
    >
      {wordArray.map((word, index) => (
        <motion.span key={index} variants={wordChild} className="inline-block">
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}