import * as React from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"
import { useSceneQuality } from "@/lib/useSceneQuality"

/**
 * Keeps a failing WebGL layer from ever taking the page down with it.
 */
class SceneBoundary extends React.Component<
  { children: React.ReactNode },
  { failed: boolean }
> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  render() {
    if (this.state.failed) return null
    return this.props.children
  }
}

const AmbientScene = React.lazy(
  () => import("@/components/three/AmbientScene")
)

function AuroraOrb({
  className,
  color,
  duration,
  delay,
}: {
  className?: string
  color: string
  duration: string
  delay: string
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute rounded-full blur-[130px] animate-drift will-change-transform",
        className
      )}
      style={{
        background: `radial-gradient(circle at 42% 38%, ${color}, transparent 68%)`,
        animationDuration: duration,
        animationDelay: delay,
        opacity: "var(--aurora-opacity)",
      }}
    />
  )
}

export interface AmbientBackgroundProps {
  children: React.ReactNode
}

/**
 * Two cooperating layers:
 *  1. Cheap CSS aurora + grid + grain that paint immediately.
 *  2. A lazily imported WebGL scene on top, once the browser is idle.
 *
 * Both drift with page scroll so the depth reads as one continuous space.
 */
export function AmbientBackground({ children }: AmbientBackgroundProps) {
  const quality = useSceneQuality()
  const [sceneReady, setSceneReady] = React.useState(false)
  const { scrollYProgress } = useScroll()

  const auroraY = useTransform(scrollYProgress, [0, 1], [0, -180])
  const auroraY2 = useTransform(scrollYProgress, [0, 1], [0, 220])
  const gridY = useTransform(scrollYProgress, [0, 1], [0, -90])

  React.useEffect(() => {
    if (!quality.supported) return
    let cancelled = false
    const mount = () => {
      if (!cancelled) setSceneReady(true)
    }
    const timer = window.setTimeout(mount, 180)
    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [quality.supported])

  return (
    <div className="relative isolate min-h-screen">
      {/* 1. Immediate CSS wash */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-background" />

        <motion.div
          style={{ y: auroraY }}
          className="absolute inset-0 will-change-transform"
        >
          <AuroraOrb
            color="rgb(var(--art-violet) / 0.55)"
            duration="24s"
            delay="0s"
            className="-left-[12%] -top-[18%] h-[46rem] w-[46rem]"
          />
          <AuroraOrb
            color="rgb(var(--art-fuchsia) / 0.45)"
            duration="31s"
            delay="-6s"
            className="-right-[16%] top-[6%] h-[38rem] w-[38rem]"
          />
        </motion.div>

        <motion.div
          style={{ y: auroraY2 }}
          className="absolute inset-0 will-change-transform"
        >
          <AuroraOrb
            color="rgb(var(--art-cyan) / 0.32)"
            duration="28s"
            delay="-12s"
            className="bottom-[-22%] left-[24%] h-[34rem] w-[34rem]"
          />
          <AuroraOrb
            color="rgb(var(--art-amber) / 0.18)"
            duration="36s"
            delay="-3s"
            className="left-[42%] top-[38%] h-[24rem] w-[24rem]"
          />
        </motion.div>

        <motion.div
          style={{ y: gridY }}
          className="absolute inset-[-10%] grid-lines mask-fade-y"
        />

        <div className="absolute inset-0 noise-layer mix-blend-overlay" />

        {/* Vignette keeps the centre readable over the moving light */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,hsl(var(--background))_100%)] opacity-80" />
      </div>

      {/* 2. WebGL depth layer */}
      {quality.supported ? (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-0"
        >
          <SceneBoundary>
            <React.Suspense fallback={null}>
              {sceneReady ? (
                <AmbientScene
                  progress={scrollYProgress}
                  particleCount={quality.particleCount}
                  shapeCount={quality.shapeCount}
                  dpr={quality.dpr}
                  postProcessing={quality.postProcessing}
                  animate={quality.animate}
                />
              ) : null}
            </React.Suspense>
          </SceneBoundary>
        </div>
      ) : null}

      <div className="relative z-10">{children}</div>
    </div>
  )
}
