'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import { projects } from '@/components/sections/Work/work.data';
import ProjectDetailModal from '@/components/sections/Work/ProjectDetailModal';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProjectDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  
  const projectId = parseInt(id, 10);
  const project = projects.find((p) => p.id === projectId);
  
  if (!project) {
    notFound();
  }

  const handleClose = () => {
    router.push('/#work');
  };

  return <ProjectDetailModal project={project} onClose={handleClose} />;
}
