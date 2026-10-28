import { SITE_URL } from '@/lib/site'
import { NextResponse } from 'next/server'
import { getClientIp } from '@/lib/contact/getClientIp'
import { sendEnquiryEmail } from '@/lib/contact/sendEnquiryEmail'
import {
  MAX_LINKS_IN_MESSAGE,
  countLinks,
  createRateLimiter,
  isHoneypotFilled,
  wasSubmittedTooFast,
} from '@/lib/contact/spamProtection'
import { validateContactFormPayload } from '@/lib/contact/validation'

// Sending email over SMTP needs Node.js networking, so this route runs on the Node.js runtime.
export const runtime = 'nodejs'

/** Each visitor may send at most 5 messages every 10 minutes. */
const isRateLimited = createRateLimiter({ maxRequests: 5, windowMs: 10 * 60 * 1000 })

/** Largest request body that is accepted, counted in characters. */
const MAX_BODY_CHARACTERS = 20_000

/** Builds a JSON error response that the contact form can show to the visitor. */
const respondWithError = (message: string, status: number) =>
  NextResponse.json({ ok: false, message }, { status })

/** Accepts only requests that were sent from this website's own pages. */
function isSameSiteRequest(request: Request): boolean {
  const requestOrigin = request.headers.get('origin')
  if (!requestOrigin) return false

  const siteHost = request.headers.get('x-forwarded-host') ?? request.headers.get('host')
  try {
    return new URL(requestOrigin).host === siteHost
  } catch {
    return false
  }
}

/**
 * Receives the contact form, runs the spam checks, and emails the enquiry.
 * Responses: 200 sent, 400 or 422 problem with the data, 403 wrong origin, 413 too large,
 * 429 too many messages, 502 the email service refused it, 503 no email service set up yet.
 */
export async function POST(request: Request) {
  if (!isSameSiteRequest(request)) return respondWithError('This request was not accepted.', 403)

  if (isRateLimited(getClientIp(request))) {
    return respondWithError('Too many messages. Please wait a few minutes and try again.', 429)
  }

  const requestBody = await request.text()
  if (requestBody.length > MAX_BODY_CHARACTERS) {
    return respondWithError('The message is too long.', 413)
  }

  let rawPayload: unknown
  try {
    rawPayload = JSON.parse(requestBody)
  } catch {
    return respondWithError('The form data could not be read.', 400)
  }

  // Spam check 1: the hidden field. Answer "success" anyway, so bots do not learn what gave them away.
  if (isHoneypotFilled(rawPayload)) return NextResponse.json({ ok: true })

  const validation = validateContactFormPayload(rawPayload)
  if (!validation.isValid) return respondWithError(validation.message, 422)
  const { payload } = validation

  // Spam check 2: sent faster than a person could fill in the form.
  if (wasSubmittedTooFast(payload.formStartedAt)) {
    return respondWithError(
      'That was very quick. Please check your details and send the form again.',
      400,
    )
  }

  // Spam check 3: too many links, a typical sign of spam.
  if (countLinks(payload.message) > MAX_LINKS_IN_MESSAGE) {
    return respondWithError(
      'Please keep links to a minimum. A link to your current website is fine.',
      400,
    )
  }

  const deliveryResult = await sendEnquiryEmail(payload)
  if (deliveryResult === 'sent') return NextResponse.json({ ok: true })
  if (deliveryResult === 'not-configured') {
    return respondWithError('The email service is not set up yet.', 503)
  }
  return respondWithError(
    'The message could not be sent. Please try again, or email me directly.',
    502,
  )
}
