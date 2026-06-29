'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X } from 'lucide-react';

interface LogLine {
  type: 'input' | 'output' | 'error' | 'system';
  text: React.ReactNode;
}

type ThemeName = 'matrix' | 'amber' | 'dracula' | 'terminal';

interface ThemeConfig {
  primaryColor: string; // text color code
  accentColor: string;  // highlight color code
  secondaryColor: string; // secondary text code
  promptColor: string;  // prompt prompt text color
  borderColor: string;  // border color
  glowColor: string;    // text shadow glow
  windowBg: string;     // window background color
  pulseClass: string;   // dot pulse class
}

const THEME_CONFIGS: Record<ThemeName, ThemeConfig> = {
  matrix: {
    primaryColor: 'text-[#39d353]',
    accentColor: 'text-[#00f0ff]',
    secondaryColor: 'text-white/60',
    promptColor: 'text-[#39d353]',
    borderColor: 'border-[#39d353]/25',
    glowColor: 'rgba(57, 211, 83, 0.4)',
    windowBg: 'rgba(20, 20, 22, 0.85)',
    pulseClass: 'bg-green-500',
  },
  amber: {
    primaryColor: 'text-[#ffb000]',
    accentColor: 'text-[#ffcc00]',
    secondaryColor: 'text-[#ffb000]/60',
    promptColor: 'text-[#ffb000]',
    borderColor: 'border-[#ffb000]/25',
    glowColor: 'rgba(255, 176, 0, 0.4)',
    windowBg: 'rgba(22, 16, 8, 0.9)',
    pulseClass: 'bg-amber-500',
  },
  dracula: {
    primaryColor: 'text-[#ff79c6]',
    accentColor: 'text-[#bd93f9]',
    secondaryColor: 'text-white/60',
    promptColor: 'text-[#50fa7b]',
    borderColor: 'border-[#bd93f9]/25',
    glowColor: 'rgba(189, 147, 249, 0.4)',
    windowBg: 'rgba(25, 25, 35, 0.9)',
    pulseClass: 'bg-pink-500',
  },
  terminal: {
    primaryColor: 'text-white',
    accentColor: 'text-[#00f0ff]',
    secondaryColor: 'text-white/50',
    promptColor: 'text-[#00f0ff]',
    borderColor: 'border-white/15',
    glowColor: 'rgba(255, 255, 255, 0.2)',
    windowBg: 'rgba(15, 15, 15, 0.9)',
    pulseClass: 'bg-blue-500',
  },
};

const COMMAND_LIST = [
  'help', 'about', 'skills', 'projects', 'git log', 'visitor', 'matrix', 'clear',
  'theme matrix', 'theme amber', 'theme dracula', 'theme terminal',
  'go hero', 'go about', 'go skills', 'go projects', 'go github', 'go contact',
  'neofetch', 'hack', 'weather', 'sudo'
];

export default function TerminalSandbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<ThemeName>('matrix');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [input, setInput] = useState('');
  const [logs, setLogs] = useState<LogLine[]>([]);
  const [suggestion, setSuggestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const activeTheme = THEME_CONFIGS[currentTheme];

  // Generate ASCII welcome banner
  const getBanner = useCallback((): React.ReactNode => (
    <div className={`${activeTheme.primaryColor} font-mono text-[9px] leading-3 sm:text-[11px] sm:leading-4 mb-3 select-none opacity-90`}>
      <pre className="whitespace-pre overflow-x-auto scrollbar-none">
{`██████╗  █████╗ ███╗   ███╗     ██████╗██╗     ██╗
██╔══██╗██╔══██╗████╗ ████║    ██╔════╝██║     ██║
██████╔╝███████║██╔████╔██║    ██║     ██║     ██║
██╔══██╗██╔══██║██║╚██╔╝██║    ██║     ██║     ██║
██║  ██║██║  ██║██║ ╚═╝ ██║    ╚██████╗███████╗██║
╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝     ╚═════╝╚══════╝╚═╝`}
      </pre>
      <div className="mt-3 text-white/50 text-[10px] sm:text-xs font-semibold leading-relaxed">
        RAMESHWAR CLI [Version 1.0.0] - Interactive Sandbox Shell.
        <br />
        Type <span className={`${activeTheme.accentColor} font-bold`}>help</span> to view available system commands.
      </div>
    </div>
  ), [activeTheme.primaryColor, activeTheme.accentColor]);

  // Initial welcome message
  useEffect(() => {
    setLogs([
      { type: 'system', text: getBanner() }
    ]);
  }, [getBanner]);

  // Keyboard shortcut to open/close (Cmd+K / Ctrl+K / Escape)
  useEffect(() => {
    const handleGlobalKeys = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleGlobalKeys);
    return () => window.removeEventListener('keydown', handleGlobalKeys);
  }, [isOpen]);

  // Lock scroll when open
  useEffect(() => {
    if (isOpen) {
      const originalStyle = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      // Auto focus input
      setTimeout(() => inputRef.current?.focus(), 150);
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  // Scroll to bottom when logs update
  useEffect(() => {
    if (isOpen) {
      terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs, isOpen]);

  // Focus helper
  const focusInput = () => {
    inputRef.current?.focus();
  };

  // Autocomplete suggestion logic (ZSH Style)
  useEffect(() => {
    if (!input.trim()) {
      setSuggestion('');
      return;
    }
    const match = COMMAND_LIST.find(cmd => cmd.startsWith(input.toLowerCase()));
    if (match && match !== input.toLowerCase()) {
      setSuggestion(match.substring(input.length));
    } else {
      setSuggestion('');
    }
  }, [input]);

  // Handle key triggers (Arrow keys, tab, enter)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      if (suggestion) {
        setInput(input + suggestion);
        setSuggestion('');
      }
    } else if (e.key === 'Enter') {
      executeCommand(input.trim());
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      
      const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(newIndex);
      setInput(history[newIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      
      if (historyIndex === history.length - 1) {
        setHistoryIndex(-1);
        setInput('');
      } else {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    }
  };

  // Scroll navigation helper
  const navigateToSection = (sectionId: string, label: string) => {
    setLogs(prev => [
      ...prev,
      { type: 'system', text: `Navigating to ${label} section...` }
    ]);
    setIsOpen(false);
    
    // Convert projects -> work mapping
    const targetId = sectionId === 'projects' ? 'work' : sectionId;
    
    setTimeout(() => {
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
      
      if (sectionId === 'contact') {
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('open-contact-form'));
        }, 800);
      }
    }, 250);
  };

  // Run matching actions
  const executeCommand = async (cmdString: string) => {
    const trimmedCmd = cmdString.trim();
    if (!trimmedCmd) return;

    const newLogs = [...logs, { type: 'input' as const, text: trimmedCmd }];
    setLogs(newLogs);
    setInput('');
    setSuggestion('');
    setHistoryIndex(-1);
    setHistory(prev => [...prev.filter(h => h !== trimmedCmd), trimmedCmd]); // Move to end of history

    const cmd = trimmedCmd.toLowerCase();

    if (cmd === 'clear') {
      setLogs([]);
      return;
    }

    setIsLoading(true);

    // Timeout helper to give realistic feel
    await new Promise(resolve => setTimeout(resolve, 200));

    // Handle 'go <section>' and 'go to <section>'
    if (cmd.startsWith('go ') || cmd.startsWith('go to ')) {
      const target = cmd.replace('go to ', '').replace('go ', '').trim();
      const validSections = ['hero', 'about', 'skills', 'projects', 'github', 'contact'];
      
      if (validSections.includes(target)) {
        navigateToSection(target, target.toUpperCase());
        setIsLoading(false);
        return;
      }
    }

    // Direct section commands (about, skills, projects, github, contact)
    const directNavigationCmds: Record<string, string> = {
      hero: 'hero',
      github: 'github',
    };
    if (directNavigationCmds[cmd]) {
      navigateToSection(directNavigationCmds[cmd], cmd.toUpperCase());
      setIsLoading(false);
      return;
    }

    // Theme changer command
    if (cmd.startsWith('theme ')) {
      const themeChoice = cmd.replace('theme ', '').trim() as ThemeName;
      if (THEME_CONFIGS[themeChoice]) {
        setCurrentTheme(themeChoice);
        // Logs update automatically due to welcome banner refresh
        setIsLoading(false);
        return;
      } else {
        setLogs(prev => [
          ...prev,
          { type: 'error', text: `Unknown theme: ${themeChoice}. Available: matrix, amber, dracula, terminal` }
        ]);
        setIsLoading(false);
        return;
      }
    }

    switch (cmd) {
      case 'help':
        setLogs(prev => [
          ...prev,
          {
            type: 'output',
            text: (
              <div className="font-mono text-[11px] sm:text-xs text-white/80 py-1 border-y border-white/5 my-1.5 space-y-3 pl-1 sm:pl-2">
                <div>
                  <p className={`${activeTheme.accentColor} font-bold mb-1 select-none`}>[ SYSTEM COMMANDS ]</p>
                  <div className="space-y-1 pl-2">
                    <p><span className="text-white font-bold inline-block w-24 sm:w-28">about</span> - Read profile bio details</p>
                    <p><span className="text-white font-bold inline-block w-24 sm:w-28">skills</span> - Display technical stack expertise</p>
                    <p><span className="text-white font-bold inline-block w-24 sm:w-28">projects</span> - View featured open-source work</p>
                    <p><span className="text-white font-bold inline-block w-24 sm:w-28">git log</span> - Pull live git commit history</p>
                    <p><span className="text-white font-bold inline-block w-24 sm:w-28">visitor</span> - Fetch Upstash visitor stats chart</p>
                    <p><span className="text-white font-bold inline-block w-24 sm:w-28">neofetch</span> - Show retro system information dashboard</p>
                    <p><span className="text-white font-bold inline-block w-24 sm:w-28">weather</span> - Display Yeola weather ASCII forecast</p>
                    <p><span className="text-white font-bold inline-block w-24 sm:w-28">clear</span> - Clear terminal session logs</p>
                  </div>
                </div>
                <div>
                  <p className={`${activeTheme.accentColor} font-bold mb-1 select-none`}>[ PAGE NAVIGATION ]</p>
                  <div className="space-y-1 pl-2">
                    <p><span className="text-white font-bold inline-block w-24 sm:w-28">go hero</span> - Scroll smoothly to top intro banner</p>
                    <p><span className="text-white font-bold inline-block w-24 sm:w-28">go about</span> - Scroll smoothly to biography info block</p>
                    <p><span className="text-white font-bold inline-block w-24 sm:w-28">go skills</span> - Scroll smoothly to skills marquee track</p>
                    <p><span className="text-white font-bold inline-block w-24 sm:w-28">go projects</span> - Scroll smoothly to featured portfolios section</p>
                    <p><span className="text-white font-bold inline-block w-24 sm:w-28">go github</span> - Scroll smoothly to open source grid tracker</p>
                    <p><span className="text-white font-bold inline-block w-24 sm:w-28">go contact</span> - Navigate down and open contact email form</p>
                  </div>
                </div>
                <div>
                  <p className={`${activeTheme.accentColor} font-bold mb-1 select-none`}>[ VISUAL MODES & THEMES ]</p>
                  <div className="space-y-1 pl-2">
                    <p><span className="text-white font-bold inline-block w-24 sm:w-28">theme [name]</span> - Switch themes (<span className="text-white/40 italic">matrix | amber | dracula | terminal</span>)</p>
                    <p><span className="text-white font-bold inline-block w-24 sm:w-28">matrix</span> - Toggle fullscreen Katakana rain overlay</p>
                    <p><span className="text-white font-bold inline-block w-24 sm:w-28">hack</span> - Run automated decryption animation sequence</p>
                  </div>
                </div>
              </div>
            )
          }
        ]);
        break;

      case 'about':
        setLogs(prev => [
          ...prev,
          {
            type: 'output',
            text: (
              <div className="space-y-1 text-white/80 py-0.5 text-xs sm:text-sm">
                <p><span className="text-pink-500 font-bold">Name:</span> Rameshwar Bhagwat</p>
                <p><span className="text-pink-500 font-bold">Title:</span> Full Stack & AI Developer</p>
                <p><span className="text-pink-500 font-bold">Location:</span> Yeola, Maharashtra, India (IST)</p>
                <p><span className="text-pink-500 font-bold">Bio:</span> Creative software engineer shipping clean, high-performance web systems and AI tools. Dedicated to beautiful interfaces and robust database backends.</p>
                <p className="text-[10px] text-white/30 italic">Type &apos;go about&apos; to navigate directly to this section on the page.</p>
              </div>
            )
          }
        ]);
        break;

      case 'skills':
        setLogs(prev => [
          ...prev,
          {
            type: 'output',
            text: (
              <div className="space-y-1.5 text-white/80 py-0.5 text-xs">
                <div>
                  <p className={`${activeTheme.accentColor} font-bold`}>Frontend:</p>
                  <p className="pl-3">React.js, Next.js (16+), TypeScript, Tailwind CSS, Framer Motion</p>
                </div>
                <div>
                  <p className={`${activeTheme.accentColor} font-bold`}>Backend & Database:</p>
                  <p className="pl-3">Node.js, Express, Python, MongoDB, PostgreSQL, Upstash Redis</p>
                </div>
                <div>
                  <p className={`${activeTheme.accentColor} font-bold`}>Creative Graphics:</p>
                  <p className="pl-3">Three.js, React Three Fiber (R3F), GLSL Custom Shaders</p>
                </div>
                <p className="text-[10px] text-white/30 italic pt-1">Type &apos;go skills&apos; to navigate directly to this section on the page.</p>
              </div>
            )
          }
        ]);
        break;

      case 'projects':
        setLogs(prev => [
          ...prev,
          {
            type: 'output',
            text: (
              <div className="space-y-2 py-0.5 text-xs">
                <div className="border-l border-orange-500 pl-2">
                  <h4 className="text-white font-bold">1. WebCraft</h4>
                  <p className="text-white/60 text-[11px]">High-performance Next.js site builder with modular design and SEO readiness.</p>
                </div>
                <div className="border-l border-pink-500 pl-2">
                  <h4 className="text-white font-bold">2. Safecoast</h4>
                  <p className="text-white/60 text-[11px]">Geospatial risk assessment platform with real-time mapping integrations.</p>
                </div>
                <p className="text-[10px] text-white/30 italic pt-1">Type &apos;go projects&apos; to navigate directly to this section on the page.</p>
              </div>
            )
          }
        ]);
        break;

      case 'git log':
        try {
          const res = await fetch('/api/github-commits');
          const commits = await res.json();
          
          if (Array.isArray(commits)) {
            setLogs(prev => [
              ...prev,
              {
                type: 'output',
                text: (
                  <div className="space-y-1.5 py-0.5 font-mono text-[11px] sm:text-xs max-h-48 overflow-y-auto pr-1">
                    <p className={`${activeTheme.primaryColor} font-bold`}>Latest git commits activity:</p>
                    {commits.map((c, i) => (
                      <div key={i} className="pl-2 border-l border-white/10 py-0.5 hover:bg-white/[0.01]">
                        <div className="flex justify-between items-center text-[10px]">
                          <span className="text-yellow-400 font-bold hover:underline">
                            <a href={c.url} target="_blank" rel="noopener noreferrer">{c.sha}</a>
                          </span>
                          <span className="text-white/40">{c.date}</span>
                        </div>
                        <p className="text-white/80">{c.message}</p>
                        <p className="text-pink-500 text-[10px]">repo: {c.repo}</p>
                      </div>
                    ))}
                  </div>
                )
              }
            ]);
          } else {
            throw new Error('Invalid structure');
          }
        } catch {
          setLogs(prev => [
            ...prev,
            { type: 'error', text: 'Error: Failed to reach GitHub API stream.' }
          ]);
        }
        break;

      case 'visitor':
        try {
          const res = await fetch('/api/visitors');
          const stats = await res.json();
          
          if (stats && typeof stats.uniqueVisitors === 'number') {
            setLogs(prev => [
              ...prev,
              {
                type: 'output',
                text: (
                  <div className="py-1 text-[10px] sm:text-xs font-mono text-white/90">
                    <pre className="text-emerald-400 leading-none overflow-x-auto">
{`   ┌──────────────────────────────────────────────┐
   │             VISITOR STATISTICS               │
   ├──────────────────────┬───────────────────────┤
   │ Unique Visitors      │ ${stats.uniqueVisitors.toLocaleString().padEnd(21)} │
   ├──────────────────────┼───────────────────────┤
   │ Active Today         │ ${stats.todayVisitors.toLocaleString().padEnd(21)} │
   ├──────────────────────┼───────────────────────┤
   │ Total Page Views     │ ${stats.totalVisits.toLocaleString().padEnd(21)} │
   └──────────────────────┴───────────────────────┘`}
                    </pre>
                  </div>
                )
              }
            ]);
          } else {
            throw new Error('Invalid structure');
          }
        } catch {
          setLogs(prev => [
            ...prev,
            { type: 'error', text: 'Error: Failed to query Upstash stats.' }
          ]);
        }
        break;

      case 'neofetch': {
        const todayStr = new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        });
        setLogs(prev => [
          ...prev,
          {
            type: 'output',
            text: (
              <div className="flex flex-col sm:flex-row gap-4 py-1 text-xs font-mono">
                <pre className={`${activeTheme.primaryColor} leading-3 select-none text-[10px] sm:text-xs`}>
{`        .---.
       /     \\
       \\_.._/
       /  o o \\
      (   "   )
       \\  _  /
        \\___/`}
                </pre>
                <div className="space-y-0.5 text-white/80">
                  <p><span className={`${activeTheme.accentColor} font-bold`}>OS:</span> RameshwarOS v1.0.0</p>
                  <p><span className={`${activeTheme.accentColor} font-bold`}>Host:</span> Rameshwar Portfolio Web Application</p>
                  <p><span className={`${activeTheme.accentColor} font-bold`}>Kernel:</span> React 19.2 + Next.js 16.1 (Turbopack)</p>
                  <p><span className={`${activeTheme.accentColor} font-bold`}>Shell:</span> zsh-sandbox (TerminalSandbox)</p>
                  <p><span className={`${activeTheme.accentColor} font-bold`}>Uptime:</span> 100% (Loaded {todayStr})</p>
                  <p><span className={`${activeTheme.accentColor} font-bold`}>Location:</span> Yeola, Maharashtra, India</p>
                  <p><span className={`${activeTheme.accentColor} font-bold`}>CPU:</span> Javascript V8 Scripting Engine</p>
                  <p><span className={`${activeTheme.accentColor} font-bold`}>Database:</span> Upstash Redis (Serverless)</p>
                </div>
              </div>
            )
          }
        ]);
        break;
      }

      case 'weather':
        setLogs(prev => [
          ...prev,
          {
            type: 'output',
            text: (
              <div className="py-1 text-xs font-mono text-white/70">
                <p className="text-emerald-400 font-bold mb-1">WEATHER REPORT: Yeola, Maharashtra, India</p>
                <pre className="leading-tight text-[11px]">
{`    \\   /      Today:   ☀️  Clear Sky (28°C / 82.4°F)
     .-.       Mon:     🌤️  Light Clouds (29°C)
  ― (   ) ―    Tue:     ☀️  Sunny (31°C)
     \`-\`       Wed:     ⛈️  Scattered Showers (26°C)
    /   \\      Wind:    12 km/h ENE | Humidity: 42%`}
                </pre>
              </div>
            )
          }
        ]);
        break;

      case 'sudo':
      case 'sudo hack':
      case 'sudo clear':
        setLogs(prev => [
          ...prev,
          { type: 'error', text: 'guest is not in the sudoers file. This incident will be reported.' }
        ]);
        break;

      case 'hack': {
        setIsLoading(false); // handle loading manually for animation
        const steps = [
          { text: 'Initializing decryption protocol on port 8080...', type: 'system' as const },
          { text: 'Bypassing security firewall defense matrix...', type: 'system' as const },
          { text: 'Cracking security hash key handshake... [30%]', type: 'system' as const },
          { text: 'Cracking security hash key handshake... [75%]', type: 'system' as const },
          { text: 'Cracking security hash key handshake... [100%] Success!', type: 'system' as const },
          { text: 'Downloading developer records data stream...', type: 'system' as const },
          { text: 'ACCESS CONFIRMED: Profile data unlocked successfully!', type: 'system' as const },
          { 
            text: (
              <pre className="text-[#39d353] font-bold text-[10px] leading-none mt-2 select-none overflow-x-auto">
{` +--------------------------------------------+
 |          [ CREDENTIALS DECRYPTED ]         |
 |   Name   : Rameshwar Bhagwat               |
 |   Role   : Full Stack & AI Developer       |
 |   Skill  : Master of React/Next/TypeScript |
 |   Status : Available for Projects!         |
 +--------------------------------------------+`}
              </pre>
            ), 
            type: 'output' as const 
          }
        ];

        for (let i = 0; i < steps.length; i++) {
          await new Promise(resolve => setTimeout(resolve, i === 0 ? 100 : i === 5 ? 600 : 300));
          setLogs(prev => [...prev, { type: steps[i].type, text: steps[i].text }]);
        }
        break;
      }

      case 'matrix':
        setLogs(prev => [
          ...prev,
          { type: 'system', text: 'Overlay launched: matrix rain running...' }
        ]);
        window.dispatchEvent(new CustomEvent('toggle-matrix-rain', { detail: { active: true } }));
        setIsOpen(false); // Close modal to focus overlay
        break;

      case 'contact':
        navigateToSection('contact', 'CONTACT');
        break;

      default:
        setLogs(prev => [
          ...prev,
          { type: 'error', text: `command not found: ${trimmedCmd}. Type 'help' for suggestions.` }
        ]);
    }

    setIsLoading(false);
  };

  return (
    <>
      {/* Symmetrical Floating Launcher Button (Bottom-Left) */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-[64px] md:left-[80px] z-50 w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-md border border-white/[0.15]"
        style={{
          background: 'rgba(255, 255, 255, 0.08)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
        }}
        whileHover={{ scale: 1.08, borderColor: 'rgba(255, 255, 255, 0.25)' }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: '-50%', y: 20 }}
        animate={{ opacity: isOpen ? 0 : 1, x: '-50%', y: isOpen ? 20 : 0, pointerEvents: isOpen ? 'none' : 'auto' }}
        transition={{ duration: 0.2 }}
        aria-label="Open developer sandbox console"
      >
        <Terminal size={22} className="text-white/80" />
        {/* Pulsing neon color accent ring matching active theme */}
        <motion.span
          className={`absolute inset-0 rounded-full border ${activeTheme.borderColor}`}
          animate={{ scale: [1, 1.4], opacity: [0.4, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.button>

      {/* Floating CLI Overlay Window (iOS Glassmorphism Style) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="terminal-sandbox-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            {/* Backdrop blur click-to-exit */}
            <div
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 z-10"
              style={{
                background: 'rgba(0, 0, 0, 0.45)',
                backdropFilter: 'blur(3px)',
                WebkitBackdropFilter: 'blur(3px)',
              }}
              aria-label="Close console"
            />

            {/* iOS Styled Glassmorphic Terminal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className={`relative z-20 w-full max-w-[620px] h-[550px] max-h-[calc(100vh-120px)] rounded-[24px] overflow-hidden flex flex-col backdrop-blur-xl border ${activeTheme.borderColor} shadow-2xl font-mono text-left select-text cursor-text`}
              style={{
                background: activeTheme.windowBg,
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
              }}
              onClick={focusInput}
            >
              {/* Scanline grid overlay */}
              <div 
                className="absolute inset-0 pointer-events-none z-30 mix-blend-overlay opacity-[0.06]" 
                style={{
                  backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.3) 50%)',
                  backgroundSize: '100% 4px',
                }}
              />

              {/* iOS Styled Top Navigation Bar */}
              <div className="relative z-10 flex items-center justify-between px-5 py-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/[0.1] border border-white/[0.1]">
                    <Terminal size={18} className="text-white/80" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-[15px] tracking-[-0.01em]">Developer Sandbox</h3>
                    <div className="flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${activeTheme.pulseClass}`} />
                      <span className="text-[11px] text-white/40">guest@rameshwarbhagwat.me (theme: {currentTheme})</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] font-medium bg-white/[0.08] rounded-md text-white/30 border border-white/[0.08]">
                    ESC
                  </kbd>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 rounded-full flex items-center justify-center bg-white/[0.06] hover:bg-white/[0.1] transition-colors border border-white/[0.06]"
                    aria-label="Close terminal"
                  >
                    <X size={15} className="text-white/50" />
                  </button>
                </div>
              </div>

              {/* Output Scroll Area */}
              <div 
                className="flex-1 overflow-y-auto p-5 space-y-3.5 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10"
                data-lenis-prevent
              >
                {logs.map((log, index) => (
                  <div key={index} className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap break-all">
                    {log.type === 'input' && (
                      <div className="flex items-start">
                        <span className={`${activeTheme.promptColor} font-bold mr-2 select-none`}>guest@rameshwar.me:~$</span>
                        <span className="text-white font-medium">{log.text}</span>
                      </div>
                    )}
                    {log.type === 'output' && (
                      <div className="text-white/80 pl-2 sm:pl-3">{log.text}</div>
                    )}
                    {log.type === 'error' && (
                      <div className="text-red-500 pl-2 sm:pl-3 font-semibold">{log.text}</div>
                    )}
                    {log.type === 'system' && (
                      <div className="text-[#00f0ff] pl-1 font-semibold">{log.text}</div>
                    )}
                  </div>
                ))}
                
                {isLoading && (
                  <div className="text-[#00f0ff] text-xs sm:text-sm flex items-center gap-2 pl-3">
                    <span className="w-3.5 h-3.5 border-2 border-[#00f0ff]/30 border-t-[#00f0ff] rounded-full animate-spin" />
                    <span>Executing command...</span>
                  </div>
                )}

                <div ref={terminalEndRef} />
              </div>

              {/* Input Panel Prompt */}
              <div className="p-4 bg-white/[0.01] border-t border-white/[0.06]">
                <div className="flex items-center">
                  <span className={`${activeTheme.promptColor} font-bold text-xs sm:text-sm mr-2 select-none`}>guest@rameshwar.me:~$</span>
                  <div className="relative flex-1 flex items-center">
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="w-full bg-transparent border-none outline-none text-white text-xs sm:text-sm font-mono caret-[#39d353] focus:ring-0 p-0"
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck="false"
                      placeholder="Type commands..."
                    />
                    {/* Autocomplete label shadow */}
                    {suggestion && (
                      <span className="absolute left-0 text-white/20 text-xs sm:text-sm pointer-events-none select-none" style={{ left: `${input.length * 8.4}px` }}>
                        {suggestion}
                      </span>
                    )}
                  </div>
                  {/* Keyboard trigger shortcut help */}
                  <span className="text-[10px] text-white/20 hidden xs:inline select-none pl-2">
                    press Tab
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
