import * as React from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import {
  ArrowUp,
  Github as GitHubIcon,
  Heart,
  Linkedin as LinkedInIcon,
  Mail,
} from "lucide-react"
import { Magnetic } from "@/components/magic/Magnetic"
import { personal } from "@/data/portfolio"
import { SILK } from "@/lib/motion"
import { cn } from "@/lib/utils"

const socialLinks = [
  {
    icon: GitHubIcon,
    href: `https://github.com/${personal.github}`,
    label: "GitHub",
  },
  {
    icon: LinkedInIcon,
    href: `https://linkedin.com/in/${personal.linkedin}`,
    label: "LinkedIn",
  },
  { icon: Mail, href: `mailto:${personal.email}`, label: "Email" },
]

function BackToTop() {
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <motion.button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      initial={false}
      animate={
        visible
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 16, scale: 0.85 }
      }
      transition={{ duration: 0.45, ease: SILK }}
      style={{ pointerEvents: visible ? "auto" : "none" }}
      className="fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-primary to-indigo-500 text-white shadow-glow transition-transform duration-500 ease-silk hover:scale-110"
    >
      <ArrowUp className="h-5 w-5" />
    </motion.button>
  )
}

export function Footer() {
  const currentYear = new Date().getFullYear()
  const ref = React.useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  })
  const wordmarkX = useTransform(scrollYProgress, [0, 1], ["-6%", "2%"])
  const wordmarkOpacity = useTransform(scrollYProgress, [0, 0.5], [0.25, 0.7])

  return (
    <footer
      ref={ref}
      className="relative mt-10 overflow-hidden border-t border-foreground/[0.08]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[46rem] max-w-full -translate-x-1/2 rounded-full bg-gradient-to-b from-primary/20 to-transparent blur-[120px]"
      />

      {/* Oversized wordmark that drifts with scroll */}
      <motion.div
        aria-hidden="true"
        style={{ x: wordmarkX, opacity: wordmarkOpacity }}
        className="pointer-events-none select-none whitespace-nowrap py-10 text-center font-display text-[16vw] font-bold leading-[0.85] tracking-[-0.05em] text-outline lg:text-[13vw]"
      >
        BENI NURFAUZI
      </motion.div>

      <div className="container relative mx-auto px-4 pb-12">
        <div className="section-rule" />

        <div className="mt-10 flex flex-col items-center gap-8 text-center">
          <div className="flex flex-col items-center gap-4">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className={cn(
                "font-display text-3xl font-bold tracking-tight",
                "bg-gradient-to-r from-primary via-blue-500 to-sky-400 bg-clip-text text-transparent",
                "transition-transform duration-500 ease-silk hover:scale-105"
              )}
            >
              BN
            </button>
            <p className="max-w-md text-sm text-muted-foreground text-pretty">
              {personal.subtitle}
            </p>
          </div>

          <div className="flex gap-3">
            {socialLinks.map((link) => (
              <Magnetic key={link.label} strength={0.3}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="grid h-11 w-11 place-items-center rounded-2xl border border-foreground/10 bg-foreground/[0.03] transition-colors duration-500 hover:border-primary/40 hover:text-primary"
                >
                  <link.icon className="h-5 w-5" />
                </a>
              </Magnetic>
            ))}
          </div>

          <div className="space-y-1 text-xs text-muted-foreground">
            <p>{personal.location}</p>
            <p>{personal.phone}</p>
          </div>

          <div className="mt-4 flex w-full flex-col items-center justify-between gap-4 text-xs text-muted-foreground sm:flex-row">
            <p className="flex items-center gap-1.5">
              Made with
              <Heart className="h-3.5 w-3.5 text-red-500" />
              by {personal.name}
            </p>
            <p>
              © {currentYear} {personal.name}. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      <BackToTop />
    </footer>
  )
}
