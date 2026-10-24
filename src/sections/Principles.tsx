'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, prefersReducedMotion } from '@/lib/scroll'
import { principles } from '@/lib/data'

/** "Why work with me" section: a heading beside a grid of four working principles. */
export default function Principles() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return

      // The principles rise into place one after another when the list scrolls into view.
      gsap.fromTo(
        '[data-principle]',
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: { trigger: '[data-principles-list]', start: 'top 80%' },
        },
      )
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      aria-label="Why work with me"
      className="border-t border-line py-24 md:py-36"
    >
      <div className="container-site grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="eyebrow mb-4">Why Work With Me</p>
          <h2 className="text-balance text-[clamp(2rem,4vw,3.1rem)] font-medium leading-[1.06] tracking-[-0.02em]">
            More than just <em className="serif-accent">development.</em>
          </h2>
        </div>

        <div data-principles-list className="lg:col-span-8">
          <dl className="grid gap-x-12 gap-y-12 sm:grid-cols-2">
            {principles.map((principle) => (
              <div key={principle.title} data-principle className="border-t border-line pt-6">
                <dt className="flex items-center gap-3">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
                  <span className="text-xl font-medium tracking-[-0.01em]">{principle.title}</span>
                </dt>
                {/* pl-[18px] lines the text up with the title, past the small dot */}
                <dd className="mt-3 pl-[18px] text-sm leading-relaxed text-ink-2">
                  {principle.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
