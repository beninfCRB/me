import * as React from "react"
import { cn } from "@/lib/utils"

interface MarqueeProps {
  children: React.ReactNode
  /** Seconds for one full loop. Lower is faster. */
  speed?: number
  reverse?: boolean
  className?: string
  pauseOnHover?: boolean
}

/**
 * CSS-driven marquee. Duplicating the track keeps the loop seamless and lets
 * the animation run off the main thread instead of through a rAF loop.
 */
export function Marquee({
  children,
  speed = 40,
  reverse = false,
  className,
  pauseOnHover = true,
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "group relative w-full overflow-hidden mask-fade-x",
        className
      )}
    >
      <div
        className={cn(
          "flex w-max",
          reverse ? "animate-marquee-track-reverse" : "animate-marquee-track",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
        style={{ animationDuration: `${speed}s` }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  )
}
