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
    <div className="min-h-screen bg-[#050507] text-zinc-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-black">
      
      {/* Navigation Header */}
      <Navbar />

      {/* Main Landing Page Flow */}
      <main className="flex-1">
        
        {/* Hero Section with Interactive 3D Model Canvas */}
        <HeroSection />

        {/* Project Matrix Showcase */}
        <ProjectsGrid
          onSelectProject={(proj) => setSelectedProject(proj)}
        />

        {/* Peer-Reviewed Academic Papers (Zenodo) */}
        <PapersSection />

        {/* Microsecond Benchmarks & Corporate Pillars */}
        <BenchmarksSection />

      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Modals */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

    </div>
  );
}

export default App;
