import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { seoConfig } from "@/lib/seoConfig";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: seoConfig.siteName,
  description: seoConfig.siteDescription,
  keywords: seoConfig.defaultKeywords.split(','),
  authors: [{ name: seoConfig.author }],
  creator: seoConfig.author,
  metadataBase: new URL(seoConfig.siteUrl),
  verification: {
    google: seoConfig.verifications.googleSiteVerification,
    yandex: seoConfig.verifications.yandexVerification,
  },
  openGraph: {
    type: "website",
    locale: seoConfig.defaultLocale,
    url: seoConfig.siteUrl,
    siteName: seoConfig.siteName,
    images: [
      {
        url: `${seoConfig.siteUrl}${seoConfig.defaultImage}`,
        width: 1200,
        height: 630,
        alt: seoConfig.siteName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: seoConfig.social.twitter,
    images: [`${seoConfig.siteUrl}${seoConfig.defaultImage}`],
  },
  robots: {
    index: seoConfig.robots.index,
    follow: seoConfig.robots.follow,
    googleBot: seoConfig.robots,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={seoConfig.defaultLocale.split('-')[0]}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Canonical URL */}
        <link rel="canonical" href={seoConfig.siteUrl} />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(seoConfig.organization) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white">{children}</body>
    </html>
  );
}
