'use client';

import React, { useState, useEffect } from 'react';
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
import { LaunchingSoon } from '@/components/maintenance/LaunchingSoon';
import { Project } from '@/types';

export default function Home() {
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isProjectRequestOpen, setIsProjectRequestOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showPhilosophyModal, setShowPhilosophyModal] = useState(false);

  // Private Passcode Gate State
  const [isMounted, setIsMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Check cookie
    const hasCookie = document.cookie.includes('portfolio_preview=dulaj2026');
    // Check URL param ?preview=dulaj2026
    const searchParams = new URLSearchParams(window.location.search);
    const hasParam = searchParams.get('preview')?.toLowerCase() === 'dulaj2026';

    if (hasParam) {
      document.cookie = 'portfolio_preview=dulaj2026; path=/; max-age=2592000; SameSite=Lax';
      // Clean query parameter from URL without reload
      const cleanUrl = window.location.pathname + (window.location.hash || '');
      window.history.replaceState({}, '', cleanUrl);
      setIsAuthenticated(true);
    } else if (hasCookie) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLockPreview = () => {
    document.cookie = 'portfolio_preview=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    setIsAuthenticated(false);
  };

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

  // SSR or unauthenticated holding screen
  if (!isMounted || !isAuthenticated) {
    return <LaunchingSoon onUnlock={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black text-[#1d1d1f] dark:text-[#f5f5f7] selection:bg-[#006ddb]/20 selection:text-[#006ddb]">
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

      {/* Floating Preview Mode Pill */}
      <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-slate-900/90 text-white text-xs backdrop-blur-md shadow-2xl border border-slate-700/60 transition-all hover:bg-slate-900">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="font-semibold text-slate-200">Engineering Preview</span>
        <button
          type="button"
          onClick={handleLockPreview}
          className="ml-1 px-2 py-0.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors text-[11px] font-medium border border-slate-700"
          title="Return to Launching Soon holding screen"
        >
          Lock
        </button>
      </div>
    </div>
  );
}
