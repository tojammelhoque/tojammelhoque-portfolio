import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/** The running smooth-scroll instance, or null when it is off (for example with reduced motion). */
let smoothScroller: Lenis | null = null

/** The function registered on GSAP's ticker that advances the smooth scroller each frame. */
let onGsapTick: ((timeInSeconds: number) => void) | null = null

/** True when the visitor has asked their system to reduce motion. */
export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Starts Lenis smooth scrolling and keeps ScrollTrigger in sync with it. */
export function initSmoothScroll() {
  if (smoothScroller || prefersReducedMotion()) return

  smoothScroller = new Lenis({ lerp: 0.1, smoothWheel: true })

  // Tell ScrollTrigger about every scroll update so scrubbed animations stay in step.
  smoothScroller.on('scroll', ScrollTrigger.update)

  // Lenis needs a frame loop. GSAP's ticker already runs one, so it drives Lenis too.
  onGsapTick = (timeInSeconds) => smoothScroller?.raf(timeInSeconds * 1000)
  gsap.ticker.add(onGsapTick)
  gsap.ticker.lagSmoothing(0)
}

/** Stops smooth scrolling and releases everything created by initSmoothScroll. */
export function destroySmoothScroll() {
  if (onGsapTick) gsap.ticker.remove(onGsapTick)
  onGsapTick = null
  smoothScroller?.destroy()
  smoothScroller = null
}

/**
 * Scrolls smoothly to the element matching the CSS selector, for example '#contact'.
 * The gap that keeps the section clear of the fixed navbar comes from `scroll-margin-top`
 * in globals.css, which both Lenis and the browser respect.
 */
export function scrollToSection(selector: string) {
  const section = document.querySelector<HTMLElement>(selector)
  if (!section) return

  if (smoothScroller) {
    smoothScroller.scrollTo(section, { duration: 1.4 })
  } else {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

/** Freezes page scrolling, for example while a modal dialog is open. */
export function lockPageScroll() {
  smoothScroller?.stop()
  document.body.style.overflow = 'hidden'
}

/** Restores page scrolling after lockPageScroll. */
export function unlockPageScroll() {
  smoothScroller?.start()
  document.body.style.overflow = ''
}

export { gsap, ScrollTrigger }
