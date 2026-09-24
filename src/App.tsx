import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { ScrollProgress } from "@/components/magic/ScrollProgress"
import { AmbientBackground } from "@/components/magic/AmbientBackground"
import { Hero } from "@/components/sections/Hero"
import { TechStack } from "@/components/sections/TechStack"
import { About } from "@/components/sections/About"
import { Experience } from "@/components/sections/Experience"
import { Education } from "@/components/sections/Education"
import { Projects } from "@/components/sections/Projects"
import { Contact } from "@/components/sections/Contact"

function App() {
  return (
    <AmbientBackground>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <TechStack />
        <About />
        <Experience />
        <Education />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </AmbientBackground>
  )
}

export default App
