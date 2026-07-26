import React from 'react';
import { ExternalLink } from 'lucide-react';
import { PAPERS_DATA } from '../data/papersData';

export const PapersSection: React.FC = () => {
  return (
    <section id="papers" className="py-20 md:py-28 border-t border-[var(--border)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Research
          </h2>
          <p className="text-[var(--text-muted)] mt-3 text-sm sm:text-base">
            Published on Zenodo under open access.
          </p>
        </div>

        <div className="space-y-4">
          {PAPERS_DATA.map((paper) => (
            <a
              key={paper.doi}
              href={paper.zenodoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-5 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] hover:border-[var(--border-hover)] transition-all group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-white group-hover:text-[var(--accent)] transition-colors">
                    {paper.title}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)]">
                    {paper.authors}
                  </p>
                  <p className="text-xs text-zinc-500">
                    DOI: {paper.doi}
                  </p>
                </div>
                <ExternalLink className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors shrink-0 mt-1" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
