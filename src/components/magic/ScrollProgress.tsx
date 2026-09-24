import { motion, useScroll, useSpring } from "framer-motion"

/**
 * Page-wide scroll indicator pinned to the very top of the viewport.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 130,
    damping: 26,
    mass: 0.35,
    restDelta: 0.001,
  })

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-art-gradient shadow-glow"
    />
  )
}
