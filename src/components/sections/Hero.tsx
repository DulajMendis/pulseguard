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
    <header
      id="hero"
      className="relative pt-36 pb-20 md:pt-48 md:pb-28 px-4 sm:px-6 overflow-hidden text-center bg-white dark:bg-black"
    >
      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
        {/* Headshot / Avatar with Thimira-style pulsating double-ring ripple shadow */}
        <div className="relative mb-10 group cursor-pointer" onClick={onOpenContact}>
          {/* Pulsating Radiating Ripple Rings */}
          <div className="hero-avatar-ripple-1 absolute inset-[-12px] rounded-full border-2 border-[#006ddb]/30 pointer-events-none" />
          <div className="hero-avatar-ripple-2 absolute inset-[-12px] rounded-full border-2 border-[#3eb0ef]/25 pointer-events-none" />

          {/* Core Avatar Frame */}
          <div className="relative w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl bg-white dark:bg-slate-900 mx-auto">
            <Image
              src="/dulaj-mendis.png"
              alt="Headshot of Dulaj Mendis — Systems Architect"
              width={256}
              height={256}
              priority
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* Eyebrow: Name with Verified Blue Checkmark Badge */}
        <h2 className="flex items-center justify-center gap-2 text-2xl sm:text-[26px] font-medium text-[#1d1d1f] dark:text-white mb-4 tracking-[-0.03em]">
          <span>Dulaj Mendis</span>
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block flex-shrink-0">
            <rect width="16" height="16" rx="8" fill="#3eb0ef" />
            <path d="M10.3334 6.44446L6.89587 9.88195L5.33337 8.31946" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </h2>

        {/* Webflow/Figma Inspector Box around Hero Heading */}
        <div className="relative inline-block mb-6 mt-1 px-4 sm:px-6 py-2">
          {/* Pinned Tab */}
          <div className="absolute -top-3 left-4 sm:left-6 flex items-center bg-[#006ddb] text-white text-[10px] sm:text-[11px] font-mono font-bold px-2 py-0.5 rounded-t tracking-wider">
            <span className="mr-1.5 opacity-80">H1</span>
            <span>systems architect</span>
          </div>
          {/* Bounding box outline */}
          <div className="absolute inset-0 border border-[#006ddb]/60 rounded-md pointer-events-none" />

          {/* Editorial PT Serif Heading */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[84px] font-bold tracking-[-0.045em] text-[#1d1d1f] dark:text-white leading-[1.05]">
            Systems Architect &amp; Full-Stack Engineer.
          </h1>
        </div>

        {/* Subtitle Paragraph */}
        <p className="text-xl sm:text-2xl text-[#1d1d1f]/75 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8 tracking-[-0.02em] font-normal">
          World-class operating systems for ambitious enterprises.
        </p>

        {/* Thimira Signature CTA Link */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button
            type="button"
            onClick={onOpenContact}
            className="cta-link text-xl sm:text-2xl font-medium tracking-tight group py-2 px-4"
          >
            <span className="cta-link-text">Start a project request</span>
            <span className="cta-link-icon">
              <svg width="14" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 20L16 12L8 4" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

