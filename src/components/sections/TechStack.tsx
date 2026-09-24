import { motion } from "framer-motion"
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
  { name: "Next.js", icon: siNextdotjs, color: "#000000" },
  { name: "Express", icon: siExpress, color: "#000000" },
]

export function TechStack() {
  return (
    <section className="py-16 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h3 className="text-2xl font-bold mb-3">Tech Stack</h3>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Technologies and tools I use based on my CV
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          {techStack.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              whileHover={{
                scale: 1.15,
                rotateY: 10,
                rotateX: -5,
                transition: { duration: 0.3 },
              }}
              className="group flex flex-col items-center gap-3 p-5 rounded-2xl glass-card cursor-pointer"
              style={{ perspective: "1000px" }}
            >
              <div
                className="h-14 w-14 flex items-center justify-center rounded-xl bg-white/10 p-3 transition-all duration-300 group-hover:bg-white/15 group-hover:shadow-lg"
                style={{
                  boxShadow: `0 0 0 1px ${tech.color}40`,
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-full w-full transition-transform duration-300 group-hover:scale-110"
                  style={{ color: tech.color }}
                  aria-label={tech.icon.title}
                >
                  <path d={tech.icon.path} />
                </svg>
              </div>
              <span className="text-sm font-medium text-center">{tech.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
