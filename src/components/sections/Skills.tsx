import { motion } from "framer-motion"
import { SectionTitle } from "@/components/magic/Stats"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { skills } from "@/data/portfolio"

const categories = ["Frontend", "Backend", "DevOps", "Database", "Architecture"]

export function Skills() {
  return (
    <section id="skills" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Skills & Expertise"
          subtitle="A comprehensive toolkit of technologies and tools I work with."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-6 h-full glass-card">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white">
                    <span className="text-lg font-bold">
                      {category.charAt(0)}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold">{category}</h3>
                </div>

                <div className="space-y-4">
                  {skills
                    .filter((skill) => skill.category === category)
                    .map((skill, index) => (
                      <div key={index}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">
                            {skill.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 1,
                              delay: index * 0.1,
                              ease: "easeOut",
                            }}
                            className="h-full rounded-full bg-gradient-to-r from-primary to-purple-600"
                          />
                        </div>
                      </div>
                    ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 flex flex-wrap justify-center gap-3"
        >
          {skills.map((skill, index) => (
            <Badge key={index} variant="outline" className="text-sm py-1.5 px-3 glass-card">
              {skill.name}
            </Badge>
          ))}
        </motion.div>
      </div>
    </section>
  )
}