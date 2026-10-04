'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Send, RefreshCw } from 'lucide-react';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactFormProps {
  onClose?: () => void;
}

export default function ContactForm({ onClose: _onClose }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message');
      }

      setIsSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendAnother = () => {
    setIsSuccess(false);
    setError(null);
    reset();
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {isSuccess ? (
          /* Success State */
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col items-center justify-center py-6 xs:py-8 sm:py-12 text-center"
          >
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 15 }}
              className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 rounded-full bg-[#30D158]/15 border border-[#30D158]/25 flex items-center justify-center mb-3 xs:mb-4"
            >
              <CheckCircle className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 text-[#30D158]" />
            </motion.div>

            {/* Success Message */}
            <motion.h4
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base xs:text-lg sm:text-xl font-semibold text-white mb-1.5 xs:mb-2"
            >
              Message Sent!
            </motion.h4>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-[11px] xs:text-[12px] sm:text-[13px] text-white/50 mb-4 xs:mb-5 sm:mb-6 max-w-[240px] xs:max-w-[260px] sm:max-w-[280px]"
            >
              Thank you for reaching out. I'll get back to you as soon as possible.
            </motion.p>

            {/* Send Another Message Button */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              onClick={handleSendAnother}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-1.5 xs:gap-2 px-3.5 xs:px-4 sm:px-5 py-2 xs:py-2.5 rounded-lg xs:rounded-xl bg-white/[0.06] border border-white/[0.1] text-[11px] xs:text-[12px] sm:text-[13px] font-medium text-white/80 hover:bg-white/[0.1] hover:text-white transition-all"
            >
              <RefreshCw className="w-3 h-3 xs:w-3.5 xs:h-3.5" />
              Send Another Message
            </motion.button>
          </motion.div>
        ) : (
          /* Form State */
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-2.5 xs:space-y-3 sm:space-y-4"
          >
            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-3 rounded-xl bg-[#FF453A]/10 border border-[#FF453A]/20"
                >
                  <p className="text-[#FF453A] text-[12px]">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Name and Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 xs:gap-3 sm:gap-4">
              <div>
                <input
                  {...register('name', { required: 'Name is required' })}
                  type="text"
                  placeholder="Your name"
                  className="w-full rounded-md xs:rounded-lg bg-white/[0.04] border border-white/[0.08] px-2.5 xs:px-3 sm:px-3.5 py-2 xs:py-2.5 text-[12px] xs:text-[13px] text-white placeholder-white/30 focus:outline-none focus:bg-white/[0.06] focus:border-white/[0.15] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                />
                {errors.name && (
                  <p className="text-[#FF453A] text-[10px] xs:text-[11px] mt-0.5 xs:mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  type="email"
                  placeholder="Your email"
                  className="w-full rounded-md xs:rounded-lg bg-white/[0.04] border border-white/[0.08] px-2.5 xs:px-3 sm:px-3.5 py-2 xs:py-2.5 text-[12px] xs:text-[13px] text-white placeholder-white/30 focus:outline-none focus:bg-white/[0.06] focus:border-white/[0.15] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="text-[#FF453A] text-[10px] xs:text-[11px] mt-0.5 xs:mt-1">{errors.email.message}</p>
                )}
              </div>
            </div>

            {/* Subject */}
            <div>
              <input
                {...register('subject', { required: 'Subject is required' })}
                type="text"
                placeholder="Subject"
                className="w-full rounded-md xs:rounded-lg bg-white/[0.04] border border-white/[0.08] px-2.5 xs:px-3 sm:px-3.5 py-2 xs:py-2.5 text-[12px] xs:text-[13px] text-white placeholder-white/30 focus:outline-none focus:bg-white/[0.06] focus:border-white/[0.15] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              />
              {errors.subject && (
                <p className="text-[#FF453A] text-[10px] xs:text-[11px] mt-0.5 xs:mt-1">{errors.subject.message}</p>
              )}
            </div>

            {/* Message Textarea */}
            <div>
              <textarea
                {...register('message', { required: 'Please enter your message' })}
                placeholder="Your message..."
                rows={3}
                className="w-full rounded-md xs:rounded-lg bg-white/[0.04] border border-white/[0.08] px-2.5 xs:px-3 sm:px-3.5 py-2 xs:py-2.5 text-[12px] xs:text-[13px] text-white placeholder-white/30 focus:outline-none focus:bg-white/[0.06] focus:border-white/[0.15] transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed sm:rows-4"
                style={{ scrollbarWidth: 'none' }}
                disabled={isSubmitting}
              />
              {errors.message && (
                <p className="text-[#FF453A] text-[10px] xs:text-[11px] mt-0.5 xs:mt-1">{errors.message.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="w-full mt-1 xs:mt-1.5 sm:mt-2 px-4 xs:px-5 sm:px-6 py-2.5 xs:py-3 rounded-lg xs:rounded-xl font-semibold text-[12px] xs:text-[13px] sm:text-[14px] text-white bg-gradient-to-r from-[#FF6B6B] via-[#FF8E53] to-[#FFD93D] hover:opacity-90 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 xs:gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  <Send size={16} />
                  Send Message
                </>
              )}
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
