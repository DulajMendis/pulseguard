'use client';

import React from 'react';
import { liveTelemetry } from '@/data/telemetry';
import { Tooltip } from '@/components/ui/Tooltip';
import { CheckCircle2, ShieldCheck } from 'lucide-react';

export const MetricsBar: React.FC = () => {
  return (
    <section id="telemetry" className="py-12 border-y border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              Verifiable Operational Telemetry
            </div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
              Production scale measured in real code and systems
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400 bg-slate-200/60 dark:bg-slate-800/80 px-3 py-1.5 rounded-lg w-fit">
            Source-of-truth: Verified workspace audit
          </span>
        </div>

        {/* Telemetry Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {liveTelemetry.map((item) => (
            <Tooltip
              key={item.id}
              content={
                <div className="space-y-1 text-left">
                  <p className="font-semibold text-white">{item.label}</p>
                  <p className="text-slate-300">{item.description}</p>
                  <p className="text-[10px] text-emerald-400 font-mono pt-1">
                    Verified: {item.verifiableSource}
                  </p>
                </div>
              }
            >
              <div className="w-full p-4 rounded-xl glass-panel border border-slate-200 dark:border-slate-800 hover:border-emerald-500/40 transition-all group cursor-default">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 group-hover:text-emerald-500 transition-colors">
                    {item.badge}
                  </span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 opacity-60 group-hover:opacity-100" />
                </div>
                <div className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-1">
                  {item.value}
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400 line-clamp-1 font-medium">
                  {item.label}
                </div>
              </div>
            </Tooltip>
          ))}
        </div>
      </div>
    </section>
  );
};
