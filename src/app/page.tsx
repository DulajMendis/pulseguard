'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { CommandMenu } from '@/components/layout/CommandMenu';
import { Footer } from '@/components/layout/Footer';
import CustomCursor from '@/components/ui/CustomCursor';
import { Hero } from '@/components/sections/Hero';
import { ManifestoSection } from '@/components/sections/ManifestoSection';
import { BentoGrid } from '@/components/sections/BentoGrid';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { CaseStudyModal } from '@/components/sections/CaseStudyModal';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { FaqSection } from '@/components/sections/FaqSection';
import { FooterCta } from '@/components/sections/FooterCta';
import { ProjectRequestModal } from '@/components/sections/ProjectRequestModal';
import { PhilosophySection } from '@/components/sections/PhilosophySection';
import { Project } from '@/types';

export default function Home() {
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isProjectRequestOpen, setIsProjectRequestOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showPhilosophyModal, setShowPhilosophyModal] = useState(false);

  const handleOpenProjectById = (projectId: string) => {
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
    <div className="flex flex-col min-h-screen bg-[#f8f9fa] dark:bg-[#090a0f] text-slate-900 dark:text-slate-100 selection:bg-blue-500/20 selection:text-blue-600">
      {/* Magnetic Desktop Cursor */}
      <CustomCursor />

      {/* Top Navbar */}
      <Navbar
        onOpenCommand={() => setIsCommandOpen(true)}
        onOpenProjectRequest={() => setIsProjectRequestOpen(true)}
      />

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

      {/* Multi-Step Project Request Modal */}
      <ProjectRequestModal
        isOpen={isProjectRequestOpen}
        onClose={() => setIsProjectRequestOpen(false)}
      />

      {/* Main Content Sections */}
      <main id="main-content" className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onExploreWork={() => scrollToSection('projects')}
          onOpenLab={() => scrollToSection('benefits')}
          onOpenContact={() => setIsProjectRequestOpen(true)}
        />

        {/* 2. Manifesto Giant Typography */}
        <ManifestoSection />

        {/* 3. 11-Cell Signature Bento Grid */}
        <BentoGrid
          onOpenPrinciples={() => setShowPhilosophyModal(true)}
          onOpenProjectRequest={() => setIsProjectRequestOpen(true)}
        />

        {/* 4. Curated Projects Showcase */}
        <ProjectsSection onOpenDeepDive={(proj) => setSelectedProject(proj)} />

        {/* 5. 5-Step Systems Process */}
        <ProcessSection />

        {/* 6. Signature 3D Flip Card FAQ Grid */}
        <FaqSection />

        {/* Optional Expandable Mantras Section */}
        {showPhilosophyModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in">
            <div className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-3xl bg-white dark:bg-slate-900 p-8 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6">
              <button
                type="button"
                onClick={() => setShowPhilosophyModal(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white"
              >
                ✕
              </button>
              <PhilosophySection />
            </div>
          </div>
        )}

        {/* 7. Footer Fluid Heading CTA */}
        <FooterCta onOpenProjectRequest={() => setIsProjectRequestOpen(true)} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
