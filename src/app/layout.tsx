import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'

// Self-hosted fonts (loaded from node_modules, no external requests):
// Inter for text, Instrument Serif for italic accents, JetBrains Mono for labels and tags.
import '@fontsource-variable/inter'
import '@fontsource-variable/jetbrains-mono'
import '@fontsource/instrument-serif/400.css'
import '@fontsource/instrument-serif/400-italic.css'

import './globals.css'
import ScrollProgress from '@/components/ScrollProgress'
import Footer from '@/sections/Footer'
import Navbar from '@/sections/Navbar'
import { HOME_DESCRIPTION, HOME_TITLE, SHARE_IMAGE, SITE_NAME, SITE_URL } from '@/lib/site'

// Defaults for every page. A page can replace them with its own metadata (see lib/site.ts).
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: HOME_TITLE, template: `%s | ${SITE_NAME}` },
  description: HOME_DESCRIPTION,
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: [SHARE_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: [SHARE_IMAGE.url],
  },
}

export const viewport: Viewport = {
  themeColor: '#f8fafc', // Off-White, matches the page background
}

/** Frame around every page: progress bar and navbar on top, footer at the bottom. */
export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <ScrollProgress />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
