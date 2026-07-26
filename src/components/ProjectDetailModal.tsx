import React, { useState } from 'react';
import { ProjectItem } from '../types';
import { X, ExternalLink, Github, CheckCircle2, Copy, Check } from 'lucide-react';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
}) => {
  if (!project) return null;

  const [copiedCode, setCopiedCode] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(project.codeSnippet.code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-xl bg-[var(--bg)] border border-[var(--border)] shadow-2xl overflow-hidden my-8">
        <div className="p-5 border-b border-[var(--border)] flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">{project.name}</h2>
            <p className="text-xs text-[var(--text-muted)]">{project.repoName}</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg border border-[var(--border)] text-[var(--text-muted)] hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-5">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {project.metrics.map((metric, i) => (
              <div key={i} className="p-3 rounded-lg bg-[var(--bg-card)] border border-[var(--border)]">
                <div className="text-lg font-bold text-white">{metric.value}</div>
                <div className="text-[10px] text-[var(--text-muted)]">{metric.label} {metric.unit}</div>
              </div>
            ))}
          </div>

          <p className="text-sm text-[var(--text-muted)] leading-relaxed">{project.tagline}</p>

          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <span key={tech} className="px-2 py-0.5 rounded text-[10px] font-medium bg-zinc-800/50 text-zinc-400 border border-zinc-700/50">
                {tech}
              </span>
            ))}
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium text-white">Architecture</h4>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">{project.architectureDetails}</p>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium text-white">Key Features</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {project.keyFeatures.map((feature, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-[var(--text-muted)]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent)] shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[var(--accent)] font-medium">{project.codeSnippet.filename}</span>
              <button onClick={handleCopy} className="flex items-center gap-1 text-[var(--text-muted)] hover:text-white">
                {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                {copiedCode ? 'Copied' : 'Copy'}
              </button>
            </div>
            <pre className="p-3 rounded-lg bg-zinc-900 border border-[var(--border)] text-xs text-zinc-300 overflow-x-auto">
              <code>{project.codeSnippet.code}</code>
            </pre>
          </div>

          <div className="flex items-center gap-2 pt-2 border-t border-[var(--border)]">
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex-1 py-2 rounded-lg bg-white text-black text-sm font-medium text-center flex items-center justify-center gap-1.5">
              <Github className="w-4 h-4" />
              Source
            </a>
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex-1 py-2 rounded-lg border border-[var(--border)] text-white text-sm font-medium text-center flex items-center justify-center gap-1.5 hover:border-[var(--border-hover)]">
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
