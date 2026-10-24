'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, prefersReducedMotion } from '@/lib/scroll'
import { services } from '@/lib/data'

/** Extra distance (px) each card sticks below the previous one, so the stack edges stay visible. */
const STACK_OFFSET_PX = 14

/**
 * Services section. The cards are "sticky", so each one stays in place while the next card
 * slides over it, like a deck of cards. The previous card shrinks and dims as it gets covered.
 */
export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return

      // The heading rises into place while it scrolls into view.
      gsap.fromTo(
        '[data-services-head]',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: '[data-services-head]',
            start: 'top 90%',
            end: 'top 60%',
            scrub: true,
          },
        },
      )

      const cardElements = gsap.utils.toArray<HTMLElement>('[data-card]')
      cardElements.forEach((cardElement, cardIndex) => {
        // The big outlined icon drifts upward while its card crosses the screen (parallax).
        gsap.fromTo(
          cardElement.querySelector('[data-card-icon]'),
          { yPercent: 18 },
          {
            yPercent: -18,
            ease: 'none',
            scrollTrigger: {
              trigger: cardElement,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        )

        // The last card is never covered, so only earlier cards get the "covered" animation.
        const nextCardElement = cardElements[cardIndex + 1]
        if (!nextCardElement) return

        // While the next card slides over this one, this card shrinks back and dims.
        gsap
          .timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              trigger: nextCardElement,
              // Starts when the next card touches the bottom edge of this (stuck) card...
              start: () =>
                `top ${parseFloat(getComputedStyle(cardElement).top) + cardElement.offsetHeight}px`,
              // ...and ends when the next card reaches its own sticky position.
              end: () => `top ${getComputedStyle(nextCardElement).top}`,
              scrub: true,
            },
          })
          .to(
            cardElement.querySelector('[data-card-body]'),
            { scale: 0.93, transformOrigin: '50% 0' },
            0,
          )
          .to(cardElement.querySelector('[data-card-shade]'), { opacity: 0.55 }, 0)
      })
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      id="services"
      aria-label="Services"
      className="border-t border-line pt-24 md:pt-36"
    >
      <div className="container-site">
        <div
          data-services-head
          className="mb-14 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="eyebrow mb-4">Services</p>
            <h2 className="text-balance text-[clamp(2rem,4.5vw,3.4rem)] font-medium leading-[1.05] tracking-[-0.02em]">
              What I can build <em className="serif-accent text-accent">for you</em>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-ink-2">
            Every engagement is scoped around one thing: what your website needs to achieve for your
            business.
          </p>
        </div>

        <ul>
          {services.map((service, serviceIndex) => (
            <li
              key={service.title}
              data-card
              className="service-card sticky mb-6 md:mb-10"
              // Each card sticks a little lower than the one before it.
              style={{ top: `calc(5.5rem + ${serviceIndex * STACK_OFFSET_PX}px)` }}
            >
              <article
                data-card-body
                className="relative flex min-h-96 flex-col justify-end overflow-hidden rounded-2xl border border-(--card-line) bg-(--card-bg) p-7 text-(--card-fg) md:min-h-112 md:p-12"
              >
                {/* Dark layer that fades in while another card covers this one */}
                <span
                  data-card-shade
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-20 bg-ink opacity-0"
                />

                {/* Large outlined icon in the corner, purely decorative */}
                <service.icon
                  data-card-icon
                  aria-hidden="true"
                  strokeWidth={0.6}
                  className="pointer-events-none absolute right-5 top-5 size-28 select-none text-(--card-outline) md:-bottom-4 md:right-10 md:top-auto md:size-[clamp(10rem,20vw,16rem)]"
                />

                <div className="relative z-10 max-w-xl">
                  <h3 className="text-[clamp(1.9rem,4.2vw,3.4rem)] font-medium leading-[1.05] tracking-[-0.02em]">
                    {service.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-(--card-muted) md:text-base">
                    {service.description}
                  </p>
                  <ul className="mt-7 flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-(--card-line) px-4 py-1.5 font-mono text-xs text-(--card-muted)"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
