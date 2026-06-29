import type { Metadata } from "next";
import { Geist, Geist_Mono, Bebas_Neue, Playfair_Display, Plus_Jakarta_Sans, Space_Grotesk, Instrument_Serif, Outfit } from "next/font/google";
import "./globals.css";
import "../styles/theme.css";
import "../styles/animations.css";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { IntroAnimationProvider } from "@/context/IntroAnimationContext";
import SmoothScrollWrapper from "@/components/layout/SmoothScrollWrapper";
import SuppressThreeWarnings from "@/components/utils/SuppressThreeWarnings";
import LayoutWrapper from "@/components/layout/LayoutWrapper";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  weight: "400",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  weight: "400",
  subsets: ["latin"],
  style: "italic",
  display: 'swap',
  preload: true,
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rameshwarbhagwat.me';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Rameshwar Bhagwat | Full Stack & AI Developer",
    template: "%s | Rameshwar Bhagwat"
  },
  description: "Rameshwar Bhagwat is a Full Stack & AI Developer from India building high-performance AI-powered web applications with React, Next.js, TypeScript, and Node.js. Explore Rameshwar Bhagwat projects including WebCraft and Safecoast.",
  keywords: [
    "Rameshwar Bhagwat",
    "Rameshwar Bhagwat portfolio",
    "Rameshwar Bhagwat developer",
    "Rameshwar Bhagwat AI Developer",
    "Rameshwar Bhagwat Full Stack Developer",
    "Full Stack Developer Rameshwar Bhagwat",
    "AI Developer Rameshwar Bhagwat",
    "Rameshwar Bhagwat projects",
    "Rameshwar Bhagwat WebCraft",
    "Rameshwar Bhagwat Safecoast",
    "Full Stack Developer",
    "AI Developer",
    "Next.js Developer",
    "React Developer",
    "TypeScript Developer",
    "WebCraft",
    "Safecoast",
    "Machine Learning Projects",
    "Web Development Portfolio",
    "AI-Powered Applications"
  ],
  authors: [{ name: "Rameshwar Bhagwat", url: siteUrl }],
  creator: "Rameshwar Bhagwat",
  publisher: "Rameshwar Bhagwat",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "technology",
  classification: "Portfolio",
  other: {
    author: "Rameshwar Bhagwat",
    "geo.region": "IN-MH",
    "geo.placename": "Yeola",
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '192x192',
        url: '/android-chrome-192x192.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '512x512',
        url: '/android-chrome-512x512.png',
      },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Rameshwar Bhagwat Portfolio",
    title: "Rameshwar Bhagwat | Full Stack & AI Developer",
    description: "Rameshwar Bhagwat builds AI-powered web applications and full stack products. Featured projects: WebCraft and Safecoast.",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Rameshwar Bhagwat - Full Stack & AI Developer Portfolio"
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rameshwar Bhagwat | Full Stack & AI Developer",
    description: "Rameshwar Bhagwat - Full Stack & AI Developer. Featured work includes WebCraft and Safecoast.",
    images: [`${siteUrl}/og-image.png`],
    creator: "@Rameshwarbhagwat",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'ibL2p6r9xrTKR3U9o5zRTmVlFC4lAP_GheMlBWgOuGo',
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Rameshwar Bhagwat",
    "url": siteUrl,
    "image": `${siteUrl}/images/profile/profile.jpeg`,
    "jobTitle": "Full Stack & AI Developer",
    "description": "Rameshwar Bhagwat is a Full Stack & AI Developer building AI-powered web applications, with featured projects WebCraft and Safecoast.",
    "email": "rameshwarbhagwat019@gmail.com",
    "telephone": "+91-9699245170",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Yeola",
      "addressRegion": "Maharashtra",
      "addressCountry": "IN"
    },
    "sameAs": [
      "https://github.com/Rameshwar-bhagwat10",
      "https://linkedin.com/in/rameshwar-bhagwat"
    ],
    "knowsAbout": [
      "Full Stack Development",
      "Artificial Intelligence",
      "Machine Learning",
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Python",
      "SaaS Development"
    ],
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "B.Tech IT"
    },
    "subjectOf": [
      {
        "@type": "CreativeWork",
        "name": "WebCraft",
        "description": "Website builder for modern businesses with SEO-ready architecture and performance-first engineering.",
      },
      {
        "@type": "CreativeWork",
        "name": "Safecoast",
        "description": "Coastal hazard intelligence platform focused on real-time monitoring and risk awareness.",
      }
    ]
  };

  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Rameshwar Bhagwat Portfolio",
    "url": siteUrl,
    "description": "Portfolio of Rameshwar Bhagwat showcasing full stack and AI-powered web projects, including WebCraft and Safecoast.",
    "author": {
      "@type": "Person",
      "name": "Rameshwar Bhagwat"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${siteUrl}/?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  const breadcrumbItems = [
    { name: "Home", url: siteUrl },
  ];

  return (
    <html lang="en" className="dark">
      <head>
        {/* Structured Data - Person Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {/* Structured Data - Website Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteStructuredData) }}
        />
        
        {/* Breadcrumb Schema */}
        <BreadcrumbSchema items={breadcrumbItems} />
        
        {/* Favicon - ICO format for maximum compatibility */}
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        
        {/* Bing/Microsoft specific meta tags */}
        <meta name="msapplication-TileColor" content="#0F0E0E" />
        <meta name="msapplication-TileImage" content="/android-chrome-512x512.png" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS Prefetch for faster resource loading */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        
        {/* Theme Color for mobile browsers */}
        <meta name="theme-color" content="#0F0E0E" />
        {/* Viewport optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable} ${playfairDisplay.variable} ${plusJakartaSans.variable} ${spaceGrotesk.variable} ${instrumentSerif.variable} ${outfit.variable} antialiased`}
        style={{ overflow: 'visible' }}
      >
        <IntroAnimationProvider>
          <SuppressThreeWarnings />
          <SmoothScrollWrapper>
            <LayoutWrapper>{children}</LayoutWrapper>
          </SmoothScrollWrapper>
        </IntroAnimationProvider>
      </body>
    </html>
  );
}
