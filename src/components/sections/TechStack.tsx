import {
  siGit,
  siNestjs,
  siAdonisjs,
  siLaravel,
  siReact,
  siDocker,
  siCodeigniter,
  siNextdotjs,
  siExpress,
} from "simple-icons"
import { Marquee } from "@/components/magic/Marquee"
import { Reveal } from "@/components/magic/Reveal"

interface TechItem {
  name: string
  icon: { path: string; title: string; hex?: string }
  color: string
}

const techStack: TechItem[] = [
  { name: "Git", icon: siGit, color: "#F05032" },
  { name: "NestJS", icon: siNestjs, color: "#E0234E" },
  { name: "AdonisJS", icon: siAdonisjs, color: "#5A45FF" },
  { name: "Laravel", icon: siLaravel, color: "#FF2D20" },
  { name: "React", icon: siReact, color: "#61DAFB" },
  { name: "Docker", icon: siDocker, color: "#2496ED" },
  { name: "CodeIgniter", icon: siCodeigniter, color: "#EF4223" },
  { name: "Next.js", icon: siNextdotjs, color: "#0A0A0A" },
  { name: "Express", icon: siExpress, color: "#0A0A0A" },
]

/**
 * Dark brand marks disappear on a dark background, so lighten the near-black
 * logos when the page is in dark mode.
 */
function markColor(color: string) {
  return color === "#0A0A0A" ? "currentColor" : color
}

function TechLogo({ tech, className }: { tech: TechItem; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      role="img"
      aria-label={tech.icon.title}
      className={className}
      style={{ color: markColor(tech.color) }}
    >
      <path d={tech.icon.path} />
    </svg>
  )
}

function TechCard({ tech }: { tech: TechItem }) {
  return (
    <div className="group mx-2 flex w-[11.5rem] shrink-0 items-center gap-3 rounded-2xl glass-card p-3 transition-all duration-500 ease-silk hover:-translate-y-2 hover:border-primary/40 hover:shadow-glow">
      <span
        className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-foreground/[0.06] transition-transform duration-500 ease-silk group-hover:scale-105 group-hover:rotate-6"
        style={{ boxShadow: `inset 0 0 0 1px ${tech.color}33` }}
      >
        <TechLogo tech={tech} className="h-6 w-6" />
      </span>
      <span className="font-display text-sm font-medium">{tech.name}</span>
    </div>
  )
}

function TechPill({ tech }: { tech: TechItem }) {
  return (
    <div className="group mx-1.5 flex shrink-0 items-center gap-2 rounded-full border border-foreground/10 bg-card/50 px-3.5 py-1.5 backdrop-blur-sm transition-colors duration-500 hover:border-primary/40">
      <TechLogo
        tech={tech}
        className="h-3.5 w-3.5 opacity-80 transition-opacity duration-500 group-hover:opacity-100"
      />
      <span className="font-mono text-[0.7rem] text-muted-foreground transition-colors duration-500 group-hover:text-foreground">
        {tech.name}
      </span>
    </div>
  )
}

export function TechStack() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="section-rule absolute inset-x-0 top-0" />

      <div className="container relative mx-auto px-4">
        <Reveal className="mb-12 text-center" direction="blur">
          <span className="eyebrow">Toolchain</span>
          <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight md:text-3xl">
            The stack I reach for
          </h3>
        </Reveal>
      </div>

      {/* Two opposing marquees tilted in perspective read as one 3D band */}
      <div className="relative [perspective:1500px] [perspective-origin:50%_30%]">
        <div className="preserve-3d [transform:rotateX(17deg)]">
          <Marquee speed={48}>
            {techStack.map((tech) => (
              <TechCard key={tech.name} tech={tech} />
            ))}
          </Marquee>
        </div>

        <div className="mt-5 preserve-3d [transform:rotateX(-15deg)]">
          <Marquee speed={36} reverse>
            {techStack.map((tech) => (
              <TechPill key={tech.name} tech={tech} />
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  )
}
