import React from 'react';
import { ThreeCanvas } from './ThreeCanvas';
import { ArrowUpRight, Zap, BookOpen, ShieldCheck } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-8 pb-16 md:pt-12 md:pb-24 overflow-hidden border-b border-slate-800/60">
      
      {/* Background Cyber Ambient Lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-600/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[300px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Announcement Pill (Groq / Umbrel style) */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-xs font-mono text-cyan-300 shadow-xl shadow-cyan-950/40">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="text-slate-200">Official Tech Portfolio & Research Lab</span>
            <span className="text-slate-600">|</span>
            <span className="text-cyan-400 font-semibold flex items-center gap-1">
              furylogic.com
            </span>
          </div>
        </div>

        {/* Hero Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Headlines & High-Impact Copy */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
              High-Performance <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                Systems & AI
              </span> Infrastructure
            </h1>

            <p className="text-base sm:text-lg text-slate-300 font-normal max-w-2xl leading-relaxed">
              FuryLogic Labs builds ultra-fast unified databases, AI agent memory engines, GPU VRAM virtualization, MIPS execute-in-place Linux kernels, and multi-provider AI gateways designed for microsecond workloads.
            </p>

            {/* Quick Live Link Chips */}
            <div className="pt-1 flex flex-wrap items-center justify-center lg:justify-start gap-2 font-mono text-xs">
              <span className="text-slate-500 text-[11px] uppercase tracking-wider mr-1">Live Platforms:</span>
              <a
                href="https://strikedb.devforge.qzz.io"
                target="_blank"
                rel="noreferrer"
                className="px-2.5 py-1 rounded-lg bg-slate-900 border border-cyan-500/30 text-cyan-300 hover:border-cyan-400 transition-all flex items-center gap-1"
              >
                strikedb.devforge.qzz.io
                <ArrowUpRight className="w-3 h-3" />
              </a>
              <a
                href="https://mr-ds-ml-85.github.io/mips-xip-kernel"
                target="_blank"
                rel="noreferrer"
                className="px-2.5 py-1 rounded-lg bg-slate-900 border border-blue-500/30 text-blue-300 hover:border-blue-400 transition-all flex items-center gap-1"
              >
                mips-xip-kernel
                <ArrowUpRight className="w-3 h-3" />
              </a>
              <a
                href="https://opusai.devforge.qzz.io/"
                target="_blank"
                rel="noreferrer"
                className="px-2.5 py-1 rounded-lg bg-slate-900 border border-pink-500/30 text-pink-300 hover:border-pink-400 transition-all flex items-center gap-1"
              >
                opusai.devforge.qzz.io
                <ArrowUpRight className="w-3 h-3" />
              </a>
              <a
                href="https://vugva.devforge.qzz.io/"
                target="_blank"
                rel="noreferrer"
                className="px-2.5 py-1 rounded-lg bg-slate-900 border border-emerald-500/30 text-emerald-300 hover:border-emerald-400 transition-all flex items-center gap-1"
              >
                vugva.devforge.qzz.io
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>

            {/* CTA Action Button Row */}
            <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <a
                href="#projects"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-slate-950 font-bold text-sm hover:brightness-110 transition-all shadow-xl shadow-cyan-500/25 flex items-center gap-2"
              >
                <Zap className="w-4 h-4 fill-current" />
                Explore 7 Repositories
              </a>

              <a
                href="#papers"
                className="px-5 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 font-medium text-sm transition-all flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-blue-400" />
                Zenodo Research Papers
              </a>
            </div>

            {/* Key Paper Citations Quick Banner */}
            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-center lg:justify-start gap-4 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Zenodo DOI Verified</span>
              </div>
              <span>•</span>
              <a
                href="https://zenodo.org/records/21471506"
                target="_blank"
                rel="noreferrer"
                className="hover:text-cyan-300 underline underline-offset-2"
              >
                Record 21471506
              </a>
              <span>•</span>
              <a
                href="https://zenodo.org/records/21549808"
                target="_blank"
                rel="noreferrer"
                className="hover:text-cyan-300 underline underline-offset-2"
              >
                Record 21549808
              </a>
            </div>

          </div>

          {/* Right Column: 3D Interactive Model Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
              <ThreeCanvas
                modelType="hero"
                accentColor="#00f3ff"
                className="h-[400px] sm:h-[460px] w-full"
                showControls={true}
              />
            </div>
          </div>

        </div>

        {/* Live Metrics Ticker Bar (Groq / Umbrel Style) */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md hover:border-cyan-500/40 transition-all">
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-cyan-400">1.42M QPS</div>
            <div className="text-xs font-mono text-slate-400 mt-1">StrikeDB Peak Scan Speed</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md hover:border-purple-500/40 transition-all">
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-purple-400">&lt;2.4ms</div>
            <div className="text-xs font-mono text-slate-400 mt-1">Chimera AI Proxy Overhead</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md hover:border-blue-500/40 transition-all">
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-blue-400">68.4% Saved</div>
            <div className="text-xs font-mono text-slate-400 mt-1">MIPS XIP Kernel RAM Footprint</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md hover:border-pink-500/40 transition-all">
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-pink-400">&lt;18MB RAM</div>
            <div className="text-xs font-mono text-slate-400 mt-1">OpusEdge Local AI Agent Engine</div>
          </div>
        </div>

      </div>
    </section>
  );
};
