import * as React from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import {
  ArrowDown,
  Mail,
  MapPin,
  Sparkles,
  Code2,
  Gauge,
  Layers,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import { Magnetic } from "@/components/magic/Magnetic"
import { TiltCard } from "@/components/magic/TiltCard"
import {
  GradientText,
  MaskedLines,
  RotatingWords,
} from "@/components/magic/AnimatedText"
import { personal } from "@/data/portfolio"
import { SILK } from "@/lib/motion"
import { cn } from "@/lib/utils"

const ROLES = [
  "Software Engineer",
  "Full-Stack Developer",
  "Microservice Architect",
  "Digital Transformation",
]

const CHIPS = [
  {
    icon: Code2,
    label: "Full-Stack",
    value: "Developer",
    accent: "from-sky-400 to-blue-600",
    className: "-left-5 top-10 sm:-left-10",
    float: "7s",
    delay: "0s",
    depth: 90,
  },
  {
    icon: Gauge,
    label: "Performance",
    value: "Optimized",
    accent: "from-indigo-500 to-blue-600",
    className: "-right-3 bottom-20 sm:-right-9",
    float: "9s",
    delay: "-2.5s",
    depth: 130,
  },
  {
    icon: Layers,
    label: "Architecture",
    value: "Microservices",
    accent: "from-blue-500 to-cyan-500",
    className: "-left-3 bottom-6 sm:-left-8",
    float: "8s",
    delay: "-4.5s",
    depth: 60,
  },
]

export function Hero() {
  const sectionRef = React.useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  const contentY = useTransform(scrollYProgress, [0, 1], [0, 150])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const visualY = useTransform(scrollYProgress, [0, 1], [0, 240])
  const visualScale = useTransform(scrollYProgress, [0, 1], [1, 0.86])
  const visualRotate = useTransform(scrollYProgress, [0, 1], [0, -7])

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-20 pt-32"
    >
      <div className="pointer-events-none absolute left-4 top-1/2 hidden -translate-y-1/2 xl:block">
        <span className="eyebrow writing-vertical rotate-180">
          Portfolio · {new Date().getFullYear()}
        </span>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
          {/* ---------- Copy ---------- */}
          <motion.div style={{ y: contentY, opacity: contentOpacity }}>
            <motion.div
              initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, ease: SILK }}
              className="inline-flex items-center gap-2.5 rounded-full glass-card px-4 py-2 text-xs font-medium"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-muted-foreground">
                Available for new opportunities
              </span>
            </motion.div>

            <h1 className="mt-7 font-display text-[3.1rem] font-bold leading-[0.92] tracking-[-0.045em] sm:text-6xl lg:text-[5.25rem]">
              <MaskedLines
                lines={["Beni", "Nurfauzi"]}
                lineClassName="text-foreground"
                delay={0.15}
              />
              <MaskedLines lines={["Engineer."]} delay={0.42} className="text-outline" />
            </h1>

            <div className="mt-7 flex items-center gap-3">
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.9, delay: 0.7, ease: SILK }}
                className="h-px w-12 origin-left bg-gradient-to-r from-primary to-transparent"
              />
              <div className="font-display text-lg font-medium text-muted-foreground sm:text-xl">
                <RotatingWords words={ROLES} />
              </div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, delay: 0.8, ease: SILK }}
              className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground text-pretty md:text-lg"
            >
              {personal.tagline}. I design and ship scalable systems — from
              public-facing platforms to 18-module enterprise ERP architecture.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.95, ease: SILK }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Magnetic strength={0.3}>
                <Button
                  variant="gradient"
                  size="lg"
                  className="group rounded-full px-7"
                  asChild
                >
                  <a href="#contact">
                    <Mail className="h-5 w-5" />
                    Get in touch
                  </a>
                </Button>
              </Magnetic>
              <Magnetic strength={0.3}>
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full px-7 backdrop-blur-sm"
                  asChild
                >
                  <a href="#projects">
                    <Sparkles className="h-5 w-5" />
                    View work
                  </a>
                </Button>
              </Magnetic>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.15 }}
              className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-muted-foreground"
            >
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                {personal.location}
              </span>
              <a
                href={`mailto:${personal.email}`}
                className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
              >
                <Mail className="h-4 w-4 text-primary" />
                {personal.email}
              </a>
            </motion.div>
          </motion.div>

          {/* ---------- 3D portal ---------- */}
          <motion.div
            style={{ y: visualY, scale: visualScale, rotate: visualRotate }}
            className="relative mx-auto w-full max-w-[26rem] will-change-transform"
          >
            <TiltCard
              max={13}
              hoverScale={1.02}
              depth={60}
              className="rounded-[2.5rem] border border-foreground/10 bg-card/40 p-5 shadow-depth backdrop-blur-2xl"
            >
              {/* preserve-3d lets the chips float in front of the frame */}
              <div className="relative preserve-3d">
                <div className="relative aspect-square w-full overflow-hidden rounded-[2rem]">
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 animate-spin-slow bg-[conic-gradient(from_0deg,hsl(var(--primary)/0.34),rgba(59,130,246,0.3),rgba(125,211,252,0.28),hsl(var(--primary)/0.34))] opacity-70 blur-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/60" />

                  <div
                    aria-hidden="true"
                    className="absolute inset-6 animate-spin-slow rounded-full border border-dashed border-foreground/20"
                    style={{ animationDuration: "38s" }}
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-12 animate-spin-reverse-slow rounded-full border border-primary/25"
                    style={{ animationDuration: "28s" }}
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-[4.5rem] rounded-full border border-sky-400/25"
                  />

                  <div
                    className="absolute left-1/2 top-1/2"
                    style={{
                      transform: "translate(-50%, -50%) translateZ(46px)",
                    }}
                  >
                    <Avatar
                      src="profile.png"
                      alt={personal.name}
                      fallback="BN"
                      size="2xl"
                      className="h-36 w-36 shadow-glow-lg ring-4 ring-primary/25 sm:h-40 sm:w-40"
                    />
                  </div>
                </div>

                {/* Floating chips sit outside the clipped frame */}
                {CHIPS.map((chip) => (
                  <div
                    key={chip.label}
                    className={cn("absolute", chip.className)}
                    style={{ transform: `translateZ(${chip.depth}px)` }}
                  >
                    <div
                      className="animate-float-slow"
                      style={{
                        animationDuration: chip.float,
                        animationDelay: chip.delay,
                      }}
                    >
                      <div className="flex items-center gap-2.5 rounded-2xl border border-foreground/10 bg-card/70 p-2.5 pr-3.5 shadow-lg backdrop-blur-xl">
                        <span
                          className={cn(
                            "grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br text-white",
                            chip.accent
                          )}
                        >
                          <chip.icon className="h-4 w-4" />
                        </span>
                        <span className="leading-tight">
                          <span className="block text-[0.6rem] uppercase tracking-wider text-muted-foreground">
                            {chip.label}
                          </span>
                          <span className="block text-xs font-semibold">
                            {chip.value}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="mt-4 flex items-center justify-between px-2 pb-1">
                  <span className="eyebrow">
                    <GradientText>Ready to build</GradientText>
                  </span>
                  <span className="flex items-center gap-1.5">
                    {["React", "Nest", "Docker"].map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-foreground/10 px-2 py-0.5 font-mono text-[0.6rem] text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </span>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-foreground md:flex"
      >
        <span className="eyebrow">Scroll</span>
        <motion.span
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="grid h-8 w-8 place-items-center rounded-full border border-foreground/15"
        >
          <ArrowDown className="h-3.5 w-3.5" />
        </motion.span>
      </motion.a>
    </section>
  )
}
