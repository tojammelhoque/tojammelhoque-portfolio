import type { ReactNode } from 'react'

/**
 * Shared frame for simple content pages (privacy policy, thank-you, 404).
 * It clears the fixed navbar at the top, keeps lines of text a comfortable length,
 * and grows to fill the screen, so the footer stays at the bottom of short pages.
 */
export default function PageShell({ children }: { children: ReactNode }) {
  return (
    <main className="container-site flex-1 pb-24 pt-36 md:pb-32 md:pt-44">
      <div className="max-w-3xl">{children}</div>
    </main>
  )
}
