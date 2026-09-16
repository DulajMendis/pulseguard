'use client';

import React, { useState } from 'react';
import { ShieldCheck, Cpu, Zap, Database, Layers, CheckCircle2, Terminal, ArrowUpRight, Gauge, MousePointer2, ArrowRight } from 'lucide-react';

interface BentoGridProps {
  onOpenPrinciples: () => void;
  onOpenProjectRequest: () => void;
}

export const BentoGrid: React.FC<BentoGridProps> = ({ onOpenPrinciples, onOpenProjectRequest }) => {
  // Mini interactive state for UX lab card
  const [dohertyState, setDohertyState] = useState<'idle' | 'optimistic' | 'standard'>('idle');
  const [activeMenuDemo, setActiveMenuDemo] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 40, y: 30, flipped: false });

  const triggerMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    const shouldFlip = clickX > rect.width - 140;
    setMenuPosition({ x: clickX, y: clickY, flipped: shouldFlip });
    setActiveMenuDemo(true);
  };

  const runDohertyTest = (type: 'optimistic' | 'standard') => {
    setDohertyState(type);
    setTimeout(() => setDohertyState('idle'), type === 'optimistic' ? 200 : 800);
  };

  const integrations = [
    { name: 'NestJS', role: 'Enterprise Backend' },
    { name: 'React 19', role: 'Concurrent UI' },
    { name: 'Next.js 16', role: 'Edge & Full-Stack' },
    { name: 'PostgreSQL 16', role: 'ACID Relational Core' },
    { name: 'Prisma 6', role: 'Type-Safe ORM' },
    { name: 'Cloudflare R2', role: 'Global Asset Edge' },
    { name: 'Redis', role: 'Distributed Queues' },
    { name: 'Docker', role: 'Containerization' },
  ];

  const marqueeItems = [
    'Connaissance De Ceylan (CDC)',
    'Travex DMC Operating System',
    'PulseGuard Observability',
    'Sri Lanka Railway Transit GIS',
    'Experience Udawalawe',
    'Ceylon 1850',
    'Owen Rich Hotel & Logistics',
  ];

  return (
    <section id="benefits" className="py-24 sm:py-32 px-4 sm:px-6 bg-[#f5f5f7] dark:bg-[#161617]">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-left space-y-2">
          <h2 className="text-2xl sm:text-[26px] font-medium tracking-[-0.03em] text-[#1d1d1f] dark:text-white">
            Benefits
          </h2>
          <h3 className="font-sans text-4xl sm:text-6xl md:text-7xl font-bold tracking-[-0.04em] text-[#1d1d1f] dark:text-white leading-[1.05]">
            Your perfect systems <br />and engineering partner.
          </h3>
        </div>

        {/* Bento Grid Layout matching thimirathenuwara.com */}
        <div className="grid grid-cols-12 gap-5">
          {/* Cell 1: Bio Card (6 cols) */}
          <div className="col-span-12 lg:col-span-6 intro-card flex flex-col justify-between">
            <div className="space-y-4">
              <h4 className="font-sans text-2xl sm:text-3xl font-bold tracking-[-0.025em] text-[#1d1d1f] dark:text-white leading-[1.2]">
                Systems Architect at the intersection of infrastructure, resilience, and product.
              </h4>
              <p className="text-base sm:text-lg text-[#1d1d1f]/75 dark:text-slate-300 leading-relaxed font-normal">
                Hi! I am <strong className="font-semibold text-[#1d1d1f] dark:text-white">Dulaj Mendis</strong> from Colombo, Sri Lanka. Manager of Sustainability &amp; System Administration at <strong>Connaissance De Ceylan (CDC)</strong>. I design and build production-grade operating systems, transactional DMC platforms, and developer observability tooling with mathematical rigor, type-safe API contracts, and sub-100ms response times.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center gap-2 text-xs font-mono text-[#1d1d1f]/60 dark:text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>CDC Travel Group · Travex Core Architecture</span>
            </div>
          </div>

          {/* Cell 2: 4 Stats Cards in 2x2 Grid (6 cols) - 4 Accent Colors from Screen Recording */}
          <div className="col-span-12 lg:col-span-6 grid grid-cols-2 gap-4">
            {/* Stat 1: Emerald Green 84k+ */}
            <div className="intro-card !p-6 sm:!p-8 flex flex-col justify-center">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl sm:text-5xl font-bold tracking-tight text-emerald-500">84k</span>
                <span className="text-2xl font-bold text-emerald-500">+</span>
              </div>
              <div className="text-xs font-medium text-[#1d1d1f]/60 dark:text-slate-400 mt-1">
                Lines of Production Code
              </div>
            </div>

            {/* Stat 2: Bright Blue 58 Models */}
            <div className="intro-card !p-6 sm:!p-8 flex flex-col justify-center">
              <div className="flex items-baseline gap-1.5">
                <span className="text-4xl sm:text-5xl font-bold tracking-tight text-[#006ddb]">58</span>
                <span className="text-xl sm:text-2xl font-bold text-[#006ddb]">Models</span>
              </div>
              <div className="text-xs font-medium text-[#1d1d1f]/60 dark:text-slate-400 mt-1">
                Prisma Relational Schema
              </div>
            </div>

            {/* Stat 3: Purple 237+ */}
            <div className="intro-card !p-6 sm:!p-8 flex flex-col justify-center">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl sm:text-5xl font-bold tracking-tight text-purple-500">237</span>
                <span className="text-2xl font-bold text-purple-500">+</span>
              </div>
              <div className="text-xs font-medium text-[#1d1d1f]/60 dark:text-slate-400 mt-1">
                Production API Endpoints
              </div>
            </div>

            {/* Stat 4: Warm Coral / Orange 100% */}
            <div className="intro-card !p-6 sm:!p-8 flex flex-col justify-center">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl sm:text-5xl font-bold tracking-tight text-orange-500">100</span>
                <span className="text-2xl font-bold text-orange-500">%</span>
              </div>
              <div className="text-xs font-medium text-[#1d1d1f]/60 dark:text-slate-400 mt-1">
                Data &amp; Claim Authenticity
              </div>
            </div>
          </div>

          {/* Cell 3: Vibrant Coral-to-Purple Gradient Card — Stunning UI/UX (Full Width) */}
          <div className="col-span-12 intro-card intro-grid-cell--animation text-white !p-8 sm:!p-12 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-4">
                <h4 className="font-sans text-4xl sm:text-5xl font-bold tracking-[-0.03em] text-white leading-none">
                  Stunning<br />UI/UX.
                </h4>
                <p className="text-base sm:text-lg text-white/90 font-normal leading-relaxed">
                  Sub-100ms Doherty threshold response, collision-aware context menus, and tactile feedback. Every interaction feels instant and alive.
                </p>
                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => runDohertyTest('optimistic')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      dohertyState === 'optimistic' ? 'bg-white text-slate-950 shadow' : 'bg-black/20 text-white hover:bg-black/30'
                    }`}
                  >
                    ⚡ 45ms Optimistic
                  </button>
                  <button
                    type="button"
                    onClick={() => runDohertyTest('standard')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      dohertyState === 'standard' ? 'bg-amber-400 text-slate-950 shadow' : 'bg-black/20 text-white hover:bg-black/30'
                    }`}
                  >
                    ⏳ 750ms Latency
                  </button>
                </div>
              </div>

              {/* Interactive Context Area */}
              <div className="lg:col-span-7">
                <div
                  onContextMenu={triggerMenu}
                  className="relative w-full h-56 sm:h-64 rounded-2xl bg-black/25 backdrop-blur-md border border-white/20 overflow-hidden flex items-center justify-center p-4 cursor-crosshair select-none"
                >
                  <div className="text-center space-y-1.5">
                    <MousePointer2 className="w-6 h-6 text-white/80 mx-auto animate-bounce" />
                    <div className="text-xs font-mono font-medium text-white/90">
                      Right-click anywhere to trigger collision-flipping menu
                    </div>
                    <div className="text-[11px] font-mono text-emerald-300">
                      Doherty Benchmark: {dohertyState === 'idle' ? 'Optimal (<100ms)' : dohertyState === 'optimistic' ? '⚡ 45ms Instant State Flush' : '⏳ 750ms Blocking Network Roundtrip'}
                    </div>
                  </div>

                  {activeMenuDemo && (
                    <div
                      className="absolute p-1.5 rounded-xl bg-white text-slate-950 shadow-2xl border border-slate-200 text-xs w-40 space-y-0.5 animate-fade-in z-20"
                      style={{
                        top: Math.min(menuPosition.y, 140),
                        left: menuPosition.flipped ? Math.max(menuPosition.x - 160, 10) : menuPosition.x,
                      }}
                      onClick={() => setActiveMenuDemo(false)}
                    >
                      <div className="px-2.5 py-1 text-[10px] font-mono text-slate-500 border-b border-slate-100">
                        {menuPosition.flipped ? '← Boundary Flipped' : 'Standard Alignment →'}
                      </div>
                      <div className="px-2.5 py-1.5 rounded-lg hover:bg-slate-100 font-medium cursor-pointer">
                        Inspect System State
                      </div>
                      <div className="px-2.5 py-1.5 rounded-lg hover:bg-slate-100 font-medium cursor-pointer">
                        Export Telemetry JSON
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Cell 4: Deep Teal/Emerald Gradient Card — Pixel-Perfect Development (5 cols) */}
          <div className="col-span-12 lg:col-span-5 intro-card intro-card--pixel text-white flex flex-col justify-center items-center text-center !p-10 min-h-[300px]">
            <h4 className="font-sans text-3xl sm:text-4xl font-bold tracking-[-0.025em] text-white leading-tight">
              Pixel-Perfect<br />Development.
            </h4>
            <p className="text-sm text-white/80 mt-3 max-w-xs font-normal">
              Zero design-to-production deviation with mathematical typography, sub-pixel grid alignment, and verified CSS invariants.
            </p>
          </div>

          {/* Cell 5: Responsive Design with Mac, iPad & iPhone Frames (7 cols) */}
          <div className="col-span-12 lg:col-span-7 intro-card !p-8 sm:!p-10 flex flex-col justify-between overflow-hidden">
            <div className="space-y-1">
              <h4 className="font-sans text-2xl sm:text-3xl font-bold tracking-[-0.025em] text-[#1d1d1f] dark:text-white">
                Responsive Design.
              </h4>
              <p className="text-sm text-[#1d1d1f]/60 dark:text-slate-400 font-normal">
                Deterministic fluid layouts scaled across Studio Displays, MacBooks, iPads, and mobile viewports.
              </p>
            </div>

            {/* Device Frames Mockup (Monitor, iPad, iPhone) */}
            <div className="relative mt-8 h-48 sm:h-56 flex items-end justify-center">
              {/* Studio Display / Monitor Frame (Background) */}
              <div className="w-[85%] sm:w-[75%] h-[90%] rounded-t-xl bg-slate-900 border-t-4 border-x-4 border-slate-700 shadow-xl overflow-hidden flex flex-col">
                <div className="h-5 bg-slate-800 border-b border-slate-700 px-2 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-[9px] font-mono text-slate-400 ml-2">dulajmendis.com — 4K Workspace</span>
                </div>
                <div className="flex-1 bg-white dark:bg-slate-950 p-3 space-y-2">
                  <div className="h-3 w-1/3 bg-slate-200 dark:bg-slate-800 rounded" />
                  <div className="h-2 w-2/3 bg-slate-100 dark:bg-slate-800/60 rounded" />
                  <div className="grid grid-cols-3 gap-2 pt-2">
                    <div className="h-10 rounded bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800" />
                    <div className="h-10 rounded bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800" />
                    <div className="h-10 rounded bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800" />
                  </div>
                </div>
              </div>

              {/* iPad / Tablet Frame (Overlapping Left) */}
              <div className="absolute left-2 sm:left-6 bottom-0 w-[42%] sm:w-[38%] h-[80%] rounded-t-lg bg-slate-900 border-t-2 border-x-2 border-slate-600 shadow-2xl overflow-hidden flex flex-col z-10">
                <div className="h-4 bg-slate-800 border-b border-slate-700 px-1.5 flex items-center justify-between">
                  <span className="text-[8px] font-mono text-slate-300">iPad Pro 11″</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </div>
                <div className="flex-1 bg-white dark:bg-slate-950 p-2 space-y-1.5">
                  <div className="h-2 w-1/2 bg-blue-500/20 rounded" />
                  <div className="h-1.5 w-3/4 bg-slate-200 dark:bg-slate-800 rounded" />
                  <div className="grid grid-cols-2 gap-1 pt-1">
                    <div className="h-8 rounded bg-slate-100 dark:bg-slate-800" />
                    <div className="h-8 rounded bg-slate-100 dark:bg-slate-800" />
                  </div>
                </div>
              </div>

              {/* iPhone Frame (Overlapping Right) */}
              <div className="absolute right-2 sm:right-8 bottom-0 w-[22%] sm:w-[20%] h-[70%] rounded-t-lg bg-slate-900 border-t-2 border-x-2 border-slate-600 shadow-2xl overflow-hidden flex flex-col z-20">
                <div className="h-3.5 bg-slate-800 border-b border-slate-700 px-1 flex items-center justify-center">
                  <span className="w-5 h-1 rounded-full bg-slate-950" />
                </div>
                <div className="flex-1 bg-white dark:bg-slate-950 p-1.5 space-y-1">
                  <div className="h-1.5 w-2/3 bg-slate-300 dark:bg-slate-700 rounded" />
                  <div className="h-6 rounded bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    <span className="text-[7px] font-mono text-emerald-600 font-bold">100% Mobile</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cell 6: Custom Integrations (6 cols) */}
          <div className="col-span-12 lg:col-span-6 intro-card !p-8 flex flex-col justify-between">
            <div>
              <h4 className="font-sans text-2xl sm:text-3xl font-bold tracking-[-0.025em] text-[#1d1d1f] dark:text-white mb-2">
                Custom Integrations.
              </h4>
              <p className="text-sm text-[#1d1d1f]/60 dark:text-slate-400 mb-6 font-normal">
                Battle-tested tools powering high-throughput enterprise systems.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {integrations.map((item) => (
                <div
                  key={item.name}
                  className="p-3 rounded-2xl bg-[#f5f5f7] dark:bg-slate-800/60 border border-black/[0.06] dark:border-white/[0.08] flex flex-col justify-center"
                >
                  <span className="text-xs font-bold text-[#1d1d1f] dark:text-white">{item.name}</span>
                  <span className="text-[10px] font-mono text-[#1d1d1f]/60 dark:text-slate-400 mt-0.5">{item.role}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cell 7: Clean Code snippet (3 cols) */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-3 intro-card !p-6 flex flex-col justify-between">
            <h4 className="font-sans text-base font-bold text-[#1d1d1f] dark:text-white mb-2">
              Clean code &amp; invariants
            </h4>
            <div className="p-3 rounded-xl bg-slate-900 text-slate-200 font-mono text-[11px] leading-relaxed overflow-x-auto">
              <span className="text-purple-400">model</span> Itinerary &#123;<br />
              &nbsp;&nbsp;id &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">String</span> @id<br />
              &nbsp;&nbsp;version &nbsp;&nbsp;<span className="text-blue-400">Int</span> &nbsp;&nbsp;&nbsp;@default(1)<br />
              &nbsp;&nbsp;pricing &nbsp;&nbsp;<span className="text-blue-400">Int</span> &nbsp;&nbsp;&nbsp;<span className="text-emerald-400">// cents kernel</span><br />
              &#125;
            </div>
          </div>

          {/* Cell 8: Giant "Weeks" Delivery Velocity (3 cols) */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-3 intro-card !p-6 flex flex-col justify-center items-center text-center">
            <div className="text-slate-400 line-through text-xs font-mono decoration-rose-500 decoration-2 mb-1">
              Months of scope creep
            </div>
            <div className="fluid-gradient-heading text-5xl sm:text-6xl font-extrabold my-1 leading-tight">
              Weeks
            </div>
            <div className="text-xs font-medium text-[#1d1d1f]/70 dark:text-slate-400 mt-1">
              To production launch
            </div>
          </div>

          {/* Cell 9: Scalable Systems & Rising Metric Bars (6 cols, matching frame_021s.jpg) */}
          <div className="col-span-12 lg:col-span-6 intro-card !p-8 flex flex-col justify-between">
            <h4 className="font-sans text-2xl sm:text-3xl font-bold tracking-[-0.025em] text-[#1d1d1f] dark:text-white mb-2">
              Scalable Systems &amp; Distributed Queues.
            </h4>
            <div className="pt-6 pb-2 flex items-end justify-between gap-3 sm:gap-4 h-36">
              <div className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                <div className="w-full bg-gradient-to-t from-[#006ddb] to-[#3eb0ef] rounded-t-lg h-[30%]" />
                <span className="text-[10px] font-mono text-slate-500">10k ops</span>
              </div>
              <div className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                <div className="w-full bg-gradient-to-t from-[#006ddb] to-[#3eb0ef] rounded-t-lg h-[50%]" />
                <span className="text-[10px] font-mono text-slate-500">25k ops</span>
              </div>
              <div className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                <div className="w-full bg-gradient-to-t from-[#006ddb] to-[#3eb0ef] rounded-t-lg h-[72%]" />
                <span className="text-[10px] font-mono text-slate-500">50k ops</span>
              </div>
              <div className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                <div className="w-full bg-gradient-to-t from-[#006ddb] to-[#3eb0ef] rounded-t-lg h-[90%]" />
                <span className="text-[10px] font-mono text-slate-500">80k ops</span>
              </div>
              <div className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                <div className="w-full bg-gradient-to-t from-[#006ddb] to-emerald-400 rounded-t-lg h-[100%]" />
                <span className="text-[10px] font-mono text-emerald-500 font-bold">100k ops</span>
              </div>
            </div>
            <div className="pt-4 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between text-xs font-mono text-slate-500">
              <span>Redis Cluster + PostgreSQL 16</span>
              <span className="text-emerald-500 font-bold">99.98% High Availability</span>
            </div>
          </div>

          {/* Cell 10: Clients that speak for themselves (6 cols, matching frame_021s.jpg) */}
          <div className="col-span-12 lg:col-span-6 intro-card !p-8 flex flex-col justify-between overflow-hidden">
            <div>
              <h4 className="font-sans text-2xl sm:text-3xl font-bold tracking-[-0.025em] text-[#1d1d1f] dark:text-white mb-2">
                Clients that speak for themselves.
              </h4>
              <p className="text-sm text-[#1d1d1f]/60 dark:text-slate-400 mb-6 font-normal">
                Enterprise operations, destination managers, and verified production systems.
              </p>
            </div>
            <div className="relative w-full overflow-hidden py-3 mask-marquee">
              <div className="flex w-max animate-marquee gap-6 items-center text-sm font-semibold text-slate-800 dark:text-slate-200">
                {marqueeItems.concat(marqueeItems).map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#f5f5f7] dark:bg-slate-800/60 border border-black/[0.06] dark:border-white/[0.08] whitespace-nowrap">
                    <span className="w-2 h-2 rounded-full bg-[#006ddb]" />
                    <span className="text-[#1d1d1f] dark:text-white font-medium text-xs sm:text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Cell 11: 8 Architectural Rules Banner Card (Full Width, matching frame_021s.jpg) */}
          <div className="col-span-12 intro-card !p-8 sm:!p-10 bg-gradient-to-r from-[#eb4f56] via-[#b854a8] to-[#9d66e9] text-white flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <div className="text-xs font-mono text-white/80 font-bold uppercase tracking-wider">
                Engineering Discipline &amp; Architecture
              </div>
              <h4 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-white">
                8 architectural rules for mission-critical systems.
              </h4>
            </div>
            <button
              type="button"
              onClick={onOpenPrinciples}
              className="px-6 py-3 rounded-full bg-white text-slate-900 font-semibold text-sm hover:bg-slate-100 transition-all flex items-center gap-2 flex-shrink-0 shadow-lg"
            >
              <span>See rules</span>
              <ArrowRight className="w-4 h-4 text-[#006ddb]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

