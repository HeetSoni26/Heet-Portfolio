import type { Metadata } from "next";
import { Geist, Geist_Mono, Bebas_Neue, Playfair_Display, Plus_Jakarta_Sans, Space_Grotesk, Instrument_Serif, Outfit } from "next/font/google";
import "./globals.css";
import "../styles/theme.css";
import "./animations.css";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import SmoothScrollWrapper from "@/components/layout/SmoothScrollWrapper";
import { IntroAnimationProvider } from "@/context/IntroAnimationContext";
import SuppressThreeWarnings from "@/components/utils/SuppressThreeWarnings";
import { generateSEO } from "@/lib/seo";

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
  variable: "--font-playfair-display",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
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

export const metadata: Metadata = generateSEO();

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
      "https://www.linkedin.com/in/rameshwar-bhagwat-888540328",
      "https://twitter.com/imram111_"
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
      "SaaS Development",
      "MERN Stack",
      "RESTful API Design",
      "Database Optimization",
      "DevOps & CI/CD"
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
        "name": "Library Management System",
        "description": "Full-stack relational catalog database built with Node.js and Express.js using strict transaction safety safeguards.",
      },
      {
        "@type": "CreativeWork",
        "name": "Safecoast",
        "description": "Coastal hazard intelligence platform focused on real-time monitoring and risk awareness.",
      },
      {
        "@type": "CreativeWork",
        "name": "Devory",
        "description": "Premium workflow task management SaaS interface featuring custom real-time messaging structures.",
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
