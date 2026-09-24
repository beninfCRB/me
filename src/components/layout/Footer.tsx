import { Heart, ArrowUp, Github as GitHubIcon, Linkedin as LinkedInIcon, Mail } from "lucide-react"
import { personal } from "@/data/portfolio"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: GitHubIcon, href: `https://github.com/${personal.github}`, label: "GitHub" },
    { icon: LinkedInIcon, href: `https://linkedin.com/in/${personal.linkedin}`, label: "LinkedIn" },
    { icon: Mail, href: `mailto:${personal.email}`, label: "Email" },
  ]

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center text-center">
          <a
            href="#home"
            className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-4"
          >
            BN
          </a>
          <p className="text-muted-foreground mb-6 max-w-md">
            Building scalable digital solutions for the future.
          </p>

          <div className="flex space-x-4 mb-8">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background hover:bg-accent/10 hover:text-accent transition-all duration-300 hover:-translate-y-1"
              >
                <link.icon className="h-5 w-5" />
              </a>
            ))}
          </div>

          <div className="text-sm text-muted-foreground mb-8">
            <p>{personal.location} &middot; {personal.phone}</p>
          </div>

          <div className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8" />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p className="flex items-center gap-1">
              Made with <Heart className="h-4 w-4 text-red-500 mx-1" /> by {personal.name}
            </p>
            <p>&copy; {currentYear} {personal.name}. All rights reserved.</p>
          </div>
        </div>
      </div>

      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg opacity-0 translate-y-10 transition-all duration-300 hover:scale-110 hover:shadow-xl"
        id="backToTop"
        aria-label="Back to top"
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </footer>
  )
}