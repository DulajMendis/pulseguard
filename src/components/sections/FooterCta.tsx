'use client';

import React from 'react';

interface FooterCtaProps {
  onOpenProjectRequest: () => void;
}

export const FooterCta: React.FC<FooterCtaProps> = ({ onOpenProjectRequest }) => {
  return (
    <section className="py-24 sm:py-36 px-4 sm:px-6 text-center border-t border-slate-200 dark:border-slate-800 bg-[#f8f9fa] dark:bg-[#090a0f]">
      <div className="max-w-4xl mx-auto space-y-8 flex flex-col items-center">
        <h3 className="fluid-gradient-heading text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight max-w-3xl leading-[1.08]">
          Interested in engineering something extraordinary?
        </h3>

        <button
          type="button"
          onClick={onOpenProjectRequest}
          className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-slate-950 text-white dark:bg-white dark:text-slate-950 text-sm font-semibold hover:bg-slate-800 dark:hover:bg-slate-200 transition-all shadow-md hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <span>Start a project request</span>
          <span className="w-4 h-4 rounded-full flex items-center justify-center transform group-hover:translate-x-1 transition-transform">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 20L16 12L8 4" />
            </svg>
          </span>
        </button>
      </div>
    </section>
  );
};
