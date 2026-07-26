import React, { useState } from 'react';
import { ProjectItem } from '../types';
import { ThreeCanvas } from './ThreeCanvas';
import { X, ExternalLink, Github, Code2, Cpu, CheckCircle2, Copy, Check, Terminal, Play } from 'lucide-react';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onOpenTerminal: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onOpenTerminal
}) => {
  if (!project) return null;

  const [copiedCode, setCopiedCode] = useState(false);
  const [activeTab, setActiveTab] = useState<'architecture' | 'code' | 'live'>('architecture');

  const handleCopy = () => {
    navigator.clipboard.writeText(project.codeSnippet.code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-3xl bg-[#090b12] border border-cyan-500/30 shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="p-6 pb-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-400">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                {project.name}
              </h2>
              <p className="text-xs font-mono text-cyan-400">{project.repoName}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          
          {/* Top Row: Interactive 3D Canvas + Core Stats */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            <div className="md:col-span-7">
              <ThreeCanvas
                modelType={project.model3DType}
                accentColor={project.accentColor}
                className="h-64 sm:h-72 w-full rounded-2xl"
                showControls={true}
              />
            </div>

            <div className="md:col-span-5 space-y-4 font-mono text-xs">
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
                <div className="text-slate-400 uppercase tracking-wider text-[10px]">
                  Engine Tagline
                </div>
                <div className="text-slate-200 font-sans text-sm leading-relaxed">
                  {project.tagline}
                </div>
              </div>

              {/* Metrics List */}
              <div className="space-y-2">
                {project.metrics.map((metric, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between">
                    <span className="text-slate-400">{metric.label}:</span>
                    <span className="font-bold text-cyan-300">
                      {metric.value} {metric.unit}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-1">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-2.5 px-3 rounded-xl bg-cyan-500 text-slate-950 font-bold flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-500/20"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Open Live App
                  </a>
                )}
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="py-2.5 px-4 rounded-xl bg-slate-900 text-slate-200 border border-slate-700 flex items-center justify-center gap-1.5 hover:bg-slate-800"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              </div>
            </div>

          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
            <button
              onClick={() => setActiveTab('architecture')}
              className={`px-4 py-2 rounded-xl font-mono text-xs transition-all ${
                activeTab === 'architecture'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              Architectural Specifications
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`px-4 py-2 rounded-xl font-mono text-xs transition-all ${
                activeTab === 'code'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              Code Snippet & API
            </button>
            {project.liveUrl && (
              <button
                onClick={() => setActiveTab('live')}
                className={`px-4 py-2 rounded-xl font-mono text-xs transition-all ${
                  activeTab === 'live'
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                Embedded Live Frame
              </button>
            )}
          </div>

          {/* Tab 1: Architecture */}
          {activeTab === 'architecture' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                <h4 className="text-sm font-bold text-white mb-2">Deep Architecture Overview</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {project.architectureDetails}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-white mb-3">Key Technical Capabilities</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {project.keyFeatures.map((feature, i) => (
                    <div key={i} className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 font-mono text-xs">
                      {tech}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => {
                    onClose();
                    onOpenTerminal();
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-cyan-300 border border-cyan-500/40 font-mono text-xs flex items-center gap-2 hover:bg-slate-800"
                >
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  Test in CLI Sandbox
                </button>
              </div>
            </div>
          )}

          {/* Tab 2: Code Snippet */}
          {activeTab === 'code' && (
            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
                <span className="text-cyan-400 font-bold">{project.codeSnippet.filename}</span>
                <button
                  onClick={handleCopy}
                  className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1.5 transition-all"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedCode ? 'Copied!' : 'Copy Snippet'}
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 overflow-x-auto">
                <pre className="text-slate-200 leading-relaxed">
                  <code>{project.codeSnippet.code}</code>
                </pre>
              </div>
            </div>
          )}

          {/* Tab 3: Embedded Live Frame */}
          {activeTab === 'live' && project.liveUrl && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Embedded Target: {project.liveUrl}</span>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-cyan-400 hover:underline flex items-center gap-1"
                >
                  Open in New Window <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
              <div className="w-full h-96 rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
                <iframe
                  src={project.liveUrl}
                  title={project.name}
                  className="w-full h-full border-0"
                />
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
