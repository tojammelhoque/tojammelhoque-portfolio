import { LuPlus } from 'react-icons/lu'
import SectionLink from '@/components/SectionLink'
import { faqs } from '@/lib/data'

/**
 * Frequently asked questions. Each answer opens and closes with the browser's built-in
 * <details> element, so it works without JavaScript and with the keyboard.
 */
export default function Faq() {
  // The same questions are described for search engines too (schema.org "FAQPage" data),
  // which can make them eligible for expanded search results.
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }

  return (
    <section
      id="faq"
      aria-label="Frequently asked questions"
      className="border-t border-line py-24 md:py-36"
    >
      {/* "<" is escaped so the data can never close the script tag early. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
        }}
      />

      <div className="container-site grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="eyebrow mb-4">FAQ</p>
          <h2 className="text-balance text-[clamp(2rem,4vw,3.1rem)] font-medium leading-[1.06] tracking-[-0.02em]">
            Questions, <em className="serif-accent text-accent">answered</em>
          </h2>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-2">
            Can’t find what you are looking for?{' '}
            <SectionLink
              sectionId="contact"
              className="link-sweep font-medium text-ink transition-colors hover:text-accent"
            >
              Send me a message
            </SectionLink>
            .
          </p>
        </div>

        <ul className="border-b border-line lg:col-span-8">
          {faqs.map((faq) => (
            <li key={faq.question} className="border-t border-line">
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-medium tracking-[-0.01em] text-ink [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  {/* The plus turns into a cross while the answer is open. */}
                  <LuPlus
                    aria-hidden="true"
                    className="size-5 shrink-0 text-accent transition-transform duration-300 group-open:rotate-45"
                  />
                </summary>
                <div className="pb-7 pr-10 text-sm leading-relaxed text-ink-2 md:text-base">
                  <p>{faq.answer}</p>
                  {faq.link && (
                    <SectionLink
                      sectionId={faq.link.href.replace('/#', '')}
                      className="link-sweep mt-4 inline-block text-sm font-medium text-ink transition-colors hover:text-accent"
                    >
                      {faq.link.label} →
                    </SectionLink>
                  )}
                </div>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
