import React from 'react';
import { cn } from '@/lib/utils';

interface GlowWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  intensity?: 'low' | 'medium' | 'high';
}

const GlowWrapper = React.forwardRef<HTMLDivElement, GlowWrapperProps>(
  ({ className, children, intensity = 'medium', ...props }, ref) => {
    const intensityStyles = {
      low: 'hover:shadow-[0_0_20px_rgba(255,140,0,0.2)]',
      medium: 'hover:shadow-glow',
      high: 'hover:shadow-glow-lg',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'transition-shadow duration-300',
          intensityStyles[intensity],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlowWrapper.displayName = 'GlowWrapper';

export default GlowWrapper;
