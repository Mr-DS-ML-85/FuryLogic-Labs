import React, { useState } from 'react';
import { ProjectItem } from '../types';
import { PROJECTS_DATA } from '../data/projectsData';
import { ThreeCanvas } from './ThreeCanvas';
import { Github, ExternalLink, Code2, Cpu, CheckCircle2, ChevronRight, Sparkles, Copy, Check } from 'lucide-react';

interface ProjectsGridProps {
  onSelectProject: (project: ProjectItem) => void;
}

export const ProjectsGrid: React.FC<ProjectsGridProps> = ({ onSelectProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedSnippetId, setCopiedSnippetId] = useState<string | null>(null);
  const [expandedCodeId, setExpandedCodeId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Repositories (7)' },
    { id: 'database', label: 'Database & Storage' },
    { id: 'ai-gateway', label: 'AI Infrastructure' },
    { id: 'kernel', label: 'Kernel Engineering' },
    { id: 'gpu-vector', label: 'GPU & Vector ISA' },
    { id: 'toolkit', label: 'Multi-Lang IPC' },
    { id: 'edge', label: 'Edge AI Agent' },
    { id: 'driver', label: 'Hardware Driver' }
  ];

  const filteredProjects = selectedCategory === 'all'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter(p => p.category === selectedCategory);

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippetId(id);
    setTimeout(() => setCopiedSnippetId(null), 2000);
  };

  return (
    <section id="projects" className="py-16 md:py-24 border-b border-slate-800/80 bg-[#07080d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-300">
            <Cpu className="w-3.5 h-3.5" />
            <span>FURYLOGIC OPEN-SOURCE REPOSITORIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            High-Performance <span className="text-cyan-400">Project Ecosystem</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Direct GitHub repositories, interactive 3D hardware visualizations, live deployments, and architecture benchmarks built by Mr-DS-ML-85 / FuryLogic Labs.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl font-mono text-xs transition-all ${
                selectedCategory === cat.id
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => {
            const isCodeOpen = expandedCodeId === project.id;

            return (
              <div
                key={project.id}
                className="group relative flex flex-col rounded-2xl bg-slate-900/80 border border-slate-800/90 hover:border-cyan-500/50 transition-all duration-300 overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-cyan-950/30"
              >
                {/* Badge Header */}
                <div className="p-4 pb-2 flex items-center justify-between border-b border-slate-800/60">
                  <span className="text-[11px] font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                    {project.categoryLabel}
                  </span>
                  {project.badgeText && (
                    <span className="px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-500/40 text-[10px] font-mono text-cyan-300">
                      {project.badgeText}
                    </span>
                  )}
                </div>

                {/* 3D Model Interactive Preview Canvas */}
                <div className="relative p-2">
                  <ThreeCanvas
                    modelType={project.model3DType}
                    accentColor={project.accentColor}
                    className="h-48 w-full rounded-xl"
                    showControls={false}
                  />
                  
                  {/* Overlay Quick Action */}
                  <div className="absolute bottom-4 right-4 flex items-center gap-2">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        title="Open Live Web Application"
                        className="p-2 rounded-xl bg-cyan-500 text-slate-950 hover:bg-cyan-400 font-bold shadow-lg transition-all"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      title="View GitHub Repository"
                      className="p-2 rounded-xl bg-slate-950/90 text-slate-200 hover:text-cyan-300 border border-slate-700 shadow-lg transition-all"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center justify-between">
                      <span>{project.name}</span>
                    </h3>
                    <p className="text-xs font-mono text-slate-400 mt-1">
                      {project.repoName}
                    </p>

                    <p className="text-xs text-slate-300 mt-3 line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Metrics Pills */}
                  <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-800/80 bg-slate-950/40 rounded-xl p-2 font-mono text-[11px]">
                    {project.metrics.map((metric, i) => (
                      <div key={i} className="text-center">
                        <div className="text-slate-400 text-[10px] truncate">{metric.label}</div>
                        <div className="font-bold text-cyan-300 mt-0.5">
                          {metric.value} <span className="text-[9px] font-normal text-slate-400">{metric.unit}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-300 text-[10px] font-mono border border-slate-700/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Expandable Code Snippet Box */}
                  {isCodeOpen && (
                    <div className="mt-3 rounded-xl bg-slate-950 border border-slate-800 p-3 font-mono text-[11px]">
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-slate-400">
                        <span className="text-cyan-400">{project.codeSnippet.filename}</span>
                        <button
                          onClick={() => handleCopyCode(project.id, project.codeSnippet.code)}
                          className="hover:text-white flex items-center gap-1"
                        >
                          {copiedSnippetId === project.id ? (
                            <Check className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                      <pre className="overflow-x-auto text-slate-300 max-h-36 scrollbar-thin">
                        <code>{project.codeSnippet.code}</code>
                      </pre>
                    </div>
                  )}

                  {/* Action Footer */}
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      onClick={() => setExpandedCodeId(isCodeOpen ? null : project.id)}
                      className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs flex items-center justify-center gap-1.5 transition-all"
                    >
                      <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                      {isCodeOpen ? 'Hide Code' : 'View Code'}
                    </button>

                    <button
                      onClick={() => onSelectProject(project)}
                      className="py-2 px-3 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 font-mono text-xs flex items-center gap-1 transition-all"
                    >
                      Details
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
