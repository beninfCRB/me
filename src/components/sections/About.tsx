import * as React from "react"
import { useInView } from "framer-motion"
import {
  Award,
  Briefcase,
  Calendar,
  Compass,
  GraduationCap,
  MapPin,
  Sparkles,
} from "lucide-react"
import { SectionHeading, SectionShell } from "@/components/magic/SectionHeading"
import { Reveal, RevealGroup, RevealItem } from "@/components/magic/Reveal"
import { TiltCard, SpotlightCard } from "@/components/magic/TiltCard"
import { Avatar } from "@/components/ui/avatar"
import { GridPattern } from "@/components/magic/GridPattern"
import { personal } from "@/data/portfolio"
import { cn } from "@/lib/utils"

interface Stat {
  value: number
  decimals?: number
  prefix?: string
  suffix?: string
  label: string
}

const STATS: Stat[] = [
  { value: 5, suffix: "+", label: "Years of experience" },
  { value: 18, suffix: "+", label: "Microservice modules" },
  { value: 3.89, decimals: 2, suffix: "/4.0", label: "GPA — Master's track" },
  { value: 100, suffix: "%", label: "Task completion rate" },
]

const FOCUS = [
  "Frontend",
  "Backend",
  "DevOps",
  "Database",
  "Architecture",
]

function CountUp({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1.7,
}: {
  value: number
  decimals?: number
  prefix?: string
  suffix?: string
  duration?: number
}) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [display, setDisplay] = React.useState(0)

  React.useEffect(() => {
    if (!inView) return
    let frame = 0
    const start = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - start) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(value * eased)
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, value, duration])

  return (
    <span ref={ref}>
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  )
}

function CardSurface({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "relative h-full overflow-hidden rounded-3xl glass-card p-6 md:p-7",
        className
      )}
    >
      {children}
    </div>
  )
}

export function About() {
  return (
    <SectionShell id="about" glow="violet">
      <SectionHeading
        index="01"
        eyebrow="About"
        title="Engineering with intent."
        subtitle="A master's candidate in Digital Transformation Intelligence, shipping production systems in parallel."
        align="left"
      />

      <div className="grid gap-4 lg:grid-cols-12 md:gap-5">
        {/* Profile */}
        <Reveal className="lg:col-span-7" direction="right">
          <TiltCard
            max={5}
            hoverScale={1.008}
            className="rounded-3xl glass-card"
            wrapperClassName="h-full"
          >
            <div className="relative h-full overflow-hidden rounded-3xl p-6 md:p-8">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                <div className="relative shrink-0">
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 animate-spin-slow rounded-full bg-[conic-gradient(from_0deg,transparent,hsl(var(--primary)/0.8),transparent_60%)]"
                    style={{ animationDuration: "12s" }}
                  />
                  <Avatar
                    src="profile.png"
                    alt={personal.name}
                    fallback="BN"
                    size="xl"
                    className="relative h-20 w-20 ring-2 ring-background"
                  />
                </div>

                <div>
                  <h3 className="font-display text-xl font-bold tracking-tight md:text-2xl">
                    {personal.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-primary">
                    {personal.title}
                  </p>
                  <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    {personal.location}
                  </p>
                </div>
              </div>

              <p className="mt-6 text-sm leading-relaxed text-muted-foreground text-pretty md:text-base">
                {personal.bio}
              </p>

              <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { icon: Briefcase, value: "5+ yrs", label: "Experience" },
                  { icon: GraduationCap, value: "Master's", label: "In progress" },
                  { icon: Award, value: "3.89", label: "GPA / 4.0" },
                  { icon: Calendar, value: "2026", label: "Current cycle" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-foreground/[0.07] bg-foreground/[0.03] p-3 transition-colors duration-500 hover:border-primary/30"
                  >
                    <item.icon className="h-4 w-4 text-primary" />
                    <div className="mt-2 text-sm font-semibold">{item.value}</div>
                    <div className="text-[0.68rem] text-muted-foreground">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TiltCard>
        </Reveal>

        {/* Stats */}
        <RevealGroup
          className="grid grid-cols-2 gap-4 lg:col-span-5 md:gap-5"
          stagger={0.08}
        >
          {STATS.map((stat) => (
            <RevealItem key={stat.label} className="h-full">
              <SpotlightCard className="h-full rounded-3xl glass-card">
                <div className="flex h-full flex-col justify-between p-5 md:p-6">
                  <Sparkles className="h-4 w-4 text-primary/70" />
                  <div className="mt-8">
                    <div className="font-display text-3xl font-bold tracking-tight text-gradient-art md:text-4xl">
                      <CountUp
                        value={stat.value}
                        decimals={stat.decimals}
                        prefix={stat.prefix}
                        suffix={stat.suffix}
                      />
                    </div>
                    <div className="mt-1.5 text-[0.72rem] leading-snug text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* Focus areas */}
        <Reveal className="lg:col-span-4" delay={0.05}>
          <CardSurface>
            <GridPattern className="opacity-40" />
            <div className="relative">
              <span className="eyebrow">Focus</span>
              <div className="mt-5 flex flex-wrap gap-2">
                {FOCUS.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-foreground/10 bg-foreground/[0.03] px-3 py-1.5 text-xs font-medium transition-colors duration-500 hover:border-primary/40 hover:text-primary"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </CardSurface>
        </Reveal>

        {/* Currently */}
        <Reveal className="lg:col-span-4" delay={0.12}>
          <CardSurface>
            <div className="relative">
              <span className="eyebrow">Currently</span>
              <h4 className="mt-4 font-display text-lg font-semibold tracking-tight">
                Master of Computer Science
              </h4>
              <p className="mt-1 text-sm text-primary">
                Universitas Amikom Yogyakarta
              </p>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                Specialising in Digital Transformation Intelligence and
                enterprise architecture design.
              </p>
            </div>
          </CardSurface>
        </Reveal>

        {/* Approach */}
        <Reveal className="lg:col-span-4" delay={0.18}>
          <CardSurface>
            <div className="relative">
              <span className="eyebrow">Approach</span>
              <div className="mt-4 flex items-start gap-3">
                <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-fuchsia-500 text-white">
                  <Compass className="h-4 w-4" />
                </span>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Microservice-first architecture, contract-driven APIs and
                  performance budgets enforced from the first commit.
                </p>
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5 font-mono text-[0.62rem] text-muted-foreground">
                {["DDD", "REST", "CI/CD", "Observability"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-foreground/10 px-1.5 py-0.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </CardSurface>
        </Reveal>
      </div>
    </SectionShell>
  )
}
