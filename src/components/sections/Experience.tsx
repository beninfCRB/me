import { Building2 } from "lucide-react"
import { SectionHeading, SectionShell } from "@/components/magic/SectionHeading"
import { Timeline, type TimelineEntry } from "@/components/magic/Timeline"
import { experiences } from "@/data/portfolio"

const entries: TimelineEntry[] = experiences.map((item) => ({
  id: item.id,
  title: item.position,
  subtitle: item.company,
  period: item.period,
  description: item.description,
  bullets: item.achievements,
}))

export function Experience() {
  return (
    <SectionShell id="experience" glow="fuchsia">
      <SectionHeading
        index="02"
        eyebrow="Career"
        title="Where I've built."
        subtitle="Four roles across public infrastructure, logistics ERP and hands-on hardware — each one sharpening how I reason about systems at scale."
        align="left"
      />
      <Timeline entries={entries} icon={Building2} />
    </SectionShell>
  )
}
