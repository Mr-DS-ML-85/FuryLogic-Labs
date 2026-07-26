import React from 'react';

interface FuryLogicLabsLogoProps {
  variant?: 'icon' | 'horizontal' | 'vertical' | 'badge';
  size?: number;
  showText?: boolean;
  showTagline?: boolean;
  animated?: boolean;
  className?: string;
}

export const FuryLogicLogo: React.FC<FuryLogicLabsLogoProps> = ({
  variant = 'horizontal',
  size = 36,
  showText = true,
  showTagline = false,
  animated = true,
  className = ''
}) => {
  const iconOnly = variant === 'icon' || !showText;

  return (
    <div className={`inline-flex items-center gap-3 select-none ${variant === 'vertical' ? 'flex-col text-center' : ''} ${className}`}>
      {/* SVG Emblem Icon */}
      <div 
        className="relative flex-shrink-0 group cursor-pointer"
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        {/* Glow Aura backdrop */}
        <div className={`absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 rounded-xl blur-sm opacity-60 group-hover:opacity-100 transition duration-500 ${animated ? 'animate-pulse' : ''}`} />
        
        {/* Vector SVG */}
        <svg
          viewBox="0 0 512 512"
          className="relative w-full h-full drop-shadow-lg"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="flBgGlow" cx="50%" cy="50%" r="65%">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#030712" />
            </radialGradient>

            <linearGradient id="flFuryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff0055" />
              <stop offset="45%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#00f3ff" />
            </linearGradient>

            <linearGradient id="flLogicGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00f3ff" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>

            <linearGradient id="flGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>

            <filter id="flGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Squircle Mask Container */}
          <rect width="512" height="512" rx="120" fill="url(#flBgGlow)" stroke="#1e293b" strokeWidth="6" />

          {/* Outer Octagonal Frame */}
          <polygon 
            points="256,56 426,126 426,386 256,456 86,386 86,126" 
            fill="none" 
            stroke="url(#flLogicGrad)" 
            strokeWidth="10" 
            strokeLinejoin="round"
            filter="url(#flGlow)" 
          />

          <polygon 
            points="256,80 406,142 406,370 256,432 106,370 106,142" 
            fill="#090d16" 
            stroke="#1e293b" 
            strokeWidth="3" 
          />

          {/* Cyber Traces & Logic Nodes */}
          <g stroke="url(#flFuryGrad)" strokeWidth="4" strokeLinecap="round" opacity="0.85">
            <path d="M 106 142 L 170 200 H 200" fill="none" />
            <circle cx="200" cy="200" r="6" fill="#00f3ff" />

            <path d="M 406 142 L 342 200 H 312" fill="none" />
            <circle cx="312" cy="200" r="6" fill="#ff0055" />

            <path d="M 106 370 L 170 312 H 200" fill="none" />
            <circle cx="200" cy="312" r="6" fill="#3b82f6" />

            <path d="M 406 370 L 342 312 H 312" fill="none" />
            <circle cx="312" cy="312" r="6" fill="#a855f7" />
          </g>

          {/* Stylized Fury Bolt & 'F' Monogram */}
          <g>
            <polygon 
              points="175,150 345,150 325,190 220,190 205,225 175,225" 
              fill="url(#flFuryGrad)" 
            />
            <polygon 
              points="195,245 305,245 285,285 208,285" 
              fill="url(#flLogicGrad)" 
            />
            <polygon 
              points="175,150 220,150 170,365 130,365" 
              fill="url(#flFuryGrad)" 
            />
            <polygon 
              points="170,365 240,295 210,295 275,200 240,200 280,150" 
              fill="url(#flGoldGrad)" 
              opacity="0.95" 
            />
          </g>

          {/* Core Quantum Points */}
          <circle cx="256" cy="256" r="12" fill="#ffffff" filter="url(#flGlow)" />
          <circle cx="256" cy="256" r="6" fill="#00f3ff" />
        </svg>
      </div>

      {/* Typography Label */}
      {!iconOnly && (
        <div className={`flex flex-col ${variant === 'vertical' ? 'items-center' : 'items-start'}`}>
          <div className="flex items-center gap-0.5 tracking-tight font-extrabold text-white">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300 font-sans" style={{ fontSize: `${Math.max(16, size * 0.55)}px` }}>
              Fury
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 font-sans" style={{ fontSize: `${Math.max(16, size * 0.55)}px` }}>
              Logic
            </span>
            <span className="text-cyan-400 font-mono font-normal ml-0.5" style={{ fontSize: `${Math.max(10, size * 0.35)}px` }}>
              .com
            </span>
          </div>

          {(showTagline || variant === 'badge') && (
            <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              SYSTEMS ARCHITECTURE LAB
            </span>
          )}
        </div>
      )}
    </div>
  );
};
