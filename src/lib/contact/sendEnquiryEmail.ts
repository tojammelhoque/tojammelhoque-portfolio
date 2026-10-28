// import nodemailer from 'nodemailer'
// import type { ContactFormPayload } from './types'

// /** How the delivery went: sent, no email account set up yet, or the mail server refused it. */
// export type EmailDeliveryResult = 'sent' | 'not-configured' | 'failed'

// /** Gmail's mail server. Another provider can be used by setting SMTP_HOST. */
// const DEFAULT_SMTP_HOST = 'smtp.gmail.com'

// /** Port 465 is the "secure from the start" (SSL) port, which Gmail supports. */
// const DEFAULT_SMTP_PORT = 465

// /** Replaces line breaks with spaces, so visitor text can never add extra email headers. */
// const toSingleLine = (text: string) => text.replace(/[\r\n]+/g, ' ').trim()

// /**
//  * Emails an enquiry from the contact form to the site owner over SMTP (Gmail by default).
//  * The mail account stays in the backend: its address and password come from environment
//  * variables (see .env.example) and never appear in the code or on the website.
//  *
//  * - SMTP_USER: the account that sends and receives the enquiries, for example a Gmail address.
//  * - SMTP_PASSWORD: for Gmail this must be an "App password", not the normal Gmail password.
//  *   Without these two, nothing is sent and 'not-configured' is returned.
//  * - SMTP_HOST and SMTP_PORT: optional, for providers other than Gmail.
//  * - CONTACT_TO_EMAIL: optional, where enquiries are delivered. Defaults to SMTP_USER.
//  */
// export async function sendEnquiryEmail(enquiry: ContactFormPayload): Promise<EmailDeliveryResult> {
//   const smtpUser = process.env.SMTP_USER
//   const smtpPassword = process.env.SMTP_PASSWORD
//   if (!smtpUser || !smtpPassword) return 'not-configured'

//   const smtpPort = Number(process.env.SMTP_PORT) || DEFAULT_SMTP_PORT
//   const transporter = nodemailer.createTransport({
//     host: process.env.SMTP_HOST ?? DEFAULT_SMTP_HOST,
//     port: smtpPort,
//     // Port 465 is encrypted from the first byte. Other ports (such as 587) switch to
//     // encryption after connecting, which Nodemailer does automatically.
//     secure: smtpPort === 465,
//     auth: { user: smtpUser, pass: smtpPassword },
//     // Give up quickly, so a slow mail server cannot keep the visitor waiting.
//     connectionTimeout: 10_000,
//     greetingTimeout: 10_000,
//     socketTimeout: 15_000,
//   })

//   const emailText = [
//     `Name: ${toSingleLine(enquiry.name)}`,
//     `Email: ${enquiry.email}`,
//     `Business / Company: ${toSingleLine(enquiry.company) || '-'}`,
//     `What they need: ${toSingleLine(enquiry.need)}`,
//     `Budget range: ${toSingleLine(enquiry.budget)}`,
//     '',
//     enquiry.message,
//   ].join('\n')

//   try {
//     await transporter.sendMail({
//       // Gmail only sends from the logged-in account, so that is the sender address.
//       from: { name: 'Portfolio enquiries', address: smtpUser },
//       to: process.env.CONTACT_TO_EMAIL ?? smtpUser,
//       // Pressing "Reply" answers the visitor, not the sender account.
//       replyTo: { name: toSingleLine(enquiry.name), address: enquiry.email },
//       subject: `Project enquiry from ${toSingleLine(enquiry.name)}`,
//       text: emailText,
//     })
//     return 'sent'
//   } catch (error) {
//     // Log only the kind of problem, never the visitor's details or the password.
//     const errorCode = (error as { code?: string }).code
//     if (errorCode === 'EAUTH') {
//       console.error(
//         'SMTP login failed. Check SMTP_USER, and that SMTP_PASSWORD is a Gmail App password.',
//       )
//     } else {
//       console.error(`The enquiry email could not be sent (SMTP error: ${errorCode ?? 'unknown'}).`)
//     }
//     return 'failed'
//   } finally {
//     transporter.close()
//   }
// }



import { contact } from '@/lib/data'
import type { ContactFormPayload } from './types'

/** Address of the Resend email API (https://resend.com). It works over HTTPS, so hosts cannot block it. */
const RESEND_API_URL = 'https://api.resend.com/emails'

/** How the delivery went: sent, no API key set up yet, or Resend refused the email. */
export type EmailDeliveryResult = 'sent' | 'not-configured' | 'failed'

/** Replaces line breaks with spaces, so visitor text can never add extra email headers. */
const toSingleLine = (text: string) => text.replace(/[\r\n]+/g, ' ').trim()

/** Cleans a value pasted into a hosting dashboard: removes surrounding spaces and quotes. */
const cleanEnvValue = (value: string | undefined) => value?.trim().replace(/^["']|["']$/g, '')


export async function sendEnquiryEmail(enquiry: ContactFormPayload): Promise<EmailDeliveryResult> {
  const apiKey = cleanEnvValue(process.env.RESEND_API_KEY)
  if (!apiKey) return 'not-configured'

  const recipientAddress = cleanEnvValue(process.env.CONTACT_TO_EMAIL) ?? contact.email
  const senderAddress =
    cleanEnvValue(process.env.CONTACT_FROM_EMAIL) ?? 'Portfolio enquiries <onboarding@resend.dev>'

  const emailText = [
    `Name: ${toSingleLine(enquiry.name)}`,
    `Email: ${enquiry.email}`,
    `Business / Company: ${toSingleLine(enquiry.company) || '-'}`,
    `What they need: ${toSingleLine(enquiry.need)}`,
    `Budget range: ${toSingleLine(enquiry.budget)}`,
    '',
    enquiry.message,
  ].join('\n')

  try {
    const response = await fetch(RESEND_API_URL, {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: senderAddress,
        to: [recipientAddress],
        reply_to: enquiry.email, // pressing "Reply" answers the visitor, not the sender address
        subject: `Project enquiry from ${toSingleLine(enquiry.name)}`,
        text: emailText,
      }),
      signal: AbortSignal.timeout(10_000), // do not keep the visitor waiting if Resend is slow
    })

    if (!response.ok) {
      // Resend explains the problem, for example an unverified domain or a wrong API key.
      // Log that explanation (never the visitor's details) so it shows up in the hosting logs.
      const problem = await response.json().catch(() => null)
      console.error(
        `Resend refused the enquiry email (status ${response.status}): ${problem?.message ?? 'no details'}`,
      )
      return 'failed'
    }
    return 'sent'
  } catch {
    console.error('The enquiry email could not be sent because Resend was not reachable.')
    return 'failed'
  }
}