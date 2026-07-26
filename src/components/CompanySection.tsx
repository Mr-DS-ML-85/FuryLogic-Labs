import React, { useState } from 'react';
import { FURYLOGIC_PILLARS } from '../data/benchmarksData';
import { Cpu, Zap, HardDrive, Bot, ShieldCheck, Terminal, Globe, Code, Copy, Check, Download, Sparkles } from 'lucide-react';
import { FuryLogicLogo } from './FuryLogicLogo';

export const CompanySection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');

  const svgCode = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <radialGradient id="flBgGlow" cx="50%" cy="50%" r="65%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#030712" />
    </radialGradient>
    <linearGradient id="flFuryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ff0055" />
      <stop offset="45%" stop-color="#a855f7" />
      <stop offset="100%" stop-color="#00f3ff" />
    </linearGradient>
    <linearGradient id="flLogicGrad" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#00f3ff" />
      <stop offset="50%" stop-color="#3b82f6" />
      <stop offset="100%" stop-color="#8b5cf6" />
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="120" fill="url(#flBgGlow)" stroke="#1e293b" stroke-width="6" />
  <polygon points="256,56 426,126 426,386 256,456 86,386 86,126" fill="none" stroke="url(#flLogicGrad)" stroke-width="10" stroke-linejoin="round" />
  <polygon points="175,150 345,150 325,190 220,190 205,225 175,225" fill="url(#flFuryGrad)" />
  <polygon points="195,245 305,245 285,285 208,285" fill="url(#flLogicGrad)" />
  <polygon points="175,150 220,150 170,365 130,365" fill="url(#flFuryGrad)" />
  <polygon points="170,365 240,295 210,295 275,200 240,200 280,150" fill="#f59e0b" opacity="0.95" />
  <circle cx="256" cy="256" r="10" fill="#00f3ff" />
</svg>`;

  const copySvg = () => {
    navigator.clipboard.writeText(svgCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="company" className="py-16 md:py-24 border-b border-zinc-800/80 bg-[#07080f] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-cyan-500/30 bg-cyan-950/40 text-xs font-mono text-cyan-300">
            <Globe className="w-3.5 h-3.5" />
            <span>FURYLOGIC.COM ENGINEERING PHILOSOPHY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Architecting <span className="text-cyan-400">Zero-Overhead Systems</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            FuryLogic Labs combines low-level C++/Rust kernel craftsmanship, SIMD vectorization, GPU virtualization, and AI inference optimization into a unified open-source ecosystem.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {FURYLOGIC_PILLARS.map((pillar, i) => (
            <div
              key={i}
              className="card-shadow p-6 rounded-2xl flex flex-col justify-between hover:border-cyan-500/50 transition-all group"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                  {i === 0 && <Cpu className="w-5 h-5" />}
                  {i === 1 && <Zap className="w-5 h-5" />}
                  {i === 2 && <HardDrive className="w-5 h-5" />}
                  {i === 3 && <Bot className="w-5 h-5" />}
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400">
                    {pillar.subtitle}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-0.5">
                    {pillar.title}
                  </h3>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between font-mono">
                <span className="text-xs text-zinc-500">{pillar.statLabel}</span>
                <span className="text-lg font-extrabold text-cyan-300">{pillar.stat}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Official SVG Brand Identity Showcase Card */}
        <div className="mb-16 card-shadow p-8 rounded-3xl bg-gradient-to-br from-[#0b0e18] via-[#080a12] to-[#040508] border border-cyan-500/30">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-zinc-800">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-purple-950/60 border border-purple-500/30 text-[11px] font-mono text-purple-300 mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                OFFICIAL BRANDING &amp; LOGO ASSETS
              </div>
              <h3 className="text-2xl font-extrabold text-white">
                FuryLogic Labs Vector SVG Logo &amp; Favicon
              </h3>
              <p className="text-xs text-zinc-400 mt-1 max-w-xl">
                Clean mathematical vector geometry combining a high-performance lightning 'F' emblem, circuit logic traces, and neon glow gradients.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-3 py-1.5 rounded-xl font-mono text-xs transition-all ${activeTab === 'preview' ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/20' : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'}`}
              >
                Visual Variants
              </button>
              <button
                onClick={() => setActiveTab('code')}
                className={`px-3 py-1.5 rounded-xl font-mono text-xs transition-all ${activeTab === 'code' ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/20' : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'}`}
              >
                SVG Source Code
              </button>
              <a
                href="/favicon.svg"
                download="furylogiclabs-favicon.svg"
                className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-700 hover:border-cyan-500 text-cyan-300 font-mono text-xs flex items-center gap-1.5 transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                Favicon SVG
              </a>
            </div>
          </div>

          {activeTab === 'preview' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
              {/* Variant 1: Full Horizontal */}
              <div className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 flex flex-col items-center justify-center gap-3 text-center">
                <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                  Horizontal Branding
                </div>
                <FuryLogicLogo variant="horizontal" size={44} showTagline={true} />
              </div>

              {/* Variant 2: Vertical Stack */}
              <div className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 flex flex-col items-center justify-center gap-3 text-center">
                <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                  Vertical Stack
                </div>
                <FuryLogicLogo variant="vertical" size={56} showText={true} showTagline={true} />
              </div>

              {/* Variant 3: Emblem Only / Favicon */}
              <div className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 flex flex-col items-center justify-center gap-3 text-center">
                <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                  Favicon / Icon Mark
                </div>
                <FuryLogicLogo variant="icon" size={64} />
              </div>

              {/* Variant 4: Monogram Badge */}
              <div className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 flex flex-col items-center justify-center gap-3 text-center">
                <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                  Compact Badge
                </div>
                <FuryLogicLogo variant="badge" size={32} showTagline={false} />
              </div>
            </div>
          ) : (
            <div className="pt-6 space-y-3">
              <div className="flex items-center justify-between font-mono text-xs text-zinc-400 bg-zinc-950 px-4 py-2 rounded-t-xl border border-zinc-800 border-b-0">
                <span className="text-cyan-400">/public/favicon.svg</span>
                <button
                  onClick={copySvg}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900 border border-zinc-700 hover:border-cyan-500 text-zinc-200 hover:text-cyan-300 text-[11px] transition-all"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied to Clipboard' : 'Copy SVG Code'}</span>
                </button>
              </div>
              <pre className="p-4 rounded-b-xl bg-[#03050a] border border-zinc-800 text-xs font-mono text-slate-300 overflow-x-auto max-h-64 leading-relaxed">
                {svgCode}
              </pre>
            </div>
          )}
        </div>

        {/* Corporate Identity & Tech Stack Specs */}
        <div className="card-shadow p-8 rounded-3xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4" />
              Bare-Metal Precision &amp; Academic Rigor
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Open-Source Infrastructure &amp; Published Zenodo Papers
            </h3>

            <p className="text-sm text-zinc-300 leading-relaxed">
              Every database engine, kernel patch, GPU virtualizer, and proxy gateway in the FuryLogic Labs portfolio is backed by published peer-reviewed research papers on Zenodo and fully open-source GitHub repositories under Mr-DS-ML-85.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs pt-2">
              <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800">
                <div className="text-zinc-500 text-[10px]">ORGANIZATION</div>
                <div className="text-white font-bold mt-0.5">Mr-DS-ML-85</div>
              </div>
              <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800">
                <div className="text-zinc-500 text-[10px]">REPOSITORIES</div>
                <div className="text-cyan-400 font-bold mt-0.5">7 Projects</div>
              </div>
              <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800">
                <div className="text-zinc-500 text-[10px]">DOMAIN</div>
                <div className="text-emerald-400 font-bold mt-0.5">furylogic.com</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 p-6 rounded-2xl bg-zinc-950 border border-zinc-800 font-mono text-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-800 text-zinc-400">
              <span className="text-cyan-400 font-bold">fury_system_manifest.json</span>
              <span className="text-[10px] text-emerald-400">VERIFIED</span>
            </div>
            <pre className="text-zinc-300 text-[11px] overflow-x-auto leading-relaxed">
{`{
  "firm": "FuryLogic Labs",
  "domain": "furylogic.com",
  "github_org": "Mr-DS-ML-85",
  "core_languages": ["C++20", "Rust", "C", "Assembly"],
  "papers_zenodo": [
    "10.5281/zenodo.21471506",
    "10.5281/zenodo.21549808"
  ],
  "status": "ONLINE_OPERATIONAL"
}`}
            </pre>
          </div>

        </div>

      </div>
    </section>
  );
};

