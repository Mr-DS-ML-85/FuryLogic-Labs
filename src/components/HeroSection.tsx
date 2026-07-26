import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-20 pb-24 md:pt-28 md:pb-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1]">
            High-Performance{' '}
            <span className="text-[var(--accent)]">
              Systems & AI
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-[var(--text-muted)] max-w-2xl mx-auto leading-relaxed">
            FuryLogic Labs builds unified databases, GPU VRAM virtualization, LLM inference optimization, and multi-provider AI gateways.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href="#projects"
              className="px-5 py-2.5 rounded-lg bg-white text-black font-medium text-sm hover:bg-zinc-200 transition-colors"
            >
              View Projects
            </a>
            <a
              href="https://github.com/Mr-DS-ML-85"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-lg bg-transparent text-white font-medium text-sm border border-[var(--border)] hover:border-[var(--border-hover)] transition-colors flex items-center gap-2"
            >
              GitHub
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border)]">
            <div className="text-2xl font-bold text-white">5.88M</div>
            <div className="text-xs text-[var(--text-muted)] mt-1">StrikeDB SET ops/s</div>
          </div>
          <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border)]">
            <div className="text-2xl font-bold text-white">21</div>
            <div className="text-xs text-[var(--text-muted)] mt-1">AI Providers</div>
          </div>
          <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border)]">
            <div className="text-2xl font-bold text-white">1008 GB/s</div>
            <div className="text-xs text-[var(--text-muted)] mt-1">VUGVA VRAM BW</div>
          </div>
          <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border)]">
            <div className="text-2xl font-bold text-white">93.8%</div>
            <div className="text-xs text-[var(--text-muted)] mt-1">OpusEdge KV Reduction</div>
          </div>
        </div>
      </div>
    </section>
  );
};
