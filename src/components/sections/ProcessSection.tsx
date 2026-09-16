'use client';

import React, { useState } from 'react';
import { Sparkles, CheckCircle, ArrowRight } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const [confettiActive, setConfettiActive] = useState(false);

  const triggerConfetti = () => {
    setConfettiActive(true);
    setTimeout(() => setConfettiActive(false), 3000);
  };

  const steps = [
    {
      step: 'Step 1',
      title: 'System Discovery & Operational Reality',
      description:
        'Every mission begins with domain immersion. We examine dispatch bottlenecks, concurrency targets, and data invariants directly with operational stakeholders before architecting schemas.',
    },
    {
      step: 'Step 2',
      title: 'Architecture & Invariant Modeling',
      description:
        'Data integrity is non-negotiable. We model relational structures (PostgreSQL / Prisma), establish guarded state machines, define integer currency kernels, and map explicit failure boundaries.',
    },
    {
      step: 'Step 3',
      title: 'Core Implementation & Type Contracts',
      description:
        'Implementation proceeds with strict TypeScript across full-stack boundaries (NestJS, React 19, Next.js). Every API endpoint is backed by deterministic validation and clean separation of concerns.',
    },
    {
      step: 'Step 4',
      title: 'Stress Testing & Hardening',
      description:
        'Before release, systems face rigorous automated test suites, rate-limiter validations, concurrent query audits, and sub-100ms interaction latency verification.',
    },
    {
      step: 'Step 5',
      title: 'Production Launch & Telemetry',
      description:
        'Zero-downtime deployment to global Anycast edge networks, paired with synthetic heartbeat monitoring, SSL auto-renewal, and continuous observability.',
      hasConfetti: true,
    },
  ];

  return (
    <section id="process" className="py-24 sm:py-32 px-4 sm:px-6 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-left space-y-2">
          <div className="text-xs font-semibold tracking-wider uppercase text-blue-600 dark:text-blue-400 font-mono">
            Process
          </div>
          <h3 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950 dark:text-white leading-tight">
            My workflow to architect<br />and ship resilient systems.
          </h3>
        </div>

        {/* Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className={`intro-card !p-8 flex flex-col justify-between ${
                item.hasConfetti ? 'md:col-span-2 lg:col-span-2 bg-gradient-to-br from-white to-blue-50/40 dark:from-slate-900 dark:to-blue-950/20' : ''
              }`}
            >
              <div>
                <div className="text-xs font-bold font-mono text-blue-600 dark:text-blue-400 mb-2">
                  {item.step}
                </div>
                <h4 className="text-xl font-bold tracking-tight text-slate-950 dark:text-white mb-3">
                  {item.title}
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {item.hasConfetti && (
                <div className="pt-6 mt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-400">
                    <CheckCircle className="w-4 h-4" />
                    <span>Verified Production Ready</span>
                  </div>
                  <button
                    type="button"
                    onClick={triggerConfetti}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-all shadow-sm"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{confettiActive ? '🎉 Deployed!' : 'Simulate Launch'}</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
