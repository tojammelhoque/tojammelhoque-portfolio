import type { Metadata } from 'next'
import Link from 'next/link'
import PageShell from '@/components/PageShell'
import SectionLink from '@/components/SectionLink'

// A 404 page has no canonical address, and Next.js already marks it as not for search results.
export const metadata: Metadata = {
  title: 'Page Not Found',
  description:
    'The page you are looking for does not exist. Head back to the home page to see my work, services and contact details.',
}

/** Where a visitor can go from a page that does not exist. */
const HELPFUL_SECTIONS = [
  { label: 'My work', sectionId: 'work' },
  { label: 'Services', sectionId: 'services' },
  { label: 'FAQ', sectionId: 'faq' },
  { label: 'Contact', sectionId: 'contact' },
]

/** Custom 404 page, shown when a visitor opens an address that does not exist. */
export default function NotFound() {
  return (
    <PageShell>
      <p className="eyebrow mb-4">Error 404</p>
      <h1 className="text-balance text-[clamp(2.4rem,6vw,4.5rem)] font-medium leading-[1.05] tracking-[-0.03em]">
        This page <em className="serif-accent text-accent">doesn’t exist.</em>
      </h1>
      <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-2 md:text-lg">
        The link may be broken, or the page may have moved. These places should help:
      </p>

      <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-paper transition-colors duration-300 hover:bg-accent"
        >
          Back to home
        </Link>
        <ul className="flex flex-wrap items-center gap-x-7 gap-y-3">
          {HELPFUL_SECTIONS.map((helpfulSection) => (
            <li key={helpfulSection.sectionId}>
              <SectionLink
                sectionId={helpfulSection.sectionId}
                className="link-sweep text-sm font-medium text-ink transition-colors hover:text-accent"
              >
                {helpfulSection.label}
              </SectionLink>
            </li>
          ))}
        </ul>
      </div>
    </PageShell>
  )
}
