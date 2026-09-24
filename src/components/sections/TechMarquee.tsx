import { motion } from "framer-motion"
import { techLogos } from "@/data/portfolio"

const TechMarquee = () => {
  return (
    <section className="py-12 border-y border-white/10 bg-black/20 backdrop-blur-sm overflow-hidden relative">
      <div className="container mx-auto px-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-sm text-muted-foreground">
            Technologies I work with
          </p>
        </motion.div>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-background to-transparent" />

        <div className="flex animate-marquee">
          {[...techLogos, ...techLogos].map((tech, index) => (
            <div
              key={index}
              className="flex items-center gap-2 mx-8 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm font-medium text-muted-foreground whitespace-nowrap"
            >
              <span className="h-2 w-2 rounded-full bg-gradient-to-r from-primary to-purple-600" />
              {tech}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TechMarquee