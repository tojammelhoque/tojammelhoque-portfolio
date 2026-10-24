'use client'

import { useEffect, type ReactNode } from 'react'
import { destroySmoothScroll, initSmoothScroll, ScrollTrigger } from '@/lib/scroll'

/** Turns on smooth scrolling for the whole page and cleans it up when the page unmounts. */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    initSmoothScroll()

    // Fonts and images change the page height after the first render, so measure all
    // scroll-triggered animations again once they have finished loading.
    const refreshScrollTriggers = () => ScrollTrigger.refresh()
    window.addEventListener('load', refreshScrollTriggers)
    document.fonts?.ready.then(refreshScrollTriggers)

    return () => {
      window.removeEventListener('load', refreshScrollTriggers)
      destroySmoothScroll()
    }
  }, [])

  return <>{children}</>
}
