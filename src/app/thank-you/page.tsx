import Link from 'next/link'
import BookCall from '@/components/BookCall'
import PageShell from '@/components/PageShell'
import SectionLink from '@/components/SectionLink'
import { buildPageMetadata } from '@/lib/site'

// Kept out of search results: it only makes sense right after sending the contact form.
export const metadata = buildPageMetadata({
  title: 'Thank You',
  description:
    'Thanks for getting in touch. Your message has been sent and I will reply within one business day.',
  path: '/thank-you',
  isIndexable: false,
})

/** What the visitor can expect after sending the contact form. */
const NEXT_STEPS = [
  'I read your message and reply by email within one business day.',
  'If it looks like a good fit, we arrange a short call to talk through the details.',
  'You get a clear written estimate before any work starts.',
]

/** Page shown after the contact form has been sent successfully. */
export default function ThankYouPage() {
  return (
    <PageShell>
      <p className="eyebrow mb-4">Message sent</p>
      <h1 className="text-balance text-[clamp(2.4rem,6vw,4.5rem)] font-medium leading-[1.05] tracking-[-0.03em]">
        Thank you. <em className="serif-accent text-accent">I’ll be in touch.</em>
      </h1>
      <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-2 md:text-lg">
        Your message is on its way to me. Here is what happens next:
      </p>

      <ul className="mt-8 flex max-w-xl flex-col gap-4 text-sm leading-relaxed text-ink-2 md:text-base">
        {NEXT_STEPS.map((nextStep) => (
          <li key={nextStep} className="flex gap-3">
            <span
              aria-hidden="true"
              className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
            />
            <span>{nextStep}</span>
          </li>
        ))}
      </ul>

      <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-5">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-paper transition-colors duration-300 hover:bg-accent"
        >
          Back to home
        </Link>
        <BookCall className="border border-ink px-7 py-3.5 text-ink hover:bg-ink hover:text-paper" />
        <SectionLink
          sectionId="work"
          className="link-sweep text-sm font-medium text-ink transition-colors hover:text-accent"
        >
          See my work
        </SectionLink>
      </div>
    </PageShell>
  )
}
