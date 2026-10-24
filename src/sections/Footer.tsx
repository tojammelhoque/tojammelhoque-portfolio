import Link from 'next/link'
import SectionLink from '@/components/SectionLink'
import { contact } from '@/lib/data'

/** Links to other websites and email, shown on the right side of the footer. */
const EXTERNAL_LINKS = [
  { label: 'LinkedIn', href: contact.linkedin.href },
  { label: 'GitHub', href: contact.github.href },
  { label: 'Email', href: `mailto:${contact.email}` },
]

/** Style shared by the small text links in the footer. */
const FOOTER_LINK_CLASS_NAME =
  'link-sweep text-sm text-slate-300 transition-colors hover:text-paper'

/** Page footer on a dark background, shown on every page: name, short description and links. */
export default function Footer() {
  return (
    <footer className="border-t border-dark-line bg-ink py-12 text-paper">
      <div className="container-site flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold tracking-[0.22em]">TOJAMMEL HOQUE</p>
          <p className="mt-2 text-sm text-dark-muted">Full-Stack Web Developer</p>
          <p className="mt-1 text-sm text-dark-muted">
            Building modern websites for ambitious businesses.
          </p>
        </div>

        <div className="flex flex-col gap-4 md:items-end">
          <ul className="flex gap-6">
            {EXTERNAL_LINKS.map((externalLink) => (
              <li key={externalLink.label}>
                <a
                  href={externalLink.href}
                  target={externalLink.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className={FOOTER_LINK_CLASS_NAME}
                >
                  {externalLink.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Links to pages and sections of this website */}
          <ul className="flex gap-6">
            <li>
              <SectionLink sectionId="faq" className={FOOTER_LINK_CLASS_NAME}>
                FAQ
              </SectionLink>
            </li>
            <li>
              <Link href="/privacy" className={FOOTER_LINK_CLASS_NAME}>
                Privacy Policy
              </Link>
            </li>
          </ul>

          <p className="text-xs text-dark-muted">© 2026 Tojammel Hoque. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
