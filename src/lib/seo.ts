import { Metadata } from 'next';
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from './constants';

export function generateSEO(
  title?: string,
  description?: string,
  image?: string,
  keywords?: string[]
): Metadata {
  const pageTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const pageDescription = description || SITE_DESCRIPTION;
  const pageImage = image || `${SITE_URL}/og-image.png`;
  
  const defaultKeywords = [
    'Heet Soni',
    'Heet Soni portfolio',
    'Heet Soni developer',
    'Heet Soni software engineer',
    'Full Stack Developer',
    'AI Developer',
    'MERN Stack Developer',
    'Full Stack & AI Developer',
    'AI Software Engineer',
    'MERN Stack Developer portfolio',
    'Full Stack Developer portfolio',
    'AI Developer India',
    'Full Stack Developer India',
    'Software Engineer India',
    'React Developer',
    'Next.js Developer',
    'TypeScript Developer',
    'Node.js Developer',
    'Python Developer',
    'Database Engineer',
    'PostgreSQL Developer',
    'MongoDB Developer',
    'Web Developer India',
    'Anand Developer',
    'Gujarat Developer',
    'AI-powered web applications',
    'Generative AI integration',
    'SaaS Developer',
    'OpenBeats',
    'TrafficIQ',
    'EcoSphere',
    'Ml-Roadmap',
    'Library Management System',
    'OpenBeats music player',
    'TrafficIQ traffic intelligence',
    'EcoSphere tracking',
    'AI Document Chat Assistant',
    'B.Tech IT Software Engineer',
    'Scalable web architecture',
    'React Next.js portfolio'
  ];

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: keywords || defaultKeywords,
    authors: [{ name: 'Heet Soni', url: SITE_URL }],
    creator: 'Heet Soni',
    publisher: 'Heet Soni',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: SITE_URL,
    },
    category: 'technology',
    classification: 'Portfolio',
    other: {
      author: 'Heet Soni',
      'geo.region': 'IN-GJ',
      'geo.placename': 'Anand',
      'msvalidate.01': 'A4F4F3D017DCEE9D5C80CF87569E9623',
    },
    icons: {
      icon: '/icon.svg',
      shortcut: '/icon.svg',
      apple: '/icon.svg',
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: SITE_URL,
      siteName: SITE_NAME,
      images: [
        {
          url: pageImage,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: [pageImage],
      creator: '@HeetSoni26',
      site: '@HeetSoni26',
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
    manifest: '/site.webmanifest',
  };
}

