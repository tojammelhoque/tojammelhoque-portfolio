import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'

/**
 * Tells search engine crawlers what they may visit. It is served at /robots.txt.
 * Everything is open except the thank-you page and the form's API route.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/thank-you', '/api/'] },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
