/**
 * Sitemap XML - For SEO indexing
 * GET /sitemap.xml
 */

import { getAllPostSlugs } from '@/lib/posts';
import { seoConfig } from '@/lib/seoConfig';

const siteUrl = seoConfig.siteUrl;

export async function GET() {
  const postSlugs = getAllPostSlugs();

  const postEntries = postSlugs
    .map(
      (slug) => `
    <url>
      <loc>${siteUrl}/blog/${slug}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>
  `
    )
    .join('');

  const staticPages = [
    {
      url: '',
      priority: '1.0',
      changefreq: 'daily',
    },
    {
      url: '/blog',
      priority: '0.9',
      changefreq: 'daily',
    },
  ];

  const staticEntries = staticPages
    .map(
      (page) => `
    <url>
      <loc>${siteUrl}${page.url}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>${page.changefreq}</changefreq>
      <priority>${page.priority}</priority>
    </url>
  `
    )
    .join('');

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticEntries}
${postEntries}
</urlset>`;

  return new Response(xmlContent, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate',
    },
  });
}
