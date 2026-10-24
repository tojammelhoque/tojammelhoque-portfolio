'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, prefersReducedMotion } from '@/lib/scroll'
import { processSteps } from '@/lib/data'

/**
 * Process section: the steps from first conversation to launch, along a vertical line.
 * On desktop the steps zig-zag on both sides of the line. On phones they sit on one side.
 */
export default function Process() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return

      // The blue progress line draws itself downwards in step with the scrollbar.
      gsap.fromTo(
        '[data-process-line]',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '[data-process-steps]',
            start: 'top 70%',
            end: 'bottom 55%',
            scrub: 1,
          },
        },
      )

      // Each step fades and rises into place when it comes into view.
      gsap.utils.toArray<HTMLElement>('[data-step-row]').forEach((stepRowElement) => {
        gsap.fromTo(
          stepRowElement,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: { trigger: stepRowElement, start: 'top 82%' },
          },
        )
      })
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      id="process"
      aria-label="Process"
      className="border-t border-line bg-paper-2 py-24 md:py-36"
    >
      <div className="container-site">
        <div className="mb-16 max-w-2xl md:mb-24">
          <p className="eyebrow mb-4">Process</p>
          <h2 className="text-balance text-[clamp(2rem,4.5vw,3.4rem)] font-medium leading-[1.05] tracking-[-0.02em]">
            From idea to <em className="serif-accent text-accent">launch</em>
          </h2>
          <p className="mt-5 max-w-lg text-sm leading-relaxed text-ink-2">
            A clear, proven process. You know exactly what happens at every stage — no surprises, no
            disappearing acts.
          </p>
        </div>

        <div data-process-steps className="relative">
          {/* Grey track, and the blue line on top of it that fills up while scrolling */}
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-[7px] top-0 w-px bg-line md:left-1/2"
          />
          <div
            aria-hidden="true"
            data-process-line
            className="absolute bottom-0 left-[7px] top-0 w-px origin-top bg-accent md:left-1/2"
          />

          <ol className="flex flex-col gap-14 md:gap-20">
            {processSteps.map((step, stepIndex) => {
              // On desktop the title and the description swap sides for every other step.
              const isTitleOnLeft = stepIndex % 2 === 0

              return (
                <li
                  key={step.title}
                  data-step-row
                  className="relative grid gap-3 pl-10 md:grid-cols-2 md:gap-16 md:pl-0"
                >
                  {/* Dot on the line */}
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-2 h-[15px] w-[15px] rounded-full border-2 border-accent bg-paper-2 md:left-1/2 md:-translate-x-1/2"
                  />
                  <div className={isTitleOnLeft ? 'md:pr-16 md:text-right' : 'md:order-2 md:pl-16'}>
                    <h3 className="text-2xl font-medium tracking-[-0.01em] md:text-3xl">
                      {step.title}
                    </h3>
                  </div>
                  <div className={isTitleOnLeft ? 'md:order-2 md:pl-16' : 'md:pr-16 md:text-right'}>
                    <p className="text-sm leading-relaxed text-ink-2 md:text-base">
                      {step.description}
                    </p>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
