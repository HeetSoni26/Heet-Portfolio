import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: 'sm' | 'md' | 'lg';
  hover?: boolean;
  glow?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      padding = 'md',
      hover = false,
      glow = false,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'bg-card rounded-xl border transition-all duration-300';

    const paddings = {
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };

    const hoverStyles = hover
      ? 'hover:border-primary hover:-translate-y-1 hover:shadow-glow cursor-pointer'
      : '';

    const glowStyles = glow ? 'shadow-glow' : '';

    const borderStyle = 'border-[rgba(255,255,255,0.06)]';

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          borderStyle,
          paddings[padding],
          hoverStyles,
          glowStyles,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
