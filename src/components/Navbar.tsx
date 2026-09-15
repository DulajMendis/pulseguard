'use client';

import Link from 'next/link';
import { Activity, Shield, Terminal, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 group-hover:border-emerald-400 transition">
                <Activity className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg text-white tracking-tight flex items-center gap-1.5">
                PulseGuard
                <span className="text-[10px] uppercase font-semibold tracking-wider bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  Pro
                </span>
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-6 ml-8 text-sm text-zinc-400">
              <Link href="/dashboard" className="hover:text-white transition">Dashboard</Link>
              <Link href="/status/demo" className="hover:text-white transition">Public Status Page</Link>
              <Link href="/tools/ssl-checker" className="hover:text-white transition flex items-center gap-1">
                SSL Checker <span className="text-[9px] bg-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded">Free</span>
              </Link>
              <Link href="/tools/cron-generator" className="hover:text-white transition flex items-center gap-1">
                Cron Generator <span className="text-[9px] bg-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded">Free</span>
              </Link>
              <Link href="/pricing" className="hover:text-white transition">Pricing</Link>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="text-sm font-medium text-zinc-300 hover:text-white px-3 py-1.5 rounded-lg hover:bg-zinc-800/60 transition hidden sm:inline-block"
            >
              Sign In
            </Link>
            <Link
              href="/dashboard"
              className="text-sm font-semibold bg-emerald-500 hover:bg-emerald-400 text-zinc-950 px-4 py-2 rounded-lg flex items-center gap-1.5 shadow-sm shadow-emerald-500/20 transition"
            >
              Get Started Free <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
