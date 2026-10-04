import React from 'react';
import { cn } from '@/lib/utils';

interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  gradient?: boolean;
}

const Divider = React.forwardRef<HTMLHRElement, DividerProps>(
  ({ className, gradient = false, ...props }, ref) => {
    if (gradient) {
      return (
        <div
          ref={ref as React.Ref<HTMLDivElement>}
          className={cn(
            'h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-30',
            className
          )}
          role="separator"
          {...props}
        />
      );
    }

    return (
      <hr
        ref={ref}
        className={cn('border-t border-[rgba(255,255,255,0.06)]', className)}
        {...props}
      />
    );
  }
);

Divider.displayName = 'Divider';

export default Divider;
