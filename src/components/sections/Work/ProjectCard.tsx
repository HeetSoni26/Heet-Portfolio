'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Github, Info, ArrowRight } from 'lucide-react';
import { Project } from './work.data';
import { useState, memo, useCallback, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  SiNextdotjs, 
  SiReact, 
  SiTypescript, 
  SiPython, 
  SiNodedotjs, 
  SiMongodb, 
  SiPostgresql, 
  SiRedis,
  SiAmazon,
  SiDocker,
  SiStripe,
  SiGraphql,
  SiTensorflow,
  SiApachekafka,
  SiFastapi,
  SiWebrtc,
  SiBitcoin,
  SiTailwindcss,
  SiKotlin,
  SiFirebase,
  SiPrisma,
  SiPandas,
  SiNumpy,
  SiScikitlearn,
  SiJavascript,
  SiExpress,
  SiMysql,
  SiAxios,
  SiSupabase,
  SiOpenai
} from 'react-icons/si';
import { TbApi } from 'react-icons/tb';

// Brand color configurations for icons
export const techConfig: Record<string, { icon: React.ComponentType<{ size?: number; style?: React.CSSProperties; className?: string }>; color: string }> = {
  'Next.js': { icon: SiNextdotjs, color: '#FFFFFF' },
  'Next.js (App Router)': { icon: SiNextdotjs, color: '#FFFFFF' },
  'React': { icon: SiReact, color: '#61DAFB' },
  'TypeScript': { icon: SiTypescript, color: '#3178C6' },
  'JavaScript': { icon: SiJavascript, color: '#F7DF1E' },
  'Python': { icon: SiPython, color: '#3776AB' },
  'Kotlin': { icon: SiKotlin, color: '#7F52FF' },
  'Node.js': { icon: SiNodedotjs, color: '#339933' },
  'Express.js': { icon: SiExpress, color: '#FFFFFF' },
  'FastAPI': { icon: SiFastapi, color: '#009688' },
  'GraphQL': { icon: SiGraphql, color: '#E10098' },
  'TensorFlow': { icon: SiTensorflow, color: '#FF6F00' },
  'PostgreSQL': { icon: SiPostgresql, color: '#4169E1' },
  'MySQL': { icon: SiMysql, color: '#4479A1' },
  'MongoDB': { icon: SiMongodb, color: '#47A248' },
  'Supabase': { icon: SiSupabase, color: '#3ECF8E' },
  'Supabase (PostgreSQL + Auth)': { icon: SiSupabase, color: '#3ECF8E' },
  'TimescaleDB': { icon: SiPostgresql, color: '#FDB515' },
  'Redis': { icon: SiRedis, color: '#DC382D' },
  'Prisma': { icon: SiPrisma, color: '#2D3748' },
  'Firebase': { icon: SiFirebase, color: '#FFCA28' },
  'Firestore': { icon: SiFirebase, color: '#FFCA28' },
  'Firebase Auth': { icon: SiFirebase, color: '#FFCA28' },
  'Stripe': { icon: SiStripe, color: '#635BFF' },
  'Tailwind CSS': { icon: SiTailwindcss, color: '#06B6D4' },
  'AWS': { icon: SiAmazon, color: '#FF9900' },
  'Docker': { icon: SiDocker, color: '#2496ED' },
  'Kafka': { icon: SiApachekafka, color: '#FFFFFF' },
  'WebRTC': { icon: SiWebrtc, color: '#FFFFFF' },
  'Blockchain': { icon: SiBitcoin, color: '#F7931A' },
  'Scikit-learn': { icon: SiScikitlearn, color: '#F7931E' },
  'Pandas': { icon: SiPandas, color: '#150458' },
  'NumPy': { icon: SiNumpy, color: '#013243' },
  'NLTK': { icon: SiPython, color: '#3776AB' },
  'Matplotlib': { icon: SiPython, color: '#11557C' },
  'OpenWeather API': { icon: TbApi, color: '#EB6E4B' },
  'OpenAI API': { icon: SiOpenai, color: '#10A37F' },
  'REST API': { icon: TbApi, color: '#009688' },
  'Axios': { icon: SiAxios, color: '#5A29E4' },
  'Android SDK': { icon: SiKotlin, color: '#3DDC84' },
};

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = memo(function ProjectCard({ project, index }: ProjectCardProps) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'info' | 'error' } | null>(null);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setToast(null); // Dismiss info popup when cursor leaves card
  }, []);

  const handleLiveClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (project.liveUrl && project.liveUrl.trim() !== "" && !project.liveUrl.includes("demo-link")) {
      window.open(project.liveUrl, '_blank');
    } else {
      setToast({ message: "Live demo is currently being prepared and will be available soon!", type: 'info' });
    }
  }, [project.liveUrl]);

  const handleGithubClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (project.githubUrl && project.githubUrl.trim() !== "" && !project.githubUrl.includes("yourusername")) {
      window.open(project.githubUrl, '_blank');
    } else {
      setToast({ message: "Source code is private for this project or will be uploaded soon.", type: 'info' });
    }
  }, [project.githubUrl]);

  // Find the primary technology for the App Icon
  const primaryTech = useMemo(() => {
    return project.techStack.find(tech => techConfig[tech]) || project.techStack[0];
  }, [project.techStack]);

  const techInfo = useMemo(() => techConfig[primaryTech], [primaryTech]);
  const TechIcon = techInfo?.icon || SiReact;
  const brandColor = `rgb(${project.color})`;

  const handleInfoClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setToast({
      message: `${project.tagline} — ${project.description}`,
      type: 'info'
    });
  }, [project.tagline, project.description]);

  return (
    <motion.article
      className="group relative overflow-hidden bg-[#141416]/75 backdrop-blur-2xl border border-white/[0.08] hover:border-white/[0.18] rounded-[32px] flex flex-col h-full transition-all duration-300 cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => router.push(`/projects/${project.id}`)}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.985 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      style={{ 
        willChange: 'transform',
        boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.08), 0 12px 36px -8px rgba(0, 0, 0, 0.5)'
      }}
      itemScope
      itemType="https://schema.org/SoftwareApplication"
    >
      {/* Padded iOS Preview Screen */}
      <div className="p-3.5 pb-0 select-none">
        <div className="relative aspect-[1.65] rounded-[22px] overflow-hidden bg-[#0A0A0C] border border-white/[0.08] shadow-inner">
          {/* Main preview screenshot */}
          <Image
            src={project.image}
            alt={`${project.title} screenshot`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-all duration-700 group-hover:scale-105"
            priority={index < 3}
          />
          {/* Hover preview interface cross-fade */}
          <div className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100">
            <Image
              src={project.hoverImage}
              alt={`${project.title} hover preview`}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
          </div>
          {/* Inner dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>

      {/* iOS Card Content Body */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Title block */}
          <div className="flex items-start justify-between gap-3 mb-2.5">
            <div className="min-w-0 flex-1">
              <span className="block text-[10px] font-bold font-mono tracking-widest bg-gradient-to-r from-[#FF8C00] to-[#F43F5E] bg-clip-text text-transparent uppercase mb-0.5">
                {project.tagline.split('for')[0].trim()}
              </span>
              <div className="flex flex-col gap-1">
                <h3 
                  className="text-lg sm:text-xl font-bold tracking-tight font-jakarta text-white truncate transition-colors duration-300"
                  itemProp="name"
                >
                  {project.title}
                </h3>
                {project.statusBadge && (
                  <span className="inline-block self-start text-[9px] px-2 py-0.5 rounded-full border border-white/20 text-white/80 bg-white/5 tracking-wider font-mono">
                    {project.statusBadge}
                  </span>
                )}
              </div>
            </div>

            {/* iOS Info Interactive Button */}
            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleInfoClick}
              className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-[#FF8C00]/20 hover:border-[#FF8C00]/40 border border-white/[0.1] flex items-center justify-center flex-shrink-0 text-white/60 hover:text-[#FF8C00] transition-all duration-200 cursor-pointer shadow-sm"
              aria-label={`View quick details for ${project.title}`}
              title="Quick Project Overview"
            >
              <Info size={14} />
            </motion.button>
          </div>

          {/* Description */}
          <p 
            className="text-white/60 text-xs sm:text-[13px] font-outfit leading-relaxed line-clamp-2 mb-4"
            itemProp="description"
          >
            {project.description}
          </p>

          {/* iOS Frosted Tech Badges */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.techStack.map((tech, idx) => {
              const config = techConfig[tech];
              const Icon = config?.icon;
              const iconColor = config?.color || '#FFFFFF';

              return (
                <span 
                  key={idx} 
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] rounded-full bg-white/[0.04] border border-white/[0.06] text-white/70 font-outfit font-semibold transition-all duration-200 hover:bg-white/[0.08] hover:text-white"
                >
                  {Icon && (
                    <Icon 
                      size={11} 
                      style={{ color: iconColor }}
                      className="flex-shrink-0"
                    />
                  )}
                  <span>{tech}</span>
                </span>
              );
            })}
          </div>
        </div>

        {/* iOS Action Footer */}
        <div>
          <div className="w-full h-px bg-white/[0.06] mb-3.5" />
          <nav className="flex items-center gap-2.5" aria-label="Project actions">
            {/* Orange to Red Gradient Live App Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleLiveClick}
              className="flex-1 bg-gradient-to-r from-[#FF8C00] to-[#F43F5E] hover:opacity-90 active:scale-95 text-white font-bold font-outfit text-xs py-2 px-4 rounded-full transition-all duration-200 select-none text-center cursor-pointer shadow-[0_4px_16px_rgba(244,63,94,0.35)]"
            >
              {project.primaryButtonText || "Live App"}
            </motion.button>

            {/* iOS Secondary Frosted Code Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleGithubClick}
              className="flex-1 bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.08] text-white/90 font-semibold font-outfit text-xs py-2 px-4 rounded-full transition-all duration-200 flex items-center justify-center gap-1.5 select-none cursor-pointer"
            >
              <Github size={13} className="text-white/80" />
              <span>{project.secondaryButtonText || "Source"}</span>
            </motion.button>
          </nav>
        </div>
      </div>

      {/* iOS-style Inner Card Alert Sheet Overlay */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center p-6 bg-[#0E0D0F] rounded-[32px] shadow-2xl"
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/projects/${project.id}`);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 12 }}
              transition={{ type: 'spring', stiffness: 450, damping: 25 }}
              className="flex flex-col items-center text-center max-w-[90%] select-none"
            >
              {/* App Icon Glow */}
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center mb-3 bg-gradient-to-r from-[#FF8C00]/20 to-[#F43F5E]/20 border border-[#F43F5E]/40"
              >
                <Info size={20} className="text-[#FF8C00]" />
              </div>
              <h4 className="text-base font-bold text-white mb-1.5 font-jakarta">
                {project.title}
              </h4>
              <p className="text-xs text-white/75 leading-relaxed font-outfit mb-5">
                {toast.message}
              </p>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/projects/${project.id}`);
                }}
                className="group/btn px-5 py-2 rounded-full bg-gradient-to-r from-[#FF8C00] to-[#F43F5E] hover:opacity-90 text-xs font-bold text-white transition-all duration-200 cursor-pointer shadow-[0_4px_16px_rgba(244,63,94,0.35)] flex items-center gap-1.5 active:scale-95"
              >
                <span>View Case Study</span>
                <ArrowRight size={13} className="group-hover/btn:translate-x-0.5 transition-transform" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
