import * as React from "react"
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  Clock,
} from "lucide-react"
import { SectionHeading, SectionShell } from "@/components/magic/SectionHeading"
import { Reveal } from "@/components/magic/Reveal"
import { Magnetic } from "@/components/magic/Magnetic"
import { Button } from "@/components/ui/button"
import { GridPattern } from "@/components/magic/GridPattern"
import { personal } from "@/data/portfolio"
import { cn } from "@/lib/utils"

const CHANNELS = [
  {
    icon: Mail,
    label: "Email",
    value: personal.email,
    href: `mailto:${personal.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: personal.phone,
    href: `tel:${personal.phone.replace(/\s/g, "")}`,
  },
  {
    icon: MapPin,
    label: "Location",
    value: personal.location,
    href: "https://maps.google.com/?q=Jakarta,Indonesia",
  },
]

const SOCIALS = [
  {
    icon: Github,
    label: "GitHub",
    href: `https://github.com/${personal.github}`,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: `https://linkedin.com/in/${personal.linkedin}`,
  },
  { icon: Mail, label: "Email", href: `mailto:${personal.email}` },
]

const fieldClass =
  "w-full rounded-2xl border border-foreground/10 bg-foreground/[0.03] px-4 py-3 text-sm outline-none transition-all duration-300 placeholder:text-muted-foreground/60 focus:border-primary/50 focus:bg-foreground/[0.05] focus:ring-4 focus:ring-primary/10"

export function Contact() {
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const update =
    (key: keyof typeof form) =>
    (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      setForm((prev) => ({ ...prev, [key]: event.target.value }))
    }

  /**
   * There is no backend here, so the form composes a pre-filled mail draft
   * instead of silently pretending to send.
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const subject = encodeURIComponent(
      form.subject || `Portfolio enquiry from ${form.name || "someone"}`
    )
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name}${form.email ? ` (${form.email})` : ""}`
    )
    window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`
  }

  return (
    <SectionShell id="contact" glow="fuchsia">
      <SectionHeading
        index="05"
        eyebrow="Contact"
        title="Let's build something."
        subtitle="Open to full-time roles, contract work and technical collaborations. Tell me what you're working on."
        align="left"
      />

      <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr] md:gap-5">
        {/* Channels */}
        <div className="flex flex-col gap-4">
          <Reveal direction="right">
            <div className="relative overflow-hidden rounded-3xl glass-card p-6 md:p-7">
              <GridPattern className="opacity-30" />
              <div className="relative">
                <span className="eyebrow">Direct</span>
                <ul className="mt-5 space-y-2">
                  {CHANNELS.map((channel) => (
                    <li key={channel.label}>
                      <a
                        href={channel.href}
                        target={
                          channel.href.startsWith("http") ? "_blank" : undefined
                        }
                        rel="noopener noreferrer"
                        className="group flex items-center gap-4 rounded-2xl border border-transparent p-3 transition-all duration-500 ease-silk hover:border-foreground/10 hover:bg-foreground/[0.03]"
                      >
                        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary to-fuchsia-500 text-white transition-transform duration-500 ease-silk group-hover:scale-105 group-hover:rotate-6">
                          <channel.icon className="h-5 w-5" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[0.68rem] uppercase tracking-wider text-muted-foreground">
                            {channel.label}
                          </span>
                          <span className="block truncate text-sm font-medium transition-colors group-hover:text-primary">
                            {channel.value}
                          </span>
                        </span>
                        <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-all duration-500 ease-silk group-hover:translate-x-0.5 group-hover:opacity-100" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          <Reveal direction="right" delay={0.08}>
            <div className="rounded-3xl glass-card p-6 md:p-7">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5 text-primary" />
                Usually replies within a day · GMT+7
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {SOCIALS.map((social) => (
                  <Magnetic key={social.label} strength={0.28}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="grid h-11 w-11 place-items-center rounded-2xl border border-foreground/10 bg-foreground/[0.03] transition-colors duration-500 hover:border-primary/40 hover:text-primary"
                    >
                      <social.icon className="h-5 w-5" />
                    </a>
                  </Magnetic>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Form */}
        <Reveal direction="left">
          <form
            onSubmit={handleSubmit}
            className="relative h-full overflow-hidden rounded-3xl glass-card p-6 md:p-8"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xl font-bold tracking-tight md:text-2xl">
                Send a message
              </h3>
              <span className="eyebrow hidden sm:block">No spam, ever</span>
            </div>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-xs font-medium text-muted-foreground">
                  Name
                </span>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={update("name")}
                  placeholder="Your name"
                  className={fieldClass}
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-xs font-medium text-muted-foreground">
                  Email
                </span>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={update("email")}
                  placeholder="you@company.com"
                  className={fieldClass}
                />
              </label>
            </div>

            <label className="mt-4 block">
              <span className="mb-2 block text-xs font-medium text-muted-foreground">
                Subject
              </span>
              <input
                type="text"
                value={form.subject}
                onChange={update("subject")}
                placeholder="Project inquiry"
                className={fieldClass}
              />
            </label>

            <label className="mt-4 block">
              <span className="mb-2 block text-xs font-medium text-muted-foreground">
                Message
              </span>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={update("message")}
                placeholder="Tell me about the project, the stack and the timeline…"
                className={cn(fieldClass, "resize-none")}
              />
            </label>

            <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <Magnetic strength={0.22}>
                <Button
                  type="submit"
                  variant="gradient"
                  size="lg"
                  className="group w-full rounded-full px-7 sm:w-auto"
                >
                  <Send className="h-5 w-5 transition-transform duration-500 ease-silk group-hover:translate-x-0.5" />
                  Send message
                </Button>
              </Magnetic>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Opens your mail client with everything pre-filled.
              </p>
            </div>
          </form>
        </Reveal>
      </div>
    </SectionShell>
  )
}
