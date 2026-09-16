'use client';

import React from 'react';
import Link from 'next/link';
import { Terminal, Github, Shield, Cpu, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-black py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Identity */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold tracking-[-0.025em] text-[#1d1d1f] dark:text-white">
                Dulaj Mendis
              </span>
            </div>
            <p className="text-sm text-[#1d1d1f]/70 dark:text-slate-400 max-w-md leading-relaxed font-normal">
              Systems Architect & Full-Stack Engineer based in Colombo, Sri Lanka. Manager of Sustainability and System Administration at Connaissance De Ceylan (CDC). Builder of Travex, PulseGuard, and the Sri Lanka Railway transit network.
            </p>
            <div className="flex items-center gap-3 text-xs font-mono text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Verified Production Systems
              </span>
              <span>·</span>
              <span>Zero Fabricated Data</span>
            </div>
          </div>

          {/* Col 2: Verified Systems */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-900 dark:text-slate-200 font-semibold">
              Live Systems
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <a
                  href="#projects"
                  className="hover:text-emerald-500 transition-colors flex items-center justify-between"
                >
                  <span>Travex (CDC)</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-400">84k LOC</span>
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="hover:text-emerald-500 transition-colors flex items-center justify-between"
                >
                  <span>PulseGuard</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400">99.98%</span>
                </a>
              </li>
              <li>
                <a
                  href="https://railway.dulajmendis.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-500 transition-colors flex items-center justify-between group"
                >
                  <span className="group-hover:underline">Railway GIS</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="hover:text-emerald-500 transition-colors"
                >
                  Experience Udawalawe
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Navigation & Engineering */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-900 dark:text-slate-200 font-semibold">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <a href="#lab" className="hover:text-emerald-500 transition-colors">
                  Interaction Lab (UX Rules)
                </a>
              </li>
              <li>
                <a href="#principles" className="hover:text-emerald-500 transition-colors">
                  Engineering Principles
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-emerald-500 transition-colors">
                  Career & Advisory
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/DulajMendis"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-500 transition-colors flex items-center gap-1.5"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub @DulajMendis</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar - Styled to match screen recording */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <span>© {new Date().getFullYear()} Dulaj Mendis. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#principles" className="hover:text-[#006ddb] transition-colors">
              8 Rules for Systems
            </a>
            <a href="#hero" className="hover:text-[#006ddb] transition-colors">
              Privacy
            </a>
            <span className="opacity-40">·</span>
            <span className="flex items-center gap-1 font-mono text-[11px]">
              <Cpu className="w-3 h-3 text-emerald-500" />
              Next.js 16
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
