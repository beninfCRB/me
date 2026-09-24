import { useEffect, useState } from "react"
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion"
import { Menu, X, Moon, Sun, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Magnetic } from "@/components/magic/Magnetic"
import { personal } from "@/data/portfolio"
import { SILK, SPRING_SOFT } from "@/lib/motion"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Home", href: "#home", id: "home" },
  { name: "About", href: "#about", id: "about" },
  { name: "Experience", href: "#experience", id: "experience" },
  { name: "Education", href: "#education", id: "education" },
  { name: "Projects", href: "#projects", id: "projects" },
  { name: "Contact", href: "#contact", id: "contact" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [active, setActive] = useState("home")
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme")
    if (saved) return saved === "dark"
    return window.matchMedia("(prefers-color-scheme: dark)").matches
  })
  const { scrollY } = useScroll()

  // Keep the document class in sync with the toggle.
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
  }, [isDark])

  // Highlight whichever section currently crosses the middle of the viewport.
  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => Boolean(node))

    const observer = new IntersectionObserver(
      (entries) => {
        const top = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (top) setActive(top.target.id)
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.15, 0.5, 1] }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  // Reveal on scroll up, tuck away on scroll down.
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0
    setIsScrolled(latest > 40)
    setIsHidden(latest > previous && latest > 260 && !isMenuOpen)
  })

  const toggleDarkMode = () => {
    setIsDark((prev) => {
      localStorage.setItem("theme", prev ? "light" : "dark")
      return !prev
    })
  }

  return (
    <>
      <motion.header
        initial={{ y: -120, opacity: 0 }}
        animate={{ y: isHidden ? -120 : 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: SILK }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4"
      >
        <div
          className={cn(
            "mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full py-2 pl-3 pr-2 transition-all duration-500 ease-silk sm:pl-4",
            isScrolled
              ? "glass-panel shadow-depth"
              : "border border-transparent"
          )}
        >
          <a href="#home" className="group flex items-center gap-2.5">
            <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-primary via-blue-500 to-indigo-500 font-display text-xs font-bold text-white shadow-glow">
              BN
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/25" />
            </span>
            <span className="hidden font-display text-sm font-semibold tracking-tight sm:block">
              {personal.name}
            </span>
          </a>

          <nav className="hidden items-center gap-0.5 md:flex">
            {navItems.map((item) => {
              const isActive = active === item.id
              return (
                <a
                  key={item.id}
                  href={item.href}
                  className="relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-300"
                >
                  {isActive ? (
                    <motion.span
                      layoutId="nav-active"
                      transition={SPRING_SOFT}
                      className="absolute inset-0 rounded-full bg-primary/[0.14] ring-1 ring-inset ring-primary/30"
                    />
                  ) : null}
                  <span
                    className={cn(
                      "relative z-10",
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {item.name}
                  </span>
                </a>
              )
            })}
          </nav>

          <div className="flex items-center gap-1.5">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="rounded-full"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isDark ? "sun" : "moon"}
                  initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.28, ease: SILK }}
                  className="grid place-items-center"
                >
                  {isDark ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </motion.span>
              </AnimatePresence>
            </Button>

            <Magnetic strength={0.22} className="hidden sm:inline-flex">
              <Button
                variant="gradient"
                size="sm"
                className="group rounded-full pr-3.5"
                asChild
              >
                <a href="#contact">
                  Let&apos;s talk
                  <ArrowUpRight className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </Button>
            </Magnetic>

            <button
              className="grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-foreground/[0.06] md:hidden"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-label="Toggle navigation"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: SILK }}
            className="fixed inset-0 z-[45] md:hidden"
          >
            <div
              className="absolute inset-0 bg-background/80 backdrop-blur-2xl"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.nav
              initial={{ y: -24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.45, ease: SILK }}
              className="relative mx-3 mt-24 rounded-4xl glass-panel p-6 shadow-depth"
            >
              <ul className="space-y-1">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.06 + index * 0.05,
                      duration: 0.5,
                      ease: SILK,
                    }}
                  >
                    <a
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center justify-between rounded-2xl px-4 py-3.5 font-display text-xl font-semibold transition-colors hover:bg-foreground/[0.05]"
                    >
                      {item.name}
                      <span className="font-mono text-xs text-muted-foreground">
                        0{index + 1}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
