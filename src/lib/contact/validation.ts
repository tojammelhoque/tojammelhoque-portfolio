import type { ContactFormPayload } from './types'

/** Longest text each field may contain. */
const FIELD_MAX_LENGTHS = {
  name: 100,
  email: 254,
  company: 120,
  need: 80,
  budget: 40,
  message: 5000,
} as const

/** Shortest message that counts as a real enquiry. */
const MINIMUM_MESSAGE_LENGTH = 10

/** Simple email shape check: something, an @, something, a dot, something. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Result of checking the form data: either clean data, or a message that explains the problem. */
export type ValidationResult =
  { isValid: true; payload: ContactFormPayload } | { isValid: false; message: string }

/** Reads a field as trimmed text. Anything that is not text becomes an empty string. */
function readTextField(rawPayload: Record<string, unknown>, fieldName: string): string {
  const fieldValue = rawPayload[fieldName]
  return typeof fieldValue === 'string' ? fieldValue.trim() : ''
}

/** Checks the data sent by the contact form and returns it cleaned up, or the first problem found. */
export function validateContactFormPayload(rawPayload: unknown): ValidationResult {
  if (typeof rawPayload !== 'object' || rawPayload === null) {
    return { isValid: false, message: 'The form data could not be read.' }
  }

  const rawFields = rawPayload as Record<string, unknown>
  const payload: ContactFormPayload = {
    name: readTextField(rawFields, 'name'),
    email: readTextField(rawFields, 'email'),
    company: readTextField(rawFields, 'company'),
    need: readTextField(rawFields, 'need'),
    budget: readTextField(rawFields, 'budget'),
    message: readTextField(rawFields, 'message'),
    website: readTextField(rawFields, 'website'),
    formStartedAt: typeof rawFields.formStartedAt === 'number' ? rawFields.formStartedAt : 0,
  }

  if (!payload.name) return { isValid: false, message: 'Please enter your name.' }
  if (!EMAIL_PATTERN.test(payload.email)) {
    return { isValid: false, message: 'Please enter a valid email address.' }
  }
  if (!payload.need) return { isValid: false, message: 'Please choose what you need.' }
  if (!payload.budget) return { isValid: false, message: 'Please choose a budget range.' }
  if (payload.message.length < MINIMUM_MESSAGE_LENGTH) {
    return { isValid: false, message: 'Please write a short message about your project.' }
  }

  // Reject anything unreasonably long, so nobody can use the form to send huge amounts of text.
  for (const [fieldName, maxLength] of Object.entries(FIELD_MAX_LENGTHS)) {
    if (payload[fieldName as keyof typeof FIELD_MAX_LENGTHS].length > maxLength) {
      return { isValid: false, message: `The ${fieldName} is too long.` }
    }
  }

  return { isValid: true, payload }
}
