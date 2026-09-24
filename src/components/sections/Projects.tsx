import { ArrowUpRight, Github, Code, Database, Globe, Eye } from "lucide-react"
import { SectionHeading, SectionShell } from "@/components/magic/SectionHeading"
import { Reveal } from "@/components/magic/Reveal"
import { TiltCard } from "@/components/magic/TiltCard"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { projects, personal, type Project } from "@/data/portfolio"
import { cn } from "@/lib/utils"

const FALLBACK_ICONS = [Database, Code, Globe, Eye]

type ProjectLayout = "feature" | "stacked" | "wide"

const LAYOUTS: ProjectLayout[] = ["feature", "stacked", "stacked", "wide"]

const SPANS: Record<ProjectLayout, string> = {
  feature: "lg:col-span-7 lg:row-span-2",
  stacked: "lg:col-span-5",
  wide: "lg:col-span-12",
}

function ProjectMedia({
  project,
  index,
  overlay,
  priority,
}: {
  project: Project
  index: number
  overlay: boolean
  priority: boolean
}) {
  const FallbackIcon = FALLBACK_ICONS[index % FALLBACK_ICONS.length]

  return (
    <>
      {project.image ? (
        <img
          src={project.image}
          alt={project.title}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1100ms] ease-silk group-hover:scale-[1.07]"
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-primary/20 to-fuchsia-500/10">
          <FallbackIcon className="h-16 w-16 text-primary/50" />
        </div>
      )}

      <div
        className={cn(
          "absolute inset-0",
          overlay
            ? "bg-gradient-to-t from-background via-background/70 to-background/20"
            : "bg-gradient-to-t from-background/85 via-background/25 to-transparent"
        )}
      />
      <div className="absolute inset-0 bg-primary/0 transition-colors duration-700 group-hover:bg-primary/[0.06]" />
    </>
  )
}

function TechList({ technologies }: { technologies: string[] }) {
  const visible = technologies.slice(0, 4)
  const hidden = technologies.length - visible.length

  return (
    <div className="flex flex-wrap gap-1.5">
      {visible.map((tech) => (
        <Badge key={tech} variant="outline" className="text-[0.65rem]">
          {tech}
        </Badge>
      ))}
      {hidden > 0 ? (
        <Badge variant="secondary" className="text-[0.65rem]">
          +{hidden}
        </Badge>
      ) : null}
    </div>
  )
}

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="flex items-center gap-1.5">
      {project.github && project.github !== "#" ? (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} source code`}
          className="grid h-9 w-9 place-items-center rounded-full border border-foreground/10 bg-background/50 backdrop-blur-md transition-all duration-500 ease-silk hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
        >
          <Github className="h-4 w-4" />
        </a>
      ) : null}
      {project.link && project.link !== "#" ? (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} live site`}
          className="grid h-9 w-9 place-items-center rounded-full border border-foreground/10 bg-background/50 backdrop-blur-md transition-all duration-500 ease-silk hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
        >
          <ArrowUpRight className="h-4 w-4" />
        </a>
      ) : null}
    </div>
  )
}

function ProjectCard({
  project,
  index,
  layout,
}: {
  project: Project
  index: number
  layout: ProjectLayout
}) {
  const overlay = layout === "feature" || layout === "wide"

  return (
    <TiltCard
      max={6}
      hoverScale={1.008}
      className="rounded-3xl glass-card"
      wrapperClassName="h-full"
    >
      <article
        className={cn(
          "relative flex h-full flex-col overflow-hidden rounded-3xl",
          layout === "feature" && "min-h-[24rem] lg:min-h-[30rem]",
          layout === "wide" && "min-h-[20rem] lg:min-h-[22rem]"
        )}
      >
        {overlay ? (
          <>
            <div className="absolute inset-0 overflow-hidden">
              <ProjectMedia
                project={project}
                index={index}
                overlay
                priority={index === 0}
              />
            </div>
            <div className="relative mt-auto flex flex-col gap-4 p-6 md:p-8 lg:max-w-2xl">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="eyebrow">
                    {String(index + 1).padStart(2, "0")} · Project
                  </span>
                  <h3 className="mt-3 font-display text-2xl font-bold tracking-tight md:text-3xl">
                    {project.title}
                  </h3>
                </div>
                <ProjectLinks project={project} />
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                {project.description}
              </p>
              <TechList technologies={project.technologies} />
            </div>
          </>
        ) : (
          <>
            <div className="relative h-44 shrink-0 overflow-hidden">
              <ProjectMedia
                project={project}
                index={index}
                overlay={false}
                priority={false}
              />
              <div className="absolute right-4 top-4">
                <ProjectLinks project={project} />
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-4 p-6">
              <div>
                <span className="eyebrow">
                  {String(index + 1).padStart(2, "0")} · Project
                </span>
                <h3 className="mt-2.5 font-display text-xl font-bold tracking-tight">
                  {project.title}
                </h3>
              </div>
              <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                {project.description}
              </p>
              <TechList technologies={project.technologies} />
            </div>
          </>
        )}
      </article>
    </TiltCard>
  )
}

export function Projects() {
  return (
    <SectionShell id="projects" glow="violet">
      <SectionHeading
        index="04"
        eyebrow="Selected work"
        title="Systems in production."
        subtitle="Public platforms, enterprise ERP and the architecture decisions underneath them."
        align="left"
      />

      <div className="grid gap-4 md:gap-5 lg:grid-cols-12">
        {projects.map((project, index) => {
          const layout = LAYOUTS[index % LAYOUTS.length]
          return (
            <Reveal
              key={project.id}
              className={cn("h-full", SPANS[layout])}
              direction={index % 2 === 0 ? "up" : "scale"}
              delay={index * 0.06}
            >
              <ProjectCard project={project} index={index} layout={layout} />
            </Reveal>
          )
        })}
      </div>

      <Reveal className="mt-14 flex justify-center" delay={0.1}>
        <Button
          variant="outline"
          size="lg"
          className="group rounded-full px-7"
          asChild
        >
          <a
            href={`https://github.com/${personal.github}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="h-5 w-5" />
            More on GitHub
            <ArrowUpRight className="transition-transform duration-500 ease-silk group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </Button>
      </Reveal>
    </SectionShell>
  )
}
