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
    <section id="process" className="py-24 sm:py-32 px-4 sm:px-6 bg-[#f5f5f7] dark:bg-[#161617]">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-left space-y-2">
          <h2 className="text-2xl sm:text-[26px] font-medium tracking-[-0.03em] text-[#1d1d1f] dark:text-white">
            Process
          </h2>
          <h3 className="font-sans text-4xl sm:text-6xl md:text-7xl font-bold tracking-[-0.04em] text-[#1d1d1f] dark:text-white leading-[1.05]">
            My workflow to engineer <br />and ship resilient systems.
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
                <div className="text-base font-medium text-[#006ddb] mb-2">
                  {item.step}
                </div>
                <h4 className="font-sans text-2xl sm:text-3xl font-bold tracking-[-0.025em] text-[#1d1d1f] dark:text-white mb-3 leading-snug">
                  {item.title}
                </h4>
                <p className="text-base sm:text-lg text-[#1d1d1f]/75 dark:text-slate-300 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>

              {item.hasConfetti && (
                <div className="pt-6 mt-6 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-400">
                    <CheckCircle className="w-4 h-4" />
                    <span>Verified Production Ready</span>
                  </div>
                  <button
                    type="button"
                    onClick={triggerConfetti}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#006ddb] hover:bg-[#005bb8] text-white text-xs font-semibold transition-all shadow-sm"
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
