/**
 * SEO Configuration - Global Site Settings
 * Similar to WordPress SEO settings
 */

export const seoConfig = {
  // Site Basic Info
  siteName: 'Seu Blog',
  siteDescription: 'Um blog moderno otimizado para SEO, desenvolvido com Next.js',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  author: 'Seu Nome',
  email: 'contato@seudominio.com',
  
  // Logo and Images
  logo: '/logo.png',
  defaultImage: '/og-image.png',
  
  // Social Links
  social: {
    twitter: '@seutwitter',
    linkedin: 'seu-linkedin',
    github: 'seu-github',
    facebook: 'sua-pagina-facebook',
  },

  // SEO Defaults
  defaultKeywords: 'blog, artigos, notícias',
  defaultLocale: 'pt-BR',
  
  // Search Engine Verification
  verifications: {
    googleSearch: process.env.GOOGLE_SEARCH_CONSOLE_ID || '',
    googleSiteVerification: process.env.GOOGLE_SITE_VERIFICATION || '',
    bingWebmaster: process.env.BING_WEBMASTER_ID || '',
    yandexVerification: process.env.YANDEX_VERIFICATION || '',
    facebookDomain: process.env.FACEBOOK_DOMAIN_VERIFICATION || '',
  },

  // Robots.txt Configuration
  robots: {
    index: true,
    follow: true,
    maxVideoPreview: -1,
    maxImagePreview: 'large',
    maxSnippet: -1,
  },

  // JSON-LD Organization Schema
  organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Seu Blog',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    logo: process.env.NEXT_PUBLIC_SITE_URL + '/logo.png',
    description: 'Um blog moderno otimizado para SEO, desenvolvido com Next.js',
    sameAs: [
      'https://twitter.com/seutwitter',
      'https://linkedin.com/in/seu-linkedin',
      'https://github.com/seu-github',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '',
      contactType: 'Customer Support',
      email: 'contato@seudominio.com',
    },
  },

  // OpenGraph Defaults
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
  },

  // Twitter Card Defaults
  twitter: {
    cardType: 'summary_large_image',
    creator: '@seutwitter',
  },

  // Pagination
  postsPerPage: 10,
};

// Export type for usage in components
export type SeoConfig = typeof seoConfig;
