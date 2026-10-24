import type { Metadata } from 'next'

/** Public address of the website. Used for canonical links, the sitemap and share previews. */
export const SITE_URL = 'https://tojammelhoque.com'

/** Name shown at the end of every page title, for example "Privacy Policy | Tojammel Hoque". */
export const SITE_NAME = 'Tojammel Hoque'

/** Title and description of the home page. */
export const HOME_TITLE = 'Tojammel Hoque — Full-Stack Web Developer for Businesses'
export const HOME_DESCRIPTION =
  'Full-stack web developer building secure, fast and reliable websites and web apps for businesses, founders, coaches, consultants and growing brands.'

/** Picture shown when a link to the site is shared (WhatsApp, LinkedIn, X, Slack and so on). */
export const SHARE_IMAGE = {
  url: '/og-image.jpg',
  width: 1200,
  height: 630,
  alt: 'Tojammel Hoque, full-stack web developer: I build the parts your customers never see but always rely on.',
}

interface PageMetadataOptions {
  /** Page title. The site name is added after it, unless `isHomePage` is set. */
  title: string
  /** One or two sentences for search results and share previews (up to about 160 characters). */
  description: string
  /** Path of the page, for example "/privacy". It becomes the canonical address. */
  path: string
  /** Set to false for pages that should stay out of search results, such as the thank-you page. */
  isIndexable?: boolean
  /** The home page uses its title as it is, without the site name added at the end. */
  isHomePage?: boolean
}

/**
 * Builds the metadata of a page: title, description, canonical address and share previews.
 * Every page calls this, so each one gets its own title and description.
 * (Next.js replaces the whole `openGraph` and `twitter` objects of the layout when a page defines
 * its own, so the share image is added again here.)
 */
export function buildPageMetadata({
  title,
  description,
  path,
  isIndexable = true,
  isHomePage = false,
}: PageMetadataOptions): Metadata {
  const fullTitle = isHomePage ? title : `${title} | ${SITE_NAME}`

  return {
    title: isHomePage ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    robots: isIndexable ? undefined : { index: false, follow: false },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      url: path,
      title: fullTitle,
      description,
      images: [SHARE_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [SHARE_IMAGE.url],
    },
  }
}
