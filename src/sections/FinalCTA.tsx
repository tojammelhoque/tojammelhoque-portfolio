'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, prefersReducedMotion, scrollToSection } from '@/lib/scroll'
import BookCall from '@/components/BookCall'

/** Dark call-to-action section: a big question, a short line and two buttons. */
export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return

      // Hide the headline lines below their masks before they animate in.
      gsap.set('.mask-line > span', { yPercent: 110 })

      // When the section comes into view, the headline lines slide up first,
      // and the text and buttons fade in shortly after (0.4s into the timeline).
      const revealTimeline = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
        defaults: { ease: 'power3.out' },
      })
      revealTimeline
        .fromTo('.mask-line > span', { yPercent: 110 }, { yPercent: 0, duration: 1, stagger: 0.12 })
        .fromTo(
          '[data-cta-fade]',
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 },
          0.4,
        )
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      aria-label="Start a project"
      className="bg-ink py-28 text-paper md:py-44"
    >
      <div className="container-site text-center">
        <p data-cta-fade className="eyebrow eyebrow-on-dark mb-8">
          Ready when you are
        </p>
        <h2 className="mx-auto max-w-4xl text-balance text-[clamp(2.4rem,6.5vw,5rem)] font-medium leading-[1.03] tracking-[-0.03em]">
          <span className="mask-line">
            <span>Have a website</span>
          </span>
          <span className="mask-line">
            <span>
              in <em className="serif-accent text-highlight">mind?</em>
            </span>
          </span>
        </h2>
        <p
          data-cta-fade
          className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-dark-muted"
        >
          Tell me what you’re building. I’ll help you turn the idea into a modern website that
          represents your business properly.
        </p>
        <div data-cta-fade className="mt-12 flex flex-wrap items-center justify-center gap-5">
          {/* Main button in Fresh Lime */}
          <a
            href="#contact"
            onClick={(event) => {
              event.preventDefault()
              scrollToSection('#contact')
            }}
            className="group inline-flex items-center gap-2.5 rounded-full bg-highlight px-8 py-4 text-sm font-medium text-ink transition-colors duration-300 hover:bg-paper"
          >
            Start a Conversation
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
          <BookCall className="border border-paper/30 px-7 py-4 text-paper hover:border-paper" />
        </div>
      </div>
    </section>
  )
}
