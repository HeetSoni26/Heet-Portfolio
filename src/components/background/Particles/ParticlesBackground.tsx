'use client';

import { useEffect, useState, ComponentType } from 'react';

export default function ParticlesBackground() {
  const [isDesktop, setIsDesktop] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [Particles, setParticles] = useState<ComponentType<any> | null>(null);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    checkDesktop();
    window.addEventListener('resize', checkDesktop);

    if (window.innerWidth >= 768) {
      import('@tsparticles/react').then((mod) => {
        setParticles(() => mod.default);
      });
    }

    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  if (!isDesktop || !Particles) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Particles
        id="tsparticles"
        options={async () => {
          const { particlesConfig } = await import('./particles.config');
          return particlesConfig;
        }}
        className="w-full h-full"
      />
    </div>
  );
}
