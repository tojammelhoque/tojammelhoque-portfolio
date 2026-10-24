/** What the contact form sends to the server. */
export interface ContactFormPayload {
  name: string
  email: string
  company: string
  need: string
  budget: string
  message: string
  /** Hidden "honeypot" field. People never see it, so it stays empty. Bots often fill it in. */
  website: string
  /** When the visitor opened the form (milliseconds since 1970). Used to spot bots that submit instantly. */
  formStartedAt: number
}
