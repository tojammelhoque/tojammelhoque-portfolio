'use client'

import { usePathname } from 'next/navigation'
import type { MouseEvent } from 'react'
import { scrollToSection } from '@/lib/scroll'

/**
 * Helps links that point to a section of the home page, such as "/#contact".
 * - On the home page, a click scrolls smoothly to the section.
 * - On any other page, the link works as a normal link: it opens the home page,
 *   and the browser jumps to the section.
 */
export function useHomeSectionLinks() {
  const isHomePage = usePathname() === '/'

  /** Builds a click handler for a link to the given section, for example '#contact'. */
  const createSectionClickHandler =
    (sectionSelector: string, onBeforeScroll?: () => void) => (event: MouseEvent) => {
      onBeforeScroll?.()
      if (!isHomePage) return

      event.preventDefault()
      scrollToSection(sectionSelector)
    }

  return { isHomePage, createSectionClickHandler }
}
