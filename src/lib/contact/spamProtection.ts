/** A real person needs at least this long to fill in the form. Faster submissions come from bots. */
const MINIMUM_FILL_TIME_MS = 2_000

/** Messages with more links than this are treated as spam. One link to a current website is normal. */
export const MAX_LINKS_IN_MESSAGE = 2

/**
 * Checks the hidden "honeypot" field. The field is invisible to people, so only automated
 * programs that fill in every field they find will have put something in it.
 */
export function isHoneypotFilled(rawPayload: unknown): boolean {
  if (typeof rawPayload !== 'object' || rawPayload === null) return false

  const honeypotValue = (rawPayload as Record<string, unknown>).website
  return typeof honeypotValue === 'string' && honeypotValue.trim() !== ''
}

/**
 * True when the form was sent faster than a person could fill it in.
 * A missing or impossible start time (zero, or in the future) also counts as suspicious.
 */
export function wasSubmittedTooFast(formStartedAt: number, now = Date.now()): boolean {
  const isStartTimeBelievable =
    Number.isFinite(formStartedAt) && formStartedAt > 0 && formStartedAt <= now
  return !isStartTimeBelievable || now - formStartedAt < MINIMUM_FILL_TIME_MS
}

/** Counts how many web addresses (http://, https:// or www.) appear in a text. */
export function countLinks(text: string): number {
  return (text.match(/https?:\/\/|www\./gi) ?? []).length
}

interface RateLimiterOptions {
  /** How many requests one visitor may make inside the time window. */
  maxRequests: number
  /** Length of the time window in milliseconds. */
  windowMs: number
}

/**
 * Creates a function that limits how often one visitor can send requests.
 * The request times are kept in memory only (never saved), and forgotten after the window ends.
 * Note: on serverless hosting each server instance counts on its own, so this is a light
 * protection against floods, not a hard guarantee.
 */
export function createRateLimiter({ maxRequests, windowMs }: RateLimiterOptions) {
  const requestTimesByVisitor = new Map<string, number[]>()

  /** Records a request and returns true when this visitor has already sent too many. */
  return function isRateLimited(visitorId: string, now = Date.now()): boolean {
    const recentRequestTimes = (requestTimesByVisitor.get(visitorId) ?? []).filter(
      (requestTime) => now - requestTime < windowMs,
    )

    if (recentRequestTimes.length >= maxRequests) {
      requestTimesByVisitor.set(visitorId, recentRequestTimes)
      return true
    }

    recentRequestTimes.push(now)
    requestTimesByVisitor.set(visitorId, recentRequestTimes)

    // Forget visitors whose requests have all expired, so the map cannot grow without limit.
    if (requestTimesByVisitor.size > 1000) {
      for (const [otherVisitorId, requestTimes] of requestTimesByVisitor) {
        if (requestTimes.every((requestTime) => now - requestTime >= windowMs)) {
          requestTimesByVisitor.delete(otherVisitorId)
        }
      }
    }

    return false
  }
}
