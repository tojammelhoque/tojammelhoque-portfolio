'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, prefersReducedMotion } from '@/lib/scroll'

/** Short list of skills shown under the introduction. */
const STRENGTHS = [
  'Frontend development',
  'Backend development',
  'Authentication & security',
  'Databases & APIs',
  'Deployment & CI/CD',
  'Performance',
]

/** About section: portrait photo on the left, short introduction and skills on the right. */
export default function About() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return

      // The portrait frame is revealed from the top downwards while it scrolls into view.
      gsap.fromTo(
        '[data-photo]',
        { clipPath: 'inset(0 0 100% 0)' },
        {
          clipPath: 'inset(0 0 0% 0)',
          ease: 'none',
          scrollTrigger: { trigger: '[data-photo]', start: 'top 90%', end: 'top 40%', scrub: 0.6 },
        },
      )

      // The photo itself drifts slowly inside its frame (parallax). It is scaled up a little,
      // so the frame stays filled while the photo moves up and down.
      gsap.fromTo(
        '[data-photo-img]',
        { scale: 1.08, yPercent: -3 },
        {
          scale: 1.08,
          yPercent: 3,
          ease: 'none',
          scrollTrigger: {
            trigger: '[data-photo]',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      )

      // The text blocks rise into place one after another.
      gsap.fromTo(
        '[data-about]',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          ease: 'none',
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'top 20%',
            scrub: 0.6,
          },
        },
      )
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-label="About"
      className="border-t border-line py-24 md:py-36"
    >
      <div className="container-site grid items-center gap-16 lg:grid-cols-12 lg:gap-0">
        <div className="relative lg:col-span-5">
          {/* Thin blue frame, offset behind the photo for depth */}
          <div
            aria-hidden="true"
            className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl border border-accent md:translate-x-4 md:translate-y-4"
          />
          <div data-photo className="relative aspect-4/5 overflow-hidden rounded-2xl bg-paper-2">
            <Image
              data-photo-img
              src="/images/profile.jpg"
              alt="Portrait of Tojammel Hoque"
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <p data-about className="eyebrow mb-4">
            About
          </p>
          <h2
            data-about
            className="text-balance text-[clamp(2rem,4vw,3.1rem)] font-medium leading-[1.06] tracking-[-0.02em]"
          >
            Hi, I’m <em className="serif-accent text-accent">Tojammel Hoque.</em>
          </h2>
          <p data-about className="mt-8 text-lg leading-relaxed text-ink md:text-xl">
            Full-Stack Web Developer focused on building modern websites and web applications for
            businesses, founders and growing brands.
          </p>
          <p data-about className="mt-6 text-sm leading-relaxed text-ink-2 md:text-base">
            I work across the whole stack — frontend, backend, databases, authentication, deployment
            and performance — but the starting point is always the same: your business. A website
            should earn its place by communicating clearly, loading fast and converting visitors
            into customers. That’s what I build.
          </p>
          <ul data-about className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
            {STRENGTHS.map((strength) => (
              <li key={strength} className="flex items-center gap-2.5 text-sm text-ink-2">
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-accent" />
                {strength}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
