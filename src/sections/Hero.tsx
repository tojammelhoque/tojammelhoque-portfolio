'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, prefersReducedMotion, scrollToSection } from '@/lib/scroll'
import BrowserMockup from '@/components/BrowserMockup'

/** Opening section: headline, short pitch, two buttons and a sketch of one of the projects. */
export default function Hero() {
  const heroSectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return

      // Hide every headline line below its mask before the first paint,
      // so the lines can slide up into view instead of flashing on screen.
      gsap.set('.mask-line > span', { yPercent: 110 })

      // Intro animation that plays once when the page loads. The numbers at the end of each
      // step are start times in seconds, so the steps overlap into one smooth sequence.
      const introTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } })
      introTimeline
        .fromTo(
          '.mask-line > span',
          { yPercent: 110 },
          { yPercent: 0, duration: 1.1, stagger: 0.12 },
          0.15,
        )
        .fromTo(
          '[data-hero-word]',
          { opacity: 0, scale: 0.92, rotate: -2 },
          { opacity: 1, scale: 1, rotate: 0, duration: 0.9, ease: 'power2.out' },
          0.75,
        )
        .fromTo(
          '[data-fade]',
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.1 },
          0.55,
        )
        .fromTo(
          '[data-mockup]',
          { opacity: 0, y: 60, scale: 0.94 },
          { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power3.out' },
          0.6,
        )

      // While scrolling away from the hero, the text and the sketch drift at different speeds.
      const scrubWhileLeavingHero = {
        trigger: heroSectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
      gsap.to('[data-hero-copy]', {
        yPercent: -18,
        opacity: 0.25,
        ease: 'none',
        scrollTrigger: scrubWhileLeavingHero,
      })
      gsap.to('[data-mockup]', {
        y: -40,
        scale: 0.97,
        ease: 'none',
        scrollTrigger: scrubWhileLeavingHero,
      })
    },
    { scope: heroSectionRef },
  )

  return (
    <section
      ref={heroSectionRef}
      id="top"
      aria-label="Introduction"
      className="relative overflow-hidden pt-28 pb-24 md:pt-40 md:pb-32"
    >
      {/* Faint vertical grid lines in the background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-size-[clamp(60px,8vw,120px)_100%]"
      />

      <div className="container-site relative">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
          <div data-hero-copy className="lg:col-span-7">
            {/* Availability badge in Fresh Lime */}
            <p
              data-fade
              className="mb-7 inline-flex items-center gap-2.5 rounded-full bg-highlight px-4 py-2 text-xs font-medium text-ink"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ink opacity-40" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-ink" />
              </span>
              Available for new projects
            </p>

            {/* Each line sits in a mask, so the intro animation can slide it up from below. */}
            <h1 className="text-balance text-[clamp(2rem,4.4vw,3.4rem)] font-medium leading-[1.1] tracking-[-0.03em] text-ink">
              <span className="mask-line">
                <span>I build the parts</span>
              </span>
              <span className="mask-line">
                <span>your customers never see</span>
              </span>
              <span className="mask-line">
                <span>
                  but always{' '}
                  <em data-hero-word className="serif-accent inline-block text-accent">
                    rely on.
                  </em>
                </span>
              </span>
            </h1>

            <p data-fade className="mt-7 max-w-xl text-base leading-relaxed text-ink-2 md:text-lg">
              Secure logins, fast pages and reliable deploys, for businesses, founders, coaches,
              consultants and growing brands.
            </p>

            <div data-fade className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                onClick={(event) => {
                  event.preventDefault()
                  scrollToSection('#contact')
                }}
                className="group inline-flex items-center gap-2.5 rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-paper transition-colors duration-300 hover:bg-accent"
              >
                Start a Project
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
              <a
                href="#work"
                onClick={(event) => {
                  event.preventDefault()
                  scrollToSection('#work')
                }}
                className="link-sweep text-sm font-medium text-ink"
              >
                View My Work
              </a>
            </div>
          </div>

          {/* Sketch of the login system, drawn in code inside a browser frame */}
          <div className="relative lg:col-span-5" data-mockup>
            <div className="relative lg:-mr-16 lg:translate-x-4">
              <BrowserMockup theme="auth" />
              <div
                aria-hidden="true"
                className="absolute -bottom-6 -left-6 -z-10 h-40 w-40 rounded-full border border-line"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
