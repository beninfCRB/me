import * as React from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import type { LucideIcon } from "lucide-react"
import { Reveal } from "@/components/magic/Reveal"
import { TiltCard } from "@/components/magic/TiltCard"
import { cn } from "@/lib/utils"

export interface TimelineEntry {
  id: string
  /** Role or degree. */
  title: string
  /** Company or institution. */
  subtitle: string
  period: string
  description?: string
  bullets?: string[]
}

/**
 * Asymmetric timeline: period column, rail, then the card. The rail fills as
 * the section scrolls, so the list visually progresses with the reader.
 */
export function Timeline({
  entries,
  icon: Icon,
}: {
  entries: TimelineEntry[]
  icon: LucideIcon
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 65%"],
  })
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.4,
  })

  return (
    <div ref={ref} className="relative mx-auto max-w-5xl">
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-[22px] w-px bg-gradient-to-b from-transparent via-foreground/[0.14] to-transparent md:left-[214px]"
      />
      <motion.div
        aria-hidden="true"
        style={{ scaleY }}
        className="absolute inset-y-0 left-[22px] w-px origin-top bg-gradient-to-b from-primary via-blue-500 to-sky-400 md:left-[214px]"
      />

      <ol className="space-y-6 md:space-y-8">
        {entries.map((entry, index) => (
          <li
            key={entry.id}
            className="relative grid gap-4 md:grid-cols-[10rem_2.75rem_1fr] md:gap-8"
          >
            <div className="hidden md:block md:pt-7 md:text-right">
              <span className="font-mono text-[0.7rem] leading-relaxed text-muted-foreground">
                {entry.period}
              </span>
            </div>

            <div className="relative flex md:justify-center">
              <Reveal direction="scale" distance={0} delay={index * 0.05}>
                <span className="relative grid h-11 w-11 place-items-center rounded-full border border-foreground/10 bg-background/70 backdrop-blur-md">
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 animate-pulse-ring rounded-full bg-primary/25"
                    style={{ animationDelay: `${index * 0.35}s` }}
                  />
                  <Icon className="relative h-[1.15rem] w-[1.15rem] text-primary" />
                </span>
              </Reveal>
            </div>

            <Reveal direction="left" delay={index * 0.05}>
              <TiltCard
                max={5}
                hoverScale={1.006}
                className="rounded-3xl glass-card"
              >
                <div className="relative overflow-hidden rounded-3xl p-6 md:p-7">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="font-display text-lg font-bold tracking-tight md:text-xl">
                        {entry.title}
                      </h3>
                      <p className="mt-0.5 text-sm font-medium text-primary">
                        {entry.subtitle}
                      </p>
                    </div>
                    <span className="w-fit shrink-0 rounded-full border border-foreground/10 bg-foreground/[0.03] px-3 py-1 font-mono text-[0.65rem] text-muted-foreground md:hidden">
                      {entry.period}
                    </span>
                  </div>

                  {entry.description ? (
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      {entry.description}
                    </p>
                  ) : null}

                  {entry.bullets?.length ? (
                    <ul className="mt-5 space-y-2.5">
                      {entry.bullets.map((bullet, bulletIndex) => (
                        <li
                          key={bullet}
                          className="flex items-start gap-3 text-sm"
                        >
                          <span
                            className={cn(
                              "mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full",
                              bulletIndex === 0
                                ? "bg-primary shadow-glow"
                                : "bg-foreground/25"
                            )}
                          />
                          <span className="leading-relaxed text-muted-foreground">
                            {bullet}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </TiltCard>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  )
}
