import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <a href="#" className="text-sm font-semibold text-white">
          FuryLogic Labs
        </a>

        <nav className="hidden md:flex items-center gap-6 text-sm text-[var(--text-muted)]">
          <a href="#projects" className="hover:text-white transition-colors">Projects</a>
          <a href="#papers" className="hover:text-white transition-colors">Research</a>
          <a href="#benchmarks" className="hover:text-white transition-colors">Benchmarks</a>
          <a href="https://github.com/Mr-DS-ML-85" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
        </nav>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg border border-[var(--border)] text-[var(--text-muted)]"
        >
          {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[var(--border)] bg-[var(--bg)] px-4 py-4 space-y-3 text-sm">
          <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="block text-[var(--text-muted)] hover:text-white">Projects</a>
          <a href="#papers" onClick={() => setMobileMenuOpen(false)} className="block text-[var(--text-muted)] hover:text-white">Research</a>
          <a href="#benchmarks" onClick={() => setMobileMenuOpen(false)} className="block text-[var(--text-muted)] hover:text-white">Benchmarks</a>
          <a href="https://github.com/Mr-DS-ML-85" target="_blank" rel="noopener noreferrer" className="block text-[var(--text-muted)] hover:text-white">GitHub</a>
        </div>
      )}
    </header>
  );
};
