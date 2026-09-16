'use client';

import React, { useState } from 'react';
import { ShieldCheck, Cpu, Zap, Database, Layers, CheckCircle2, Terminal, ArrowUpRight, Gauge, MousePointer2 } from 'lucide-react';

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
    'The Browser Company (Arc Perfectionist)',
  ];

  return (
    <section id="benefits" className="py-20 sm:py-28 px-4 sm:px-6 bg-[#f3f4f6]/70 dark:bg-[#0c0d14]/80">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-left space-y-2">
          <div className="text-xs font-semibold tracking-wider uppercase text-blue-600 dark:text-blue-400 font-mono">
            Capabilities
          </div>
          <h3 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950 dark:text-white leading-[1.1]">
            Your perfect systems<br />and engineering partner.
          </h3>
        </div>

        {/* 11-Cell Bento Grid */}
        <div className="grid grid-cols-12 gap-5">
          {/* Cell 1: Bio Card */}
          <div className="col-span-12 lg:col-span-7 intro-card flex flex-col justify-between">
            <div className="space-y-4">
              <h4 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white leading-snug">
                Systems Architect at the intersection of infrastructure, resilience, and product.
              </h4>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                Hi! I am <strong className="font-semibold text-slate-900 dark:text-white">Dulaj Mendis</strong> from Colombo, Sri Lanka. Manager of Sustainability &amp; System Administration at <strong>Connaissance De Ceylan (CDC)</strong>. I design and build production-grade operating systems, transactional DMC platforms, and developer observability tooling with mathematical rigor, type-safe API contracts, and sub-100ms response times.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>CDC Travel Group · Travex Core Architecture</span>
            </div>
          </div>

          {/* Cell 2: Stats Grid (4 cells) */}
          <div className="col-span-12 lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="intro-card !p-6 flex flex-col justify-center">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white">84k</span>
                <span className="text-xl font-bold text-blue-600 dark:text-blue-400">+</span>
              </div>
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">Lines of Production Code</div>
            </div>

            <div className="intro-card !p-6 flex flex-col justify-center">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white">58</span>
                <span className="text-xl font-bold text-emerald-500">Models</span>
              </div>
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">Prisma Relational Schema</div>
            </div>

            <div className="intro-card !p-6 flex flex-col justify-center">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white">237</span>
                <span className="text-xl font-bold text-blue-600 dark:text-blue-400">+</span>
              </div>
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">Production API Endpoints</div>
            </div>

            <div className="intro-card !p-6 flex flex-col justify-center">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white">100</span>
                <span className="text-xl font-bold text-emerald-500">%</span>
              </div>
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">Data &amp; Claim Authenticity</div>
            </div>
          </div>

          {/* Cell 3: Interaction Engineering & Apple-style Display Frame */}
          <div className="col-span-12 lg:col-span-7 intro-card">
            <div className="flex flex-col md:flex-row gap-6 justify-between items-start mb-6">
              <div>
                <h4 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white leading-tight">
                  Stunning UI/UX &amp;<br />Interaction Engineering.
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-sm">
                  Sub-100ms Doherty threshold response, collision-aware context menus, and tactile feedback.
                </p>
              </div>

              {/* Doherty Latency Benchmarker */}
              <div className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs">
                <button
                  type="button"
                  onClick={() => runDohertyTest('optimistic')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                    dohertyState === 'optimistic' ? 'bg-emerald-500 text-white font-bold' : 'text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700'
                  }`}
                >
                  45ms Optimistic
                </button>
                <button
                  type="button"
                  onClick={() => runDohertyTest('standard')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                    dohertyState === 'standard' ? 'bg-amber-500 text-white font-bold' : 'text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700'
                  }`}
                >
                  750ms Laggy
                </button>
              </div>
            </div>

            {/* Mock Display Viewport with Right-Click Collision demo */}
            <div
              onContextMenu={triggerMenu}
              className="relative w-full h-44 sm:h-52 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden flex items-center justify-center p-4 cursor-crosshair select-none"
            >
              <div className="text-center space-y-1">
                <MousePointer2 className="w-6 h-6 text-slate-400 mx-auto animate-bounce" />
                <div className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400">
                  Right-click anywhere to trigger collision-flipping menu
                </div>
                <div className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
                  Doherty State: {dohertyState === 'idle' ? 'Ready (<100ms target)' : dohertyState === 'optimistic' ? '⚡ 45ms Instant Render' : '⏳ 750ms Artificial Wait'}
                </div>
              </div>

              {/* Active Context Menu Popup */}
              {activeMenuDemo && (
                <div
                  className="absolute p-1.5 rounded-xl bg-white dark:bg-slate-800 shadow-2xl border border-slate-200 dark:border-slate-700 text-xs w-36 space-y-0.5 animate-fade-in z-20"
                  style={{
                    top: Math.min(menuPosition.y, 110),
                    left: menuPosition.flipped ? menuPosition.x - 144 : menuPosition.x,
                  }}
                  onClick={() => setActiveMenuDemo(false)}
                >
                  <div className="px-2.5 py-1 text-[10px] font-mono text-slate-400 border-b border-slate-100 dark:border-slate-700">
                    {menuPosition.flipped ? '← Edge Flipped' : 'Standard →'}
                  </div>
                  <div className="px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 font-medium cursor-pointer">
                    Inspect State
                  </div>
                  <div className="px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 font-medium cursor-pointer">
                    Copy Telemetry
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Cell 4: Lightning-Fast Load Times & Performance */}
          <div className="col-span-12 lg:col-span-5 intro-card flex flex-col justify-between">
            <div className="space-y-3">
              <h4 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
                Lightning-fast load times.
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                Prerendered at the edge with zero client hydration bottlenecks and deterministic layout stability.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 mt-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full border-4 border-emerald-500 flex items-center justify-center font-bold text-emerald-500 font-mono text-sm">
                  100
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-900 dark:text-white">Performance Score</div>
                  <div className="text-[11px] font-mono text-slate-500">Google Lighthouse Audit</div>
                </div>
              </div>
              <div className="text-right font-mono text-xs text-emerald-500 font-bold">
                0.0s LCP
              </div>
            </div>
          </div>

          {/* Cell 5: Custom Integrations & Stack */}
          <div className="col-span-12 lg:col-span-6 intro-card">
            <h4 className="text-xl font-bold tracking-tight text-slate-950 dark:text-white mb-2">
              Custom Integrations &amp; Stack.
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              Battle-tested tools powering high-throughput enterprise systems.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {integrations.map((item) => (
                <div
                  key={item.name}
                  className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-center"
                >
                  <span className="text-xs font-bold text-slate-900 dark:text-white">{item.name}</span>
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 mt-0.5">{item.role}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cell 6: Pixel-Perfect & Responsive Design */}
          <div className="col-span-12 lg:col-span-6 intro-card flex flex-col justify-between">
            <div>
              <h4 className="text-xl font-bold tracking-tight text-slate-950 dark:text-white mb-2">
                Pixel-Perfect &amp; Responsive.
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                Adaptive layouts fluidly scaling from mobile field staff in Yala to dual 4K monitors in executive headquarters.
              </p>
            </div>
            <div className="mt-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-around text-xs font-mono text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> 320px Mobile</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> 768px Tablet</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> 1920px 4K</span>
            </div>
          </div>

          {/* Cell 7: Clean Code */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-4 intro-card !p-6 flex flex-col justify-between">
            <h4 className="text-base font-bold text-slate-950 dark:text-white mb-2">
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

          {/* Cell 8: Development Duration */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-4 intro-card !p-6 flex flex-col justify-between">
            <h4 className="text-base font-bold text-slate-950 dark:text-white mb-2">
              Delivery Velocity
            </h4>
            <div className="flex flex-col items-center justify-center py-4">
              <div className="text-slate-400 line-through text-sm font-mono decoration-rose-500 decoration-2">
                Months of scope creep
              </div>
              <div className="text-3xl font-extrabold text-emerald-500 font-sans tracking-tight mt-1">
                Weeks to Production
              </div>
            </div>
          </div>

          {/* Cell 9: Scalable CMS & Components */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-4 intro-card !p-6 flex flex-col justify-between">
            <h4 className="text-base font-bold text-slate-950 dark:text-white mb-2">
              Scalable Systems &amp; Queues
            </h4>
            <div className="space-y-2 py-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>Redis Worker Queues</span>
                <span className="text-emerald-500 font-bold">100% healthy</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-[94%]" />
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-1">
                <span>Database Poolers</span>
                <span className="text-blue-500 font-bold">0ms wait</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full w-[88%]" />
              </div>
            </div>
          </div>

          {/* Cell 10: Clients & Ecosystem Marquee */}
          <div className="col-span-12 intro-card !p-6 overflow-hidden">
            <div className="text-center text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4 font-mono">
              Systems and organizations that speak for themselves
            </div>
            <div className="relative w-full overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
              <div className="flex w-max animate-marquee gap-8 items-center text-sm font-semibold text-slate-800 dark:text-slate-200">
                {marqueeItems.concat(marqueeItems).map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 whitespace-nowrap">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Cell 11: 8 Mantras Banner Card */}
          <div className="col-span-12 intro-card !p-8 flex flex-col sm:flex-row items-center justify-between gap-6 bg-gradient-to-r from-slate-900 to-slate-950 text-white dark:border-slate-800">
            <div className="space-y-1 text-center sm:text-left">
              <div className="text-xs font-mono text-blue-400 font-semibold uppercase tracking-wider">
                Engineering Discipline
              </div>
              <h4 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                8 architectural rules for mission-critical systems.
              </h4>
            </div>
            <button
              type="button"
              onClick={onOpenPrinciples}
              className="px-6 py-3 rounded-full bg-white text-slate-950 text-xs font-bold hover:bg-slate-100 transition-all flex items-center gap-2 whitespace-nowrap shadow-md"
            >
              <span>See engineering mantras</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
