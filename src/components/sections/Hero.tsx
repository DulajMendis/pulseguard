'use client';

import React from 'react';
import Image from 'next/image';

interface HeroProps {
  onExploreWork: () => void;
  onOpenLab: () => void;
  onOpenContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreWork, onOpenLab, onOpenContact }) => {
  return (
    <section
      id="hero"
      className="relative pt-36 pb-20 md:pt-48 md:pb-28 px-4 sm:px-6 overflow-hidden text-center"
    >
      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
        {/* Headshot / Avatar with Thimira-style layered shadow */}
        <div className="relative mb-6 group cursor-pointer" onClick={onOpenContact}>
          {/* Layered soft shadow glow */}
          <div className="absolute -inset-2 bg-gradient-to-tr from-blue-500/20 to-emerald-500/20 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition-opacity" />
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-xl bg-slate-100 dark:bg-slate-800">
            <Image
              src="/dulaj-mendis.png"
              alt="Dulaj Mendis — Systems Architect"
              width={144}
              height={144}
              priority
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        {/* Eyebrow: Name with Verified Tick */}
        <h2 className="flex items-center justify-center gap-2 text-sm sm:text-base font-semibold text-slate-900 dark:text-white mb-3">
          Dulaj Mendis
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block flex-shrink-0">
            <rect width="16" height="16" rx="8" fill="#3eb0ef" />
            <path d="M10.3334 6.44446L6.89587 9.88195L5.33337 8.31946" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </h2>

        {/* UI Inspector Tag Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 text-xs font-mono text-slate-600 dark:text-slate-300 mb-4">
          <span className="px-1.5 py-0.2 rounded bg-blue-500 text-white font-bold text-[10px]">H1</span>
          <span>systems architect</span>
        </div>

        {/* Hero Main Heading */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-950 dark:text-white leading-[1.06] mb-6">
          Systems Architect &amp; Full-Stack Engineer.
        </h1>

        {/* Subtitle Paragraph */}
        <p className="text-lg sm:text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8">
          Mission-critical DMC operating systems, high-throughput backend architecture, and resilient distributed platforms for ambitious operations.
        </p>

        {/* Primary CTA */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            type="button"
            onClick={onOpenContact}
            className="group flex items-center gap-3 px-8 py-4 rounded-full bg-slate-950 text-white dark:bg-white dark:text-slate-950 text-sm font-semibold hover:bg-slate-800 dark:hover:bg-slate-200 transition-all shadow-md hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <span>Start a project request</span>
            <span className="w-4 h-4 rounded-full flex items-center justify-center transform group-hover:translate-x-1 transition-transform">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 20L16 12L8 4" />
              </svg>
            </span>
          </button>

          <button
            type="button"
            onClick={onExploreWork}
            className="px-6 py-4 rounded-full text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition-colors"
          >
            Explore Systems ↓
          </button>
        </div>
      </div>
    </section>
  );
};
