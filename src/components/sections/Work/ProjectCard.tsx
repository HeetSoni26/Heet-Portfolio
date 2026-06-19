'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Github, Info } from 'lucide-react';
import { Project } from './work.data';
import { useState, memo, useCallback, useMemo, useEffect } from 'react';
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
const techConfig: Record<string, { icon: React.ComponentType<{ size?: number; style?: React.CSSProperties; className?: string }>; color: string }> = {
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
  const [isHovered, setIsHovered] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'info' | 'error' } | null>(null);

  // Auto-hide toast notifications after 2 seconds
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

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

  // Card hover shadow style using project brand colors (mimics iOS ambient glow)
  const hoverShadow = useMemo(() => {
    return isHovered 
      ? `0 20px 40px -15px rgba(${project.color}, 0.25), 0 1px 1px rgba(255, 255, 255, 0.08) inset`
      : '0 4px 12px rgba(0, 0, 0, 0.3), 0 1px 1px rgba(255, 255, 255, 0.03) inset';
  }, [isHovered, project.color]);

  return (
    <motion.article
      className="group relative overflow-hidden bg-[#161619]/70 backdrop-blur-xl border border-white/10 hover:border-white/20 rounded-[28px] flex flex-col h-full transition-colors duration-300"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -8, scale: 1.015 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      style={{
        boxShadow: hoverShadow,
      }}
      itemScope
      itemType="https://schema.org/SoftwareApplication"
    >
      {/* Padded iOS Preview Image */}
      <div className="p-3 pb-0 select-none">
        <div className="relative aspect-[1.6] rounded-2xl overflow-hidden bg-neutral-950 border border-white/5">
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Card Info Section */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* iOS App Store styled Title block */}
          <div className="flex items-start gap-3">
            {/* Squircle App Icon */}
            <div 
              className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center transition-all duration-300"
              style={{
                background: `rgba(${project.color}, 0.1)`,
                border: `1.5px solid rgba(${project.color}, 0.25)`,
                boxShadow: isHovered ? `0 0 15px rgba(${project.color}, 0.2)` : 'none'
              }}
            >
              <TechIcon 
                size={22} 
                style={{ color: techInfo?.color || '#FFFFFF' }} 
              />
            </div>
            {/* Title / Tagline */}
            <div className="min-w-0 flex-1">
              <span className="block text-[10px] tracking-wider text-white/40 uppercase font-bold font-outfit">
                {project.tagline.split('for')[0].trim()}
              </span>
              <h3 
                className="text-lg sm:text-xl font-bold tracking-tight font-outfit truncate transition-colors duration-300 mt-0.5"
                style={{
                  color: isHovered ? brandColor : '#FFFFFF'
                }}
                itemProp="name"
              >
                {project.title}
              </h3>
            </div>
          </div>

          {/* Description */}
          <p 
            className="text-white/60 text-xs sm:text-sm font-outfit mt-3 leading-relaxed line-clamp-3 mb-3"
            itemProp="description"
          >
            {project.description}
          </p>

          {/* Core Features List */}
          <ul className="space-y-1 mb-3.5 mt-2">
            {project.features.slice(0, 3).map((feat, idx) => (
              <li key={idx} className="flex items-center gap-2 text-[11px] sm:text-xs text-white/55 font-outfit">
                <span 
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: brandColor }}
                />
                <span className="line-clamp-1">{feat}</span>
              </li>
            ))}
          </ul>

          {/* Tech Badges */}
          <div className="flex flex-wrap gap-1.5 mb-3.5">
            {project.techStack.map((tech, idx) => {
              const config = techConfig[tech];
              const Icon = config?.icon;
              const iconColor = config?.color || '#FFFFFF';

              return (
                <span 
                  key={idx} 
                  className="inline-flex items-center gap-1 px-2 py-0.5 text-[9.5px] rounded-full bg-white/[0.03] border border-white/[0.06] text-white/55 font-outfit font-semibold transition-all duration-300 hover:bg-white/[0.06] hover:border-white/[0.12] hover:text-white/80"
                >
                  {Icon && (
                    <Icon 
                      size={10.5} 
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

        {/* Action Footer */}
        <div>
          <div className="w-full h-px bg-white/5 mb-3" />
          <nav className="flex items-center gap-3" aria-label="Project actions">
            {/* iOS Live App Button */}
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={handleLiveClick}
              className="flex-1 text-white font-bold font-outfit text-xs py-2 rounded-full transition-all duration-300 select-none text-center cursor-pointer hover:brightness-110"
              style={{
                backgroundColor: brandColor,
                boxShadow: `0 4px 14px rgba(${project.color}, 0.3)`,
              }}
            >
              Live App
            </motion.button>
            {/* Code button (GitHub) */}
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={handleGithubClick}
              className="flex-1 border border-white/10 hover:bg-white/5 hover:border-white/20 text-white font-semibold font-outfit text-xs py-2 rounded-full transition-all flex items-center justify-center gap-1.5 select-none cursor-pointer"
            >
              <Github size={12} className="text-white/80" />
              <span>Source</span>
            </motion.button>
          </nav>
        </div>
      </div>

      {/* iOS-style Inner Card Alert Overlay */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center p-6 bg-black/90 backdrop-blur-md rounded-[28px]"
            onClick={(e) => {
              e.stopPropagation();
              setToast(null); // Allow click-to-dismiss
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 10 }}
              transition={{ type: 'spring', stiffness: 450, damping: 25 }}
              className="flex flex-col items-center text-center max-w-[85%] select-none pointer-events-none"
            >
              {/* App Icon Glow */}
              <div 
                className="w-11 h-11 rounded-full flex items-center justify-center mb-3"
                style={{ 
                  background: `rgba(${project.color}, 0.15)`,
                  border: `1px solid rgba(${project.color}, 0.3)`
                }}
              >
                <Info size={18} style={{ color: brandColor }} />
              </div>
              <h4 className="text-sm font-bold text-white mb-1 font-outfit">
                Project Update
              </h4>
              <p className="text-[11px] sm:text-xs text-white/70 leading-relaxed font-outfit">
                {toast.message}
              </p>
              
              <span className="text-[9px] text-white/30 mt-4 font-outfit">
                Closing shortly...
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
