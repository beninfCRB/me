import { useEffect } from "react"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Hero } from "@/components/sections/Hero"
import { About } from "@/components/sections/About"
import { Skills } from "@/components/sections/Skills"
import { Experience } from "@/components/sections/Experience"
import { Education } from "@/components/sections/Education"
import { Projects } from "@/components/sections/Projects"
import { Contact } from "@/components/sections/Contact"
import TechMarquee from "@/components/sections/TechMarquee"

function App() {
  useEffect(() => {
    const backToTop = document.getElementById("backToTop")
    const handleScroll = () => {
      if (backToTop) {
        if (window.scrollY > 300) {
          backToTop.style.opacity = "1"
          backToTop.style.transform = "translateY(0)"
        } else {
          backToTop.style.opacity = "0"
          backToTop.style.transform = "translateY(10px)"
        }
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <TechMarquee />
        <About />
        <Skills />
        <Experience />
        <Education />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App