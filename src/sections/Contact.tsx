'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { useGSAP } from '@gsap/react'
import BookCall from '@/components/BookCall'
import { gsap, prefersReducedMotion } from '@/lib/scroll'
import { contact } from '@/lib/data'

/** Options of the "What do you need?" field. They match the services offered. */
const PROJECT_TYPE_OPTIONS = [
  'Business website',
  'Personal brand website',
  'Landing page',
  'Full-stack web app or SaaS',
  'E-commerce store',
  'Authentication or booking system',
  'Integration, performance or deployment',
  'Not sure yet',
]

/** Options of the "Budget range" field. */
const BUDGET_OPTIONS = [
  'Under $1,000',
  '$1,000 – $3,000',
  '$3,000 – $7,000',
  '$7,000+',
  'Prefer to discuss',
]

/** Ways to reach me, listed under the intro text. */
const CONTACT_LINKS = [
  { label: 'Email', text: contact.email, href: `mailto:${contact.email}` },
  { label: 'LinkedIn', text: contact.linkedin.label, href: contact.linkedin.href },
  { label: 'GitHub', text: contact.github.label, href: contact.github.href },
]

/** Style shared by every form field: no box, just a line underneath that turns blue on focus. */
const FIELD_CLASS_NAME =
  'w-full border-b border-line bg-transparent py-3.5 text-[15px] text-ink placeholder:text-ink-3 focus:border-accent focus:outline-hidden transition-colors duration-300'

/** A form field with a small label above it. */
function FormField({
  id,
  label,
  className = '',
  children,
}: {
  id: string
  label: string
  className?: string
  children: ReactNode
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="eyebrow mb-1 block">
        {label}
      </label>
      {children}
    </div>
  )
}

/** Where the form is after the visitor presses the send button. */
type SubmissionStatus = 'idle' | 'sending' | 'email-draft-opened' | 'failed'

/** Contact section: intro text, booking button and links on the left, enquiry form on the right. */
export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const router = useRouter()
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  // Remember when the form appeared. The server compares it with the moment of sending to spot
  // bots, which "fill in" the whole form in a split second.
  const formStartedAtRef = useRef(0)
  useEffect(() => {
    formStartedAtRef.current = Date.now()
  }, [])

  useGSAP(
    () => {
      if (prefersReducedMotion()) return

      // Everything in the section rises into place one after another.
      gsap.fromTo(
        '[data-contact]',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
        },
      )
    },
    { scope: sectionRef },
  )

  // Opens the visitor's email app with the answers filled in. Used as a fallback while
  // the server has no email service set up yet.
  const openEmailDraft = (formData: FormData) => {
    const subject = `Project enquiry from ${formData.get('name')}`
    const body = [
      `Name: ${formData.get('name')}`,
      `Email: ${formData.get('email')}`,
      `Business / Company: ${formData.get('company')}`,
      `What do you need: ${formData.get('need')}`,
      `Budget range: ${formData.get('budget')}`,
      '',
      String(formData.get('message') ?? ''),
    ].join('\n')

    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  // Sends the form to the server (/api/contact). On success the visitor is taken to the
  // thank-you page. If the server has no email service set up yet (status 503), the form
  // falls back to an email draft instead.
  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    setSubmissionStatus('sending')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...Object.fromEntries(formData),
          formStartedAt: formStartedAtRef.current,
        }),
      })

      if (response.ok) {
        router.push('/thank-you')
        return
      }

      if (response.status === 503) {
        openEmailDraft(formData)
        setSubmissionStatus('email-draft-opened')
        return
      }

      // Any other problem: show the server's explanation, or a general one.
      const errorResponse = await response.json().catch(() => null)
      setErrorMessage(
        errorResponse?.message ?? 'Something went wrong. Please try again, or email me directly.',
      )
      setSubmissionStatus('failed')
    } catch {
      setErrorMessage('The message could not be sent. Please check your connection and try again.')
      setSubmissionStatus('failed')
    }
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      aria-label="Contact"
      className="border-t border-line py-24 md:py-36"
    >
      <div className="container-site grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p data-contact className="eyebrow mb-4">
            Contact
          </p>
          <h2
            data-contact
            className="text-balance text-[clamp(2rem,4vw,3.1rem)] font-medium leading-[1.06] tracking-[-0.02em]"
          >
            Let’s build it <em className="serif-accent text-accent">together.</em>
          </h2>
          <p data-contact className="mt-5 max-w-md text-sm leading-relaxed text-ink-2 md:text-base">
            Tell me a little about your project and I’ll get back to you within one business day. No
            pressure, no obligation — just a straightforward conversation about what you need.
          </p>

          <div data-contact className="mt-8">
            <BookCall className="border border-ink px-7 py-3.5 text-ink hover:bg-ink hover:text-paper" />
          </div>

          <ul data-contact className="mt-10 flex flex-col gap-4">
            {CONTACT_LINKS.map((contactLink) => (
              <li key={contactLink.label} className="flex items-baseline gap-4">
                <span className="eyebrow w-20">{contactLink.label}</span>
                <a
                  href={contactLink.href}
                  target={contactLink.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="link-sweep text-sm font-medium text-ink"
                >
                  {contactLink.text}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <form
          data-contact
          onSubmit={handleFormSubmit}
          className="grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:col-span-7"
          aria-label="Project enquiry form"
        >
          {/* Honeypot: people never see this field (and screen readers skip it), but bots fill it in. */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label htmlFor="website">Leave this field empty</label>
            <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <FormField id="name" label="Name">
            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder="Your name"
              className={FIELD_CLASS_NAME}
            />
          </FormField>
          <FormField id="email" label="Email">
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@company.com"
              className={FIELD_CLASS_NAME}
            />
          </FormField>
          <FormField id="company" label="Business / Company">
            <input
              id="company"
              name="company"
              type="text"
              autoComplete="organization"
              placeholder="Your business"
              className={FIELD_CLASS_NAME}
            />
          </FormField>
          <FormField id="need" label="What do you need?">
            <select
              id="need"
              name="need"
              required
              defaultValue=""
              className={`${FIELD_CLASS_NAME} cursor-pointer`}
            >
              <option value="" disabled>
                Select one
              </option>
              {PROJECT_TYPE_OPTIONS.map((projectType) => (
                <option key={projectType}>{projectType}</option>
              ))}
            </select>
          </FormField>
          <FormField id="budget" label="Budget range" className="sm:col-span-2">
            <select
              id="budget"
              name="budget"
              required
              defaultValue=""
              className={`${FIELD_CLASS_NAME} cursor-pointer`}
            >
              <option value="" disabled>
                Select a range
              </option>
              {BUDGET_OPTIONS.map((budgetRange) => (
                <option key={budgetRange}>{budgetRange}</option>
              ))}
            </select>
          </FormField>
          <FormField id="message" label="Message" className="sm:col-span-2">
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              placeholder="Tell me about your project — what does your business do, and what should the website achieve?"
              className={`${FIELD_CLASS_NAME} resize-none`}
            />
          </FormField>

          <div className="flex flex-col gap-5 sm:col-span-2">
            <div className="flex flex-wrap items-center gap-5">
              <button
                type="submit"
                disabled={submissionStatus === 'sending'}
                className="group inline-flex items-center gap-2.5 rounded-full bg-ink px-8 py-4 text-sm font-medium text-paper transition-colors duration-300 hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-ink"
              >
                {submissionStatus === 'sending' ? 'Sending…' : 'Let’s Build It'}
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>

              {submissionStatus === 'email-draft-opened' && (
                <p role="status" className="max-w-sm text-sm text-ink-2">
                  The email service is not set up yet, so your email app should have opened with
                  your message ready to send.
                </p>
              )}
              {submissionStatus === 'failed' && (
                <p role="alert" className="max-w-sm text-sm text-red-600">
                  {errorMessage}
                </p>
              )}
            </div>

            <p className="max-w-md text-xs leading-relaxed text-ink-3">
              By sending this form you agree to the{' '}
              <Link
                href="/privacy"
                className="link-sweep font-medium text-ink-2 transition-colors hover:text-ink"
              >
                Privacy Policy
              </Link>
              . Your details are only used to reply to your enquiry.
            </p>
          </div>
        </form>
      </div>
    </section>
  )
}
