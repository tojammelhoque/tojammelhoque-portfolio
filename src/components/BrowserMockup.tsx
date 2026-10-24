import type { ReactElement, ReactNode } from 'react'
import type { MockupTheme } from '@/lib/data'

/**
 * Small app sketches drawn in code inside a browser frame, one for each project.
 * They are pure DOM (no images) and decorative, so they are hidden from screen readers.
 * The tiny font sizes are intentional: the sketches mimic a full-size screen at a small scale.
 */

/** Browser window with three dots and an address pill. The sketch goes inside it. */
function BrowserFrame({ address, children }: { address: string; children: ReactNode }) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-lg bg-white shadow-[0_24px_60px_-24px_rgba(15,23,42,0.35)] ring-1 ring-ink/10">
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-ink/8 bg-paper-2 px-3 py-2">
        <span className="flex gap-1.5">
          <i className="h-2 w-2 rounded-full bg-slate-300" />
          <i className="h-2 w-2 rounded-full bg-slate-300" />
          <i className="h-2 w-2 rounded-full bg-slate-300" />
        </span>
        <span className="mx-auto flex items-center rounded-md bg-white px-6 py-0.5 font-mono text-[8px] tracking-wide text-ink-3 ring-1 ring-ink/8">
          {address}
        </span>
        {/* Empty spacer so the address pill stays centred */}
        <span className="w-8" />
      </div>
      <div className="relative min-h-0 flex-1">{children}</div>
    </div>
  )
}

/** Sketch of the authentication system: a dark panel of security features beside a login card. */
function AuthPreview() {
  const securityFeatures = [
    'Short-lived access tokens',
    'Rotating refresh tokens',
    'HTTP-only cookies',
    'Rate limiting',
  ]

  return (
    <BrowserFrame address="mern-auth">
      <div className="flex h-full bg-paper">
        <div className="flex w-[46%] flex-col justify-between bg-ink p-[5%] text-paper">
          <span className="font-mono text-[8px] font-medium tracking-[0.2em]">SECURE LOGIN</span>
          <ul className="flex flex-col gap-1.5">
            {securityFeatures.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-2 rounded-full border border-paper/15 px-3 py-1.5 text-[7px] tracking-wide text-slate-300"
              >
                <i className="h-1.5 w-1.5 rounded-full bg-highlight" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-1 items-center justify-center p-[6%]">
          <div className="w-full rounded-md bg-white p-[9%] ring-1 ring-ink/10">
            <p className="text-[12px] font-semibold text-ink">Sign in</p>
            <p className="mt-0.5 text-[6.5px] text-ink-3">Welcome back</p>
            <div className="mt-3 h-[18px] rounded-sm bg-paper ring-1 ring-ink/8" />
            <div className="mt-2 h-[18px] rounded-sm bg-paper ring-1 ring-ink/8" />
            <div className="mt-3 flex h-[18px] items-center justify-center rounded-sm bg-accent text-[7px] font-medium text-white">
              Continue
            </div>
          </div>
        </div>
      </div>
    </BrowserFrame>
  )
}

/** Sketch of the online store: header, banner, a row of product cards and a Stripe note. */
function StorePreview() {
  // Background colour of each product picture.
  const productPictureColors = ['bg-blue-100', 'bg-lime-100', 'bg-slate-200', 'bg-sky-100']

  return (
    <BrowserFrame address="mern-store">
      <div className="flex h-full flex-col bg-white">
        {/* Header: logo, search field and a cart with a badge */}
        <div className="flex items-center gap-3 border-b border-ink/8 px-[4%] py-2">
          <span className="font-mono text-[8px] font-medium tracking-[0.2em] text-ink">SHOP</span>
          <div className="mx-2 h-3.5 flex-1 rounded-full bg-paper ring-1 ring-ink/8" />
          <span className="relative flex h-3.5 w-3.5 rounded-full bg-ink">
            <i className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-accent" />
          </span>
        </div>

        <div className="flex flex-1 flex-col p-[4%]">
          {/* Banner with a call-to-action button */}
          <div className="flex items-center justify-between rounded-md bg-paper-2 px-[4%] py-2.5">
            <div>
              <div className="h-1.5 w-20 rounded-full bg-ink/70" />
              <div className="mt-1.5 h-1 w-12 rounded-full bg-ink/25" />
            </div>
            <span className="rounded-full bg-accent px-3 py-1 font-mono text-[6px] font-medium tracking-[0.15em] text-white">
              SHOP NOW
            </span>
          </div>

          {/* Product cards: a coloured picture above a title line and a price line */}
          <div className="mt-3 grid flex-1 grid-cols-4 gap-2">
            {productPictureColors.map((pictureColor) => (
              <div
                key={pictureColor}
                className="flex flex-col overflow-hidden rounded-sm ring-1 ring-ink/8"
              >
                <div className={`flex-1 ${pictureColor}`} />
                <div className="bg-white p-1.5">
                  <div className="h-1 w-3/4 rounded-full bg-ink/50" />
                  <div className="mt-1 h-1 w-1/3 rounded-full bg-accent/60" />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 flex items-center justify-end gap-1.5 font-mono text-[6px] tracking-[0.12em] text-ink-3">
            <i className="h-1 w-1 rounded-full bg-lime-500" />
            SECURE CHECKOUT WITH STRIPE
          </div>
        </div>
      </div>
    </BrowserFrame>
  )
}

/** Sketch of the chat app: a contact list, a conversation with message bubbles, and a text box. */
function ChatPreview() {
  // Background colour of each contact's round avatar. The first contact is the open chat.
  const contactAvatarColors = ['bg-blue-200', 'bg-lime-200', 'bg-sky-200', 'bg-slate-300']

  // Message bubbles in the conversation: who sent it and how wide it is.
  const messageBubbles = [
    { sentByMe: false, width: '55%' },
    { sentByMe: true, width: '48%' },
    { sentByMe: false, width: '38%' },
    { sentByMe: true, width: '58%' },
  ]

  return (
    <BrowserFrame address="chatapp">
      <div className="flex h-full bg-paper">
        {/* Contact list */}
        <div className="flex w-[30%] flex-col gap-1.5 border-r border-ink/8 bg-white p-[3.5%]">
          {contactAvatarColors.map((avatarColor, contactIndex) => (
            <div
              key={avatarColor}
              className={`flex items-center gap-1.5 rounded-md p-1.5 ${contactIndex === 0 ? 'bg-accent/10' : ''}`}
            >
              <i className={`h-4 w-4 shrink-0 rounded-full ${avatarColor}`} />
              <div className="flex-1">
                <div className="h-1 w-3/4 rounded-full bg-ink/55" />
                <div className="mt-1 h-1 w-1/2 rounded-full bg-ink/20" />
              </div>
            </div>
          ))}
        </div>

        {/* Open conversation */}
        <div className="flex flex-1 flex-col">
          <div className="flex items-center gap-2 border-b border-ink/8 bg-white px-[4%] py-2">
            <i className="h-4 w-4 rounded-full bg-blue-200" />
            <div className="h-1.5 w-16 rounded-full bg-ink/60" />
            <i className="ml-auto h-1.5 w-1.5 rounded-full bg-lime-500" />
          </div>

          <div className="flex flex-1 flex-col justify-center gap-2 p-[4%]">
            {messageBubbles.map((bubble, bubbleIndex) => (
              <div
                key={bubbleIndex}
                className={`flex ${bubble.sentByMe ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`h-4 rounded-full ${bubble.sentByMe ? 'bg-accent' : 'bg-white ring-1 ring-ink/10'}`}
                  style={{ width: bubble.width }}
                />
              </div>
            ))}
            {/* "Typing…" indicator */}
            <div className="flex gap-1 pl-1">
              <i className="h-1 w-1 rounded-full bg-ink/30" />
              <i className="h-1 w-1 rounded-full bg-ink/30" />
              <i className="h-1 w-1 rounded-full bg-ink/30" />
            </div>
          </div>

          {/* Message box with a send button */}
          <div className="flex items-center gap-2 border-t border-ink/8 bg-white p-[3%]">
            <div className="h-4 flex-1 rounded-full bg-paper ring-1 ring-ink/8" />
            <i className="h-4 w-4 rounded-full bg-accent" />
          </div>
        </div>
      </div>
    </BrowserFrame>
  )
}

/** Which sketch belongs to which project theme. */
const previewByTheme: Record<MockupTheme, () => ReactElement> = {
  auth: AuthPreview,
  store: StorePreview,
  chat: ChatPreview,
}

/** Draws the sketch for the given theme inside a 16:10 browser frame. */
export default function BrowserMockup({ theme }: { theme: MockupTheme }) {
  const Preview = previewByTheme[theme]

  return (
    <div className="aspect-16/10 w-full select-none" aria-hidden="true">
      <Preview />
    </div>
  )
}
