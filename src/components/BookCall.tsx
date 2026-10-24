'use client'

import Link from 'next/link'
import { LuCalendarCheck } from 'react-icons/lu'
import { useHomeSectionLinks } from '@/lib/useHomeSectionLinks'

/**
 * "Book a free call" button. It leads to the booking calendar on the home page:
 * it scrolls there when you are already on the home page, and opens the home page otherwise.
 */
export default function BookCall({ className = '' }: { className?: string }) {
  const { createSectionClickHandler } = useHomeSectionLinks()

  return (
    <Link
      href="/#book"
      onClick={createSectionClickHandler('#book')}
      className={`inline-flex items-center gap-2.5 rounded-full text-sm font-medium transition-colors duration-300 ${className}`}
    >
      <LuCalendarCheck aria-hidden="true" className="size-4" />
      Book a free call
    </Link>
  )
}
