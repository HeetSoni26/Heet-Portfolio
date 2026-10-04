'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';

interface TypingAnimationProps {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

export default function TypingAnimation({
  phrases,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000,
}: TypingAnimationProps) {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Memoize cursor animation
  const cursorAnimation = useMemo(() => ({
    opacity: [1, 0],
  }), []);

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];

    const type = () => {
      if (!isDeleting && currentText === currentPhrase) {
        // Pause before deleting
        timeoutRef.current = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
        return;
      }

      if (isDeleting && currentText === '') {
        // Move to next phrase
        setIsDeleting(false);
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
        return;
      }

      // Type or delete character
      timeoutRef.current = setTimeout(
        () => {
          if (isDeleting) {
            setCurrentText(currentPhrase.substring(0, currentText.length - 1));
          } else {
            setCurrentText(currentPhrase.substring(0, currentText.length + 1));
          }
        },
        isDeleting ? deletingSpeed : typingSpeed
      );
    };

    type();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentText, isDeleting, currentPhraseIndex, phrases, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span className="inline-flex items-center" role="status" aria-live="polite" aria-atomic="true">
      <span className="text-primary-gradient" aria-label={phrases[currentPhraseIndex]}>
        {currentText}
      </span>
      <motion.span
        className="inline-block w-0.5 h-6 md:h-7 lg:h-8 bg-primary-gradient ml-1"
        animate={cursorAnimation}
        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
        aria-hidden="true"
      />
    </span>
  );
}
