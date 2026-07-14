'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X, Sparkles, Command, ShieldAlert, Zap } from 'lucide-react';

interface LogLine {
  type: 'input' | 'output' | 'error' | 'system';
  text: React.ReactNode;
}

type ThemeName = 'matrix' | 'amber' | 'dracula' | 'terminal';

interface ThemeConfig {
  primaryColor: string;
  accentColor: string;
  secondaryColor: string;
  promptColor: string;
  borderColor: string;
  glowColor: string;
  windowBg: string;
  pulseClass: string;
}

const THEME_CONFIGS: Record<ThemeName, ThemeConfig> = {
  matrix: {
    primaryColor: 'text-[#39d353]',
    accentColor: 'text-[#00f0ff]',
    secondaryColor: 'text-white/60',
    promptColor: 'text-[#39d353]',
    borderColor: 'border-[#39d353]/30',
    glowColor: 'rgba(57, 211, 83, 0.4)',
    windowBg: 'rgba(12, 11, 15, 0.88)',
    pulseClass: 'bg-[#39d353]',
  },
  amber: {
    primaryColor: 'text-[#ffb000]',
    accentColor: 'text-[#ffcc00]',
    secondaryColor: 'text-[#ffb000]/60',
    promptColor: 'text-[#ffb000]',
    borderColor: 'border-[#ffb000]/30',
    glowColor: 'rgba(255, 176, 0, 0.4)',
    windowBg: 'rgba(20, 15, 10, 0.90)',
    pulseClass: 'bg-amber-500',
  },
  dracula: {
    primaryColor: 'text-[#ff79c6]',
    accentColor: 'text-[#bd93f9]',
    secondaryColor: 'text-white/60',
    promptColor: 'text-[#50fa7b]',
    borderColor: 'border-[#bd93f9]/30',
    glowColor: 'rgba(189, 147, 249, 0.4)',
    windowBg: 'rgba(18, 16, 26, 0.90)',
    pulseClass: 'bg-pink-500',
  },
  terminal: {
    primaryColor: 'text-white',
    accentColor: 'text-[#00f0ff]',
    secondaryColor: 'text-white/50',
    promptColor: 'text-[#00f0ff]',
    borderColor: 'border-white/20',
    glowColor: 'rgba(255, 255, 255, 0.25)',
    windowBg: 'rgba(15, 14, 18, 0.90)',
    pulseClass: 'bg-blue-500',
  },
};

const QUICK_COMMANDS = ['help', 'hack', 'matrix', 'projects', 'skills', 'about', 'neofetch', 'clear'];

const COMMAND_LIST = [
  'help', 'about', 'skills', 'projects', 'git log', 'visitor', 'matrix', 'clear',
  'theme matrix', 'theme amber', 'theme dracula', 'theme terminal',
  'go hero', 'go about', 'go skills', 'go projects', 'go github', 'go contact',
  'neofetch', 'hack', 'weather', 'sudo', 'quote'
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
  const [isHacking, setIsHacking] = useState(false);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const activeTheme = THEME_CONFIGS[currentTheme];

  // Generate ASCII welcome banner
  const getBanner = useCallback((): React.ReactNode => (
    <div className="space-y-2 select-none">
      <div className={`${activeTheme.primaryColor} font-mono text-[9px] leading-3 sm:text-[11px] sm:leading-4 opacity-95`}>
        <pre className="whitespace-pre overflow-x-auto scrollbar-none font-bold">
          {`██╗  ██╗███████╗███████╗████████╗
██║  ██║██╔════╝██╔════╝╚══██╔══╝
███████║█████╗  █████╗     ██║
██╔══██║██╔══╝  ██╔══╝     ██║
██║  ██║███████╗███████╗   ██║
╚═╝  ╚═╝╚══════╝╚══════╝   ╚═╝`}
        </pre>
      </div>
      <div className="flex items-center gap-2 text-white/50 text-[10px] sm:text-xs font-semibold">
        <span>Heet CLI v2.4</span>
        <span>•</span>
        <span className="text-[#30D158] font-mono">ONLINE</span>
      </div>
    </div>
  ), [activeTheme.primaryColor]);

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
      window.dispatchEvent(new CustomEvent('modal-opened'));
      const originalStyle = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 150);
      return () => {
        document.body.style.overflow = originalStyle;
        window.dispatchEvent(new CustomEvent('modal-closed'));
      };
    }
  }, [isOpen]);

  // Scroll to bottom when logs update
  useEffect(() => {
    if (isOpen) {
      terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs, isOpen]);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  // Autocomplete suggestion logic
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

  const navigateToSection = (sectionId: string, label: string) => {
    setLogs(prev => [
      ...prev,
      { type: 'system', text: `🚀 Navigating to ${label} section...` }
    ]);
    setIsOpen(false);

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

  const executeCommand = async (cmdString: string) => {
    const trimmedCmd = cmdString.trim();
    if (!trimmedCmd || isHacking) return;

    const newLogs = [...logs, { type: 'input' as const, text: trimmedCmd }];
    setLogs(newLogs);
    setInput('');
    setSuggestion('');
    setHistoryIndex(-1);
    setHistory(prev => [...prev.filter(h => h !== trimmedCmd), trimmedCmd]);

    const cmd = trimmedCmd.toLowerCase();

    if (cmd === 'clear') {
      setLogs([]);
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 150));

    if (cmd.startsWith('go ') || cmd.startsWith('go to ')) {
      const target = cmd.replace('go to ', '').replace('go ', '').trim();
      const validSections = ['hero', 'about', 'skills', 'projects', 'github', 'contact'];

      if (validSections.includes(target)) {
        navigateToSection(target, target.toUpperCase());
        setIsLoading(false);
        return;
      }
    }

    const directNavigationCmds: Record<string, string> = {
      hero: 'hero',
      github: 'github',
    };
    if (directNavigationCmds[cmd]) {
      navigateToSection(directNavigationCmds[cmd], cmd.toUpperCase());
      setIsLoading(false);
      return;
    }

    if (cmd.startsWith('theme ')) {
      const themeChoice = cmd.replace('theme ', '').trim() as ThemeName;
      if (THEME_CONFIGS[themeChoice]) {
        setCurrentTheme(themeChoice);
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
              <div className="font-mono text-[11px] sm:text-xs text-white/80 py-1 space-y-2">
                <p className="text-[#30D158] font-bold text-xs uppercase tracking-wider">⚡ AVAILABLE COMMANDS</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-white/70">
                  <div><span className="text-white font-bold inline-block w-20">about</span> <span className="text-white/40">Profile bio & background</span></div>
                  <div><span className="text-white font-bold inline-block w-20">skills</span> <span className="text-white/40">Tech stack & tools</span></div>
                  <div><span className="text-white font-bold inline-block w-20">projects</span> <span className="text-white/40">Featured apps showcase</span></div>
                  <div><span className="text-white font-bold inline-block w-20">git log</span> <span className="text-white/40">Recent commit activity</span></div>
                  <div><span className="text-white font-bold inline-block w-20">visitor</span> <span className="text-white/40">Live visitor analytics</span></div>
                  <div><span className="text-white font-bold inline-block w-20">neofetch</span> <span className="text-white/40">System info dashboard</span></div>
                  <div><span className="text-[#39d353] font-bold inline-block w-20">hack</span> <span className="text-white/40">Cyberpunk hack simulator</span></div>
                  <div><span className="text-[#00f0ff] font-bold inline-block w-20">matrix</span> <span className="text-white/40">Katakana digital rain</span></div>
                  <div><span className="text-white font-bold inline-block w-20">weather</span> <span className="text-white/40">Anand weather report</span></div>
                  <div><span className="text-white font-bold inline-block w-20">quote</span> <span className="text-white/40">Developer inspiration</span></div>
                  <div><span className="text-white font-bold inline-block w-20">theme</span> <span className="text-white/40">matrix|amber|dracula</span></div>
                  <div><span className="text-white font-bold inline-block w-20">clear</span> <span className="text-white/40">Clear console logs</span></div>
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
                <p><span className="text-[#FF8C00] font-bold">Name:</span> Heet Soni</p>
                <p><span className="text-[#FF8C00] font-bold">Title:</span> Full Stack & AI Developer</p>
                <p><span className="text-[#FF8C00] font-bold">Location:</span> Anand, Gujarat, India (IST)</p>
                <p><span className="text-[#FF8C00] font-bold">Bio:</span> Creative engineer building high-performance web systems and AI integrations.</p>
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
                  <p className={`${activeTheme.accentColor} font-bold`}>Creative Graphics & AI:</p>
                  <p className="pl-3">Three.js, R3F, OpenAI APIs, Vector Embeddings</p>
                </div>
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
                <div className="border-l-2 border-[#FF8C00] pl-2.5">
                  <h4 className="text-white font-bold">1. WebCraft</h4>
                  <p className="text-white/60 text-[11px]">High-performance Next.js site builder with SEO-ready architecture.</p>
                </div>
                <div className="border-l-2 border-[#30D158] pl-2.5">
                  <h4 className="text-white font-bold">2. Safecoast</h4>
                  <p className="text-white/60 text-[11px]">Geospatial risk assessment platform with real-time mapping.</p>
                </div>
                <div className="border-l-2 border-[#0A84FF] pl-2.5">
                  <h4 className="text-white font-bold">3. Devory</h4>
                  <p className="text-white/60 text-[11px]">SaaS workflow task management interface with instant chat.</p>
                </div>
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
                  <div className="space-y-1.5 py-0.5 font-mono text-[11px] max-h-48 overflow-y-auto pr-1">
                    <p className={`${activeTheme.primaryColor} font-bold`}>Latest git commits activity:</p>
                    {commits.map((c, i) => (
                      <div key={i} className="pl-2 border-l border-white/10 py-0.5">
                        <div className="flex justify-between items-center text-[10px]">
                          <span className="text-yellow-400 font-bold hover:underline">
                            <a href={c.url} target="_blank" rel="noopener noreferrer">{c.sha}</a>
                          </span>
                          <span className="text-white/40">{c.date}</span>
                        </div>
                        <p className="text-white/80">{c.message}</p>
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
                <pre className={`${activeTheme.primaryColor} leading-3 select-none text-[10px] sm:text-xs font-bold`}>
                  {`        .---.
       /     \\
       \\_.._/
       /  o o \\
      (   "   )
       \\  _  /
        \\___/`}
                </pre>
                <div className="space-y-0.5 text-white/80">
                  <p><span className={`${activeTheme.accentColor} font-bold`}>OS:</span> HeetOS v2.4 (iOS Hybrid)</p>
                  <p><span className={`${activeTheme.accentColor} font-bold`}>Host:</span> Portfolio Web Console</p>
                  <p><span className={`${activeTheme.accentColor} font-bold`}>Kernel:</span> React 19 + Next.js 16 (Turbopack)</p>
                  <p><span className={`${activeTheme.accentColor} font-bold`}>Shell:</span> zsh-sandbox v2.4</p>
                  <p><span className={`${activeTheme.accentColor} font-bold`}>Uptime:</span> 100% ({todayStr})</p>
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
              <div className="py-1 text-xs font-mono text-white/80">
                <p className="text-emerald-400 font-bold mb-1">WEATHER: Anand, Gujarat, India</p>
                <pre className="leading-tight text-[11px]">
                  {`    \\   /      Today:   ☀️  Clear Sky (28°C / 82.4°F)
     .-.       Mon:     🌤️  Light Clouds (29°C)
  ― (   ) ―    Tue:     ☀️  Sunny (31°C)
     \`-\`       Humidity: 42% | Wind: 12 km/h ENE`}
                </pre>
              </div>
            )
          }
        ]);
        break;

      case 'quote':
        setLogs(prev => [
          ...prev,
          {
            type: 'output',
            text: (
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-xs italic text-white/90 my-1">
                &ldquo;Simplicity is prerequisite for reliability. First, make it work. Then, make it beautiful. Then, make it fast.&rdquo;
                <span className="block text-right font-mono text-[10px] text-[#FF8C00] mt-1 not-italic">&mdash; Edsger W. Dijkstra</span>
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
          { type: 'error', text: '🔒 guest is not in the sudoers file. This incident will be reported to Heet.' }
        ]);
        break;

      // Realistic Cyberpunk Hacking Animation Sequence
      case 'hack': {
        setIsLoading(false);
        setIsHacking(true);

        const hexLines = [
          '0x7F4A9B2C 41 53 43 49 49 20 48 41 43 4B 49 4E 47',
          '0x8E123C0F 53 45 43 55 52 49 54 59 20 42 59 50 41',
          '0x9C8811AA 43 4C 49 45 4E 54 20 4F 56 45 52 52 49',
        ];

        setLogs(prev => [
          ...prev,
          { type: 'system', text: '⚡ INITIALIZING CYBERPUNK DECRYPTION ENGINE...' }
        ]);

        await new Promise(r => setTimeout(r, 200));

        for (const line of hexLines) {
          setLogs(prev => [...prev, { type: 'system', text: <span className="text-[#39d353]/60 text-[10px] font-mono">{line}</span> }]);
          await new Promise(r => setTimeout(r, 120));
        }

        const hackSteps = [
          { text: '🔓 [PASS 1/4] Intercepting SSL handshake token...', type: 'system' as const },
          { text: '🛡️ [PASS 2/4] Bypassing cloud security gatekeeper...', type: 'system' as const },
          { text: '🔑 [PASS 3/4] Decrypting RSA 4096-bit private key...', type: 'system' as const },
          { text: '💾 [PASS 4/4] Extracting developer profile dossier...', type: 'system' as const },
        ];

        for (const step of hackSteps) {
          await new Promise(r => setTimeout(r, 220));
          setLogs(prev => [...prev, { type: step.type, text: step.text }]);
        }

        await new Promise(r => setTimeout(r, 250));

        setLogs(prev => [
          ...prev,
          {
            type: 'output',
            text: (
              <div className="p-3.5 rounded-2xl bg-[#39d353]/[0.06] border border-[#39d353]/30 shadow-[0_0_20px_rgba(57,211,83,0.15)] my-2 font-mono">
                <div className="flex items-center gap-2 text-[#39d353] font-bold text-xs mb-2 border-b border-[#39d353]/20 pb-1.5">
                  <Zap size={14} className="animate-pulse" />
                  <span>DECRYPTION SUCCESSFUL — ACCESS GRANTED</span>
                </div>
                <div className="space-y-1 text-[11px] sm:text-xs text-white/90">
                  <p><span className="text-[#39d353] font-bold">NAME:</span> Heet Soni</p>
                  <p><span className="text-[#39d353] font-bold">ROLE:</span> Full Stack & AI Developer</p>
                  <p><span className="text-[#39d353] font-bold">SPECIALTY:</span> React 19 • Next.js 16 • TypeScript • AI Systems</p>
                  <p><span className="text-[#39d353] font-bold">STATUS:</span> Open for Software Engineering Roles & Freelance!</p>
                </div>
              </div>
            )
          }
        ]);

        setIsHacking(false);
        break;
      }

      // Matrix Digital Rain Splash & Canvas Overlay
      case 'matrix':
        setLogs(prev => [
          ...prev,
          {
            type: 'output',
            text: (
              <div className="p-3 rounded-2xl bg-[#39d353]/[0.08] border border-[#39d353]/30 text-xs font-mono text-[#39d353] my-1 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles size={14} className="animate-spin" />
                  <span className="font-bold">MATRIX KATAKANA RAIN PROTOCOL ENGAGED</span>
                </div>
                <span className="text-[10px] text-white/40">Press ESC to exit</span>
              </div>
            )
          }
        ]);
        window.dispatchEvent(new CustomEvent('toggle-matrix-rain', { detail: { active: true } }));
        setIsOpen(false);
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
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.25), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
        }}
        whileHover={{ scale: 1.08, borderColor: 'rgba(255, 255, 255, 0.3)' }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: '-50%', y: 20 }}
        animate={{ opacity: isOpen ? 0 : 1, x: '-50%', y: isOpen ? 20 : 0, pointerEvents: isOpen ? 'none' : 'auto' }}
        transition={{ duration: 0.2 }}
        aria-label="Open developer sandbox console"
      >
        <Terminal size={22} className="text-white/80" />
        <motion.span
          className={`absolute inset-0 rounded-full border ${activeTheme.borderColor}`}
          animate={{ scale: [1, 1.4], opacity: [0.4, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.button>

      {/* Floating CLI Overlay Window (iOS 18 Glassmorphism Style) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="terminal-sandbox-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5"
          >
            {/* Backdrop blur click-to-exit */}
            <div
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 z-10"
              style={{
                background: 'rgba(0, 0, 0, 0.55)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
              }}
              aria-label="Close console"
            />

            {/* iOS 18 Glassmorphic Terminal Card Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className={`relative z-20 w-full max-w-[650px] h-[560px] max-h-[calc(100vh-80px)] rounded-[32px] overflow-hidden flex flex-col backdrop-blur-2xl border ${activeTheme.borderColor} shadow-[0_32px_90px_rgba(0,0,0,0.85)] font-mono text-left select-text cursor-text`}
              style={{
                background: activeTheme.windowBg,
                boxShadow: '0 32px 80px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
              }}
              onClick={focusInput}
            >
              {/* Scanline grid overlay */}
              <div
                className="absolute inset-0 pointer-events-none z-30 mix-blend-overlay opacity-[0.04]"
                style={{
                  backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.3) 50%)',
                  backgroundSize: '100% 4px',
                }}
              />

              {/* iOS Styled Top Navigation Bar */}
              <div className="relative z-10 flex items-center justify-between px-5 py-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-3">
                  {/* iOS Window Controls (Red, Yellow, Green Window Dots) */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] hover:opacity-80 transition-opacity flex items-center justify-center group"
                      aria-label="Close modal"
                    >
                      <X size={8} className="text-black opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                    <span className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] opacity-90" />
                    <span className="w-3.5 h-3.5 rounded-full bg-[#27C93F] opacity-90" />
                  </div>
                  <div className="h-4 w-[1px] bg-white/10" />
                  <div className="flex items-center gap-2">
                    <Terminal size={15} className="text-white/70" />
                    <span className="font-bold text-white text-xs sm:text-sm tracking-tight font-jakarta">Sandbox Terminal</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/10 text-white/50">
                    theme: {currentTheme}
                  </span>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-7 h-7 rounded-full flex items-center justify-center bg-white/[0.06] hover:bg-white/[0.12] transition-colors border border-white/[0.08]"
                    aria-label="Close terminal"
                  >
                    <X size={14} className="text-white/60" />
                  </button>
                </div>
              </div>

              {/* Quick Tap Command Chips (Tap to Run) */}
              <div className="px-5 py-2.5 border-b border-white/[0.06] bg-white/[0.01] flex items-center gap-1.5 overflow-x-auto scrollbar-none z-10">
                <span className="text-[9px] font-mono text-white/30 uppercase tracking-wider flex-shrink-0 mr-1">Tap:</span>
                {QUICK_COMMANDS.map((qCmd) => (
                  <button
                    key={qCmd}
                    onClick={() => executeCommand(qCmd)}
                    disabled={isHacking}
                    className="px-2.5 py-1 rounded-lg border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/[0.16] text-[10px] font-mono text-white/70 hover:text-white transition-all flex-shrink-0 active:scale-95 cursor-pointer disabled:opacity-50"
                  >
                    {qCmd}
                  </button>
                ))}
              </div>

              {/* Output Scroll Area */}
              <div
                className="flex-1 overflow-y-auto p-5 space-y-3 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10"
                data-lenis-prevent
              >
                {logs.map((log, index) => (
                  <div key={index} className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap break-all">
                    {log.type === 'input' && (
                      <div className="flex items-start">
                        <span className={`${activeTheme.promptColor} font-bold mr-2 select-none`}>guest@heet.me:~$</span>
                        <span className="text-white font-medium">{log.text}</span>
                      </div>
                    )}
                    {log.type === 'output' && (
                      <div className="text-white/80 pl-2 sm:pl-3">{log.text}</div>
                    )}
                    {log.type === 'error' && (
                      <div className="text-[#FF453A] pl-2 sm:pl-3 font-semibold">{log.text}</div>
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
              <div className="p-4 bg-white/[0.02] border-t border-white/[0.08]">
                <div className="flex items-center">
                  <span className={`${activeTheme.promptColor} font-bold text-xs sm:text-sm mr-2 select-none`}>guest@heet.me:~$</span>
                  <div className="relative flex-1 flex items-center">
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      disabled={isHacking}
                      className="w-full bg-transparent border-none outline-none text-white text-xs sm:text-sm font-mono caret-[#39d353] focus:ring-0 p-0 disabled:opacity-50"
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck="false"
                      placeholder={isHacking ? "Hacking sequence active..." : "Type commands..."}
                    />
                    {suggestion && (
                      <span className="absolute left-0 text-white/20 text-xs sm:text-sm pointer-events-none select-none" style={{ left: `${input.length * 8.4}px` }}>
                        {suggestion}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-white/30 hidden xs:inline select-none pl-2">
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
