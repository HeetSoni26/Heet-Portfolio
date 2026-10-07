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
  const pageImage = image || `${SITE_URL}/og/og-cover.png`;
  
  const defaultKeywords = [
    'Heet Soni',
    'Heet Soni portfolio',
    'Heet Soni developer',
    'Heet Soni AI Engineer',
    'Heet Soni Anand',
    'Heet Soni Gujarat',
    'HeetSoni26',
    'Full Stack Developer',
    'AI Developer',
    'AI Engineer India',
    'AI Software Engineer',
    'Full Stack & AI Developer',
    'Full Stack Developer portfolio',
    'AI Developer India',
    'Full Stack Developer India',
    'Software Engineer India',
    'React Developer',
    'Next.js Developer',
    'TypeScript Developer',
    'Node.js Developer',
    'Python Developer',
    'PyTorch Developer',
    'LLM Engineer',
    'RAG Developer',
    'Computer Vision Developer',
    'PostgreSQL Developer',
    'MongoDB Developer',
    'Web Developer India',
    'Anand Developer',
    'Gujarat Developer',
    'CVM University',
    'ADIT Anand',
    'AI-powered web applications',
    'Generative AI integration',
    'SaaS Developer',
    'OpenBeats',
    'TrafficIQ',
    'EcoSphere',
    'Vajra',
    'VAJRA language model',
    'MoodLens',
    'emotion detection AI',
    'OpenBeats music player',
    'TrafficIQ traffic intelligence',
    'B.Tech AI Data Science',
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
    manifest: '/site.webmanifest',
  };
}

