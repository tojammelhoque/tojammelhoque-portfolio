'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'
import { useHomeSectionLinks } from '@/lib/useHomeSectionLinks'

/**
 * Link to a section of the home page, for example sectionId="faq" for the FAQ section.
 * On the home page it scrolls smoothly. On other pages it opens the home page at that section.
 */
export default function SectionLink({
  sectionId,
  className = '',
  children,
}: {
  sectionId: string
  className?: string
  children: ReactNode
}) {
  const { createSectionClickHandler } = useHomeSectionLinks()

  return (
    <Link
      href={`/#${sectionId}`}
      onClick={createSectionClickHandler(`#${sectionId}`)}
      className={className}
    >
      {children}
    </Link>
  )
}
