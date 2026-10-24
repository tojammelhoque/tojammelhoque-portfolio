'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import { LuArrowUpRight } from 'react-icons/lu'
import { booking } from '@/lib/data'

// The Cal.com script is heavy, so the calendar is loaded as a separate chunk, in the browser only.
const CalEmbed = dynamic(() => import('@/components/CalEmbed'), { ssr: false })

/** Section with the embedded Cal.com calendar where visitors book a free call. */
export default function Booking() {
  const calendarFrameRef = useRef<HTMLDivElement>(null)
  const [shouldLoadCalendar, setShouldLoadCalendar] = useState(false)

  // Load the calendar only when the frame is about to scroll into view, so the rest of the
  // page loads quickly and Cal.com is not contacted by visitors who never get this far.
  useEffect(() => {
    const calendarFrame = calendarFrameRef.current
    if (!calendarFrame) return

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadCalendar(true)
          visibilityObserver.disconnect() // one load is enough
        }
      },
      { rootMargin: '600px 0px' }, // start loading 600px before it becomes visible
    )
    visibilityObserver.observe(calendarFrame)

    return () => visibilityObserver.disconnect()
  }, [])

  return (
    <section
      id="book"
      aria-label="Book a free call"
      className="border-t border-line py-24 md:py-36"
    >
      <div className="container-site">
        <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-4">Book a call</p>
            <h2 className="text-balance text-[clamp(2rem,4.5vw,3.4rem)] font-medium leading-[1.05] tracking-[-0.02em]">
              Pick a time that <em className="serif-accent text-accent">suits you</em>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-ink-2">
            A free 15-minute call to talk about your project. Choose a slot that works for you.
          </p>
        </div>

        {/* Fixed-height frame: the calendar scrolls inside it if it needs more room. */}
        <div
          ref={calendarFrameRef}
          className="relative h-184 overflow-hidden rounded-2xl border border-line bg-white md:h-176"
        >
          <p className="absolute inset-0 flex items-center justify-center text-sm text-ink-3">
            Loading calendar…
          </p>
          {shouldLoadCalendar && (
            <div className="relative h-full">
              <CalEmbed />
            </div>
          )}
        </div>

        {/* Fallback in case the embed is blocked, for example by a privacy extension. */}
        <p className="mt-5 text-sm text-ink-3">
          Calendar not loading?{' '}
          <a
            href={booking.url}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-1 font-medium text-ink-2 transition-colors hover:text-ink"
          >
            <span className="link-sweep">Open the booking page</span>
            <LuArrowUpRight aria-hidden="true" className="size-4" />
          </a>
        </p>
      </div>
    </section>
  )
}
