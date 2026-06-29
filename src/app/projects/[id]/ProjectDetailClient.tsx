'use client';

import { useRouter } from 'next/navigation';
import { Project } from '@/components/sections/Work/work.data';
import ProjectDetailModal from '@/components/sections/Work/ProjectDetailModal';

interface ProjectDetailClientProps {
  project: Project;
}

export default function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const router = useRouter();

  const handleClose = () => {
    // Navigate back to the projects section on the home page smoothly
    router.push('/#work');
  };

  return <ProjectDetailModal project={project} onClose={handleClose} />;
}
