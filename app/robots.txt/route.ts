/**
 * robots.txt - For search engine crawlers
 * GET /robots.txt
 */

import { seoConfig } from '@/lib/seoConfig';

export async function GET() {
  const robotsContent = `# Robots.txt for ${seoConfig.siteName}
# Generated automatically for SEO optimization

# Allow all bots
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /*.json$
Disallow: /*.xml$

# Specific crawl rates for major search engines
User-agent: Googlebot
Allow: /
Crawl-delay: 0

User-agent: Bingbot
Allow: /
Crawl-delay: 1

# Sitemaps
Sitemap: ${seoConfig.siteUrl}/sitemap.xml
Sitemap: ${seoConfig.siteUrl}/blog-sitemap.xml

# Cache control
# Maximum time robots can cache information (in days)
# Cache-Control: max-age=31536000

# Request rate limits (requests per 10 seconds)
Request-rate: 1/10s
`;

  return new Response(robotsContent, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate',
    },
  });
}
