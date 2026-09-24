import { motion } from "framer-motion";
import { ArrowDown, Mail, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { personal } from "@/data/portfolio";
import {
  FloatingElement,
  GradientBlob,
} from "@/components/magic/FloatingElements";
import { GradientText, WordFadeUp } from "@/components/magic/AnimatedText";
import { Avatar } from "@/components/ui/avatar";

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      <GradientBlob
        color="primary"
        size="lg"
        className="absolute top-20 left-10 -z-10"
      />
      <GradientBlob
        color="purple"
        size="md"
        className="absolute bottom-20 right-10 -z-10"
      />
      <GradientBlob
        color="pink"
        size="sm"
        className="absolute top-40 right-20 -z-10"
      />

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              Available for new opportunities
            </motion.div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              <GradientText>{personal.name}</GradientText>
            </h1>

            <div className="text-xl md:text-2xl font-medium text-muted-foreground mb-4">
              <WordFadeUp words={personal.title} />
            </div>

            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
              {personal.tagline}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="gradient" size="lg" asChild>
                <a href="#contact">
                  <Mail className="h-5 w-5" />
                  Get In Touch
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="#projects">
                  <Github className="h-5 w-5" />
                  View Projects
                </a>
              </Button>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-6 mt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                {personal.location}
              </div>
              <a
                href={`mailto:${personal.email}`}
                className="hover:text-foreground transition-colors"
              >
                {personal.email}
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64">
              <Avatar
                src="profile.png"
                alt={personal.name}
                fallback="BN"
                size="xl"
                className="mx-auto ring-4 ring-primary/20 shadow-2xl size-20"
              />

              <FloatingElement
                x={20}
                y={20}
                className="absolute -top-10 -left-16 md:-top-12 md:-left-24"
              >
                <div className="flex items-center gap-2 rounded-xl bg-card/80 backdrop-blur-sm border border-border p-3 shadow-lg">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                    💻
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">
                      Full-Stack
                    </div>
                    <div className="text-sm font-semibold">Developer</div>
                  </div>
                </div>
              </FloatingElement>

              <FloatingElement
                x={-30}
                y={25}
                className="absolute -bottom-8 -right-12 md:-bottom-10 md:-right-24"
              >
                <div className="flex items-center gap-2 rounded-xl bg-card/80 backdrop-blur-sm border border-border p-3 shadow-lg">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                    🚀
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">
                      Performance
                    </div>
                    <div className="text-sm font-semibold">Optimized</div>
                  </div>
                </div>
              </FloatingElement>

              <FloatingElement
                x={15}
                y={35}
                className="absolute top-[75%] -left-10 md:top-[70%] md:-left-16"
              >
                <div className="flex items-center gap-2 rounded-xl bg-card/80 backdrop-blur-sm border border-border p-3 shadow-lg">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center text-white font-bold">
                    ✨
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Modern</div>
                    <div className="text-sm font-semibold">UI/UX</div>
                  </div>
                </div>
              </FloatingElement>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
      >
        <span className="text-xs">Scroll Down</span>
        <ArrowDown className="h-5 w-5 animate-bounce" />
      </motion.a>
    </section>
  );
}
