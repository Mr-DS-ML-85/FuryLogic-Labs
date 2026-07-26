import React from 'react';
import { Github, FileText, ArrowUpRight, Shield, Mail } from 'lucide-react';
import { PAPERS_DATA } from '../data/papersData';
import { FuryLogicLogo } from './FuryLogicLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#030305] border-t border-zinc-800 text-zinc-400 font-sans relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 pb-12 border-b border-zinc-800/80">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#" className="inline-block">
              <FuryLogicLogo size={34} showTagline={true} />
            </a>

            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              Open-source bare-metal systems, embedded database engines, and proxy gateways engineered for low-latency computation and academic precision.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/Mr-DS-ML-85"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors"
                title="GitHub Organization"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>

            <div className="space-y-1 pt-1">
              <a href="mailto:irfan@furylogic.com" className="flex items-center gap-2 text-xs text-zinc-400 hover:text-emerald-400 transition-colors">
                <Mail className="w-3 h-3" />
                <span>irfan@furylogic.com</span>
              </a>
              <a href="mailto:contact@furylogic.com" className="flex items-center gap-2 text-xs text-zinc-400 hover:text-emerald-400 transition-colors">
                <Mail className="w-3 h-3" />
                <span>contact@furylogic.com</span>
              </a>
            </div>
          </div>

          {/* Col 2: Active Live Apps */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              Live Web Apps
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <a
                  href="https://strikedb.devforge.qzz.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 flex items-center gap-1 transition-colors"
                >
                  <span>StrikeDB App</span>
                  <ArrowUpRight className="w-3 h-3 text-emerald-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://vugva.devforge.qzz.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 flex items-center gap-1 transition-colors"
                >
                  <span>VUGVA Testing</span>
                  <ArrowUpRight className="w-3 h-3 text-emerald-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://opusai.devforge.qzz.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 flex items-center gap-1 transition-colors"
                >
                  <span>OpusEdge Agent</span>
                  <ArrowUpRight className="w-3 h-3 text-emerald-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://mr-ds-ml-85.github.io/mips-xip-kernel/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 flex items-center gap-1 transition-colors"
                >
                  <span>MIPS Kernel Docs</span>
                  <ArrowUpRight className="w-3 h-3 text-emerald-400" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Research DOIs */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              Zenodo Publications
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              {PAPERS_DATA.map((paper) => (
                <li key={paper.doi}>
                  <a
                    href={paper.zenodoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-cyan-400 flex items-center gap-1 transition-colors"
                  >
                    <FileText className="w-3 h-3 text-cyan-400 shrink-0" />
                    <span className="truncate">DOI: {paper.doi}</span>
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="https://zenodo.org/search?q=Mr-DS-ML-85"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-500 hover:text-white transition-colors text-[11px]"
                >
                  View all Zenodo archives →
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-zinc-500 gap-4">
          <p>© {new Date().getFullYear()} FuryLogic Labs (furylogic.com). Developed by Mr-DS-ML-85.</p>
          <div className="flex items-center gap-4">
            <a href="#projects" className="hover:text-zinc-300">Projects</a>
            <a href="#papers" className="hover:text-zinc-300">Zenodo Papers</a>
            <a href="#benchmarks" className="hover:text-zinc-300">Benchmarks</a>
            <a
              href="https://creativecommons.org/licenses/by-nc/4.0/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-300 flex items-center gap-1"
            >
              <Shield className="w-3 h-3" />
              CC BY-NC 4.0
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
