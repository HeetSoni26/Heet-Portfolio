'use client';

import React, { useCallback, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  shimmer?: boolean;
  asChild?: boolean;
  children?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      shimmer = false,
      asChild = false,
      children,
      disabled,
      style,
      ...props
    },
    ref
  ) => {
    const innerRef = useRef<HTMLButtonElement>(null);
    const buttonRef = (ref as React.RefObject<HTMLButtonElement>) || innerRef;

    // Magnetic cursor follow
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { stiffness: 200, damping: 20, mass: 0.5 });
    const springY = useSpring(mouseY, { stiffness: 200, damping: 20, mass: 0.5 });

    // Spotlight position for hover glow
    const spotlightX = useMotionValue(0.5);
    const spotlightY = useMotionValue(0.5);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Magnetic pull (subtle)
      mouseX.set((x - centerX) * 0.08);
      mouseY.set((y - centerY) * 0.12);

      // Spotlight tracking
      spotlightX.set(x / rect.width);
      spotlightY.set(y / rect.height);
    }, [mouseX, mouseY, spotlightX, spotlightY]);

    const handleMouseLeave = useCallback(() => {
      mouseX.set(0);
      mouseY.set(0);
      spotlightX.set(0.5);
      spotlightY.set(0.5);
    }, [mouseX, mouseY, spotlightX, spotlightY]);

    // Derive spotlight background
    const spotlightBg = useTransform(
      [spotlightX, spotlightY],
      ([x, y]: number[]) =>
        variant === 'primary'
          ? `radial-gradient(circle 80px at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.18), transparent)`
          : `radial-gradient(circle 80px at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.08), transparent)`
    );

    const baseStyles = 'group/btn inline-flex items-center justify-center rounded-full font-semibold disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden cursor-pointer select-none';

    const variants = {
      primary: 'btn-primary text-white',
      secondary: 'btn-secondary text-white',
      ghost: 'text-white/50 hover:text-white hover:bg-white/[0.04] transition-colors duration-300',
    };

    const sizes = {
      sm: 'px-4 py-1.5 text-sm',
      md: 'px-5 py-2.5 text-base',
      lg: 'px-7 py-3 text-base',
    };

    const content = (
      <>
        {isLoading ? (
          <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2 relative z-10" />
        ) : leftIcon ? (
          <span className="mr-2 relative z-10 transition-transform duration-300 group-hover/btn:translate-x-[-1px]">{leftIcon}</span>
        ) : null}
        <span className="relative z-10">{children}</span>
        {rightIcon && !isLoading && (
          <span className="ml-2 relative z-10 transition-transform duration-300 group-hover/btn:translate-x-[2px]">
            {rightIcon}
          </span>
        )}
        
        {/* Spotlight hover glow */}
        {variant !== 'ghost' && (
          <motion.div
            className="absolute inset-0 pointer-events-none z-[1] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
            style={{ background: spotlightBg }}
          />
        )}

        {/* Shimmer effect */}
        {shimmer && (
          <div className="absolute inset-0 pointer-events-none z-[2] overflow-hidden">
            <motion.div
              className="absolute top-0 bottom-0 w-[60%]"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 40%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.12) 60%, transparent 100%)',
                filter: 'blur(8px)',
              }}
              animate={{ left: ['-60%', '160%'] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut',
                repeatDelay: 2,
              }}
            />
          </div>
        )}

        {/* Primary: bottom edge glow on hover */}
        {variant === 'primary' && (
          <div className="absolute bottom-0 left-[15%] right-[15%] h-[1px] bg-white/0 group-hover/btn:bg-white/30 transition-all duration-500 blur-[1px] z-[1]" />
        )}

        {/* Secondary: border shimmer on hover */}
        {variant === 'secondary' && (
          <div className="absolute inset-0 rounded-full opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 pointer-events-none z-[1]"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.05) 100%)',
            }}
          />
        )}
      </>
    );

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<{ className?: string; children?: React.ReactNode }>, {
        className: cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className,
          (children as React.ReactElement<{ className?: string }>).props.className
        ),
        children: content,
      });
    }

    return (
      <motion.button
        ref={buttonRef}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        disabled={disabled || isLoading}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          x: springX,
          y: springY,
          ...style,
        }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        {...props}
      >
        {content}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
