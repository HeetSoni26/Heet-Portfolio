import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { projects } from '@/components/sections/Work/work.data';
import ProjectDetailClient from './ProjectDetailClient';

interface PageProps {
  params: Promise<{ id: string }>;
}

// Generate static routes at build time for optimal SSG SEO
export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id.toString(),
  }));
}

// Generate project-specific SEO Metadata dynamically
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const projectId = parseInt(id, 10);
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return {
      title: 'Project Not Found | Heet Soni',
      description: 'The requested project case study could not be located.',
    };
  }

  const title = `${project.title} - ${project.tagline} | Heet Soni Case Study`;
  const description = `${project.title}: ${project.description} Engineered with ${project.techStack.join(', ')}. Discover features, challenges, and implementation metrics.`;

  return {
    title,
    description,
    keywords: [
      `${project.title}`,
      `${project.title} project`,
      `${project.title} case study`,
      `${project.title} developer`,
      ...project.techStack,
      'Heet Soni projects',
      'full stack developer portfolio'
    ],
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: '2026-06-29T00:00:00.000Z',
      authors: ['Heet Soni'],
      images: [
        {
          url: project.image,
          width: 1200,
          height: 630,
          alt: `${project.title} Case Study Preview`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [project.image],
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { id } = await params;
  const projectId = parseInt(id, 10);
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    notFound();
  }

  return <ProjectDetailClient project={project} />;
}
