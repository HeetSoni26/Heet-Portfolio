import type { Metadata } from 'next';
import { projects } from '@/components/sections/Work/work.data';
import ProjectsPageContent from './ProjectsPageContent';

export const metadata: Metadata = {
  title: 'All Projects | Heet Soni — Full Stack & AI Developer',
  description:
    'Browse the complete portfolio of Heet Soni — full-stack, AI/ML, and web application projects including WebCraft, Safecoast, Devory, and the AI ML Progress Tracker. Filter by category, search, and explore detailed case studies.',
  keywords: [
    'Heet Soni projects',
    'full stack developer projects',
    'AI ML projects',
    'Next.js projects',
    'React portfolio projects',
    'web application case studies',
    ...projects.map((p) => p.title),
  ],
  alternates: {
    canonical: '/projects',
  },
  openGraph: {
    title: 'All Projects | Heet Soni',
    description:
      'Explore the full collection of full-stack and AI-focused engineering projects built by Heet Soni.',
    type: 'website',
    images: [
      {
        url: projects[0]?.image ?? '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Heet Soni Projects',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All Projects | Heet Soni',
    description:
      'Explore the full collection of full-stack and AI-focused engineering projects built by Heet Soni.',
  },
};

export default function ProjectsPage() {
  // ItemList structured data for rich search results
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Heet Soni — Projects',
    description:
      'Complete list of full-stack and AI-focused web development projects.',
    numberOfItems: projects.length,
    itemListElement: projects.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'SoftwareApplication',
        name: project.title,
        description: project.description,
        applicationCategory: project.category,
        url: `https://heetportfolio.vercel.app/projects/${project.id}`,
        operatingSystem: 'Web',
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <ProjectsPageContent projects={projects} />
    </>
  );
}

