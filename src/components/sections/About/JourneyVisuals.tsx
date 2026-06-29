'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Cpu, Activity, Globe, Server, Network, Database } from 'lucide-react';

interface JourneyVisualsProps {
  activeIdx: number;
}

export default function JourneyVisuals({ activeIdx }: JourneyVisualsProps) {
  // Custom years mapping to sync the HUD header
  const years = ['2022', '2024', '2025', '2026', '2027'];
  const titles = ['CURIOSITY', 'FOUNDATION', 'PRODUCT', 'INTEGRATION', 'SCALING'];

  // Render the appropriate schematic based on active index
  const renderSchematic = () => {
    switch (activeIdx) {
      case 0:
        return <CuriositySchematic />;
      case 1:
        return <FoundationSchematic />;
      case 2:
        return <ProductSchematic />;
      case 3:
        return <AISchematic />;
      case 4:
        return <ScalingSchematic />;
      default:
        return <CuriositySchematic />;
    }
  };

  return (
    <div className="relative w-full max-w-md h-[340px] xs:h-[380px] sm:h-[400px] lg:h-[440px] bg-[#0A0A0A]/85 backdrop-blur-md border border-white/[0.08] rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col group transition-all duration-500 hover:border-cyan-500/20">
      
      {/* ─── Grid Backdrop Overlay ─── */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03] select-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}
      />

      {/* ─── Sci-Fi HUD Corner Brackets ─── */}
      <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-cyan-500/40 rounded-tl-sm pointer-events-none group-hover:border-cyan-500/80 transition-colors" />
      <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-cyan-500/40 rounded-tr-sm pointer-events-none group-hover:border-cyan-500/80 transition-colors" />
      <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-cyan-500/40 rounded-bl-sm pointer-events-none group-hover:border-cyan-500/80 transition-colors" />
      <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-cyan-500/40 rounded-br-sm pointer-events-none group-hover:border-cyan-500/80 transition-colors" />

      {/* ─── HUD Status Bar ─── */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06] bg-white/[0.01] select-none">
        <div className="flex items-center gap-2">
          {/* Diagnostic status dot */}
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span className="text-[9px] xs:text-[10px] font-mono tracking-[0.15em] text-white/40">
            DIAG.SYS: ACTIVE
          </span>
        </div>
        <div className="text-right flex items-center gap-2 font-mono text-[9px] xs:text-[10px] text-cyan-400/80">
          <span className="tracking-[0.1em]">{titles[activeIdx]}</span>
          <span className="text-white/20">|</span>
          <span className="font-bold tracking-widest bg-cyan-950/40 px-1.5 py-0.5 rounded border border-cyan-500/10">
            {years[activeIdx]}
          </span>
        </div>
      </div>

      {/* ─── Core Schematic Display Space ─── */}
      <div className="flex-1 w-full flex items-center justify-center p-6 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full flex items-center justify-center"
          >
            {renderSchematic()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ─── HUD Footer Diagnostic Readout ─── */}
      <div className="px-4 py-2 border-t border-white/[0.04] bg-white/[0.01] flex items-center justify-between text-[8px] xs:text-[9px] font-mono text-white/30 select-none">
        <div className="flex gap-3">
          <span>LATENCY: 14ms</span>
          <span>FPS: 60</span>
        </div>
        <div>
          <span>LOC: [MH_IN]</span>
        </div>
      </div>
    </div>
  );
}

// ─── 2022 Curiosity Schematic (Code Editor Blueprint) ───
function CuriositySchematic() {
  return (
    <div className="w-full h-full flex flex-col justify-between font-mono text-white/60">
      {/* Code Editor Header */}
      <div className="w-full bg-white/[0.02] border border-white/[0.08] rounded-lg p-3 xs:p-4 flex-1 flex flex-col justify-between relative overflow-hidden">
        <div className="absolute top-2 right-2 opacity-10">
          <Terminal size={40} className="text-orange-500" />
        </div>
        <div className="flex items-center gap-1.5 border-b border-white/[0.06] pb-2 mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-red-500/60" />
          <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/60" />
          <div className="w-1.5 h-1.5 rounded-full bg-green-500/60" />
          <span className="text-[9px] text-white/30 ml-2">index.js</span>
        </div>

        {/* Mock typing lines */}
        <div className="text-[10px] xs:text-[11px] leading-relaxed flex-1 flex flex-col justify-center space-y-1.5">
          <div>
            <span className="text-orange-400">const</span> <span className="text-blue-400">curiosity</span> = <span className="text-green-400">true</span>;
          </div>
          <div>
            <span className="text-orange-400">let</span> <span className="text-blue-400">skills</span> = [<span className="text-green-300">&apos;html&apos;</span>, <span className="text-green-300">&apos;css&apos;</span>, <span className="text-green-300">&apos;js&apos;</span>];
          </div>
          <div>
            <span className="text-purple-400">function</span> <span className="text-yellow-400">startJourney</span>() &#123;
          </div>
          <div className="pl-4">
            <span className="text-orange-400">return</span> <span className="text-yellow-400">learn</span>(<span className="text-blue-400">skills</span>);
          </div>
          <div>&#125;</div>
          <div className="flex items-center gap-0.5">
            <span className="text-yellow-400">startJourney</span>();
            <motion.span 
              className="inline-block w-1.5 h-3 bg-orange-400" 
              animate={{ opacity: [1, 0, 1] }} 
              transition={{ repeat: Infinity, duration: 0.8 }} 
            />
          </div>
        </div>

        {/* Bottom stats floating details */}
        <div className="flex justify-between items-center text-[8px] text-white/20 border-t border-white/[0.04] pt-2 mt-2">
          <span>LINE: 6 COL: 12</span>
          <span>UTF-8</span>
        </div>
      </div>
    </div>
  );
}

// ─── 2024 Foundation Schematic (Algorithms & Data Structures) ───
function FoundationSchematic() {
  return (
    <div className="w-full h-full flex flex-col justify-between">
      {/* Split Console Grid */}
      <div className="flex-1 w-full flex flex-row items-center justify-between gap-3 min-h-[180px] xs:min-h-[220px]">
        
        {/* Left Side: Binary Search Logger Terminal */}
        <div className="w-[45%] h-full bg-[#0A0A0A] border border-white/[0.06] rounded-lg p-2.5 flex flex-col justify-between relative overflow-hidden font-mono shadow-inner select-none">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-1.5 mb-1.5 text-[7px] text-white/30">
            <span className="flex items-center gap-1"><Cpu size={8} className="text-green-500" /> binary-search.cpp</span>
            <span className="animate-pulse bg-green-500/20 text-green-400 px-1 py-0.2 rounded border border-green-500/30 font-bold text-[6px]">COMPILING</span>
          </div>

          {/* Terminal Output Logs */}
          <div className="flex-1 flex flex-col justify-start space-y-1 text-[7px] text-green-300/80 leading-normal">
            <div className="flex items-center gap-0.5 text-white/50">
              <span>$</span> 
              <span className="text-white/80">./binary_search --target=35</span>
            </div>
            <div className="text-white/20 text-[6px] tracking-widest font-mono">[████████████░░] 88%</div>
            <div className="text-green-400/90 font-semibold">[ds] BST root node initialized</div>
            <div className="text-white/30 border-b border-white/[0.04] my-0.5" />
            <div>Compare: target(35) &lt; root(100)</div>
            <div className="text-green-400/60 font-medium">➔ Left search: node(60)</div>
            <div>Compare: target(35) &lt; node(60)</div>
            <div className="text-green-400/60 font-medium">➔ Left search: node(35)</div>
            <div className="text-green-400 font-bold animate-pulse">MATCH FOUND: [O(log N)]</div>
            <div className="text-green-400/85 font-mono">Steps: 3 | Node: 0x7F81</div>
            <div className="text-green-400 font-extrabold flex items-center gap-0.5 mt-0.5">
              <span>➔ EXIT_SUCCESS</span>
              <motion.span 
                className="inline-block w-1 h-2 bg-green-400" 
                animate={{ opacity: [1, 0, 1] }} 
                transition={{ repeat: Infinity, duration: 0.8 }} 
              />
            </div>
          </div>
        </div>

        {/* Right Side: Binary Tree Traversal SVG */}
        <div className="w-[55%] h-full relative flex items-center justify-center bg-white/[0.01] border border-white/[0.04] rounded-lg p-2 overflow-hidden">
          {/* Subtle diagnostic grids */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[radial-gradient(#30D158_1px,transparent_1px)] [background-size:8px_8px]" />
          
          <svg viewBox="0 0 140 140" className="w-full h-full overflow-visible">
            <defs>
              <filter id="glowGreen" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Inactive Tree connections */}
            <line x1="70" y1="25" x2="105" y2="55" stroke="#30D158" strokeWidth={0.8} strokeDasharray="2 2" opacity={0.2} />
            <line x1="105" y1="55" x2="88" y2="85" stroke="#30D158" strokeWidth={0.8} strokeDasharray="2 2" opacity={0.2} />
            <line x1="105" y1="55" x2="122" y2="85" stroke="#30D158" strokeWidth={0.8} strokeDasharray="2 2" opacity={0.2} />
            <line x1="35" y1="55" x2="52" y2="85" stroke="#30D158" strokeWidth={0.8} strokeDasharray="2 2" opacity={0.2} />

            {/* Active Tree connections (Glowing solid path) */}
            <motion.line 
              x1="70" y1="25" x2="35" y2="55" 
              stroke="#30D158" strokeWidth={1.5} 
              filter="url(#glowGreen)"
              initial={{ strokeDasharray: "40", strokeDashoffset: 40 }}
              animate={{ strokeDashoffset: [40, 0, 40] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.line 
              x1="35" y1="55" x2="18" y2="85" 
              stroke="#30D158" strokeWidth={1.5} 
              filter="url(#glowGreen)"
              initial={{ strokeDasharray: "40", strokeDashoffset: 40 }}
              animate={{ strokeDashoffset: [40, 40, 0, 40] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Inactive Nodes (Muted Green) */}
            <circle cx="105" cy="55" r="7.5" fill="#0A0A0A" stroke="#30D158" strokeWidth={1} opacity={0.25} />
            <text x="105" y="57.5" fill="#30D158" fontSize="5.5" fontFamily="monospace" textAnchor="middle" opacity={0.3}>140</text>

            <circle cx="88" cy="85" r="7.5" fill="#0A0A0A" stroke="#30D158" strokeWidth={1} opacity={0.25} />
            <text x="88" y="87.5" fill="#30D158" fontSize="5.5" fontFamily="monospace" textAnchor="middle" opacity={0.3}>120</text>

            <circle cx="122" cy="85" r="7.5" fill="#0A0A0A" stroke="#30D158" strokeWidth={1} opacity={0.25} />
            <text x="122" y="87.5" fill="#30D158" fontSize="5.5" fontFamily="monospace" textAnchor="middle" opacity={0.3}>180</text>

            <circle cx="52" cy="85" r="7.5" fill="#0A0A0A" stroke="#30D158" strokeWidth={1} opacity={0.25} />
            <text x="52" y="87.5" fill="#30D158" fontSize="5.5" fontFamily="monospace" textAnchor="middle" opacity={0.3}>85</text>

            {/* Active Nodes (Bright Glowing Green) */}
            {/* Root (100) */}
            <circle cx="70" cy="25" r="8" fill="#0A0A0A" stroke="#30D158" strokeWidth={1.5} filter="url(#glowGreen)" />
            <text x="70" y="27.5" fill="#30D158" fontSize="6" fontWeight="bold" fontFamily="monospace" textAnchor="middle">100</text>

            {/* Mid (60) */}
            <circle cx="35" cy="55" r="8" fill="#0A0A0A" stroke="#30D158" strokeWidth={1.5} filter="url(#glowGreen)" />
            <text x="35" y="57.5" fill="#30D158" fontSize="6" fontWeight="bold" fontFamily="monospace" textAnchor="middle">60</text>

            {/* Target Found (35) */}
            <motion.circle 
              cx="18" cy="85" r="8" fill="#0A0A0A" stroke="#30D158" strokeWidth={1.5} filter="url(#glowGreen)"
              animate={{ strokeWidth: [1.5, 2.5, 1.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            {/* Concentric radar locator circle pulsing around node 35 */}
            <motion.circle
              cx="18"
              cy="85"
              r="12"
              fill="none"
              stroke="#30D158"
              strokeWidth={0.5}
              animate={{ scale: [0.8, 1.4, 0.8], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            />
            <text x="18" y="87.5" fill="#30D158" fontSize="6" fontWeight="bold" fontFamily="monospace" textAnchor="middle">35</text>

            {/* Traversal pointer path indicator */}
            <motion.circle
              cx="70"
              cy="25"
              r="3.5"
              fill="#FFFFFF"
              style={{ filter: 'drop-shadow(0 0 3px #30D158)' }}
              animate={{
                cx: [70, 35, 18, 18, 70],
                cy: [25, 55, 85, 85, 25],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Bottom Sorted 1D Array visualization */}
            <g transform="translate(22, 108)">
              {/* Array box */}
              <rect x="0" y="0" width="96" height="14" fill="#0A0A0A" stroke="#30D158" strokeWidth={0.8} rx="1.5" opacity={0.6} />
              
              {/* Vertical Dividers */}
              {[12, 24, 36, 48, 60, 72, 84].map((x) => (
                <line key={x} x1={x} y1="0" x2={x} y2="14" stroke="#30D158" strokeWidth={0.6} opacity={0.4} />
              ))}

              {/* Elements: 15, 35, 60, 85, 100, 120, 140, 180 */}
              {[
                { val: 15, x: 6, act: false },
                { val: 35, x: 18, act: true },
                { val: 60, x: 30, act: true },
                { val: 85, x: 42, act: false },
                { val: 100, x: 54, act: true },
                { val: 120, x: 66, act: false },
                { val: 140, x: 78, act: false },
                { val: 180, x: 90, act: false },
              ].map((el, i) => (
                <text 
                  key={i} 
                  x={el.x} 
                  y="9" 
                  fill="#30D158" 
                  fontSize="5" 
                  fontFamily="monospace" 
                  textAnchor="middle"
                  opacity={el.act ? 1 : 0.25}
                  fontWeight={el.act ? "bold" : "normal"}
                >
                  {el.val}
                </text>
              ))}

              {/* Array Index Labels */}
              <text x="6" y="20" fill="#30D158" fontSize="3.5" fontFamily="monospace" textAnchor="middle" opacity={0.2}>0</text>
              <text x="18" y="20" fill="#30D158" fontSize="3.5" fontFamily="monospace" textAnchor="middle" opacity={0.2}>1</text>
              <text x="30" y="20" fill="#30D158" fontSize="3.5" fontFamily="monospace" textAnchor="middle" opacity={0.2}>2</text>
              <text x="54" y="20" fill="#30D158" fontSize="3.5" fontFamily="monospace" textAnchor="middle" opacity={0.2}>4</text>

              {/* Animating Array Cursor Box */}
              <motion.rect
                x={48}
                y={0}
                width={12}
                height={14}
                fill="none"
                stroke="#FFFFFF"
                strokeWidth={1}
                style={{ filter: 'drop-shadow(0 0 2px #30D158)' }}
                animate={{
                  x: [48, 24, 12, 12, 48],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </g>
          </svg>
        </div>
      </div>

      {/* Infrastructure Diagnostic Readout details */}
      <div className="w-full font-mono text-[8px] xs:text-[9px] text-white/30 flex items-center justify-between border-t border-white/[0.05] pt-2">
        <div className="flex items-center gap-1.5">
          <Cpu size={11} className="text-green-500" />
          <span>RECURSION: ACTIVE [O(log N)]</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Terminal size={11} className="text-green-500" />
          <span>PTR_MAP: STABLE (0x7F81)</span>
        </div>
      </div>
    </div>
  );
}

// ─── 2025 Product Builder Schematic (SaaS Microservice Flow) ───
function ProductSchematic() {
  return (
    <div className="w-full h-full flex flex-col justify-between">
      {/* Split Console Grid */}
      <div className="flex-1 w-full flex flex-row items-center justify-between gap-3 min-h-[180px] xs:min-h-[220px]">
        
        {/* Left Side: Server HTTP Logs Terminal */}
        <div className="w-[45%] h-full bg-[#0A0A0A] border border-white/[0.06] rounded-lg p-2.5 flex flex-col justify-between relative overflow-hidden font-mono shadow-inner select-none">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-1.5 mb-1.5 text-[7px] text-white/30">
            <span className="flex items-center gap-1"><Activity size={8} className="text-orange-500" /> gateway.log</span>
            <span className="animate-pulse bg-orange-500/20 text-orange-400 px-1 py-0.2 rounded border border-orange-500/30 font-bold text-[6px]">LISTENING</span>
          </div>

          {/* Terminal Output Logs */}
          <div className="flex-1 flex flex-col justify-start space-y-1 text-[7px] text-orange-300/80 leading-normal">
            <div className="flex items-center gap-0.5 text-white/50">
              <span>$</span> 
              <span className="text-white/80">tail -f api_gateway.log</span>
            </div>
            <div className="text-orange-400/90 font-semibold">[auth] POST /api/v1/auth/verify (200 OK)</div>
            <div className="text-orange-300/50">➔ JWT check: valid (sub=user_421)</div>
            <div className="text-white/30 border-b border-white/[0.04] my-0.5" />
            <div className="text-orange-400/90 font-semibold">[http] GET /api/v1/ideas/list</div>
            <div className="text-green-400">➔ Cache hit: redis:ideas_key (2ms)</div>
            <div className="text-orange-400/90 font-semibold">[http] POST /api/v1/ideas/create</div>
            <div className="text-orange-300/60 font-medium">➔ db_write: sql_db.ideas (12ms)</div>
            <div className="text-purple-400">➔ worker: notify_subscribers [queued]</div>
            <div className="text-green-400 font-bold animate-pulse">HTTP 201 CREATED [14ms]</div>
            <div className="text-green-400 font-extrabold flex items-center gap-0.5 mt-0.5">
              <span>➔ SERVER ONLINE</span>
              <motion.span 
                className="inline-block w-1 h-2 bg-green-400" 
                animate={{ opacity: [1, 0, 1] }} 
                transition={{ repeat: Infinity, duration: 0.8 }} 
              />
            </div>
          </div>
        </div>

        {/* Right Side: Visual Flow Graph */}
        <div className="w-[55%] h-full relative flex items-center justify-center bg-white/[0.01] border border-white/[0.04] rounded-lg p-2 overflow-hidden">
          {/* Diagnostic grid overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[radial-gradient(#FF9F0A_1px,transparent_1px)] [background-size:8px_8px]" />

          <svg viewBox="0 0 140 140" className="w-full h-full overflow-visible">
            <defs>
              <filter id="glowOrange" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Circuit Traces (Orthogonal Connection lines) */}
            {/* Client to Gateway */}
            <path d="M 30,62 L 48,62" fill="none" stroke="#FF9F0A" strokeWidth={1} strokeLinecap="round" opacity={0.4} />
            
            {/* Gateway to Auth */}
            <path d="M 61,50 L 61,30" fill="none" stroke="#FF9F0A" strokeWidth={1} strokeLinecap="round" opacity={0.4} />

            {/* Gateway to Redis */}
            <path d="M 74,58 L 90,58 L 90,29 L 105,29" fill="none" stroke="#FF9F0A" strokeWidth={1} strokeLinecap="round" opacity={0.4} />

            {/* Gateway to SQL DB */}
            <path d="M 74,66 L 90,66 L 90,90 L 105,90" fill="none" stroke="#FF9F0A" strokeWidth={1} strokeLinecap="round" opacity={0.4} />

            {/* SQL DB to Worker */}
            <path d="M 117,102 L 117,112" fill="none" stroke="#FF9F0A" strokeWidth={1} strokeLinecap="round" opacity={0.4} />

            {/* 1. Client Browser Frame */}
            <g>
              <rect x="4" y="52" width="26" height="20" rx="1.5" fill="#0A0A0A" stroke="#FF9F0A" strokeWidth={1} filter="url(#glowOrange)" />
              <line x1="4" y1="56" x2="30" y2="56" stroke="#FF9F0A" strokeWidth={0.8} opacity={0.7} />
              <circle cx="7" cy="54" r="0.8" fill="#FF453A" />
              <circle cx="9.5" cy="54" r="0.8" fill="#FF9F0A" />
              <circle cx="12" cy="54" r="0.8" fill="#30D158" />
              <text x="17" y="65" fill="#FF9F0A" fontSize="4.5" fontWeight="bold" fontFamily="monospace" textAnchor="middle">APP</text>
              {/* Dynamic waveform in dashboard */}
              <path d="M 6,68 L 10,64 L 14,67 L 18,62 L 22,66 L 26,61" fill="none" stroke="#FF9F0A" strokeWidth={0.6} opacity={0.5} />
            </g>

            {/* 2. Authentication Service */}
            <g>
              <rect x="48" y="12" width="26" height="18" rx="1.5" fill="#0A0A0A" stroke="#FF9F0A" strokeWidth={1} />
              <text x="61" y="20" fill="#FF9F0A" fontSize="4" fontWeight="bold" fontFamily="monospace" textAnchor="middle">AUTH</text>
              {/* Shield lock path */}
              <path d="M 57,23 L 61,21 L 65,23 L 65,25 Q 61,28 57,25 Z" fill="none" stroke="#FF9F0A" strokeWidth={0.8} />
            </g>

            {/* 3. API Gateway (Hexagon) */}
            <g>
              <polygon points="51,55 71,55 76,62 71,69 51,69 46,62" fill="#0A0A0A" stroke="#FF9F0A" strokeWidth={1} filter="url(#glowOrange)" />
              <text x="61" y="61" fill="#FF9F0A" fontSize="3.5" fontWeight="bold" fontFamily="monospace" textAnchor="middle">API</text>
              <text x="61" y="66" fill="#FF9F0A" fontSize="3.5" fontWeight="bold" fontFamily="monospace" textAnchor="middle">GW</text>
              
              {/* Rotating outer radar overlay */}
              <motion.circle
                cx="61"
                cy="62"
                r="13"
                fill="none"
                stroke="#FF9F0A"
                strokeWidth={0.5}
                strokeDasharray="2 3"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              />
            </g>

            {/* 4. Redis Cache Cylinder */}
            <g transform="translate(105, 18)">
              <ellipse cx="12" cy="3" rx="12" ry="2.5" fill="#0A0A0A" stroke="#FF9F0A" strokeWidth={1} />
              <path d="M 0,3 L 0,15 A 12,2.5 0 0,0 24,15 L 24,3 Z" fill="#0A0A0A" stroke="#FF9F0A" strokeWidth={1} filter="url(#glowOrange)" />
              <ellipse cx="12" cy="15" rx="12" ry="2.5" fill="none" stroke="#FF9F0A" strokeWidth={1} />
              <path d="M 0,7 A 12,2.5 0 0,0 24,7" fill="none" stroke="#FF9F0A" strokeWidth={0.6} strokeDasharray="1 1" opacity={0.6} />
              <path d="M 0,11 A 12,2.5 0 0,0 24,11" fill="none" stroke="#FF9F0A" strokeWidth={0.6} strokeDasharray="1 1" opacity={0.6} />
              <text x="12" y="11" fill="#FF9F0A" fontSize="4.5" fontWeight="bold" fontFamily="monospace" textAnchor="middle">REDIS</text>
            </g>

            {/* 5. SQL DB Server Stack */}
            <g transform="translate(105, 78)">
              <rect x="0" y="0" width="24" height="24" rx="1.5" fill="#0A0A0A" stroke="#FF9F0A" strokeWidth={1} filter="url(#glowOrange)" />
              <line x1="0" y1="8" x2="24" y2="8" stroke="#FF9F0A" strokeWidth={0.8} />
              <line x1="0" y1="16" x2="24" y2="16" stroke="#FF9F0A" strokeWidth={0.8} />
              
              {/* Blinking LEDs */}
              <circle cx="4" cy="4" r="0.8" fill="#30D158" />
              <motion.circle cx="4" cy="4" r="1.2" fill="#30D158" animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1.2, repeat: Infinity }} />
              
              <circle cx="4" cy="12" r="0.8" fill="#30D158" />
              <motion.circle cx="4" cy="12" r="1.2" fill="#30D158" animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }} />
              
              <circle cx="4" cy="20" r="0.8" fill="#30D158" />
              <motion.circle cx="4" cy="20" r="1.2" fill="#30D158" animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }} />

              <text x="14" y="6" fill="#FF9F0A" fontSize="3" fontFamily="monospace" textAnchor="middle" opacity={0.7}>S1</text>
              <text x="14" y="14" fill="#FF9F0A" fontSize="3" fontFamily="monospace" textAnchor="middle" opacity={0.7}>S2</text>
              <text x="14" y="22" fill="#FF9F0A" fontSize="3.5" fontWeight="bold" fontFamily="monospace" textAnchor="middle">DB</text>
            </g>

            {/* 6. Background Worker */}
            <g transform="translate(105, 112)">
              <rect x="0" y="0" width="24" height="16" rx="1.5" fill="#0A0A0A" stroke="#FF9F0A" strokeWidth={1} />
              {/* Rotating Cog */}
              <motion.circle
                cx="6"
                cy="8"
                r="3"
                fill="none"
                stroke="#FF9F0A"
                strokeWidth={0.8}
                strokeDasharray="2 1"
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              />
              <text x="16" y="11" fill="#FF9F0A" fontSize="3" fontFamily="monospace" textAnchor="middle">WRKR</text>
            </g>

            {/* Animating Data Particles over Circuit Traces */}
            {/* Packet 1: Client to Gateway (JWT Request) */}
            <motion.circle
              cx="30"
              cy="62"
              r="1.8"
              fill="#FFFFFF"
              style={{ filter: 'drop-shadow(0 0 2.5px #FF9F0A)' }}
              animate={{ cx: [30, 48] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeOut' }}
            />

            {/* Packet 2: Gateway to Auth Verification */}
            <motion.circle
              cx="61"
              cy="50"
              r="1.5"
              fill="#FFFFFF"
              style={{ filter: 'drop-shadow(0 0 2.5px #FF9F0A)' }}
              animate={{ cy: [50, 30] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: 0.3, ease: 'easeInOut' }}
            />

            {/* Packet 3: Gateway to Redis (Cache Read) */}
            <motion.circle
              cx="74"
              cy="58"
              r="1.5"
              fill="#FFFFFF"
              style={{ filter: 'drop-shadow(0 0 2.5px #FF9F0A)' }}
              animate={{
                cx: [74, 90, 90, 105],
                cy: [58, 58, 29, 29]
              }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.6, ease: 'linear' }}
            />

            {/* Packet 4: Gateway to SQL DB (Database Write) */}
            <motion.circle
              cx="74"
              cy="66"
              r="1.5"
              fill="#FFFFFF"
              style={{ filter: 'drop-shadow(0 0 2.5px #FF9F0A)' }}
              animate={{
                cx: [74, 90, 90, 105],
                cy: [66, 66, 90, 90]
              }}
              transition={{ duration: 1.6, repeat: Infinity, delay: 1.0, ease: 'linear' }}
            />

            {/* Packet 5: SQL DB to Background Worker */}
            <motion.circle
              cx="117"
              cy="102"
              r="1.5"
              fill="#FFFFFF"
              style={{ filter: 'drop-shadow(0 0 2.5px #FF9F0A)' }}
              animate={{ cy: [102, 112] }}
              transition={{ duration: 0.7, repeat: Infinity, delay: 1.4, ease: 'easeIn' }}
            />
          </svg>
        </div>
      </div>

      {/* Infrastructure Diagnostic Readout details */}
      <div className="w-full font-mono text-[8px] xs:text-[9px] text-white/30 flex items-center justify-between border-t border-white/[0.05] pt-2">
        <div className="flex items-center gap-1.5">
          <Database size={11} className="text-orange-500" />
          <span>SaaS ENDPOINTS: ACTIVE</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Activity size={11} className="text-orange-500" />
          <span>THROUGHPUT: 1.4K/S [99.98%]</span>
        </div>
      </div>
    </div>
  );
}


// ─── 2026 AI Development Schematic (Neural Network Connectome) ───
// ─── 2026 AI Development Schematic (Neural Net & Vector Search) ───
function AISchematic() {
  return (
    <div className="w-full h-full flex flex-col justify-between">
      {/* Split Console Grid */}
      <div className="flex-1 w-full flex flex-row items-center justify-between gap-3 min-h-[180px] xs:min-h-[220px]">
        
        {/* Left Side: AI Console & Embedding Log */}
        <div className="w-[45%] h-full bg-[#0A0A0A] border border-white/[0.06] rounded-lg p-2.5 flex flex-col justify-between relative overflow-hidden font-mono shadow-inner select-none">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-1.5 mb-1.5 text-[7px] text-white/30">
            <span className="flex items-center gap-1"><Network size={8} className="text-blue-400" /> embedding-search.py</span>
            <span className="animate-pulse bg-blue-500/20 text-blue-400 px-1 py-0.2 rounded border border-blue-500/30 font-bold text-[6px]">AI_MODEL</span>
          </div>

          {/* Terminal Output Logs */}
          <div className="flex-1 flex flex-col justify-start space-y-1 text-[7px] text-blue-300/80 leading-normal">
            <div className="flex items-center gap-0.5 text-white/50">
              <span>$</span> 
              <span className="text-white/80">python embed.py --query</span>
            </div>
            <div className="text-blue-400/90 font-semibold">&quot;project showcase manager&quot;</div>
            <div className="text-white/30 border-b border-white/[0.04] my-1" />
            <div className="text-blue-400/50">EMBEDDING VECT:</div>
            <div className="text-blue-400/70 truncate">[0.12, -0.45, 0.89, ... +1533]</div>
            <div className="text-white/50">$ search_index(vector)</div>
            <div className="text-white/40 font-semibold">Scanning 4 index clusters...</div>
            <div className="text-green-400 font-bold animate-pulse">MATCH FOUND: Devory</div>
            <div className="text-green-400/80 font-mono">Similarity: 0.9852</div>
            <div className="text-green-400 font-extrabold flex items-center gap-0.5 mt-0.5">
              <span>➔ RESPONSE INJECTED</span>
              <motion.span 
                className="inline-block w-1 h-2 bg-green-400" 
                animate={{ opacity: [1, 0, 1] }} 
                transition={{ repeat: Infinity, duration: 0.8 }} 
              />
            </div>
          </div>
        </div>

        {/* Right Side: Vector Space Clustering Graph */}
        <div className="w-[55%] h-full relative flex items-center justify-center bg-white/[0.01] border border-white/[0.04] rounded-lg p-2">
          <svg viewBox="0 0 140 140" className="w-full h-full overflow-visible">
            {/* Grid overlay for vector space */}
            <circle cx="70" cy="70" r="50" fill="none" stroke="#0A84FF" strokeWidth={0.5} strokeDasharray="1 4" opacity={0.3} />
            <circle cx="70" cy="70" r="30" fill="none" stroke="#0A84FF" strokeWidth={0.5} strokeDasharray="1 4" opacity={0.3} />
            
            {/* Query Vector node */}
            <circle cx="70" cy="70" r="10" fill="#0A0A0A" stroke="#0A84FF" strokeWidth={1.5} style={{ filter: 'drop-shadow(0 0 4px rgba(10,132,255,0.4))' }} />
            <text x="70" y="73" fill="#0A84FF" fontSize="6" fontWeight="bold" fontFamily="monospace" textAnchor="middle">QUERY</text>

            {/* Target Project nodes */}
            {[
              { id: 1, cx: 30, cy: 35, label: 'ThinkVerse', color: '#FF9F0A', matched: false },
              { id: 2, cx: 110, cy: 30, label: 'WebCraft', color: '#10B981', matched: false },
              { id: 3, cx: 40, cy: 105, label: 'Safecoast', color: '#EF4444', matched: false },
              { id: 4, cx: 105, cy: 100, label: 'Devory', color: '#30D158', matched: true },
            ].map((node) => {
              return (
                <g key={node.id}>
                  {/* Distance line */}
                  <motion.line
                    x1="70"
                    y1="70"
                    x2={node.cx}
                    y2={node.cy}
                    stroke={node.matched ? '#30D158' : '#0A84FF'}
                    strokeWidth={node.matched ? 1.5 : 0.8}
                    strokeDasharray={node.matched ? 'none' : '3 3'}
                    initial={{ opacity: 0.1 }}
                    animate={node.matched ? {
                      opacity: [0.3, 0.9, 0.3],
                      strokeWidth: [1.2, 1.8, 1.2],
                    } : {
                      opacity: 0.2,
                    }}
                    transition={node.matched ? {
                      duration: 2.0,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    } : {}}
                  />

                  {/* Node Circle */}
                  <motion.circle
                    cx={node.cx}
                    cy={node.cy}
                    r="8"
                    fill="#0A0A0A"
                    stroke={node.color}
                    strokeWidth={1.5}
                    animate={node.matched ? {
                      r: [8, 10, 8],
                      strokeWidth: [1.5, 2.5, 1.5],
                    } : {}}
                    transition={node.matched ? {
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    } : {}}
                  />

                  {/* Node text labels */}
                  <text
                    x={node.cx}
                    y={node.cy - 12}
                    fill={node.color}
                    fontSize="5"
                    fontWeight={node.matched ? 'bold' : 'normal'}
                    fontFamily="monospace"
                    textAnchor="middle"
                    opacity={node.matched ? 1 : 0.6}
                  >
                    {node.label}
                  </text>

                  {/* Pulsing similarity tag for matched node */}
                  {node.matched && (
                    <g>
                      <rect x={node.cx - 20} y={node.cy + 11} width="40" height="9" rx="1.5" fill="#0A0A0A" stroke="#30D158" strokeWidth={0.8} />
                      <text x={node.cx} y={node.cy + 17} fill="#30D158" fontSize="4.5" fontFamily="monospace" textAnchor="middle">SIM: 0.98</text>
                    </g>
                  )}

                  {/* Floating query stream particles going towards matched target node */}
                  {node.matched && (
                    <motion.circle
                      cx="70"
                      cy="70"
                      r="2"
                      fill="#FFFFFF"
                      style={{ filter: 'drop-shadow(0 0 3px #30D158)' }}
                      animate={{
                        cx: [70, node.cx],
                        cy: [70, node.cy],
                      }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        ease: 'easeOut',
                      }}
                    />
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Infrastructure Diagnostic Readout details */}
      <div className="w-full font-mono text-[8px] xs:text-[9px] text-white/30 flex items-center justify-between border-t border-white/[0.05] pt-2">
        <div className="flex items-center gap-1.5">
          <Network size={11} className="text-blue-400" />
          <span>INDEX: VECTOR_COSINE</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Activity size={11} className="text-blue-400" />
          <span>MODEL: Llama-3-Devory</span>
        </div>
      </div>
    </div>
  );
}

// ─── 2027 Scaling Vision Schematic (Distributed Global Infrastructure) ───
function ScalingSchematic() {
  return (
    <div className="w-full h-full flex flex-col justify-between">
      {/* Split Console Grid */}
      <div className="flex-1 w-full flex flex-row items-center justify-between gap-3 min-h-[180px] xs:min-h-[220px]">
        
        {/* Left Side: Kubernetes Auto-scaler Terminal */}
        <div className="w-[45%] h-full bg-[#0A0A0A] border border-white/[0.06] rounded-lg p-2.5 flex flex-col justify-between relative overflow-hidden font-mono shadow-inner select-none">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-1.5 mb-1.5 text-[7px] text-white/30">
            <span className="flex items-center gap-1"><Terminal size={8} className="text-purple-400" /> k8s-scaler.yaml</span>
            <span className="animate-pulse bg-purple-500/20 text-purple-400 px-1 py-0.2 rounded border border-purple-500/30 font-bold text-[6px]">SCALE_UP</span>
          </div>

          {/* Terminal Output Logs */}
          <div className="flex-1 flex flex-col justify-start space-y-1 text-[7px] text-purple-300/80 leading-normal">
            <div className="flex items-center gap-0.5 text-white/50">
              <span>$</span> 
              <span className="text-white/80">kubectl get deploy -w</span>
            </div>
            <div className="text-purple-400/90">NAME &nbsp; &nbsp; READY &nbsp; UP-TO-DATE</div>
            <div>web-app &nbsp;3/3 &nbsp; &nbsp; 3 &nbsp; &nbsp; (12s)</div>
            <div className="text-white/30 border-b border-white/[0.04] my-1" />
            <div className="text-white/50">$ kubectl scale --replicas=6</div>
            <div className="text-green-400 font-bold animate-pulse">web-app scaled [replicas=6]</div>
            <div className="text-purple-400/60 font-semibold">[k8s-pod-4] creating...</div>
            <div className="text-purple-400/60 font-semibold">[k8s-pod-5] creating...</div>
            <div className="text-purple-400/60 font-semibold">[k8s-pod-6] creating...</div>
            <div className="text-green-400 font-extrabold flex items-center gap-0.5 mt-0.5">
              <span>➔ ALL PODS RUNNING</span>
              <motion.span 
                className="inline-block w-1 h-2 bg-green-400" 
                animate={{ opacity: [1, 0, 1] }} 
                transition={{ repeat: Infinity, duration: 0.8 }} 
              />
            </div>
          </div>
        </div>

        {/* Right Side: Visual Auto-scaling Distributed Graph */}
        <div className="w-[55%] h-full relative flex items-center justify-center bg-white/[0.01] border border-white/[0.04] rounded-lg p-2">
          <svg viewBox="0 0 140 140" className="w-full h-full overflow-visible">
            {/* Load balancer central hub */}
            <circle cx="70" cy="70" r="14" fill="#0A0A0A" stroke="#BF5AF2" strokeWidth={1.5} style={{ filter: 'drop-shadow(0 0 4px rgba(191,90,242,0.4))' }} />
            <text x="70" y="73" fill="#BF5AF2" fontSize="7" fontWeight="bold" fontFamily="monospace" textAnchor="middle">LB</text>

            {/* Orbit rings for cluster nodes */}
            <circle cx="70" cy="70" r="42" fill="none" stroke="#BF5AF2" strokeWidth={0.8} strokeDasharray="3 3" opacity={0.2} />

            {/* 6 Replicated Pods distributed in a circle */}
            {[
              { id: 1, cx: 70, cy: 28, label: 'P1' },
              { id: 2, cx: 106, cy: 49, label: 'P2' },
              { id: 3, cx: 106, cy: 91, label: 'P3' },
              { id: 4, cx: 70, cy: 112, label: 'P4', scale: true },
              { id: 5, cx: 34, cy: 91, label: 'P5', scale: true },
              { id: 6, cx: 34, cy: 49, label: 'P6', scale: true },
            ].map((node) => {
              // Pods 4, 5, 6 will show an animated scale in sequence representing scaling up
              return (
                <g key={node.id}>
                  {/* Connection lines from Load Balancer */}
                  <motion.line
                    x1="70"
                    y1="70"
                    x2={node.cx}
                    y2={node.cy}
                    stroke="#BF5AF2"
                    strokeWidth={1}
                    strokeDasharray="2 2"
                    initial={{ opacity: 0.1 }}
                    animate={node.scale ? {
                      opacity: [0.1, 0.6, 0.1],
                      strokeWidth: [1, 1.5, 1],
                    } : {
                      opacity: [0.2, 0.7, 0.2],
                    }}
                    transition={{
                      duration: node.scale ? 2.5 : 2.0,
                      repeat: Infinity,
                      delay: node.id * 0.3,
                    }}
                  />

                  {/* Pod Circle */}
                  <motion.circle
                    cx={node.cx}
                    cy={node.cy}
                    r="8"
                    fill="#0A0A0A"
                    stroke={node.scale ? '#BF5AF2' : '#BF5AF2'}
                    strokeWidth={1.5}
                    initial={node.scale ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
                    animate={node.scale ? {
                      scale: [0, 1, 1, 0],
                      opacity: [0, 1, 1, 0],
                    } : {
                      scale: 1,
                      opacity: 1,
                    }}
                    transition={node.scale ? {
                      duration: 8,
                      repeat: Infinity,
                      delay: (node.id - 4) * 1.5,
                      ease: 'easeInOut',
                    } : {}}
                  />

                  {/* Pod Label */}
                  <motion.text
                    x={node.cx}
                    y={node.cy + 2.5}
                    fill="#BF5AF2"
                    fontSize="5"
                    fontFamily="monospace"
                    textAnchor="middle"
                    initial={node.scale ? { opacity: 0 } : { opacity: 0.8 }}
                    animate={node.scale ? {
                      opacity: [0, 0.9, 0.9, 0],
                    } : {
                      opacity: 0.8,
                    }}
                    transition={node.scale ? {
                      duration: 8,
                      repeat: Infinity,
                      delay: (node.id - 4) * 1.5,
                      ease: 'easeInOut',
                    } : {}}
                  >
                    {node.label}
                  </motion.text>

                  {/* Pulse signal traversing from LB to Pod */}
                  <motion.circle
                    cx="70"
                    cy="70"
                    r="2"
                    fill="#FFFFFF"
                    style={{ filter: 'drop-shadow(0 0 3px #BF5AF2)' }}
                    animate={{
                      cx: [70, node.cx],
                      cy: [70, node.cy],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: node.id * 0.4,
                      ease: 'easeOut',
                    }}
                  />
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Infrastructure Diagnostic Readout details */}
      <div className="w-full font-mono text-[8px] xs:text-[9px] text-white/30 flex items-center justify-between border-t border-white/[0.05] pt-2">
        <div className="flex items-center gap-1.5">
          <Server size={11} className="text-purple-400" />
          <span>PODS: 6/6 STATUS: NORMAL</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Globe size={11} className="text-purple-400" />
          <span>REPLICAS: AUTO_SCALED</span>
        </div>
      </div>
    </div>
  );
}
