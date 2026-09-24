import * as React from "react"
import { cn } from "@/lib/utils"

interface GridPatternProps {
  className?: string
  /** Size of one grid cell in px. */
  cell?: number
  animate?: boolean
}

/**
 * Masked technical grid used as a texture inside cards. Ids are scoped per
 * instance so multiple patterns can coexist without clashing.
 */
export function GridPattern({
  className,
  cell = 26,
  animate = true,
}: GridPatternProps) {
  const id = React.useId()
  const patternId = `${id}-cells`
  const gradientId = `${id}-fade`
  const maskId = `${id}-mask`

  const highlights = React.useMemo(
    () => [
      { x: 2, y: 1, delay: "0s" },
      { x: 6, y: 4, delay: "1.4s" },
      { x: 9, y: 2, delay: "2.8s" },
    ],
    []
  )

  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full text-foreground/[0.13]",
        className
      )}
    >
      <defs>
        <pattern
          id={patternId}
          width={cell}
          height={cell}
          patternUnits="userSpaceOnUse"
        >
          <path
            d={`M ${cell} 0 H 0 V ${cell}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </pattern>
        <radialGradient id={gradientId} cx="30%" cy="0%" r="90%">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id={maskId}>
          <rect width="100%" height="100%" fill={`url(#${gradientId})`} />
        </mask>
      </defs>

      <rect
        width="100%"
        height="100%"
        fill={`url(#${patternId})`}
        mask={`url(#${maskId})`}
      />

      {animate
        ? highlights.map((cellItem) => (
            <rect
              key={`${cellItem.x}-${cellItem.y}`}
              x={cellItem.x * cell}
              y={cellItem.y * cell}
              width={cell}
              height={cell}
              fill="hsl(var(--primary))"
              className="animate-glow"
              style={{ animationDelay: cellItem.delay, animationDuration: "4.5s" }}
            />
          ))
        : null}
    </svg>
  )
}
