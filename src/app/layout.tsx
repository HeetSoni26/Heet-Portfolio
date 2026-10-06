import type { Metadata } from "next";
import { Geist, Geist_Mono, Bebas_Neue, Playfair_Display, Plus_Jakarta_Sans, Space_Grotesk, Instrument_Serif, Outfit, Mea_Culpa, Felipa } from "next/font/google";
import "./globals.css";
import "../styles/theme.css";
import "./animations.css";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import SmoothScrollWrapper from "@/components/layout/SmoothScrollWrapper";
import { IntroAnimationProvider } from "@/context/IntroAnimationContext";
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

const meaCulpa = Mea_Culpa({
  variable: "--font-mea-culpa",
  weight: "400",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

const felipa = Felipa({
  variable: "--font-felipa",
  weight: "400",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://heet-portfolio-two.vercel.app';

export const metadata: Metadata = generateSEO();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Heet Soni",
    "url": siteUrl,
    "image": `${siteUrl}/images/profile/profile.jpeg`,
    "jobTitle": "Full Stack & AI Developer",
    "description": "Heet Soni is a Full Stack & AI Developer building AI-powered web applications, with featured projects OpenBeats and TrafficIQ.",
    "email": "heetks2607@gmail.com",
    "telephone": "+91 99093 42367",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Anand",
      "addressRegion": "Gujarat",
      "addressCountry": "IN"
    },
    "sameAs": [
      "https://github.com/HeetSoni26",
      "https://www.linkedin.com/in/heet-soni-8a9082273/",
      "https://www.instagram.com/heetsoni__/"
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
      "PyTorch",
      "LangGraph",
      "Computer Vision",
      "RAG Systems",
      "FastAPI",
      "RESTful API Design",
      "Database Optimization",
      "DevOps & CI/CD"
    ],
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "A. D. Patel Institute of Technology (ADIT), CVM University"
    },
    "subjectOf": [
      {
        "@type": "CreativeWork",
        "name": "OpenBeats",
        "description": "Open-source Android music player prioritizing performance and user experience.",
      },
      {
        "@type": "CreativeWork",
        "name": "TrafficIQ",
        "description": "Autonomous traffic intelligence utilizing YOLOv8 computer vision for real-time traffic light optimization.",
      },
      {
        "@type": "CreativeWork",
        "name": "EcoSphere",
        "description": "Comprehensive environmental tracking and visualization platform built with React and Tailwind CSS.",
      },
      {
        "@type": "CreativeWork",
        "name": "Vajra",
        "description": "Open-source foundation language model framework for training, evaluating, and packaging decoder-only Transformer LLMs from scratch.",
      },
      {
        "@type": "CreativeWork",
        "name": "MoodLens",
        "description": "Real-time multi-modal emotion AI reading seven emotions from face, text, photos, video and voice, running entirely on-device in the browser.",
      }
    ]
  };

  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Heet Soni Portfolio",
    "url": siteUrl,
    "description": "Portfolio of Heet Soni showcasing full stack and AI-powered web projects, including OpenBeats and TrafficIQ.",
    "author": {
      "@type": "Person",
      "name": "Heet Soni"
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

        {/* Theme Color for mobile browsers */}
        <meta name="theme-color" content="#0F0E0E" />
        {/* Viewport optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable} ${playfairDisplay.variable} ${plusJakartaSans.variable} ${spaceGrotesk.variable} ${instrumentSerif.variable} ${outfit.variable} ${meaCulpa.variable} ${felipa.variable} antialiased overflow-visible`}
      >
        <IntroAnimationProvider>
          <SmoothScrollWrapper>
            <LayoutWrapper>{children}</LayoutWrapper>
          </SmoothScrollWrapper>
        </IntroAnimationProvider>
      </body>
    </html>
  );
}
