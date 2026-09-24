import { motion } from "framer-motion"
import { Award, Calendar, MapPin, Briefcase } from "lucide-react"
import { SectionTitle } from "@/components/magic/Stats"
import { Card } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { personal } from "@/data/portfolio"

export function About() {
  const stats = [
    { value: 5, label: "Years of Experience", suffix: "+" },
    { value: 18, label: "Microservice Modules", suffix: "+" },
    { value: 100, label: "Devices Repaired", suffix: "%" },
    { value: 3.89, label: "GPA", suffix: "/4.0" },
  ]

  return (
    <section id="about" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="About Me"
          subtitle="Get to know more about my journey, expertise, and passion for technology."
        />

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-6 md:p-8">
              <div className="flex items-start gap-4 mb-6">
                <Avatar
                  src="/avatar.jpg"
                  alt={personal.name}
                  fallback="BN"
                  size="lg"
                />
                <div>
                  <h3 className="text-xl font-bold">{personal.name}</h3>
                  <p className="text-muted-foreground">{personal.title}</p>
                  <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {personal.location}
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-6">
                {personal.bio}
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/5">
                  <Briefcase className="h-5 w-5 text-primary" />
                  <div>
                    <div className="text-xs text-muted-foreground">Experience</div>
                    <div className="font-semibold text-sm">5+ Years</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/5">
                  <Award className="h-5 w-5 text-primary" />
                  <div>
                    <div className="text-xs text-muted-foreground">Education</div>
                    <div className="font-semibold text-sm">Master's Degree</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/5">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <div className="text-xs text-muted-foreground">Current</div>
                    <div className="font-semibold text-sm">Master's Student</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/5">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <div className="text-xs text-muted-foreground">Location</div>
                    <div className="font-semibold text-sm">Jakarta</div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  {stat.value}+
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </Card>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}