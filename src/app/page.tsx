'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { CommandMenu } from '@/components/layout/CommandMenu';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { MetricsBar } from '@/components/sections/MetricsBar';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { CaseStudyModal } from '@/components/sections/CaseStudyModal';
import { InteractionLab } from '@/components/sections/InteractionLab';
import { PhilosophySection } from '@/components/sections/PhilosophySection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { Project } from '@/types';

export default function Home() {
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleOpenProjectById = (projectId: string) => {
    // Find project from verified list
    import('@/data/projects').then(({ verifiedProjects }) => {
      const found = verifiedProjects.find((p) => p.id === projectId);
      if (found) setSelectedProject(found);
    });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation Dock */}
      <Navbar onOpenCommand={() => setIsCommandOpen(true)} />

      {/* Global Command Menu (⌘K) */}
      <CommandMenu
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        onSelectProject={handleOpenProjectById}
      />

      {/* Case Study Deep-Dive Modal */}
      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Main Content Area */}
      <main id="main-content" className="flex-1">
        <Hero
          onExploreWork={() => scrollToSection('projects')}
          onOpenLab={() => scrollToSection('lab')}
          onOpenContact={() => scrollToSection('contact')}
        />

        <MetricsBar />

        <ProjectsSection onOpenDeepDive={(proj) => setSelectedProject(proj)} />

        <InteractionLab />

        <PhilosophySection />

        <ExperienceSection />

        <ContactSection />
      </main>

      {/* Technical Footer */}
      <Footer />
    </div>
  );
}
