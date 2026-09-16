'use client';

import React from 'react';
import { engineeringPrinciples } from '@/data/principles';
import { ShieldCheck, Award, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export const PhilosophySection: React.FC = () => {
  return (
    <section id="principles" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto space-y-16">
      {/* Section Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          <ShieldCheck className="w-4 h-4" />
          Systems Ethos & Core Mantras
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Principles refined under operational production pressure.
        </h2>
        <p className="text-base text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
          I do not believe in synthetic complexity or superficial metrics. High-performing software is built on mathematical honesty, immutable state snapshots, and empathetic human workflows.
        </p>
      </div>

      {/* Recognition Callout: Arc Nimble Perfectionist */}
      <div className="p-6 md:p-8 rounded-3xl glass-panel border border-amber-500/30 bg-gradient-to-r from-amber-500/5 via-slate-900/40 to-transparent relative overflow-hidden shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="amber" size="sm">
                The Browser Company Milestone
              </Badge>
              <span className="text-xs font-mono text-slate-400">17 Feb 2024</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-6 h-6 text-amber-500 shrink-0" />
              Arc Browser: Nimble Perfectionist
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              Awarded during Arc's 1-year anniversary for relentless dedication to interaction precision, ergonomic tab workflows, and finding edge cases where microseconds matter.
            </p>
          </div>

          <div className="px-5 py-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs flex items-center gap-3 shrink-0">
            <span className="text-2xl font-black">100%</span>
            <div className="leading-tight">
              <div className="font-bold">CRAFT STANDARD</div>
              <div className="text-[10px] opacity-75">No compromise on polish</div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Core Engineering Principles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {engineeringPrinciples.map((principle, idx) => (
          <div
            key={principle.id}
            className="p-6 md:p-8 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800/80 space-y-4 hover:border-emerald-500/40 transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-emerald-500 uppercase tracking-wider font-semibold">
                Principle 0{idx + 1}
              </span>
              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800">
                {principle.source}
              </span>
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                {principle.title}
              </h3>
              <p className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-medium mt-1">
                "{principle.mantra}"
              </p>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {principle.description}
            </p>

            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-500 dark:text-slate-400 flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
              <span>Implementation: {principle.practice}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
