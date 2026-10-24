'use client'

import Cal, { getCalApi } from '@calcom/embed-react'
import { useEffect } from 'react'
import { booking } from '@/lib/data'

/** Groups this embed's settings so they cannot clash with any other Cal embed on the page. */
const CAL_NAMESPACE = 'booking'

/** Cal.com inline booking calendar, styled to match the site. */
export default function CalEmbed() {
  useEffect(() => {
    // Reuse the site's accent colour (Electric Blue) for Cal's buttons and selected dates.
    const accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--color-accent')
      .trim()

    getCalApi({ namespace: CAL_NAMESPACE }).then((calendarApi) => {
      calendarApi('ui', {
        theme: 'light',
        layout: 'month_view',
        hideEventTypeDetails: false,
        cssVarsPerTheme: {
          light: { 'cal-brand': accentColor },
          dark: { 'cal-brand': accentColor },
        },
      })
    })
  }, [])

  return (
    <Cal
      namespace={CAL_NAMESPACE}
      calLink={booking.calLink}
      config={{ layout: 'month_view', theme: 'light' }}
      style={{ width: '100%', height: '100%', overflow: 'auto' }}
    />
  )
}
