'use client';

import React from 'react';

interface FooterCtaProps {
  onOpenProjectRequest: () => void;
}

export const FooterCta: React.FC<FooterCtaProps> = ({ onOpenProjectRequest }) => {
  return (
    <section className="py-24 sm:py-36 px-4 sm:px-6 text-center bg-white dark:bg-black">
      <div className="max-w-5xl mx-auto space-y-10 flex flex-col items-center">
        <h3 className="fluid-gradient-heading text-5xl sm:text-7xl md:text-8xl lg:text-[96px] font-bold tracking-[-0.045em] max-w-4xl leading-[1.02]">
          Interested in<br />working with me?
        </h3>

        <button
          type="button"
          onClick={onOpenProjectRequest}
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
    </section>
  );
};

