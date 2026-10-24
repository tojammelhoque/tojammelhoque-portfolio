'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useHomeSectionLinks } from '@/lib/useHomeSectionLinks'

/** Links shown in the navigation bar. Each href is the id of a section on the page. */
const NAV_LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

/** How far (px) the page must be scrolled before the navbar gets its frosted background. */
const SCROLLED_THRESHOLD_PX = 40

/**
 * Fixed navigation bar, shown on every page. On small screens the links move into a menu.
 * The links lead to sections of the home page, so on other pages they open the home page first.
 */
export default function Navbar() {
  const [hasScrolled, setHasScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Remember whether the visitor has scrolled, so the navbar can switch to its compact style.
  useEffect(() => {
    const updateScrolledState = () => setHasScrolled(window.scrollY > SCROLLED_THRESHOLD_PX)

    updateScrolledState()
    window.addEventListener('scroll', updateScrolledState, { passive: true })
    return () => window.removeEventListener('scroll', updateScrolledState)
  }, [])

  // Builds a click handler that closes the menu, then scrolls to the section (or opens the home page).
  const { createSectionClickHandler } = useHomeSectionLinks()
  const createScrollClickHandler = (sectionSelector: string) =>
    createSectionClickHandler(sectionSelector, () => setIsMenuOpen(false))

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        hasScrolled
          ? 'border-b border-ink/10 bg-paper/85 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav
        aria-label="Main navigation"
        className={`container-site flex items-center justify-between transition-all duration-500 ${
          hasScrolled ? 'h-16' : 'h-20'
        }`}
      >
        <Link
          href="/"
          onClick={createScrollClickHandler('#top')}
          className="text-lg font-semibold tracking-[0.22em] text-ink"
        >
          TOJAMMEL HOQUE
        </Link>

        {/* Desktop links. Below 1024px they are replaced by the menu button. */}
        <ul className="hidden items-center gap-10 lg:flex">
          {NAV_LINKS.map((navLink) => (
            <li key={navLink.href}>
              <Link
                href={`/${navLink.href}`}
                onClick={createScrollClickHandler(navLink.href)}
                className="link-sweep text-base font-medium text-ink-2 transition-colors hover:text-ink"
              >
                {navLink.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link
            href="/#contact"
            onClick={createScrollClickHandler('#contact')}
            className="group hidden items-center gap-2 rounded-full bg-ink px-6 py-3 text-[15px] font-medium text-paper transition-colors hover:bg-accent lg:inline-flex"
          >
            Start a Project
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">
              →
            </span>
          </Link>

          {/* Menu button: two thin lines that rotate into a cross while the menu is open. */}
          <button
            type="button"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((wasOpen) => !wasOpen)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          >
            <span
              className={`h-px w-5 bg-ink transition-transform duration-300 ${isMenuOpen ? 'translate-y-[3.5px] rotate-45' : ''}`}
            />
            <span
              className={`h-px w-5 bg-ink transition-transform duration-300 ${isMenuOpen ? 'translate-y-[-3px] -rotate-45' : ''}`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu: slides open by animating its maximum height. */}
      <div
        className={`overflow-hidden border-b border-ink/10 bg-paper/95 backdrop-blur-md transition-all duration-500 lg:hidden ${
          isMenuOpen ? 'max-h-112 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="container-site flex flex-col gap-1 py-4">
          {NAV_LINKS.map((navLink) => (
            <li key={navLink.href}>
              <Link
                href={`/${navLink.href}`}
                onClick={createScrollClickHandler(navLink.href)}
                className="block py-2.5 text-2xl font-medium text-ink"
              >
                {navLink.label}
              </Link>
            </li>
          ))}
          <li className="pt-3">
            <Link
              href="/#contact"
              onClick={createScrollClickHandler('#contact')}
              className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-base font-medium text-paper"
            >
              Start a Project →
            </Link>
          </li>
        </ul>
      </div>
    </header>
  )
}
