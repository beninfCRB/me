import { motion } from "framer-motion"
import { GraduationCap, Calendar } from "lucide-react"
import { SectionTitle } from "@/components/magic/Stats"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { education } from "@/data/portfolio"

export function Education() {
  return (
    <section id="education" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Education"
          subtitle="My academic journey and the knowledge that shaped my career."
        />

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-purple-600" />

          {education.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative flex gap-8 mb-12 last:mb-0"
            >
              <div className="flex flex-col items-center">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white shadow-lg">
                  <GraduationCap className="h-7 w-7" />
                </div>
                {index !== education.length - 1 && (
                  <div className="w-0.5 h-16 bg-gradient-to-b from-primary to-purple-600 mt-2" />
                )}
              </div>

              <Card className="flex-1 p-6 glass-card hover:shadow-lg transition-shadow">
                <CardHeader className="p-0 mb-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-bold">{edu.degree}</h3>
                      <p className="text-primary font-medium">{edu.institution}</p>
                    </div>
                    <Badge variant="secondary" className="w-fit">
                      <Calendar className="h-3 w-3 mr-1" />
                      {edu.period}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="p-0">
                  <p className="text-muted-foreground leading-relaxed">
                    {edu.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}