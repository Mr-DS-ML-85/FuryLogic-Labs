import React from 'react';
import { Github, Mail, ArrowUpRight, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div className="space-y-3">
            <div className="text-sm font-semibold text-white">FuryLogic Labs</div>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed max-w-xs">
              High-performance systems engineering — databases, GPU virtualization, LLM inference, and AI gateways.
            </p>
            <div className="flex items-center gap-2">
              <a
                href="https://github.com/Mr-DS-ML-85"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg border border-[var(--border)] text-[var(--text-muted)] hover:text-white hover:border-[var(--border-hover)] transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-xs font-medium text-white uppercase tracking-wider">Projects</div>
            <ul className="space-y-2 text-xs text-[var(--text-muted)]">
              <li><a href="https://github.com/Mr-DS-ML-85/StrikeDB" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">StrikeDB <ArrowUpRight className="w-3 h-3" /></a></li>
              <li><a href="https://github.com/Mr-DS-ML-85/chimera-ai-gateway" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">Chimera AI Gateway <ArrowUpRight className="w-3 h-3" /></a></li>
              <li><a href="https://github.com/Mr-DS-ML-85/VUGVA" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">VUGVA <ArrowUpRight className="w-3 h-3" /></a></li>
              <li><a href="https://github.com/Mr-DS-ML-85/OpusEdge" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">OpusEdge <ArrowUpRight className="w-3 h-3" /></a></li>
              <li><a href="https://github.com/Mr-DS-ML-85/mips-xip-kernel" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">MIPS XIP Kernel <ArrowUpRight className="w-3 h-3" /></a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="text-xs font-medium text-white uppercase tracking-wider">Contact</div>
            <ul className="space-y-2 text-xs text-[var(--text-muted)]">
              <li>
                <a href="mailto:irfan@furylogic.com" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <Mail className="w-3 h-3" />
                  irfan@furylogic.com
                </a>
              </li>
              <li>
                <a href="mailto:contact@furylogic.com" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <Mail className="w-3 h-3" />
                  contact@furylogic.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
          <p>&copy; {new Date().getFullYear()} FuryLogic Labs. furylogic.com</p>
          <div className="flex items-center gap-4">
            <a href="https://zenodo.org/search?q=Mr-DS-ML-85" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Zenodo Papers</a>
            <a
              href="https://creativecommons.org/licenses/by-nc/4.0/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1"
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
