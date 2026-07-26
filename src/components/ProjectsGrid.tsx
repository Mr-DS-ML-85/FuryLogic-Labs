import React from 'react';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { PROJECTS_DATA } from '../data/projectsData';
import { ProjectItem } from '../types';

interface ProjectsGridProps {
  onSelectProject: (project: ProjectItem) => void;
}

export const ProjectsGrid: React.FC<ProjectsGridProps> = ({ onSelectProject }) => {
  return (
    <section id="projects" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Projects
          </h2>
          <p className="text-[var(--text-muted)] mt-3 text-sm sm:text-base">
            7 open-source repositories across databases, AI gateways, kernels, and inference.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PROJECTS_DATA.map((project) => (
            <div
              key={project.id}
              className="group p-5 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] hover:border-[var(--border-hover)] transition-all cursor-pointer"
              onClick={() => onSelectProject(project)}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-base font-semibold text-white group-hover:text-[var(--accent)] transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">
                    {project.categoryLabel}
                  </p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors shrink-0 mt-1" />
              </div>

              <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-4 line-clamp-3">
                {project.tagline}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.techStack.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded text-[10px] font-medium bg-zinc-800/50 text-zinc-400 border border-zinc-700/50"
                  >
                    {tech}
                  </span>
                ))}
                {project.techStack.length > 4 && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-medium text-zinc-500">
                    +{project.techStack.length - 4}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1 hover:text-white transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  Source
                </a>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1 hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Live
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
