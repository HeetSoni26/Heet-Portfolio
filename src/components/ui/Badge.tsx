import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'outline' | 'subtle';
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'subtle', children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200';

    const variants = {
      primary: 'bg-primary-gradient text-white',
      outline: 'border border-transparent bg-primary-gradient bg-clip-padding text-primary-gradient',
      subtle: 'bg-primary-gradient/10 text-primary-gradient',
    };

    return (
      <span
        ref={ref}
        className={cn(baseStyles, variants[variant], className)}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;
