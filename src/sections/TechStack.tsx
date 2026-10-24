'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, prefersReducedMotion } from '@/lib/scroll'
import { techStack } from '@/lib/tech'

/** Technology section: a short introduction beside a cloud of tool pills with their logos. */
export default function TechStack() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return

      // The pills pop in one after another when the section scrolls into view.
      gsap.fromTo(
        '[data-tech]',
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.05,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' },
        },
      )
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      id="technology"
      aria-label="Technology"
      className="border-t border-line py-24 md:py-32"
    >
      <div className="container-site grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="eyebrow mb-4">Technology</p>
          <h2 className="text-balance text-[clamp(1.8rem,3.4vw,2.7rem)] font-medium leading-[1.08] tracking-[-0.02em]">
            Built with modern technology
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-2">
            The stack is chosen for speed, reliability and maintainability — so your site stays fast
            and easy to evolve long after launch.
          </p>
        </div>

        <ul className="flex flex-wrap content-start gap-3 lg:col-span-8">
          {techStack.map((tech) => (
            <li
              key={tech.name}
              data-tech
              className="flex items-center gap-2.5 rounded-full border border-line bg-white/50 px-5 py-2.5 font-mono text-[13px] text-ink-2 transition-colors duration-300 hover:border-ink hover:text-ink"
            >
              <tech.icon aria-hidden="true" className="size-4" />
              {tech.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
