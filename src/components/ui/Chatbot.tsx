'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

// Parse markdown-style content to render links and formatting
function formatMessage(content: string): React.ReactNode[] {
  // Split content by markdown patterns
  const parts: React.ReactNode[] = [];
  let keyIndex = 0;

  // Pattern for markdown links [text](url)
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;

  // First, handle links
  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(content)) !== null) {
    // Add text before the link
    if (match.index > lastIndex) {
      const beforeText = content.slice(lastIndex, match.index);
      parts.push(...formatBold(beforeText, keyIndex));
      keyIndex += 10;
    }

    // Add the link
    const [, text, url] = match;
    const isAnchor = url.startsWith('#');

    parts.push(
      <a
        key={`link-${keyIndex++}`}
        href={url}
        onClick={isAnchor ? (e) => {
          e.preventDefault();
          const element = document.querySelector(url);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        } : undefined}
        className="text-[#0A84FF] hover:text-[#409CFF] underline underline-offset-2 transition-colors cursor-pointer"
        target={isAnchor ? undefined : "_blank"}
        rel={isAnchor ? undefined : "noopener noreferrer"}
      >
        {text}
      </a>
    );

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text after last link
  if (lastIndex < content.length) {
    const remainingText = content.slice(lastIndex);
    parts.push(...formatBold(remainingText, keyIndex));
  }

  return parts.length > 0 ? parts : formatBold(content, 0);
}

// Format bold text
function formatBold(text: string, startKey: number): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const boldRegex = /\*\*([^*]+)\*\*/g;
  let lastIndex = 0;
  let keyIndex = startKey;
  let match;

  while ((match = boldRegex.exec(text)) !== null) {
    // Add text before the bold
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    // Add the bold text
    parts.push(
      <strong key={`bold-${keyIndex++}`} className="font-semibold text-white">
        {match[1]}
      </strong>
    );

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : [text];
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([
    'Tell me about yourself',
    'What are your skills?',
    'Show me your projects',
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Add welcome message when chat opens for first time
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: '1',
          content: "Hey there! 👋 I'm Heet's AI assistant. I can tell you all about his skills, projects, experience, and more. What would you like to know?",
          role: 'assistant',
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen, messages.length]);

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageText.trim(),
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageText }),
      });

      const data = await response.json();

      if (response.ok) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: data.response,
          role: 'assistant',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, assistantMessage]);
        if (data.suggestions) {
          setSuggestions(data.suggestions);
        }
      } else {
        throw new Error(data.error || 'Failed to get response');
      }
    } catch {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I'm having trouble responding right now. Please try again or contact Heet directly at heetks2607@gmail.com",
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion);
  };

  return (
    <>
      {/* Floating Chat Button - iOS Style */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-md border border-white/[0.15]"
        style={{
          background: 'rgba(255, 255, 255, 0.08)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
        }}
        whileHover={{ scale: 1.08, borderColor: 'rgba(255, 255, 255, 0.25)' }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isOpen ? 0 : 1, y: isOpen ? 20 : 0, pointerEvents: isOpen ? 'none' : 'auto' }}
        transition={{ duration: 0.2 }}
        aria-label="Open chat"
      >
        <MessageCircle size={22} className="text-white/80" />
        {/* Subtle pulse ring */}
        <motion.span
          className="absolute inset-0 rounded-full border border-white/20"
          animate={{ scale: [1, 1.4], opacity: [0.4, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.button>

      {/* Chat Window - iOS Style */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] h-[600px] max-h-[calc(100vh-100px)] rounded-[24px] overflow-hidden flex flex-col backdrop-blur-xl border border-white/[0.12]"
            style={{
              background: 'rgba(22, 22, 24, 0.85)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
            }}
          >
            {/* Header - iOS Style */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-white/[0.1] border border-white/[0.1]"
                >
                  <Bot size={20} className="text-white/80" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-[15px] tracking-[-0.01em]">AI Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#30D158]" />
                    <span className="text-[11px] text-white/40">Online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center bg-white/[0.06] hover:bg-white/[0.1] transition-colors border border-white/[0.06]"
                aria-label="Close chat"
              >
                <X size={16} className="text-white/50" />
              </button>
            </div>

            {/* Messages - iOS Style */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3" data-lenis-prevent style={{ scrollbarWidth: 'none' }}>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex gap-2.5 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  {/* Avatar - iOS Style */}
                  <div
                    className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center ${
                      message.role === 'assistant'
                        ? 'bg-white/[0.1] border border-white/[0.08]'
                        : 'bg-[#0A84FF]'
                    }`}
                  >
                    {message.role === 'assistant' ? (
                      <Sparkles size={13} className="text-white/70" />
                    ) : (
                      <User size={13} className="text-white" />
                    )}
                  </div>

                  {/* Message bubble - iOS iMessage Style */}
                  <div
                    className={`max-w-[75%] rounded-[18px] px-4 py-2.5 ${
                      message.role === 'user'
                        ? 'bg-[#0A84FF] text-white rounded-br-[6px]'
                        : 'bg-white/[0.08] text-white/90 rounded-bl-[6px] border border-white/[0.06]'
                    }`}
                  >
                    <div className="text-[14px] whitespace-pre-wrap leading-[1.4] tracking-[-0.01em]">
                      {message.role === 'assistant' ? formatMessage(message.content) : message.content}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Loading indicator - iOS Style */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2.5"
                >
                  <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center bg-white/[0.1] border border-white/[0.08]">
                    <Sparkles size={13} className="text-white/70" />
                  </div>
                  <div className="bg-white/[0.08] rounded-[18px] rounded-bl-[6px] px-4 py-3 border border-white/[0.06]">
                    <div className="flex gap-1.5">
                      <motion.span
                        className="w-2 h-2 rounded-full bg-white/30"
                        animate={{ opacity: [0.3, 0.8, 0.3] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: 0 }}
                      />
                      <motion.span
                        className="w-2 h-2 rounded-full bg-white/30"
                        animate={{ opacity: [0.3, 0.8, 0.3] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.span
                        className="w-2 h-2 rounded-full bg-white/30"
                        animate={{ opacity: [0.3, 0.8, 0.3] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions - iOS Style Pills */}
            {suggestions.length > 0 && !isLoading && (
              <div className="px-4 pb-3">
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="px-3.5 py-2 text-[12px] rounded-full bg-white/[0.06] border border-white/[0.08] text-white/60 hover:text-white/90 hover:bg-white/[0.1] hover:border-white/[0.15] transition-all duration-150"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input - iOS Style */}
            <form onSubmit={handleSubmit} className="p-4 pt-2 border-t border-white/[0.06]">
              <div className="flex gap-2.5 items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Message..."
                  className="flex-1 bg-white/[0.06] border border-white/[0.08] rounded-full px-5 py-3 text-[14px] text-white placeholder-white/30 focus:outline-none focus:bg-white/[0.08] focus:border-white/[0.15] transition-all"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-150 ${
                    input.trim()
                      ? 'bg-[#0A84FF] hover:bg-[#0A84FF]/90'
                      : 'bg-white/[0.06] border border-white/[0.06]'
                  }`}
                >
                  <Send size={16} className={input.trim() ? 'text-white' : 'text-white/25'} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
