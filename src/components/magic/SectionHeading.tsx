import * as React from "react"
import { motion, useReducedMotion, type Variants } from "framer-motion"
import { cn } from "@/lib/utils"
import { SILK, VIEWPORT } from "@/lib/motion"

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
}

const wordVariant: Variants = {
  hidden: { y: "115%", opacity: 0, rotateX: 45 },
  visible: {
    y: "0%",
    opacity: 1,
    rotateX: 0,
    transition: { duration: 0.95, ease: SILK },
  },
}

interface SectionHeadingProps {
  title: string
  subtitle?: string
  /** Small mono label above the title, e.g. "Featured work". */
  eyebrow?: string
  /** Editorial index, e.g. "02". */
  index?: string
  align?: "left" | "center"
  className?: string
  titleClassName?: string
  children?: React.ReactNode
}

/**
 * Word-by-word mask reveal with a slight 3D hinge, so headings feel set in
 * space rather than simply faded in.
 */
export function SectionHeading({
  title,
  subtitle,
  eyebrow,
  index,
  align = "center",
  className,
  titleClassName,
  children,
}: SectionHeadingProps) {
  const reduce = useReducedMotion()
  const words = title.split(" ")
  const centered = align === "center"

  return (
    <div
      className={cn(
        "relative mb-14 md:mb-20",
        centered && "text-center",
        className
      )}
    >
      <div
        className={cn(
          "flex items-center gap-3",
          centered && "justify-center"
        )}
      >
        {index ? (
          <span className="font-mono text-xs font-semibold tracking-[0.3em] text-primary">
            {index}
          </span>
        ) : null}
        <motion.span
          initial={reduce ? undefined : { scaleX: 0 }}
          whileInView={reduce ? undefined : { scaleX: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.8, ease: SILK }}
          className="h-px w-10 origin-left bg-gradient-to-r from-primary to-transparent"
        />
        {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      </div>

      <motion.h2
        variants={reduce ? undefined : container}
        initial={reduce ? undefined : "hidden"}
        whileInView={reduce ? undefined : "visible"}
        viewport={VIEWPORT}
        className={cn(
          "mt-5 font-display font-bold tracking-[-0.03em] text-balance",
          "text-4xl leading-[1.05] md:text-5xl lg:text-6xl [perspective:800px]",
          titleClassName
        )}
      >
        {words.map((word, wordIndex) => (
          <span
            key={`${word}-${wordIndex}`}
            className="inline-block overflow-hidden pb-[0.14em] align-bottom"
          >
            <motion.span
              variants={reduce ? undefined : wordVariant}
              className="inline-block will-change-transform"
            >
              {word}
              {wordIndex < words.length - 1 ? "\u00A0" : ""}
            </motion.span>
          </span>
        ))}
      </motion.h2>

      {subtitle ? (
        <motion.p
          initial={reduce ? undefined : { opacity: 0, y: 18, filter: "blur(6px)" }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={VIEWPORT}
          transition={{ duration: 0.8, delay: 0.25, ease: SILK }}
          className={cn(
            "mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg text-pretty",
            centered && "mx-auto"
          )}
        >
          {subtitle}
        </motion.p>
      ) : null}

      {children}
    </div>
  )
}

/**
 * Consistent vertical rhythm + an optional soft glow behind a section.
 */
export function SectionShell({
  id,
  children,
  className,
  glow,
}: {
  id?: string
  children: React.ReactNode
  className?: string
  glow?: "violet" | "fuchsia" | "cyan"
}) {
  const glowClass = glow
    ? {
        violet: "from-primary/25",
        fuchsia: "from-fuchsia-500/20",
        cyan: "from-cyan-400/20",
      }[glow]
    : null

  return (
    <section id={id} className={cn("relative py-24 md:py-32", className)}>
      {glowClass ? (
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute -top-24 left-1/2 -z-10 h-72 w-[42rem] max-w-full -translate-x-1/2 rounded-full bg-gradient-to-b to-transparent blur-[110px]",
            glowClass
          )}
        />
      ) : null}
      <div className="container relative mx-auto px-4">{children}</div>
    </section>
  )
}
