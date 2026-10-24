import Link from 'next/link'
import type { ReactNode } from 'react'
import PageShell from '@/components/PageShell'
import SectionLink from '@/components/SectionLink'
import { contact } from '@/lib/data'
import { buildPageMetadata } from '@/lib/site'

export const metadata = buildPageMetadata({
  title: 'Privacy Policy',
  description:
    'How this website collects, uses and protects your personal information, including the contact form, call booking and spam protection.',
  path: '/privacy',
})

/** When this policy was last changed. Update it whenever the text changes. */
const LAST_UPDATED = 'October 2026'

/** One numbered-free block of the policy: a heading followed by its text. */
function PolicySection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-12 border-t border-line pt-8">
      <h2 className="text-xl font-medium tracking-[-0.01em] md:text-2xl">{title}</h2>
      <div className="mt-4 flex flex-col gap-4 text-sm leading-relaxed text-ink-2 md:text-base">
        {children}
      </div>
    </section>
  )
}

/** Bulleted list used inside the policy. */
function PolicyList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span aria-hidden="true" className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

/** Privacy policy page: what the website collects, why, and how it is protected. */
export default function PrivacyPage() {
  return (
    <PageShell>
      <p className="eyebrow mb-4">Legal</p>
      <h1 className="text-[clamp(2.2rem,5vw,3.6rem)] font-medium leading-[1.05] tracking-[-0.03em]">
        Privacy <em className="serif-accent text-accent">policy</em>
      </h1>
      <p className="mt-4 font-mono text-xs text-ink-3">Last updated: {LAST_UPDATED}</p>
      <p className="mt-8 text-base leading-relaxed text-ink-2 md:text-lg">
        This website belongs to Tojammel Hoque, a freelance full-stack web developer based in West
        Bengal, India. This page explains what personal information the website collects, why it is
        collected, and what you can do about it. I keep it short and plain on purpose.
      </p>

      <PolicySection title="Information I collect">
        <PolicyList
          items={[
            'Contact form: your name, email address, business name (optional), the type of project, your budget range and your message.',
            'Booking a call: the calendar is provided by Cal.com. Cal.com collects the details you enter there, such as your name, email address and the time you choose, under its own privacy policy. The calendar only loads when you scroll to the booking section or open the booking page.',
            'Email: if you write to me directly, I receive your email address and whatever you send.',
            'Technical data: like most websites, the hosting service may record your IP address and browser details in its server logs, for security and to keep the site running.',
          ]}
        />
      </PolicySection>

      <PolicySection title="How I use it">
        <p>
          I use your information to reply to your message, prepare an estimate, arrange and hold a
          call, and carry out the work if we decide to work together. I do not use it for
          advertising and I do not sell it.
        </p>
      </PolicySection>

      <PolicySection title="Protection from spam">
        <p>The contact form has several protections against spam and abuse:</p>
        <PolicyList
          items={[
            'A hidden field that people never see but automated programs often fill in.',
            'A timing check that spots forms sent faster than a person could fill them in.',
            'A limit on how many messages one internet address can send in a short time. For this, your IP address is kept in the server’s memory for a few minutes. It is not saved or written to a database.',
            'A limit on the number of links in a message.',
          ]}
        />
      </PolicySection>

      <PolicySection title="Who receives your information">
        <p>
          Your contact-form message is delivered to my email inbox, which is hosted by Google
          (Gmail). The booking calendar is provided by Cal.com, and the website itself is delivered
          by a hosting provider. Each of them handles data under its own privacy policy. I do not
          share your information with anyone else, unless the law requires it.
        </p>
      </PolicySection>

      <PolicySection title="Cookies and tracking">
        <p>
          This website does not use advertising or analytics cookies, and it does not track you
          across other sites. Its fonts are served from the site itself, not from an outside
          service. The Cal.com calendar, and the sites I link to such as LinkedIn and GitHub, may
          set their own cookies when you use them.
        </p>
      </PolicySection>

      <PolicySection title="How long I keep it">
        <p>
          I keep enquiry emails only as long as I need them to reply to you, to carry out any work,
          and for my business records. You can ask me to delete them at any time.
        </p>
      </PolicySection>

      <PolicySection title="Your rights">
        <p>
          You can ask me what information I hold about you, ask me to correct it, or ask me to
          delete it. Email{' '}
          <a
            href={`mailto:${contact.email}`}
            className="link-sweep font-medium text-ink transition-colors hover:text-accent"
          >
            {contact.email}
          </a>{' '}
          and I will respond as soon as I can.
        </p>
      </PolicySection>

      <PolicySection title="Changes to this policy">
        <p>
          If I change how the website handles personal information, I will update this page and the
          date at the top.
        </p>
      </PolicySection>

      <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-line pt-8 text-sm">
        <Link
          href="/"
          className="link-sweep font-medium text-ink transition-colors hover:text-accent"
        >
          ← Back to home
        </Link>
        <SectionLink
          sectionId="contact"
          className="link-sweep font-medium text-ink transition-colors hover:text-accent"
        >
          Contact me
        </SectionLink>
      </div>
    </PageShell>
  )
}
