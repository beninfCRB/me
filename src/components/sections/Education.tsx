import { GraduationCap } from "lucide-react"
import { SectionHeading, SectionShell } from "@/components/magic/SectionHeading"
import { Timeline, type TimelineEntry } from "@/components/magic/Timeline"
import { education } from "@/data/portfolio"

const entries: TimelineEntry[] = education.map((item) => ({
  id: item.id,
  title: item.degree,
  subtitle: item.institution,
  period: item.period,
  description: item.description,
}))

export function Education() {
  return (
    <SectionShell id="education" glow="cyan">
      <SectionHeading
        index="03"
        eyebrow="Academic"
        title="Foundations."
        subtitle="A computer science path that ran in parallel with shipping production software."
        align="left"
      />
      <Timeline entries={entries} icon={GraduationCap} />
    </SectionShell>
  )
}
