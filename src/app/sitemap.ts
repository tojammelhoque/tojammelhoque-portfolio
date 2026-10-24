import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'

/**
 * Lists the pages search engines should know about. It is served at /sitemap.xml.
 * The thank-you page is left out on purpose: it should never show up in search results.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return [
    { url: SITE_URL, lastModified, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}/privacy`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
  ]
}
