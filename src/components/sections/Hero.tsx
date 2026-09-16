'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

interface HeroProps {
  onExploreWork: () => void;
  onOpenLab: () => void;
  onOpenContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreWork, onOpenLab, onOpenContact }) => {
  const scrollWrapRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const heroUiRef = useRef<HTMLImageElement>(null);
  const headingUiRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!scrollWrapRef.current || !heroRef.current) {
            ticking = false;
            return;
          }

          // Disable sticky scaling on mobile/tablet screens (< 992px)
          if (window.innerWidth < 992) {
            heroRef.current.style.transform = '';
            if (heroUiRef.current) heroUiRef.current.style.opacity = '0';
            if (headingUiRef.current) headingUiRef.current.style.opacity = '0';
            ticking = false;
            return;
          }

          const wrapRect = scrollWrapRef.current.getBoundingClientRect();
          const totalScroll = wrapRect.height - window.innerHeight;

          if (totalScroll <= 0) {
            ticking = false;
            return;
          }

          // Progress normalized between 0.0 (top) and 1.0 (end of pinned scroll)
          const currentScroll = -wrapRect.top;
          const progress = Math.min(Math.max(currentScroll / totalScroll, 0), 1);

          // 1. Scale .hero from 1.0 down to 0.36
          const scale = 1 - progress * (1 - 0.36);
          heroRef.current.style.transform = `scale(${scale.toFixed(4)})`;

          // 2. hero-ui (monitor) & hero-heading-ui (inspector tab) fade in from 0 to 1 over first 20%
          const uiOpacity = Math.min(progress / 0.20, 1);
          if (heroUiRef.current) {
            heroUiRef.current.style.opacity = uiOpacity.toFixed(3);
          }
          if (headingUiRef.current) {
            headingUiRef.current.style.opacity = uiOpacity.toFixed(3);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div id="hero" ref={scrollWrapRef} className="hero-scroll-wrap">
      <div className="sticky-wrap sticky-wrap--hero">
        <div className="overflow-wrap">
          <header ref={heroRef} className="hero">
            {/* Desktop Monitor Frame - Fades in and frames the interface as you scroll */}
            <img
              ref={heroUiRef}
              src="/hero-ui.webp"
              alt="Desktop Display Frame"
              className="hero-ui"
              loading="eager"
            />

            {/* Centered Portfolio Container */}
            <div className="container container--hero">
              {/* Headshot / Avatar with Thimira-exact glowing radial multi-shadow */}
              <div
                className="hero-img-wrap group cursor-pointer"
                onClick={onOpenContact}
              >
                <div className="hero-img-container">
                  <Image
                    src="/dulaj-mendis.png"
                    alt="Headshot of Dulaj Mendis — Systems Architect"
                    width={320}
                    height={320}
                    priority
                    className="hero-img group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                {/* Multi-color Radiant Aura Shadows */}
                <div id="hero-img-shadow-1" className="hero-img-shadow-wrap">
                  <div className="hero-img-shadow" />
                </div>
                <div id="hero-img-shadow-2" className="hero-img-shadow-wrap hero-img-shadow-wrap--intro">
                  <div className="hero-img-shadow" />
                </div>
              </div>

              {/* Hero Header Typography */}
              <div className="hero__header">
                {/* Eyebrow: Name with Verified Checkmark Badge */}
                <h2 className="hero-eyebrow">
                  <span>Dulaj Mendis</span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="inline-block flex-shrink-0"
                  >
                    <rect width="16" height="16" rx="8" fill="#3eb0ef" />
                    <path
                      d="M10.3334 6.44446L6.89587 9.88195L5.33337 8.31946"
                      stroke="#FFFFFF"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </h2>

                {/* Webflow/Figma Inspector Box around Hero Heading */}
                <div className="hero-heading-ui-wrap">
                  <div ref={headingUiRef} className="hero-heading-ui">
                    <div className="hero-heading-ui-tab">
                      <span className="hero-heading-ui-tab-h1">H1</span>
                      <span>systems architect</span>
                    </div>
                  </div>
                  <h1 className="hero-heading">
                    Systems Architect &amp;<br className="hidden sm:inline" />Full-Stack Engineer.
                  </h1>
                </div>

                {/* Subtitle Paragraph */}
                <p className="hero-paragraph-mobile">
                  World-class operating systems for ambitious enterprises.
                </p>

                {/* Thimira Signature CTA Link */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={onOpenContact}
                    className="cta-link cta-link--hero group"
                  >
                    <span className="cta-link-text">Start a project request</span>
                    <span className="cta-link-icon cta-link-icon--hero">
                      <svg
                        width="14"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M8 20L16 12L8 4" />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </header>
        </div>
      </div>

      {/* Sticky Gap: provides the scroll travel distance for the monitor zoom interaction */}
      <div className="sticky-gap" />
    </div>
  );
};

