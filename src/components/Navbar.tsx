import React, { useState } from 'react';
import { Cpu, ExternalLink, BookOpen, BarChart2, Menu, X } from 'lucide-react';
import { FuryLogicLogo } from './FuryLogicLogo';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-[#090a0f]/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Status */}
        <div className="flex items-center gap-3">
          <a href="#" className="flex items-center group">
            <FuryLogicLogo size={36} showTagline={true} />
          </a>
        </div>

        {/* Navigation Links Desktop */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <a href="#projects" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
            <Cpu className="w-4 h-4 text-cyan-400" />
            Projects (7)
          </a>
          <a href="#live-demos" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
            <ExternalLink className="w-4 h-4 text-purple-400" />
            Live Demos
          </a>
          <a href="#papers" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-blue-400" />
            Zenodo Papers
          </a>
          <a href="#benchmarks" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
            <BarChart2 className="w-4 h-4 text-emerald-400" />
            Benchmarks
          </a>
        </nav>

        {/* Mobile menu trigger */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-[#0c0e17] px-4 pt-3 pb-6 space-y-3 font-mono text-sm">
          <a
            href="#projects"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-200 hover:text-cyan-400"
          >
            ⚡ Projects Ecosystem (7 Repos)
          </a>
          <a
            href="#live-demos"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-200 hover:text-cyan-400"
          >
            🚀 Live Web Apps & Demos
          </a>
          <a
            href="#papers"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-200 hover:text-cyan-400"
          >
            📄 Zenodo Research Papers
          </a>
          <a
            href="#benchmarks"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-200 hover:text-cyan-400"
          >
            📊 System Benchmarks
          </a>
        </div>
      )}
    </header>
  );
};

