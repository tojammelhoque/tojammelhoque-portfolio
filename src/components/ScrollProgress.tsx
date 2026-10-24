'use client'

import { useEffect, useRef } from 'react'

/** A thin bar at the top of the page that fills up as the visitor scrolls down. */
export default function ScrollProgress() {
  const progressBarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let animationFrameId = 0

    // Scales the bar from 0 to 1 depending on how far down the page the visitor is.
    const updateProgressBar = () => {
      const maxScrollDistance = document.documentElement.scrollHeight - window.innerHeight
      const scrollProgress = maxScrollDistance > 0 ? window.scrollY / maxScrollDistance : 0
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${scrollProgress})`
      }
      animationFrameId = 0
    }

    // Scroll events fire very often, so do the work at most once per animation frame.
    const scheduleProgressUpdate = () => {
      if (!animationFrameId) animationFrameId = requestAnimationFrame(updateProgressBar)
    }

    updateProgressBar()
    window.addEventListener('scroll', scheduleProgressUpdate, { passive: true })
    window.addEventListener('resize', scheduleProgressUpdate)

    return () => {
      window.removeEventListener('scroll', scheduleProgressUpdate)
      window.removeEventListener('resize', scheduleProgressUpdate)
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div aria-hidden="true" className="fixed inset-x-0 top-0 z-60 h-[2px]">
      <div
        ref={progressBarRef}
        className="h-full w-full origin-left bg-accent"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  )
}
