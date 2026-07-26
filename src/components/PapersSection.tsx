import React, { useState } from 'react';
import { PAPERS_DATA } from '../data/papersData';
import { BookOpen, ExternalLink, Copy, Check, ShieldCheck, FileText, ChevronDown, ChevronUp, Share2 } from 'lucide-react';

export const PapersSection: React.FC = () => {
  const [copiedBibtexId, setCopiedBibtexId] = useState<string | null>(null);
  const [expandedAbstractId, setExpandedAbstractId] = useState<string | null>(null);

  const handleCopyBibtex = (id: string, bibtex: string) => {
    navigator.clipboard.writeText(bibtex);
    setCopiedBibtexId(id);
    setTimeout(() => setCopiedBibtexId(null), 2000);
  };

  return (
    <section id="papers" className="py-16 md:py-24 border-b border-slate-800/80 bg-[#06080d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-xs font-mono text-blue-300">
            <BookOpen className="w-3.5 h-3.5" />
            <span>ZENODO OPEN-ACCESS RESEARCH PUBLICATIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Peer-Reviewed <span className="text-blue-400">Research & Whitepapers</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Scientific publications detailing zero-copy database architectures, memory-mapped column engines, and MIPS Execute-In-Place kernel RAM footprint optimizations hosted on Zenodo.
          </p>
        </div>

        {/* Papers List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {PAPERS_DATA.map((paper) => {
            const isAbstractExpanded = expandedAbstractId === paper.id;

            return (
              <div
                key={paper.id}
                className="flex flex-col rounded-3xl bg-slate-900/80 border border-slate-800/90 hover:border-blue-500/40 transition-all p-6 space-y-5 shadow-2xl relative overflow-hidden"
              >
                {/* DOI & Type Pill */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span className="p-1 rounded-lg bg-emerald-950 border border-emerald-500/30 text-emerald-400">
                      <ShieldCheck className="w-4 h-4" />
                    </span>
                    <span className="text-blue-400 font-bold">DOI: {paper.doi}</span>
                  </div>

                  <span className="px-2.5 py-1 rounded-full bg-blue-950/80 border border-blue-500/30 text-[11px] font-mono text-blue-300">
                    Record ID: {paper.zenodoRecordId}
                  </span>
                </div>

                {/* Title & Metadata */}
                <div>
                  <h3 className="text-xl font-bold text-white leading-snug">
                    {paper.title}
                  </h3>
                  <div className="text-xs font-mono text-slate-400 mt-2 flex flex-wrap items-center gap-3">
                    <span>{paper.authors.join(', ')}</span>
                    <span>•</span>
                    <span>{paper.publicationType}</span>
                    <span>•</span>
                    <span className="text-cyan-400">{paper.date}</span>
                  </div>
                </div>

                {/* Topics */}
                <div className="flex flex-wrap gap-1.5">
                  {paper.topics.map((topic, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-slate-950 text-slate-300 font-mono text-[11px] border border-slate-800"
                    >
                      #{topic}
                    </span>
                  ))}
                </div>

                {/* Highlights Checklist */}
                <div className="space-y-2 p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300">
                  <div className="text-slate-400 font-mono uppercase tracking-wider text-[10px] mb-2">
                    Research Key Contributions:
                  </div>
                  {paper.highlights.map((highlight, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-blue-400 font-bold">•</span>
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>

                {/* Abstract Text Expandable */}
                <div className="space-y-2">
                  <button
                    onClick={() => setExpandedAbstractId(isAbstractExpanded ? null : paper.id)}
                    className="flex items-center justify-between w-full text-xs font-mono text-cyan-400 hover:underline"
                  >
                    <span>{isAbstractExpanded ? 'Collapse Abstract' : 'Read Full Research Abstract'}</span>
                    {isAbstractExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>

                  {isAbstractExpanded && (
                    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed font-normal">
                      {paper.abstract}
                    </div>
                  )}
                </div>

                {/* BibTeX Box */}
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-3">
                  <button
                    onClick={() => handleCopyBibtex(paper.id, paper.bibtex)}
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs flex items-center gap-1.5 transition-all"
                  >
                    {copiedBibtexId === paper.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                    )}
                    {copiedBibtexId === paper.id ? 'BibTeX Copied!' : 'Copy BibTeX'}
                  </button>

                  <a
                    href={paper.zenodoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:brightness-110 text-white font-bold font-mono text-xs flex items-center gap-1.5 shadow-lg shadow-blue-600/20"
                  >
                    Zenodo Record
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
