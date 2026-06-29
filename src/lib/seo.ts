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
    'Rameshwar Bhagwat',
    'Rameshwar Bhagwat portfolio',
    'Rameshwar Bhagwat developer',
    'Rameshwar Bhagwat software engineer',
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
    'Yeola Developer',
    'Maharashtra Developer',
    'AI-powered web applications',
    'Generative AI integration',
    'SaaS Developer',
    'WebCraft',
    'Safecoast',
    'Devory',
    'Ml-Roadmap',
    'Library Management System',
    'WebCraft website builder',
    'Safecoast coastal hazard tracker',
    'Devory app',
    'AI ML Progress Tracker',
    'B.Tech IT Software Engineer',
    'Scalable web architecture',
    'React Next.js portfolio'
  ];

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: keywords || defaultKeywords,
    authors: [{ name: 'Rameshwar Bhagwat', url: SITE_URL }],
    creator: 'Rameshwar Bhagwat',
    publisher: 'Rameshwar Bhagwat',
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
      author: 'Rameshwar Bhagwat',
      'geo.region': 'IN-MH',
      'geo.placename': 'Yeola',
      'msvalidate.01': 'A4F4F3D017DCEE9D5C80CF87569E9623',
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
      creator: '@imram111_',
      site: '@imram111_',
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
