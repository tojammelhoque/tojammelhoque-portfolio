import type { CSSProperties, ReactNode } from 'react'

interface MarqueeProps {
  children: ReactNode
  /** Which way the row slides. */
  direction?: 'left' | 'right'
  /** Seconds for one full loop. A longer time means a slower row. */
  duration?: number
}

/**
 * A row that slides on its own and loops without a visible seam.
 * The children are rendered twice and the row moves by exactly one copy, so the children
 * should be wider than the screen on their own. The row pauses while the mouse is over it.
 */
export default function Marquee({ children, direction = 'left', duration }: MarqueeProps) {
  // The loop speed is a CSS variable, so the animation itself stays in the stylesheet.
  const animationSpeedStyle = duration
    ? ({ '--marquee-duration': `${duration}s` } as CSSProperties)
    : undefined

  return (
    // overflow-hidden clips the row to the page width, and the mask fades both edges out.
    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
      <div
        style={animationSpeedStyle}
        className={`flex w-max hover:[animation-play-state:paused] motion-reduce:animate-none ${
          direction === 'left' ? 'animate-marquee' : 'animate-marquee-reverse'
        }`}
      >
        <div className="flex shrink-0 gap-4 pr-4">{children}</div>
        {/* The second copy only exists for the seamless loop, so screen readers skip it. */}
        <div aria-hidden="true" className="flex shrink-0 gap-4 pr-4">
          {children}
        </div>
      </div>
    </div>
  )
}
