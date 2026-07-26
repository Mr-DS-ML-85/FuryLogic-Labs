import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProjectsGrid } from './components/ProjectsGrid';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { PapersSection } from './components/PapersSection';
import { BenchmarksSection } from './components/BenchmarksSection';
import { Footer } from './components/Footer';
import { ProjectItem } from './types';

export function App() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] flex flex-col font-sans selection:bg-[var(--accent)] selection:text-black">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <ProjectsGrid onSelectProject={(proj) => setSelectedProject(proj)} />
        <PapersSection />
        <BenchmarksSection />
      </main>
      <Footer />
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}

export default App;
