import React from 'react';
import { cn } from '@/lib/utils';

interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  subtitle?: string;
  title: string;
  highlightWord?: string;
  description?: string;
}

const SectionHeading = React.forwardRef<HTMLDivElement, SectionHeadingProps>(
  (
    { className, subtitle, title, highlightWord, description, ...props },
    ref
  ) => {
    const renderTitle = () => {
      if (!highlightWord) {
        return <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">{title}</h2>;
      }

      const parts = title.split(highlightWord);
      return (
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
          {parts[0]}
          <span
            className="text-rainbow-gradient italic font-bold px-1"
            style={{
              fontFamily: 'var(--font-instrument), Georgia, serif',
              textTransform: 'none',
            }}
          >
            {highlightWord}
          </span>
          {parts[1]}
        </h2>
      );
    };

    return (
      <div
        ref={ref}
        className={cn('text-center mb-12 md:mb-16', className)}
        {...props}
      >
        {subtitle && (
          <p className="text-sm md:text-base uppercase tracking-wider text-muted mb-4">
            {subtitle}
          </p>
        )}
        {renderTitle()}
        {description && (
          <p className="text-lg md:text-xl text-muted mt-4 max-w-2xl mx-auto">
            {description}
          </p>
        )}
      </div>
    );
  }
);

SectionHeading.displayName = 'SectionHeading';

export default SectionHeading;
