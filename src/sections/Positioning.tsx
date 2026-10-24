'use client'

import { Fragment, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, prefersReducedMotion } from '@/lib/scroll'

/** The stages every project goes through, shown as an animated row of steps. */
const STEP_NAMES = ['Strategy', 'Development', 'Testing', 'Launch']

/** The positioning statement. It is split into words so each word can fade in separately. */
const STATEMENT =
  'I don’t just write code. I build websites that communicate your value clearly — and turn visitors into customers.'
const STATEMENT_WORDS = STATEMENT.split(' ')

/**
 * Section under the hero: an animated Strategy → Development → Testing → Launch row,
 * followed by a statement that fills in word by word. Both animations follow the scrollbar.
 */
export default function Positioning() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return

      // GSAP cannot animate towards a CSS variable, so read the actual colour values once.
      const rootStyles = getComputedStyle(document.documentElement)
      const [mutedColor, inkColor, accentColor] = [
        '--color-ink-3',
        '--color-ink',
        '--color-accent',
      ].map((variableName) => rootStyles.getPropertyValue(variableName).trim())

      const stepElements = gsap.utils.toArray<HTMLElement>('[data-step]')
      const arrowPaths = gsap.utils.toArray<SVGPathElement>('[data-arrow]')

      // A baton runs through the steps: each word lights up in the accent colour, hands over to
      // the next one, and the arrow between them draws itself. One step takes one time unit on
      // this timeline, and `scrub` maps the whole timeline onto the scroll distance.
      const stepperTimeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: '[data-stepper]', start: 'top 85%', end: 'top 35%', scrub: 0.6 },
      })

      // The thin line under the row fills up from the first step to the last.
      stepperTimeline.fromTo(
        '[data-rail]',
        { scaleX: 0 },
        { scaleX: 1, duration: stepElements.length - 1 },
        0,
      )

      stepElements.forEach((stepElement, stepIndex) => {
        const isLastStep = stepIndex === stepElements.length - 1

        // The word turns from grey to the accent colour when its turn comes...
        stepperTimeline.fromTo(
          stepElement,
          { color: mutedColor },
          { color: accentColor, duration: 0.4 },
          stepIndex,
        )

        // ...and settles to the normal text colour once the next word takes over.
        // The last word keeps the accent colour. immediateRender stops this tween from
        // applying its start colour early and overriding the grey starting state.
        if (!isLastStep) {
          stepperTimeline.fromTo(
            stepElement,
            { color: accentColor },
            { color: inkColor, duration: 0.4, immediateRender: false },
            stepIndex + 0.8,
          )
        }

        // The arrow after this step draws itself (stroke-dashoffset 1 → 0 reveals the path).
        const arrowPath = arrowPaths[stepIndex]
        if (arrowPath) {
          stepperTimeline.fromTo(
            arrowPath,
            { strokeDashoffset: 1 },
            { strokeDashoffset: 0, duration: 0.8 },
            stepIndex + 0.1,
          )
        }
      })

      // The statement starts almost transparent and fills in word by word while scrolling.
      gsap.fromTo(
        '[data-word]',
        { opacity: 0.14 },
        {
          opacity: 1,
          ease: 'none',
          stagger: 0.1,
          scrollTrigger: {
            trigger: '[data-statement]',
            start: 'top 85%',
            end: 'bottom 55%',
            scrub: 0.6,
          },
        },
      )
    },
    { scope: sectionRef },
  )

  return (
    <section ref={sectionRef} aria-label="Positioning" className="py-28 md:py-44">
      <div className="container-site">
        <div data-stepper className="inline-block">
          <ol className="flex flex-wrap items-center gap-x-4 gap-y-3 font-mono text-sm font-medium tracking-wide text-ink md:text-base">
            {STEP_NAMES.map((stepName, stepIndex) => (
              <li key={stepName} data-step className="flex items-center gap-4">
                <span>{stepName}</span>
                {/* Arrow to the next step. pathLength=1 lets GSAP draw it with a 0–1 offset. */}
                {stepIndex < STEP_NAMES.length - 1 && (
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 28 10"
                    className="h-2.5 w-7 shrink-0 text-accent"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path data-arrow d="M1 5h25M22 1l4 4-4 4" pathLength={1} strokeDasharray={1} />
                  </svg>
                )}
              </li>
            ))}
          </ol>

          {/* Progress line under the row */}
          <div aria-hidden="true" className="mt-5 h-px bg-line">
            <div data-rail className="h-full origin-left bg-accent" />
          </div>
        </div>

        <p
          data-statement
          className="mt-14 max-w-4xl text-balance text-[clamp(1.6rem,3.6vw,2.9rem)] font-medium leading-tight tracking-[-0.015em] text-ink"
        >
          {STATEMENT_WORDS.map((word, wordIndex) => (
            <Fragment key={`${word}-${wordIndex}`}>
              {/* The last word is set in the serif accent font. */}
              <span
                data-word
                className={wordIndex === STATEMENT_WORDS.length - 1 ? 'serif-accent' : undefined}
              >
                {word}
              </span>{' '}
            </Fragment>
          ))}
        </p>
      </div>
    </section>
  )
}
