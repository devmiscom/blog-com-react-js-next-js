/**
 * Dynamic Meta Tags Component
 * Generates SEO-optimized meta tags for pages and posts
 * Similar to Yoast SEO for WordPress
 */

import { Metadata } from 'next';
import { seoConfig } from './seoConfig';
import { Post } from './types';

interface MetaTagsProps {
  title: string;
  description: string;
  keywords?: string[];
  url: string;
  image?: string;
  imageAlt?: string;
  type?: 'article' | 'website' | 'blog';
  author?: string;
  publishedDate?: Date;
  modifiedDate?: Date;
  robots?: string;
  canonical?: string;
  ogLocale?: string;
}

/**
 * Generate metadata for Next.js
 * Use in layout.ts or page.ts via generateMetadata()
 */
export function generateSeoMetadata(props: MetaTagsProps): Metadata {
  const {
    title,
    description,
    keywords = [],
    url,
    image = seoConfig.defaultImage,
    imageAlt = seoConfig.siteName,
    type = 'website',
    author = seoConfig.author,
    publishedDate,
    modifiedDate,
    robots = 'index, follow',
    canonical = url,
    ogLocale = seoConfig.defaultLocale,
  } = props;

  const fullUrl = url.startsWith('http') ? url : `${seoConfig.siteUrl}${url}`;
  const fullImage = image.startsWith('http') ? image : `${seoConfig.siteUrl}${image}`;
  const fullCanonical = canonical.startsWith('http') ? canonical : `${seoConfig.siteUrl}${canonical}`;

  const allKeywords = [
    ...keywords,
    ...seoConfig.defaultKeywords.split(',').map((k) => k.trim()),
  ];

  return {
    title: `${title} | ${seoConfig.siteName}`,
    description,
    keywords: allKeywords,
    authors: [{ name: author }],
    creator: seoConfig.author,
    publisher: seoConfig.siteName,
    robots: {
      index: !robots.includes('noindex'),
      follow: !robots.includes('nofollow'),
      googleBot: robots,
    },
    openGraph: {
      title: `${title} | ${seoConfig.siteName}`,
      description,
      url: fullUrl,
      siteName: seoConfig.siteName,
      images: [
        {
          url: fullImage,
          width: 1200,
          height: 630,
          alt: imageAlt,
          type: 'image/png',
        },
      ],
      type: type === 'article' ? 'article' : 'website',
      locale: ogLocale,
      ...(type === 'article' && publishedDate && {
        publishedTime: publishedDate.toISOString(),
        modifiedTime: modifiedDate?.toISOString(),
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${seoConfig.siteName}`,
      description,
      creator: seoConfig.social.twitter,
      images: [fullImage],
    },
    alternates: {
      canonical: fullCanonical,
    },
  };
}

/**
 * Generate metadata for blog posts
 */
export function generatePostMetadata(post: Post): Metadata {
  return generateSeoMetadata({
    title: post.title,
    description: post.metadata.description,
    keywords: post.metadata.keywords,
    url: `/blog/${post.slug}`,
    image: post.featuredImage,
    imageAlt: post.featuredImageAlt,
    type: 'article',
    author: post.author,
    publishedDate: new Date(post.publishedAt),
    modifiedDate: new Date(post.updatedAt),
    robots: post.metadata.robots || 'index, follow',
    canonical: post.metadata.canonical || `${seoConfig.siteUrl}/blog/${post.slug}`,
    ogLocale: seoConfig.defaultLocale,
  });
}

/**
 * Generate structured data (JSON-LD) for blog posts
 */
export function generateBlogPostSchema(post: Post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.metadata.description,
    image: post.featuredImage,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: seoConfig.siteName,
      logo: {
        '@type': 'ImageObject',
        url: `${seoConfig.siteUrl}${seoConfig.logo}`,
      },
    },
    datePublished: new Date(post.publishedAt).toISOString(),
    dateModified: new Date(post.updatedAt).toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${seoConfig.siteUrl}/blog/${post.slug}`,
    },
    keywords: post.metadata.keywords?.join(', '),
    articleBody: post.content,
    wordCount: post.content.split(/\s+/).length,
    timeRequired: `PT${post.readingTime}M`,
    inLanguage: seoConfig.defaultLocale,
  };
}

/**
 * Generate breadcrumb schema
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate organization schema
 */
export function getOrganizationSchema() {
  return seoConfig.organization;
}
