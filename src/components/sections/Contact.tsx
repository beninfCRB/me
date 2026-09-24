import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Github, Linkedin, Send } from "lucide-react"
import { SectionTitle } from "@/components/magic/Stats"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { personal } from "@/data/portfolio"

const contactInfo = [
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
    href: `tel:${personal.phone}`,
  },
  {
    icon: MapPin,
    label: "Location",
    value: personal.location,
    href: "#",
  },
]

const socialLinks = [
  { icon: Github, href: `https://github.com/${personal.github}`, label: "GitHub" },
  { icon: Linkedin, href: `https://linkedin.com/in/${personal.linkedin}`, label: "LinkedIn" },
  { icon: Mail, href: `mailto:${personal.email}`, label: "Email" },
]

export function Contact() {
  return (
    <section id="contact" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Get In Touch"
          subtitle="Have a project in mind or want to collaborate? Let's talk!"
        />

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-6 md:p-8 glass-card">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>

              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="flex items-center gap-4 p-4 rounded-lg hover:bg-white/5 transition-colors group"
                  >
                    <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">
                        {item.label}
                      </div>
                      <div className="font-medium group-hover:text-primary transition-colors">
                        {item.value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-sm text-muted-foreground mb-4">
                  Follow me on social media
                </p>
                <div className="flex gap-3">
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      className="h-10 w-10 rounded-lg border border-white/10 flex items-center justify-center hover:bg-white/5 hover:text-primary transition-all hover:-translate-y-1"
                    >
                      <link.icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-6 md:p-8 glass-card">
              <h3 className="text-2xl font-bold mb-6">Send a Message</h3>

              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2 rounded-lg border border-white/10 bg-white/5 focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-2 rounded-lg border border-white/10 bg-white/5 focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 rounded-lg border border-white/10 bg-white/5 focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Project inquiry"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    className="w-full px-4 py-2 rounded-lg border border-white/10 bg-white/5 focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <Button variant="gradient" size="lg" className="w-full" type="submit">
                  <Send className="h-5 w-5" />
                  Send Message
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}