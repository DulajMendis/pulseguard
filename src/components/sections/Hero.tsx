'use client';

import React from 'react';
import { ArrowRight, Terminal, Sparkles, ShieldCheck, MapPin, Database, Server, Compass, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface HeroProps {
  onExploreWork: () => void;
  onOpenLab: () => void;
  onOpenContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreWork, onOpenLab, onOpenContact }) => {
  return (
    <section
      id="hero"
      className="relative pt-32 pb-20 md:pt-44 md:pb-32 px-4 sm:px-6 overflow-hidden bg-grid-pattern"
    >
      {/* Background glow accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 dark:bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-sky-500/10 dark:bg-sky-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 space-y-8">
        {/* Status Pill */}
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="emerald" pulse size="md">
            Operational · Colombo, Sri Lanka
          </Badge>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Manager of Sustainability & System Administration @ Connaissance De Ceylan
          </span>
        </div>

        {/* Main Display Heading */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.08]">
            Architecting mission-critical travel operations, developer telemetry, and interaction systems.
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl font-normal leading-relaxed">
            I’m <strong className="font-semibold text-slate-900 dark:text-white">Dulaj Mendis</strong>. I design and engineer enterprise-scale software where database integrity, mathematical honesty, and sub-100ms micro-interactions converge.
          </p>
        </div>

        {/* Narrative & Positioning Snippet */}
        <div className="p-5 rounded-2xl glass-panel max-w-3xl space-y-3 border-l-4 border-l-emerald-500 shadow-lg">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-emerald-500 dark:text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            Verified Architecture & Craft
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Lead creator of <strong className="text-slate-900 dark:text-white font-medium">Travex</strong> (the 84,000-line production itinerary studio and DMC operating system powering real tour operations for CDC & TDC), <strong className="text-slate-900 dark:text-white font-medium">PulseGuard</strong> (developer observability cockpit), and the <strong className="text-slate-900 dark:text-white font-medium">Sri Lanka Railway transit network</strong> (422 stops across 1,444 km at railway.dulajmendis.com). Recognized by The Browser Company as an Arc <span className="font-medium text-amber-500 dark:text-amber-400">"Nimble Perfectionist"</span>.
          </p>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Button
            size="lg"
            variant="primary"
            onClick={onExploreWork}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Explore Flagship Systems
          </Button>

          <Button
            size="lg"
            variant="secondary"
            onClick={onOpenLab}
            leftIcon={<Sparkles className="w-4 h-4 text-purple-500 dark:text-purple-400" />}
          >
            Interaction Lab (UX Rules)
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={() => window.open('https://github.com/DulajMendis', '_blank')}
            leftIcon={<Terminal className="w-4 h-4" />}
          >
            GitHub @DulajMendis
          </Button>
        </div>

        {/* Quick Tech Anchor Badges */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800/80 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs font-mono text-slate-500 dark:text-slate-400">
          <span className="font-semibold text-slate-700 dark:text-slate-300">Core Stack:</span>
          <span>NestJS & Node.js</span>
          <span>·</span>
          <span>React 19 & Next.js 16</span>
          <span>·</span>
          <span>PostgreSQL & Prisma 6</span>
          <span>·</span>
          <span>Redis & Docker</span>
          <span>·</span>
          <span>Tailwind CSS</span>
          <span>·</span>
          <span>GIS & Leaflet</span>
        </div>
      </div>
    </section>
  );
};
